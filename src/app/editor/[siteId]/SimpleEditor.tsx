
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Hero from '@/components/Hero';
import TextBlock from '@/components/TextBlock';
import Pricing from '@/components/Pricing';

// Define a estrutura de um componente na página
interface PageComponent {
  id: string;
  type: 'HERO' | 'TEXT_BLOCK' | 'PRICING';
  props: any;
}

// Mapa de componentes disponíveis para o editor
const componentMap = {
  'HERO': { name: 'Hero Section', component: Hero, defaultProps: { title: 'Seu Título Incrível', subtitle: 'Uma descrição que chama a atenção.' } },
  'TEXT_BLOCK': { name: 'Bloco de Texto', component: TextBlock, defaultProps: { text: 'Este é um parágrafo de texto que você pode editar.' } },
  'PRICING': { name: 'Planos de Preços', component: Pricing, defaultProps: {} }, // Pricing tem seus próprios padrões
};

export default function SimpleEditor() {
  const params = useParams();
  const siteId = params.siteId as string;

  const [components, setComponents] = useState<PageComponent[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Carregar dados do site
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
        } else {
          console.error('Falha ao carregar dados do site.');
        }
      } catch (err) {
        console.error('Erro ao carregar o site:', err);
      }
    };
    fetchSiteData();
  }, [siteId]);

  // Salvar dados do site
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: siteId, content: { components } }),
      });
      if (!res.ok) throw new Error('Falha ao salvar o site.');
      alert('Site salvo com sucesso!');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  // Adicionar um novo componente
  const addComponent = (type: 'HERO' | 'TEXT_BLOCK' | 'PRICING') => {
    const newComponent: PageComponent = {
      id: `${type}-${Date.now()}`,
      type,
      props: componentMap[type].defaultProps,
    };
    setComponents([...components, newComponent]);
  };

  // Remover um componente
  const removeComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  // Atualizar props de um componente
  const updateComponentProps = (id: string, propName: string, value: any) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, props: { ...c.props, [propName]: value } } : c
    ));
  };
  
    // Mover um componente para cima
  const moveComponentUp = (index: number) => {
    if (index === 0) return;
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(index, 1);
    newComponents.splice(index - 1, 0, movedComponent);
    setComponents(newComponents);
  };

  // Mover um componente para baixo
  const moveComponentDown = (index: number) => {
    if (index === components.length - 1) return;
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(index, 1);
    newComponents.splice(index + 1, 0, movedComponent);
    setComponents(newComponents);
  };


  // Renderiza o componente real com base no tipo
  const renderComponent = (component: PageComponent) => {
    const Component = componentMap[component.type]?.component;
    if (!Component) return <div className="text-red-500">Componente desconhecido: {component.type}</div>;
    
    // Passa as props e um callback para atualizar o estado
    return <Component 
              {...component.props} 
              isEditing={true} 
              onPropChange={(propName: string, value: string) => updateComponentProps(component.id, propName, value)}
              showCtaButtons={false} // Garante que botões de CTA não apareçam no editor
           />;
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Coluna de Controles */}
      <aside className="w-1/4 bg-white dark:bg-gray-800 p-4 flex flex-col shadow-lg z-10">
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Editor Visual</h1>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Adicionar Componente</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(componentMap).map(([type, { name }]) => (
              <button
                key={type}
                onClick={() => addComponent(type as 'HERO' | 'TEXT_BLOCK' | 'PRICING')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Pré-visualização */}
      <main className="flex-1 p-6 bg-gray-200 dark:bg-gray-950 overflow-auto">
        <div className="w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-full overflow-y-auto">
            {components.length > 0 ? (
              components.map((component, index) => (
                <div key={component.id} className="relative group border border-dashed border-transparent hover:border-blue-500">
                  {renderComponent(component)}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-md p-1 z-20">
                    <button onClick={() => moveComponentUp(index)} disabled={index === 0} className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30">↑</button>
                    <button onClick={() => moveComponentDown(index)} disabled={index === components.length - 1} className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30">↓</button>
                    <button onClick={() => removeComponent(component.id)} className="p-1 text-red-500 hover:text-red-700">✕</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <h2 className="text-2xl font-semibold">Comece a construir seu site.</h2>
                  <p className="mt-2">Adicione componentes usando o menu à esquerda.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
