import type { SingleTopicProps } from "./types";

type SafeSingleTopicProps = Partial<SingleTopicProps>;

const defaultValues: SingleTopicProps = {
  title: "Título padrão",
  content: "Conteúdo padrão",
  preview: false,
};

export default function Template01(props: SafeSingleTopicProps) {
  const { title, content, preview } = { ...defaultValues, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-4 text-center">
        {title}
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
        {content}
      </p>
    </div>
  );
}
