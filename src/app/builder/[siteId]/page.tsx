'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Define os tipos de componentes que o usuário pode adicionar.
const COMPONENT_TYPES = {
  HERO: {
    name: 'Seção de Herói',
    defaultProps: { title: 'Título Incrível', subtitle: 'Um subtítulo impactante.' },
  },
  TEXT_BLOCK: {
    name: 'Bloco de Texto',
    defaultProps: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  },
};

// Define a estrutura de um componente na página
interface PageComponent {
  id: string;
  type: keyof typeof COMPONENT_TYPES;
  props: any;
}

export default function Builder() {
  const params = useParams();
  const siteId = params.siteId as string;

  const [components, setComponents] = useState<PageComponent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para buscar os dados do site ao carregar a página
  useEffect(() => {
    if (!siteId) return;

    const fetchSiteData = async () => {
      try {
        const res = await fetch(`/api/sites?id=${siteId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.content?.components) {
            setComponents(data.content.components);
          }
        }
      } catch (error) {
        console.error('Falha ao buscar dados do site:', error);
      }
      setIsLoading(false);
    };

    fetchSiteData();
  }, [siteId]);

  const addComponent = (type: keyof typeof COMPONENT_TYPES) => {
    const newComponent: PageComponent = {
      id: `${type.toLowerCase()}-${Date.now()}`,
      type: type,
      props: COMPONENT_TYPES[type].defaultProps,
    };
    setComponents([...components, newComponent]);
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: siteId, content: { components } }),
      });
      if (res.ok) {
        alert('Site salvo com sucesso!');
      }
    } catch (error) {
      alert('Erro ao salvar o site.');
      console.error('Falha ao salvar:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-72 bg-white dark:bg-gray-800 p-4 shadow-md flex flex-col">
        <h2 className="text-xl font-bold mb-4">Componentes</h2>
        <div className="space-y-2">
          <button
            onClick={() => addComponent('HERO')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Adicionar Herói
          </button>
          <button
            onClick={() => addComponent('TEXT_BLOCK')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Adicionar Texto
          </button>
        </div>
        <div className="mt-auto">
            <button
                onClick={handleSave}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded"
            >
                Salvar Site
            </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Seu Site</h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-4 min-h-[60vh]">
          {isLoading ? (
            <p className="text-center text-gray-500">Carregando...</p>
          ) : components.length === 0 ? (
            <p className="text-center text-gray-500">
              Comece adicionando componentes pela barra lateral.
            </p>
          ) : (
            components.map((component) => (
              <div key={component.id} className="border p-4 rounded-md">
                <h3 className="font-bold text-lg">
                  {COMPONENT_TYPES[component.type].name}
                </h3>
                <pre className="text-sm bg-gray-200 dark:bg-gray-700 p-2 mt-2 rounded">
                  {JSON.stringify(component.props, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
