import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CreateSiteButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: { components: [] } }), // Cria um site vazio
      });

      if (res.ok) {
        const site = await res.json();
        router.push(`/builder/${site.id}`);
      } else {
        alert('Falha ao criar o site.');
      }
    } catch (error) {
      console.error(error);
      alert('Falha ao criar o site.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
    >
      {isLoading ? 'Criando...' : '+ Novo Site'}
    </button>
  );
}