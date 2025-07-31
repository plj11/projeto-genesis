import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log('Received prompt:', prompt);

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured.' }, { status: 500 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const instruction = `Você é um assistente de IA que gera JSON para componentes de site. Dada uma descrição, gere um objeto JSON que represente as propriedades de um componente Hero ou TextBlock. O JSON deve ter uma propriedade 'type' que seja 'HERO' ou 'TEXT_BLOCK'. Se a descrição for para um Hero, o JSON deve ter 'title' e 'subtitle'. Se for para um TextBlock, o JSON deve ter 'text'. Não inclua nenhum texto adicional, apenas o JSON.`;

    const fullPrompt = `${instruction}\n\nDescrição: ${prompt}\n\nJSON:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: unknown) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ error: 'Failed to generate content from AI.' }, { status: 500 });
  }
}
