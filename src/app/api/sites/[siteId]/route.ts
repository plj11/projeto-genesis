import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest, context: any) {
  const siteId = params.siteId;
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  
  const { component } = await req.json();

  try {
    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data: {
        components: {
          push: component,
        },
      },
    });
    return NextResponse.json(updatedSite);
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Erro ao atualizar o site' }, { status: 500 });
  }
}
