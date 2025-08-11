'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AIBuilder() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Por favor, descreva o site que você deseja criar.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, siteId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Falha ao gerar o conteúdo.');
      }

      // Se a geração for bem-sucedida, redireciona para o construtor
      router.push(`/builder/${siteId}`);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-12">
          <Link href={`/builder/${siteId}`} className="text-blue-500 hover:underline mb-6 block">
            &larr; Voltar para o Construtor
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            Criar com Inteligência Artificial
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center text-lg">
            Descreva o site que você imagina, e nossa IA irá gerar uma primeira versão para você.
          </p>

          <div className="space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Ex: "Crie um site para uma cafeteria chamada Café Aconchego. Inclua um título, uma breve descrição sobre nossos grãos especiais e uma seção com três dos nossos produtos principais."'
              className="w-full h-40 p-4 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-300 ease-in-out shadow-inner resize-none text-base"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gerando...
                </div>
              ) : 'Gerar Site Mágico'}
            </button>
          </div>

          {error && (
            <p className="text-red-500 mt-6 text-center bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </p>
          )}
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">
          Dica: Seja o mais descritivo possível para obter melhores resultados.
        </p>
      </div>
    </div>
  );
}