'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  isFeatured?: boolean;
}

interface PricingProps {
  plans?: Plan[];
  isEditing?: boolean;
  onPropChange?: (planIndex: number, propName: string, value: any) => void;
}

const defaultPlans: Plan[] = [
  {
    name: 'Básico',
    price: 'R$29',
    description: 'Para indivíduos e pequenos projetos.',
    features: ['1 Site', '10GB de Armazenamento', 'Suporte por Email'],
    cta: 'Começar',
  },
  {
    name: 'Profissional',
    price: 'R$79',
    description: 'Para negócios em crescimento e freelancers.',
    features: ['10 Sites', '100GB de Armazenamento', 'Suporte Prioritário', 'Domínio Personalizado'],
    cta: 'Escolher Plano',
    isFeatured: true,
  },
  {
    name: 'Empresa',
    price: 'R$199',
    description: 'Para grandes equipes e projetos críticos.',
    features: ['Sites Ilimitados', 'Armazenamento Ilimitado', 'Suporte 24/7', 'Recursos Avançados'],
    cta: 'Contate-nos',
  },
];

export default function Pricing({ plans = defaultPlans, isEditing = false, onPropChange = () => {} }: PricingProps) {
  const handleContentChange = (planIndex: number, propName: string, value: string) => {
    if (isEditing) {
      const updatedPlans = [...plans];
      (updatedPlans[planIndex] as any)[propName] = value;
      onPropChange(planIndex, 'plans', updatedPlans);
    }
  };

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-800 dark:text-white">Planos Flexíveis para Todos</h2>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed dark:text-gray-400 mt-4">
            Escolha o plano que melhor se adapta às suas necessidades e comece a criar hoje mesmo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform transition-transform duration-300 ${plan.isFeatured ? 'scale-105 border-2 border-indigo-500' : 'hover:scale-105'}`}>
              <h3
                className="text-2xl font-bold text-center text-gray-800 dark:text-white"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleContentChange(index, 'name', e.currentTarget.textContent || '')}>
                {plan.name}
              </h3>
              <p
                className="mt-2 text-center text-gray-500 dark:text-gray-400"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleContentChange(index, 'description', e.currentTarget.textContent || '')}>
                {plan.description}
              </p>
              <div className="mt-6 text-center text-gray-900 dark:text-white">
                <span
                  className="text-4xl font-bold"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleContentChange(index, 'price', e.currentTarget.textContent || '')}>
                  {plan.price}
                </span>
                <span className="text-base text-gray-500 dark:text-gray-400">/mês</span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span
                      className="text-gray-600 dark:text-gray-300"
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newFeatures = [...plan.features];
                        newFeatures[fIndex] = e.currentTarget.textContent || '';
                        handleContentChange(index, 'features', newFeatures);
                      }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <button
                  className={`w-full py-3 px-6 text-lg font-semibold rounded-lg transition-colors duration-300 ${plan.isFeatured ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
