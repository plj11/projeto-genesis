import Link from 'next/link';

interface {{capitalizedModelName}} {
  id: string;
  // Adicione outros campos do modelo aqui
  name: string; // Exemplo
}

export default async function {{capitalizedModelName}}DetailPage({ params }: { params: { id: string } }) {
  const {{modelNameLower}} = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/{{pluralModelName}}/${params.id}`).then(res => res.json());

  if (!{{modelNameLower}}) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{{capitalizedModelName}} não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Detalhes de {{capitalizedModelName}}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-2"><span className="font-semibold">ID:</span> {{modelNameLower}}.id</p>
        <p className="mb-2"><span className="font-semibold">Nome:</span> {{modelNameLower}}.name</p>
        {/* Adicione outros detalhes do modelo aqui */}
        <div className="mt-6">
          <Link href={`/{{pluralModelName}}`} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
            Voltar para a Lista
          </Link>
          <Link href={`/{{pluralModelName}}/{{modelNameLower}}.id/edit`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}
