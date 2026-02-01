import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import PresentationPage from "./pages/presentation";
import GenerationProgressToast from "./components/GenerationProgressToast";

function App() {
  return (
    <>
      <GenerationProgressToast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/presentation" element={<PresentationPage />} />
      </Routes>
    </>
  );
}

export default App;
