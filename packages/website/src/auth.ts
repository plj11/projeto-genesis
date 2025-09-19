import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { authConfig } from './auth.config'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token }) {
      return token
    },
  },
  providers: [
    ...authConfig.providers,
    // A lógica do provedor de credenciais é sobrescrita aqui para usar o bcrypt
    // @ts-ignore
    Credentials({
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })
          if (user && user.password) {
            const passwordsMatch = await bcrypt.compare(
              credentials.password as string,
              user.password,
            )
            if (passwordsMatch) return user
          }
        }
        return null
      },
    }),
  ],
})
