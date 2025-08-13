import Link from 'next/link';

interface Post {
  id: string;
  // Adicione outros campos do modelo aqui
  name: string; // Exemplo
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${params.id}`).then(res => res.json());

  if (!post) {
    return <div className="container mx-auto px-4 py-8 text-red-500">Post não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Detalhes de Post</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-2"><span className="font-semibold">ID:</span> post.id</p>
        <p className="mb-2"><span className="font-semibold">Nome:</span> post.name</p>
        {/* Adicione outros detalhes do modelo aqui */}
        <div className="mt-6">
          <Link href={`/posts`} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
            Voltar para a Lista
          </Link>
          <Link href={`/posts/post.id/edit`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}
