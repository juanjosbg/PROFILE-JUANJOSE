import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { MotionConfig } from "framer-motion";
import RouteMetadata from "./components/RouteMetadata";
import type { Language } from "./types/certificate";
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("portfolio-language") === "en" ? "en" : "es";
    } catch {
      return "es";
    }
  });
  const changeLanguage = (value: Language) => {
    setLanguage(value);
    try {
      localStorage.setItem("portfolio-language", value);
    } catch {
      /* Optional persistence. */
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Sonner />
      <BrowserRouter>
        <RouteMetadata language={language} />
        <MotionConfig reducedMotion="user">
          <Suspense
            fallback={
              <p role="status" className="p-12 text-center">
                {language === "es" ? "Cargando…" : "Loading…"}
              </p>
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Index
                    language={language}
                    onLanguageChange={changeLanguage}
                  />
                }
              />
              <Route
                path="/certifications"
                element={
                  <CertificationsPage
                    language={language}
                    onLanguageChange={changeLanguage}
                  />
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminPage
                    language={language}
                    onLanguageChange={changeLanguage}
                  />
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound language={language} />} />
            </Routes>
          </Suspense>
        </MotionConfig>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
