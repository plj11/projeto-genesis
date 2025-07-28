import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { CreateSiteButton } from "./CreateSiteButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    // Isso não deveria acontecer se a rota estiver protegida, mas é uma boa prática
    return <p>Acesso negado.</p>;
  }

  const sites = await prisma.site.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Seus Sites</h1>
          <CreateSiteButton />
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <ul className="divide-y divide-gray-200">
            {sites.length > 0 ? (
              sites.map((site) => (
                <li key={site.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-semibold">Site ID: {site.id}</p>
                    <p className="text-sm text-gray-500">
                      Criado em: {new Date(site.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href={`/${site.id}`} target="_blank" className="text-blue-500 hover:underline">
                      Ver Site
                    </Link>
                    <Link href={`/builder/${site.id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                      Editar
                    </Link>
                  </div>
                </li>
              ))
            ) : (
              <p className="p-4 text-center text-gray-500">
                Você ainda não criou nenhum site. Comece agora!
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
