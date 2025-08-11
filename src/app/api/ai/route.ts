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
    return NextResponse.json({ error: 'Não autorizado. Faça login para continuar.' }, { status: 401 });
  }

  const { prompt, siteId } = await request.json();

  if (!prompt || !siteId) {
    return NextResponse.json({ error: 'O prompt e o ID do site são obrigatórios.' }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'A chave da API do Gênesis não está configurada.' }, { status: 500 });
  }

  try {
    const site = await prisma.site.findFirst({
      where: { id: siteId, userId: session.user.id },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site não encontrado ou você não tem permissão para editá-lo.' }, { status: 404 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const instruction = `
      Você é um assistente de IA especialista em criar layouts de sites.
      Sua tarefa é analisar o prompt do usuário e gerar uma estrutura de componentes de site em formato JSON.
      Os componentes disponíveis são 'HERO', 'TEXT_BLOCK', e 'PRICING'.

      Sua resposta DEVE ser um objeto JSON válido contendo uma chave "components".
      A chave "components" deve ser um array de objetos.
      Cada objeto de componente deve ter "id", "type", e "props".
        - Para 'HERO', as props são "title" e "subtitle".
        - Para 'TEXT_BLOCK', a prop é "text".
        - Para 'PRICING', a prop é "plans", que é um array de objetos com "name", "price", "description", "features" (array de strings), e "cta".

      IMPORTANTE: Sua saída deve ser APENAS o objeto JSON. Não inclua nenhum texto, explicação, ou formatação markdown como 


json antes ou depois do JSON. A resposta deve começar com '{' e terminar com '}'.
    `;

    const fullPrompt = `${instruction}

PROMPT DO USUÁRIO: "${prompt}"

JSON DE SAÍDA:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const rawText = response.text();

    const jsonString = extractJson(rawText);

    if (!jsonString) {
      console.error('Nenhum JSON válido encontrado na resposta da IA:', rawText);
      throw new Error('A IA retornou uma resposta vazia ou em formato irreconhecível. Tente reformular seu pedido.');
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(jsonString);
    } catch (e) {
      console.error('Erro ao analisar JSON extraído da IA:', jsonString);
      throw new Error('A IA retornou uma resposta em um formato inválido. Tente novamente.');
    }

    if (!parsedContent.components || !Array.isArray(parsedContent.components)) {
      throw new Error('A IA gerou uma estrutura de dados inválida.');
    }

    await prisma.site.update({
      where: { id: siteId },
      data: { content: parsedContent },
    });

    return NextResponse.json({ success: true, message: 'Site atualizado com sucesso!' });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido no servidor.';
    console.error('Erro na rota da IA:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
