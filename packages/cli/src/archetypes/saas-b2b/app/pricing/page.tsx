import SubscribeButton from '@/components/SubscribeButton';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Nossos Planos</h1>
        <p className="text-xl text-gray-600">Escolha o plano que melhor se adapta às suas necessidades.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Plano Básico */}
        <div className="border rounded-lg p-8 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Básico</h2>
          <p className="text-4xl font-bold mb-6">$10<span className="text-xl font-normal">/mês</span></p>
          <ul className="space-y-4 text-gray-700 mb-8 flex-grow">
            <li>✅ Acesso a recursos básicos</li>
            <li>✅ Suporte por email</li>
          </ul>
          <SubscribeButton priceId="price_basic_placeholder" />
        </div>

        {/* Plano Pro */}
        <div className="border rounded-lg p-8 flex flex-col border-purple-500 ring-2 ring-purple-500">
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="text-4xl font-bold mb-6">$25<span className="text-xl font-normal">/mês</span></p>
          <ul className="space-y-4 text-gray-700 mb-8 flex-grow">
            <li>✅ Acesso a todos os recursos</li>
            <li>✅ Suporte prioritário</li>
            <li>✅ Acesso antecipado a novidades</li>
          </ul>
          <SubscribeButton priceId="price_pro_placeholder" />
        </div>

        {/* Plano Enterprise */}
        <div className="border rounded-lg p-8 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
          <p className="text-4xl font-bold mb-6">Contato</p>
          <ul className="space-y-4 text-gray-700 mb-8 flex-grow">
            <li>✅ Tudo do plano Pro</li>
            <li>✅ Suporte dedicado</li>
            <li>✅ SLA personalizado</li>
          </ul>
          <button className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed">Entre em Contato</button>
        </div>
      </div>
    </div>
  );
}
