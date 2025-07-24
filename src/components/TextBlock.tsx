interface TextBlockProps {
  text: string;
}

export default function TextBlock({ text }: TextBlockProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
