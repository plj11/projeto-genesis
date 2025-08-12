import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth'; // Descomente para autenticação
// import { authOptions } from '@/lib/auth'; // Descomente para autenticação

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    const post = await prisma.post.findUnique({ where: { id: params.id } });
    if (!post) {
      return new NextResponse('Not Found', { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error(`Erro ao obter {{modelName}} por ID:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    const body = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(`Erro ao atualizar {{modelName}}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    await prisma.post.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Erro ao deletar {{modelName}}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
