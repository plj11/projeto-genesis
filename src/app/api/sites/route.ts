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
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar o site" }, { status: 500 });
  }
}

/**
 * Rota para criar um novo site ou atualizar um existente, garantindo a propriedade.
 */
export async function POST(req: NextRequest) {
  let body;
  try {
    console.log('Requisição POST para /api/sites recebida.');
    body = await req.json();
    console.log('Corpo da requisição:', body);
  } catch (jsonError) {
    console.error('Erro ao analisar JSON da requisição:', jsonError);
    return NextResponse.json({ error: "Erro ao processar a requisição." }, { status: 400 });
  }

  let session;
  try {
    session = await getServerSession(authOptions);
    console.log('Objeto de sessão:', session);
  } catch (sessionError) {
    console.error('Erro ao obter a sessão:', sessionError);
    return NextResponse.json({ error: "Erro de autenticação." }, { status: 500 });
  }

  if (!session?.user?.id) {
    console.error('Sessão não autorizada ou ID do usuário ausente.');
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  console.log('User ID da sessão:', session.user.id);
  console.log('NEXTAUTH_SECRET carregado:', process.env.NEXTAUTH_SECRET ? 'Sim' : 'Não');

  const { id, content, subdomain, customDomain } = body;

  try {
    if (id) {
      // Esta é uma operação de atualização
      const existingSite = await prisma.site.findUnique({
        where: { id: id },
      });

      if (!existingSite || existingSite.userId !== session.user.id) {
        console.error('Tentativa de editar site não autorizado.');
        return NextResponse.json({ error: "Não autorizado a editar este site" }, { status: 403 });
      }

      const dataToUpdate: any = {};
      if (content !== undefined) dataToUpdate.content = content;
      if (subdomain !== undefined) dataToUpdate.subdomain = subdomain;
      if (customDomain !== undefined) dataToUpdate.customDomain = customDomain;

      const site = await prisma.site.update({
        where: { id: id },
        data: dataToUpdate,
      });
      console.log('Site atualizado com sucesso:', site.id);
      return NextResponse.json(site);

    } else {
      // Esta é uma operação de criação
      console.log('Iniciando criação de novo site.');
      const site = await prisma.site.create({
        data: {
          content: content || { components: [] }, // Garante que o conteúdo seja um JSON vazio se não fornecido
          userId: session.user.id,
          subdomain: subdomain || null, // Garante null se não fornecido
          customDomain: customDomain || null, // Garante null se não fornecido
        },
      });
      console.log('Novo site criado com sucesso:', site.id);
      return NextResponse.json(site);
    }
  } catch (error: any) { // Usar 'any' para acessar 'code' e 'meta'
    console.error('Erro CRÍTICO na rota POST /api/sites:', error);
    if (error.code === 'P2002') { // Violação de restrição única do Prisma
      if (error.meta?.target?.includes('subdomain')) {
        return NextResponse.json({ error: "Subdomínio já está em uso. Por favor, escolha outro." }, { status: 409 });
      }
      if (error.meta?.target?.includes('customDomain')) {
        return NextResponse.json({ error: "Domínio personalizado já está em uso. Por favor, escolha outro." }, { status: 409 });
      }
    }
    return NextResponse.json({ error: "Erro ao salvar o site" }, { status: 500 });
  }
}