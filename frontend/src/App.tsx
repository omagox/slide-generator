import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import PresentationPage from "./pages/presentation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/presentation" element={<PresentationPage />} />
    </Routes>
  );
}

export default App;
