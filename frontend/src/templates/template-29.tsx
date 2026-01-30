import type { AgendaProps } from "./types";

const defaultAgendaProps: AgendaProps = {
  title: "Agenda Padrão",
  topics: ["Padrão"],
  preview: false,
};

export default function Template29(props: Partial<AgendaProps>) {
  const { title, topics, preview } = { ...defaultAgendaProps, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-4xl mx-auto">
        {topics.length > 8 ? (
          <div className="grid grid-cols-2 gap-x-6">
            <div className="space-y-2">
              {topics.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 pb-2 pt-2.5 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-black mb-1">
                      {index + 1}. {item}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {topics.slice(8).map((item, index) => (
                <div
                  key={index + 8}
                  className="flex items-center px-4 pb-2 pt-2.5 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-black mb-1">
                      {index + 9}. {item}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {topics.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-4 pb-2 pt-2.5 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-black mb-1">
                    {index + 1}. {item}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
