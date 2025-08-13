import Link from 'next/link';

interface {{capitalizedModelName}} {
  id: string;
  // Adicione outros campos do modelo aqui
  name: string; // Exemplo
}

export default async function {{capitalizedModelName}}ListPage() {
  const {{pluralModelName}} = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/{{pluralModelName}}`).then(res => res.json());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lista de {{pluralModelName}}</h1>
      <Link href={`/{{pluralModelName}}/new`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Criar Novo {{capitalizedModelName}}
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            { {{pluralModelName}}.map(({{modelNameLower}}: {{capitalizedModelName}}) => (
              <tr key={{modelNameLower}}.id className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{{modelNameLower}}.id</td>
                <td className="py-2 px-4 border-b">{{modelNameLower}}.name</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/{{pluralModelName}}/{{modelNameLower}}.id`} className="text-blue-600 hover:underline mr-2">
                    Ver
                  </Link>
                  <Link href={`/{{pluralModelName}}/{{modelNameLower}}.id/edit`} className="text-green-600 hover:underline mr-2">
                    Editar
                  </Link>
                  {/* Adicionar botão de deletar aqui */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
