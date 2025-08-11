'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function SiteSettings() {
  const params = useParams();
  const siteId = params.siteId as string;

  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) return;

    const fetchSiteData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/sites?id=${siteId}`);
        if (res.ok) {
          const data = await res.json();
          setSubdomain(data.subdomain || '');
          setCustomDomain(data.customDomain || '');
        } else {
          setError('Falha ao carregar as configurações do site.');
        }
      } catch (err) {
        setError('Erro ao buscar dados do site.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteData();
  }, [siteId]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: siteId, subdomain, customDomain }),
      });

      if (res.ok) {
        setSuccess('Configurações salvas com sucesso!');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Falha ao salvar as configurações.');
      }
    } catch (err) {
      setError('Erro ao salvar as configurações.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const previewUrl = subdomain ? `http://${subdomain}.genesis.app` : 'Não configurado';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <Link href="/dashboard" className="text-blue-500 hover:underline mb-6 block">
          &larr; Voltar para o Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Configurações do Site</h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Carregando configurações...</p>
        ) : (
          <div className="space-y-6">
            {/* Seção de Pré-visualização */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Pré-visualização</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Seu site está disponível em:
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                  {previewUrl}
                </a>
              </p>
            </div>

            {/* Seção de Subdomínio */}
            <div>
              <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Subdomínio (ex: meu-site.genesis.app)
              </label>
              <input
                type="text"
                id="subdomain"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="nome-do-seu-site"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Será o endereço público do seu site.</p>
            </div>

            {/* Seção de Domínio Personalizado */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Domínio Personalizado</h2>
              <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Seu Domínio (ex: www.meudominio.com)
              </label>
              <input
                type="text"
                id="customDomain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="www.seusite.com"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Para conectar seu domínio, adicione os seguintes registros DNS no painel do seu provedor de domínio:
              </p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-mono text-gray-800 dark:text-gray-200">
                <p><strong>Registro A:</strong> @ apontando para 192.0.2.1 (Exemplo)</p>
                <p><strong>Registro CNAME:</strong> www apontando para {subdomain || 'seu-subdominio'}.genesis.app</p>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Ainda não tem um domínio? Recomendamos <a href="#" className="text-blue-500 hover:underline">GoDaddy</a> ou <a href="#" className="text-blue-500 hover:underline">Hostinger</a>.
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erro:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Sucesso:</strong>
                <span className="block sm:inline"> {success}</span>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300"
            >
              {isSaving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
