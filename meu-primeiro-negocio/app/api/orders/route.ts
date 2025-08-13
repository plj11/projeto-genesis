import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth'; // Descomente para autenticação
// import { authOptions } from '@/lib/auth'; // Descomente para autenticação

export async function GET() {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    console.error(`Erro ao listar orders:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    const body = await req.json();
    const newOrder = await prisma.order.create({ data: body });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(`Erro ao criar order:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
