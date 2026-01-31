// Template fixo utilizado especificamente para mostrar questões geradas

import type { OptionalQuestionProps } from "./types";

type SafeOptionalQuestionProps = Partial<OptionalQuestionProps>;

const defaultValues: OptionalQuestionProps = {
  statement: "Enunciado da questão",
  options: ["Opção A", "Opção B", "Opção C", "Opção D"],
  correct_answer: 0,
  preview: false,
};

const MAX_OPTIONS = 4;
const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function Template54(props: SafeOptionalQuestionProps) {
  const {
    statement,
    options,
    correct_answer: _correct_answer,
    preview,
  } = {
    ...defaultValues,
    ...props,
  };

  const safeOptions = (options ?? defaultValues.options).slice(0, MAX_OPTIONS);

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col"
    >
      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full">
        <span className="text-sm font-medium text-gray-500 mb-1">
          Atividade
        </span>
        <h2 className="text-2xl font-semibold text-black mb-4 leading-9">
          {statement}
        </h2>
        <ul className="space-y-3">
          {safeOptions.map((option, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg border border-gray-200"
            >
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700 text-xs pb-0.5">
                {OPTION_LETTERS[index]}
              </span>
              <p className="text-gray-800 text-sm">{option}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
