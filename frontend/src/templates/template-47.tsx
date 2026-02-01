import type { CaseStudyProps } from "./types";

export default function Template47({
  title,
  scenario,
  questions,
  preview,
}: CaseStudyProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div
            className="bg-gray-50 p-6 rounded-lg border-l-4"
            style={{ borderLeftColor: "#1277bc" }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: "#1277bc" }}
              >
                <span className="text-xl">📖</span>
              </div>
              <h2
                className="text-xl font-semibold"
                style={{ color: "#1277bc" }}
              >
                Cenário
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{scenario}</p>
          </div>
        </div>
        <div>
          <div
            className="bg-gray-50 p-6 rounded-lg border-l-4 space-y-4"
            style={{ borderLeftColor: "#58a3a1" }}
          >
            <h2 className="text-xl font-semibold" style={{ color: "#58a3a1" }}>
              Questões
            </h2>
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div
                    className="min-w-5 max-w-5 min-h-5 max-h-5 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: "#58a3a1" }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
