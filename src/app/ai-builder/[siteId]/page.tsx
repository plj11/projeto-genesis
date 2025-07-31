'use client';

import { useState } from 'react';

export default function AiBuilder() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setAiResponse('');
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.response);
      } else {
        setAiResponse(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAiResponse(`Error: ${error.message}`);
      } else {
        setAiResponse(`Error: An unknown error occurred`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComponent = async () => {
    if (!newComponent) return;

    try {
      const res = await fetch(`/api/sites/${siteId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ component: newComponent }),
        }
      );

      if (res.ok) {
        window.location.href = `/builder/${siteId}`;
      } else {
        alert('Erro ao adicionar componente');
      }
    } catch (error) {
      alert('Erro ao adicionar componente');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Gênesis AI Builder
        </h1>

        <div className="w-full max-w-md">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            rows={5}
            placeholder="Digite seu prompt aqui (ex: Crie uma seção de herói com o título 'Bem-vindo' e subtítulo 'Sua plataforma')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Gerando...' : 'Gerar com IA'}
          </button>
        </div>

        {aiResponse && (
          <div className="mt-8 w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-left">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Resposta da IA:</h2>
            <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {aiResponse}
            </pre>
            <button
              onClick={handleAddComponent}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
              Adicionar ao Site
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
