import type { SingleTopicProps } from "./types";

export default function Template52({
  title,
  content,
  preview,
}: SingleTopicProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="h-full flex items-center">
        <div className="w-1/3 flex justify-center">
          <div className="relative">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1277bc" }}
            >
              <span className="text-white text-5xl">📖</span>
            </div>
          </div>
        </div>
        <div className="w-full pl-9">
          <h1 className="text-4xl font-bold text-black mb-8">{title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}
