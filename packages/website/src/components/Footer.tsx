import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t bg-white dark:bg-gray-950">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2025 Gênesis. Todos os direitos reservados.
        </p>
        <nav className="flex items-center gap-4 mt-4 md:mt-0">
          <Link
            href="/terms"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Termos de Serviço
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  )
}
