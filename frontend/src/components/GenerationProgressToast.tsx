import { useSlideGeneration } from "../contexts/SlideGenerationContext";

const GenerationProgressToast = () => {
  const { generationProgress } = useSlideGeneration();

  if (!generationProgress) return;

  return (
    <div
      className="fixed bottom-7 left-1/2 transform -translate-x-1/2 z-[9999] w-100 bg-white p-2.5 pb-3 rounded-full flex flex-col items-center justify-center gap-1.5"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <div className="text-sm text-gray-700 font-medium">
        <span>{generationProgress.message}</span>
      </div>
      <div className="w-9/10 bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${generationProgress.progress}%`,
            backgroundColor:
              generationProgress.progress === 100 ? "#58a3a1" : "#1277bc",
          }}
        />
      </div>
    </div>
  );
};

export default GenerationProgressToast;
