import Link from 'next/link';

interface Post {
  id: string;
  // Adicione outros campos do modelo aqui
  name: string; // Exemplo
}

export default async function PostListPage() {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`).then(res => res.json());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lista de posts</h1>
      <Link href={`/posts/new`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Criar Novo Post
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
            { posts.map((post: Post) => (
              <tr key=post.id className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">post.id</td>
                <td className="py-2 px-4 border-b">post.name</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/posts/post.id`} className="text-blue-600 hover:underline mr-2">
                    Ver
                  </Link>
                  <Link href={`/posts/post.id/edit`} className="text-green-600 hover:underline mr-2">
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
