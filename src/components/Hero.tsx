'use client';
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  isEditing?: boolean;
  onPropChange?: (propName: string, value: string) => void;
  showCtaButtons?: boolean; // Nova prop
}

export default function Hero({ title, subtitle, isEditing = false, onPropChange = () => {}, showCtaButtons = true }: HeroProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => onPropChange("title", e.currentTarget.textContent || "")}
            >
              {title}
            </h1>
            <p
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => onPropChange("subtitle", e.currentTarget.textContent || "")}
            >
              {subtitle}
            </p>
          </div>
          {showCtaButtons && !isEditing && (
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Comece a Criar
              </Link>
              <Link
                href="/#features"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                Saiba Mais
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
