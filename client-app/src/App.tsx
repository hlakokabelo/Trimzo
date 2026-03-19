import * as React from "react";
import LinksPage from "./pages/LinksPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RedirectPage from "./components/RedirectPage.tsx";
import LinkNotFound from "./components/LinkNotFound.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IAppProps {}
const queryClient = new QueryClient();

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            {/* With header */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LinksPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Auth pages */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>

            
              <Route path="/api" element={<>
               window.location.href = "https://trimzo-api.onrender.com/"
              </>>} />

            {/* Redirect */}
            <Route path="/:shortUrl" element={<RedirectPage />} />
            {/* 404 */}
            <Route path="*" element={<LinkNotFound />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
