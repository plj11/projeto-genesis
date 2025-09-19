
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEV_USER_EMAIL = 'dev@genesis.app'

// Função para garantir que nosso usuário de desenvolvimento exista
async function getDevelopmentUser() {
  let user = await prisma.user.findUnique({
    where: { email: DEV_USER_EMAIL },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: DEV_USER_EMAIL,
        name: 'Desenvolvedor Gênesis',
      },
    })
  }
  return user
}

export async function POST(request: Request) {
  try {
    const devUser = await getDevelopmentUser()
    const { name, subdomain } = await request.json()

    if (!name || !subdomain) {
      return NextResponse.json(
        { message: 'Nome e subdomínio são obrigatórios.' },
        { status: 400 },
      )
    }

    // Verificar se o subdomínio já está em uso
    const existingSite = await prisma.site.findUnique({
      where: { subdomain },
    })

    if (existingSite) {
      return NextResponse.json(
        { message: 'Este subdomínio já está em uso. Tente outro.' },
        { status: 409 }, // 409 Conflict
      )
    }

    const newSite = await prisma.site.create({
      data: {
        name,
        subdomain,
        userId: devUser.id,
      },
    })

    return NextResponse.json(newSite, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar site:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor ao criar o site.' },
      { status: 500 },
    )
  }
}
