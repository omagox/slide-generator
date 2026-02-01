import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSlideGeneration } from "../contexts/SlideGenerationContext";

import type { AddSlideModalInfo, NormalizedSlide } from "../types/global";
import { normalizeSlidesFromApi, addQuestionSlide } from "../lib/utils";

import { MdFullscreen, MdOutlineLibraryAdd } from "react-icons/md";
import JsxParser from "react-jsx-parser";

import componentsMap from "../templates/templatesMap";
import AddSlideModal from "../components/AddSlideModal";

const PresentationPage = () => {
  const navigate = useNavigate();

  const { slides } = useSlideGeneration();

  const [totalHeight, setTotalHeight] = useState<number | null>(null);
  const [slideDivWidth, setSlideDivWidth] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [addSlideModalInfo, setAddSlideModalInfo] =
    useState<AddSlideModalInfo | null>(null);
  const fullscreenDivRef = useRef(null);

  const [presentationSlides, setPresentationSlides] = useState<
    NormalizedSlide[]
  >(() => (slides?.length ? normalizeSlidesFromApi(slides) : []));

  useEffect(() => {
    if (slides?.length) {
      setPresentationSlides(normalizeSlidesFromApi(slides));
    }
  }, [slides]);

  useEffect(() => {
    if (!slides?.length) {
      navigate("/", { replace: true });
    }
  }, [slides, navigate]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        window.addEventListener("keydown", handleKeyDown);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
        setCurrentSlide(0);
      }
    };

    const handleResize = () => {
      const mainHeader = document.querySelector(
        "#mainHeader-Navbar",
      ) as HTMLElement | null;
      const mainHeaderHeight = mainHeader?.offsetHeight ?? 0;
      const totalHeight = window.innerHeight - mainHeaderHeight;
      setTotalHeight(totalHeight);
      setSlideDivWidth(window.innerWidth);
    };

    handleResize();

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!document.fullscreenElement) return;

    const numberOfSlides = presentationSlides.length;

    if (event.key === "ArrowLeft") {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "ArrowRight") {
      setCurrentSlide((prev) => {
        if (prev === numberOfSlides - 1) {
          document.exitFullscreen?.call(document);
          window.removeEventListener("keydown", handleKeyDown);
          return 0;
        }
        return prev + 1;
      });
    }
  };

  const handleToggleFullscreen = () => {
    const elem: any = fullscreenDivRef.current;

    if (!document.fullscreenElement) {
      setCurrentSlide(0);
      (
        elem.requestFullscreen ||
        elem.webkitRequestFullscreen ||
        elem.mozRequestFullScreen ||
        elem.msRequestFullscreen
      )?.call(elem);
    } else {
      document.exitFullscreen?.call(document);
    }
  };

  function getComponentString(
    data: Record<string, any>,
    id: number,
    preview: boolean = false,
  ): string {
    const props = Object.entries(data).map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value.replaceAll('"', "'")}"`;
      } else {
        return `${key}={${JSON.stringify(value)}}`;
      }
    });

    const propsStr = props.join(" ");
    const componentId = id < 10 ? `0${id}` : id;

    if (preview)
      return `<Template${componentId} preview={${preview}} ${propsStr}/>`;
    else return `<Template${componentId} ${propsStr}/>`;
  }

  return (
    <div
      className="w-full flex justify-between relative overflow-x-hidden"
      style={totalHeight ? { height: totalHeight + "px" } : {}}
    >
      <div className="absolute top-2 right-6 z-[9999] flex !gap-2">
        <button
          className="button-transparent-opacity-red-border cursor-pointer !p-1.5 !h-fit"
          onClick={handleToggleFullscreen}
        >
          <MdFullscreen className="!w-6 !h-6" />
        </button>
      </div>
      <div
        className="flex flex-col items-start relative"
        style={{
          minWidth: slideDivWidth + "px",
          maxHeight: totalHeight + "px",
          overflowY: presentationSlides.length >= 2 ? "scroll" : "hidden",
        }}
      >
        <div className="w-full flex flex-col items-center">
          {presentationSlides.map((slide) => {
            // Disponível para o slide considerando padding
            const availW = (slideDivWidth ?? window.innerWidth) - 32;
            const availH = (totalHeight ?? window.innerHeight) - 32;

            // Escala proporcional para caber na tela
            const scale = Math.min(availW / 920, availH / 518);

            return (
              <React.Fragment key={slide.id}>
                <div
                  className="flex justify-center items-center"
                  style={{ height: totalHeight ?? window.innerHeight }}
                >
                  {/* Container Full HD */}
                  <div
                    style={{
                      width: 920,
                      height: 518,
                      transform: `scale(${scale})`,
                      transformOrigin: "center",
                    }}
                  >
                    <JsxParser
                      components={componentsMap}
                      jsx={getComponentString(
                        slide.canvas.generationTemplate,
                        slide.canvas.templateID,
                      )}
                    />
                  </div>
                </div>
                {(slide.image != null || slide.question != null) && (
                  <div className="flex justify-center items-center">
                    <button
                      className="py-1.5 flex items-center justify-center rounded-md w-[70px] bg-[#dedfe2] hover:bg-[#caccd1] cursor-pointer transition-all"
                      title="Adicionar slide"
                      onClick={() => {
                        setAddSlideModalInfo({
                          image: slide.image ?? null,
                          question: slide.question ?? null,
                          insertAfterIndex: presentationSlides.findIndex(
                            (s) => s.id === slide.id,
                          ),
                        });
                        setShowAddSlideModal(true);
                      }}
                    >
                      <MdOutlineLibraryAdd className="w-5 h-5 text-[#727272]" />
                    </button>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {presentationSlides?.length > 0 && (
        <div
          ref={fullscreenDivRef}
          className="w-screen h-screen bg-black flex items-center justify-center"
          style={{ position: "absolute", top: -999999, left: -999999 }}
        >
          {(() => {
            const scale = Math.min(
              window.innerWidth / 920,
              window.innerHeight / 518,
            );

            return (
              <div
                style={{
                  width: 920,
                  height: 518,
                  transform: `scale(${scale})`,
                  transformOrigin: "center",
                  background: "white",
                }}
              >
                <JsxParser
                  components={componentsMap}
                  jsx={getComponentString(
                    presentationSlides[currentSlide].canvas.generationTemplate,
                    presentationSlides[currentSlide].canvas.templateID,
                  )}
                />
              </div>
            );
          })()}
        </div>
      )}
      <AddSlideModal
        isOpen={showAddSlideModal}
        onClose={() => {
          setShowAddSlideModal(false);
          setAddSlideModalInfo(null);
        }}
        handleAddQuestionSlide={() => {
          const question = addSlideModalInfo?.question;
          const insertAfter = addSlideModalInfo?.insertAfterIndex ?? null;
          if (question == null || insertAfter == null) return;

          setPresentationSlides(
            addQuestionSlide(presentationSlides, question, insertAfter),
          );
          setShowAddSlideModal(false);
          setAddSlideModalInfo(null);
        }}
        handleAddImageSlide={() => {}}
        slide={addSlideModalInfo}
      />
    </div>
  );
};

export default PresentationPage;
