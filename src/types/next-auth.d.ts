import 'next-auth';

declare module 'next-auth' {
  /**
   * Extende a interface Session para incluir o ID do usuário.
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
