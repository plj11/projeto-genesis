'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewSitePage() {
  const [name, setName] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, subdomain }),
      })

      if (response.ok) {
        router.push('/') // Redireciona para o dashboard em caso de sucesso
      } else {
        const data = await response.json()
        setError(data.message || 'Erro ao salvar o site.')
      }
    } catch (err) {
      setError('Erro de rede. Não foi possível conectar ao servidor.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">Criar Novo Site</h1>
        <p className="text-gray-400 mt-2">
          Dê um nome e um subdomínio único para o seu novo projeto.
        </p>
      </header>

      <main className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800/50 p-8 rounded-lg"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nome do Site
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder='Meu Projeto Incrível'
              className="block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="subdomain"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Subdomínio
            </label>
            <div className="flex items-center">
              <input
                id="subdomain"
                name="subdomain"
                type="text"
                required
                placeholder='meu-projeto'
                className="block w-full px-4 py-2 border border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
              />
              <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-600 bg-gray-600 text-gray-300 rounded-r-md">
                .genesis.app
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Salvar Site
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
