'use client';

import { useState } from 'react';

interface SubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('Failed to create checkout session.');
        alert('Não foi possível iniciar o processo de assinatura. Tente novamente.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSubscribe} disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:bg-purple-300">
      {loading ? 'Aguarde...' : 'Assinar Agora'}
    </button>
  );
}
