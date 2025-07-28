import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * Rota para buscar os detalhes de um site específico, garantindo que pertence ao usuário logado.
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID do site é obrigatório" }, { status: 400 });
  }

  try {
    const site = await prisma.site.findFirst({
      where: { id: id, userId: session.user.id }, // Garante que o site pertence ao usuário
    });

    if (!site) {
      return NextResponse.json({ error: "Site não encontrado ou não pertence a você" }, { status: 404 });
    }

    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar o site" }, { status: 500 });
  }
}

/**
 * Rota para criar um novo site ou atualizar um existente, garantindo a propriedade.
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id, content } = await req.json();

  try {
    const site = await prisma.site.upsert({
      where: { id: id || "" },
      update: { content },
      create: {
        content,
        userId: session.user.id, // Vincula o site ao usuário logado
      },
    });

    // Garante que o usuário não está atualizando um site que não é dele
    if (site.userId !== session.user.id) {
        return NextResponse.json({ error: "Não autorizado a editar este site" }, { status: 403 });
    }

    return NextResponse.json(site);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao salvar o site" }, { status: 500 });
  }
}