import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth'; // Descomente para autenticação
// import { authOptions } from '@/lib/auth'; // Descomente para autenticação

export async function GET() {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    const {{pluralModelName}} = await prisma.{{modelNameLower}}.findMany();
    return NextResponse.json({{pluralModelName}});
  } catch (error) {
    console.error(`Erro ao listar {{pluralModelName}}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions); // Descomente para autenticação
    // if (!session) { return new NextResponse('Unauthorized', { status: 401 }); }

    const body = await req.json();
    const new{{capitalizedModelName}} = await prisma.{{modelNameLower}}.create({ data: body });
    return NextResponse.json(new{{capitalizedModelName}}, { status: 201 });
  } catch (error) {
    console.error(`Erro ao criar {{modelNameLower}}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
