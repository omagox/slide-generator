import type { ProcessProps } from "./types";

export default function Template51({ title, steps, preview }: ProcessProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex justify-center">
        <div className="space-y-6 max-w-3xl">
          {steps.slice(0, 4).map((step, index) => {
            const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];
            return (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: colors[index] }}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="w-1 h-12 mt-2"
                      style={{ backgroundColor: colors[index] }}
                    ></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: colors[index] }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{step.content}</p>
                  {step.additional && (
                    <p className="text-gray-500 text-sm italic">
                      {step.additional}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
