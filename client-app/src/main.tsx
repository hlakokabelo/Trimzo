import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAppName } from "./util/getAppName.ts";
import RedirectPage from "./components/RedirectPage.tsx";
import LinkNotFound from "./components/LinkNotFound.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <title>{getAppName()}</title>

    <BrowserRouter>
      <Routes>
        {/* With header */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        
        {/* Redirect */}
        <Route path="/:shortUrl" element={<RedirectPage />} />
        {/* 404 */}
        <Route path="*" element={<LinkNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
