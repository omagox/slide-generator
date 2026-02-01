import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { SlideGenerationProvider } from "./contexts/SlideGenerationContext.tsx";

import "./styles/index.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SlideGenerationProvider>
      <App />
    </SlideGenerationProvider>
  </BrowserRouter>,
);
