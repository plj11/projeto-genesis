import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full px-4 md:px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-950 shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-lg font-bold">Gênesis</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/#features"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          Recursos
        </Link>
        <Link
          href="/#pricing"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          Preços
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          Sobre
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Cadastre-se
        </Link>
      </div>
    </header>
  )
}
