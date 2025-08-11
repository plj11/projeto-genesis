import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Função para extrair o JSON de uma string que pode conter lixo extra
function extractJson(text: string): string | null {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const { prompt, siteId, currentComponents, messages } = await request.json(); // Recebe o histórico de mensagens

  if (!prompt || !siteId || !currentComponents || !messages) {
    return NextResponse.json({ error: 'Dados insuficientes para a edição conversacional.' }, { status: 400 });
  }

  try {
    const site = await prisma.site.findFirst({
      where: { id: siteId, userId: session.user.id },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site não encontrado.' }, { status: 404 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construir o histórico de chat para a IA
    const chatHistory = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const instruction = `
      Você é um assistente de IA para criação e edição de sites. Sua função é interagir com o usuário, entender suas solicitações e gerar ou modificar a estrutura de componentes do site em formato JSON.

      Componentes disponíveis:
      - HERO: { title: string, subtitle: string }
      - TEXT_BLOCK: { text: string }
      - PRICING: { plans: Array<{ name: string, price: string, description: string, features: string[], cta: string }> }

      Sua resposta DEVE ser um objeto JSON com UMA das seguintes chaves:
      1. "updatedComponents": Um array de objetos de componentes (se você conseguir realizar a alteração ou criação).
      2. "conversationalResponse": Uma string com uma pergunta, feedback ou solicitação de mais informações (se você precisar interagir mais com o usuário).

      Regras para "updatedComponents":
      - Mantenha os IDs dos componentes existentes. Gere novos IDs para novos componentes (ex: "hero-12345").
      - Se o usuário pedir para adicionar, adicione um novo objeto ao array.
      - Se o usuário pedir para remover, remova o objeto correspondente.
      - Se o usuário pedir para alterar uma propriedade (ex: mudar um texto), encontre o componente e altere suas propriedades.

      Regras para "conversationalResponse":
      - Use quando precisar de mais detalhes, quando a solicitação for ambígua, ou para confirmar algo.
      - Seja amigável e útil.

      Exemplo de Resposta com updatedComponents:
      {
        "updatedComponents": [
          { "id": "hero-123", "type": "HERO", "props": { "title": "Novo Título", "subtitle": "Novo Subtítulo" } }
        ]
      }

      Exemplo de Resposta com conversationalResponse:
      {
        "conversationalResponse": "Claro! Você poderia me dar mais detalhes sobre o que gostaria de adicionar?"
      }

      O estado atual do site é:
      ${JSON.stringify({ components: currentComponents }, null, 2)}

      Analise o histórico da conversa e o último prompt do usuário para decidir sua resposta.
      NÃO inclua nenhum texto, explicação ou formatação extra como \`\`\`json. Apenas o objeto JSON.
    `;

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 2000,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const rawText = response.text();

    const jsonString = extractJson(rawText);

    if (!jsonString) {
      console.error('Nenhum JSON válido encontrado na resposta da IA:', rawText);
      throw new Error('A IA retornou uma resposta vazia ou em formato irreconhecível. Tente reformular seu pedido.');
    }

    const parsedResponse = JSON.parse(jsonString);

    if (parsedResponse.updatedComponents) {
      // Se a IA retornou componentes atualizados, validamos e retornamos
      if (!Array.isArray(parsedResponse.updatedComponents)) {
        throw new Error('A IA gerou uma estrutura de componentes inválida.');
      }
      return NextResponse.json({ success: true, updatedComponents: parsedResponse.updatedComponents });
    } else if (parsedResponse.conversationalResponse) {
      // Se a IA retornou uma resposta conversacional, retornamos a mensagem
      return NextResponse.json({ success: true, conversationalResponse: parsedResponse.conversationalResponse });
    } else {
      throw new Error('A IA retornou um formato de resposta inesperado.');
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido no servidor.';
    console.error('Erro na rota de edição da IA:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}