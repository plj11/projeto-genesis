'use client';

import Hero from "@/components/Hero";
import TextBlock from "@/components/TextBlock";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mapeia uma string de tipo de componente para o componente React real.
const componentMap = {
  HERO: Hero,
  TEXT_BLOCK: TextBlock,
};

export default function SitePreview() {
  const params = useParams();
  const siteId = params.siteId as string;

  const [components, setComponents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      setIsLoading(false);
      setError("ID do site não fornecido.");
      return;
    }

    const fetchSiteData = async () => {
      try {
        const res = await fetch(`/api/sites?id=${siteId}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Falha ao buscar dados do site.");
        }
        const data = await res.json();
        if (data.content?.components) {
          setComponents(data.content.components);
        } else {
          setComponents([]); // Site existe, mas sem componentes
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Erro ao carregar site:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteData();
  }, [siteId]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando site...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">Erro: {error}</div>;
  }

  if (components.length === 0) {
    return <div className="flex min-h-screen items-center justify-center text-gray-500">Este site ainda não possui conteúdo.</div>;
  }

  return (
    <div>
      {components.map((component) => {
        if (component.type in componentMap) {
          const ComponentToRender = componentMap[component.type as keyof typeof componentMap];
          return <ComponentToRender key={component.id} {...component.props} />;
        }
        return null;
      })}
    </div>
  );
}
