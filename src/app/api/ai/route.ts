import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log('Received prompt:', prompt);

  // Placeholder response for now
  const aiResponse = `AI received your prompt: "${prompt}". This is a placeholder response.`;

  return NextResponse.json({ response: aiResponse });
}
