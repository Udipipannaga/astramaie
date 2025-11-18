import { useState } from "react";
import App from "./App";
import { HelpCenter } from "./pages/HelpCenter";
import { Community } from "./pages/Community";
import { ApiDocumentation } from "./pages/ApiDocumentation";
import { Status } from "./pages/Status";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Security } from "./pages/Security";
import { Compliance } from "./pages/Compliance";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ParticleBackground } from "./components/ParticleBackground";
import { Toaster } from "./components/ui/sonner";

// Simple client-side router
export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Update path when navigating
  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Expose navigate globally for footer links
  (window as any).navigate = navigate;

  // Handle browser back/forward buttons
  window.onpopstate = () => {
    setCurrentPath(window.location.pathname);
  };

  // Route to component mapping
  const routes: { [key: string]: JSX.Element } = {
    "/": <App />,
    "/help": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <HelpCenter />
        <Footer />
      </>
    ),
    "/community": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <Community />
        <Footer />
      </>
    ),
    "/api": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <ApiDocumentation />
        <Footer />
      </>
    ),
    "/status": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <Status />
        <Footer />
      </>
    ),
    "/privacy": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <Privacy />
        <Footer />
      </>
    ),
    "/terms": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <Terms />
        <Footer />
      </>
    ),
    "/security": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <Security />
        <Footer />
      </>
    ),
    "/compliance": (
      <>
        <Header onContactClick={() => navigate("/#contact")} onAdminClick={() => navigate("/#admin")} />
        <Compliance />
        <Footer />
      </>
    ),
  };

  // Get current page component
  const currentPage = routes[currentPath] || routes["/"];

  // Return null if main app (it has its own layout)
  if (currentPath === "/") {
    return <App />;
  }

  // Return page with layout
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
      <div className="relative z-10">
        {currentPage}
      </div>
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
