
'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

export default function Login() {

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Bem-vindo ao Gênesis</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Acesse sua conta para começar a construir sites incríveis.</p>
        
        <button 
          onClick={handleGitHubSignIn}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          <FaGithub className="w-6 h-6" />
          Entrar com GitHub
        </button>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
}
