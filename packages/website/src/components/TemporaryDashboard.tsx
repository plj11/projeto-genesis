
import React from 'react'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function TemporaryDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">Dashboard Gênesis</h1>
        <p className="text-red-400 mt-2">
          Atenção: A autenticação foi contornada. Esta é uma visão de
          desenvolvimento.
        </p>
      </header>

      <main>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Meus Sites</h2>
          <Link
            href="/sites/new"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Criar Novo Site
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for sites */}
          <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Meu E-commerce</h3>
            <p className="text-gray-400 mt-2">subdomain.genesis.app</p>
            <div className="mt-4">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Gerenciar
              </a>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Meu Portfólio</h3>
            <p className="text-gray-400 mt-2">portfolio.genesis.app</p>
            <div className="mt-4">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Gerenciar
              </a>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-gray-500">Você ainda não tem outros sites.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
