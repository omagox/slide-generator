import type { DefinitionProps } from "./types";

const defaultDefinitionProps: DefinitionProps = {
  title: "Título padrão",
  term: "Termo padrão",
  definition: "Definição padrão",
  examples: [],
  preview: false,
};

export default function Template28(props: Partial<DefinitionProps>) {
  const { title, term, definition, examples, preview } = {
    ...defaultDefinitionProps,
    ...props,
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-gray-50 p-8 rounded-lg border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1277bc" }}>
            {term}
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            {definition}
          </p>
          {examples && examples.length > 0 && (
            <div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#58a3a1" }}
              >
                Exemplos:
              </h3>
              <ul className="space-y-2">
                {examples.map((example, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#58a3a1" }}
                    ></div>
                    <span className="text-gray-600">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
