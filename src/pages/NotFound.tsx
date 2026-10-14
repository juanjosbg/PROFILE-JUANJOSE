import { Link } from "react-router-dom";
import type { Language } from "@/types/certificate";

const NotFound = ({ language }: { language: Language }) => {
  const text =
    language === "es"
      ? { title: "Página no encontrada", home: "Volver al inicio" }
      : { title: "Page not found", home: "Return to home" };

  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-muted"
    >
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{text.title}</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {text.home}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
