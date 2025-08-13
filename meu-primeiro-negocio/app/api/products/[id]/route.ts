import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth'; // Descomente para autenticação
// import { authOptions } from '@/lib/auth'; // Descomente para autenticação

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    const product = await prisma.product.findUnique({ where: { id: params.id } });
    if (!product) {
      return new NextResponse('Not Found', { status: 404 });
    }
    return NextResponse.json(product);
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
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(`Erro ao atualizar {{modelName}}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    await prisma.product.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Erro ao deletar {{modelName}}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
