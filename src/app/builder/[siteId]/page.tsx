'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Hero from '@/components/Hero';
import TextBlock from '@/components/TextBlock';

interface HeroDefaultProps {
  title: string;
  subtitle: string;
}

interface TextBlockDefaultProps {
  text: string;
}

// Define os tipos de componentes que o usuário pode adicionar.
const COMPONENT_TYPES = {
  HERO: {
    name: 'Seção de Herói',
    defaultProps: { title: 'Título Incrível', subtitle: 'Um subtítulo impactante.' } as HeroDefaultProps,
  },
  TEXT_BLOCK: {
    name: 'Bloco de Texto',
    defaultProps: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } as TextBlockDefaultProps,
  },
};

// Define a estrutura de um componente na página
interface PageComponent {
  id: string;
  type: keyof typeof COMPONENT_TYPES;
  props: HeroDefaultProps | TextBlockDefaultProps;
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Falha ao buscar dados do site:', error.message);
        } else {
          console.error('Falha ao buscar dados do site: Erro desconhecido', error);
        }
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

  const handlePropChange = (id: string, propName: string, newValue: string) => {
    setComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === id
          ? { ...comp, props: { ...comp.props, [propName]: newValue } }
          : comp
      )
    );
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Erro ao salvar o site: ${error.message}`);
        console.error('Falha ao salvar:', error.message);
      } else {
        alert('Erro ao salvar o site: Erro desconhecido.');
        console.error('Falha ao salvar: Erro desconhecido', error);
      }
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
            components.map((component) => {
              switch (component.type) {
                case "HERO":
                  return (
                    <div key={component.id} className="border p-4 rounded-md">
                      <h3 className="font-bold text-lg">Herói</h3>
                      <input
                        type="text"
                        placeholder="Título"
                        value={(component.props as HeroDefaultProps).title}
                        onChange={(e) =>
                          handlePropChange(component.id, "title", e.target.value)
                        }
                        className="w-full p-2 border rounded mb-2"
                      />
                      <textarea
                        placeholder="Subtítulo"
                        value={(component.props as HeroDefaultProps).subtitle}
                        onChange={(e) =>
                          handlePropChange(component.id, "subtitle", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                      />
                      <Hero {...(component.props as HeroDefaultProps)} />
                    </div>
                  );
                case "TEXT_BLOCK":
                  return (
                    <div key={component.id} className="border p-4 rounded-md">
                      <h3 className="font-bold text-lg">Bloco de Texto</h3>
                      <textarea
                        placeholder="Texto"
                        value={(component.props as TextBlockDefaultProps).text}
                        onChange={(e) =>
                          handlePropChange(component.id, "text", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                      />
                      <TextBlock {...(component.props as TextBlockDefaultProps)} />
                    </div>
                  );
                default:
                  return null;
              }
            })
          )}
        </div>
      </main>
    </div>
  );
}
