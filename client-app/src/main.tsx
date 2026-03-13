import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAppName } from "./util/getAppName.tsx";
import RedirectPage from "./components/RedirectPage.tsx";
import LinkNotFound from "./components/LinkNotFound.tsx";
import QRGenerator from "./pages/QRGenerator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <title>{getAppName()}</title>

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:shortUrl" element={<RedirectPage />} />
        <Route path="/404" element={<LinkNotFound />} />
        <Route path="/code" element={<QRGenerator shortUrl="http://localhost:3000/wr7uxk" />} />
        <Route path="/*" element={<LinkNotFound />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
