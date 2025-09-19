import React from 'react'
import Link from 'next/link'

// Importando ícones para representar os diferenciais
import {
  BoltIcon,
  CodeBracketSquareIcon,
  CurrencyDollarIcon,
  LifebuoyIcon,
  RocketLaunchIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

export default function LandingPageContent() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Gênesis: Seu Oceano Azul Digital
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
          Transforme suas ideias em realidade. Crie, lance e gerencie seus
          projetos web com uma plataforma que torna a complexidade em
          simplicidade.
        </p>
        <div className="mt-10">
          <Link
            href="/register"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Comece Sua Jornada Gratuita
          </Link>
        </div>
      </section>

      {/* História do Gênesis */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Criando um Novo Oceano
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-400 text-lg">
            No vasto mar digital, muitas ideias naufragam antes de ver a luz do
            dia. O Gênesis nasceu da frustração com a complexidade técnica, para
            ser a sua tela em branco e o seu motor de inovação. Nossa missão é
            simples: democratizar a criação digital, permitindo que qualquer
            pessoa, independentemente da habilidade técnica, possa dar vida às
            suas ideias com liberdade, intuição e excelência.
          </p>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 md:py-32 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Por Que Somos o Seu Oceano Azul?
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CodeBracketSquareIcon,
                title: 'Construção Visual Intuitiva',
                text: 'Arraste e solte. Personalize. Se você pode imaginar, pode construir.',
              },
              {
                icon: BoltIcon,
                title: 'Liberdade Criativa Ilimitada',
                text: 'Sem templates engessados. Seu projeto, suas regras, sua identidade única.',
              },
              {
                icon: LifebuoyIcon,
                title: 'Suporte Dedicado para Não-Técnicos',
                text: 'Nossa equipe está aqui para guiar você, passo a passo, sem jargões.',
              },
              {
                icon: RocketLaunchIcon,
                title: 'Escalabilidade Sem Complicações',
                text: 'Seu projeto cresce com você, sem a necessidade de migrações complexas.',
              },
              {
                icon: UsersIcon,
                title: 'Comunidade Gênesis',
                text: 'Conecte-se, aprenda e inspire-se com outros criadores.',
              },
              {
                icon: CurrencyDollarIcon,
                title: 'Preços Transparentes e Justos',
                text: 'Escolha o plano que se encaixa no seu sonho e no seu bolso.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-12 h-12 mx-auto text-blue-400" />
                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 md:py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">
          Pronto para Criar Seu Oceano Azul?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-gray-300">
          Junte-se à comunidade Gênesis e comece a construir o futuro que você
          sempre imaginou.
        </p>
        <div className="mt-8">
          <Link
            href="/register"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105"
          >
            Comece Agora
          </Link>
        </div>
      </section>
    </div>
  )
}
