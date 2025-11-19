import { Header } from "./components/Header";
import { Hero3D } from "./components/Hero3D";
import { Services3D } from "./components/Services3D";
import { Model3DSection } from "./components/Model3DSection";
import { Features3D } from "./components/Features3D";
import { Stats3D } from "./components/Stats3D";
import { ClientWorkflows } from "./components/ClientWorkflows";
import { Careers } from "./components/Careers";
import { CTA3D } from "./components/CTA3D";
import { Footer } from "./components/Footer";
import { ParticleBackground } from "./components/ParticleBackground";
import { ContactModal } from "./components/ContactModal";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { EmployeeLoginModal } from "./components/EmployeeLoginModal";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { Toaster } from "./components/ui/sonner";
import { useState, useEffect } from "react";
import { HelpCenter } from "./pages/HelpCenter";
import { Community } from "./pages/Community";
import { ApiDocumentation } from "./pages/ApiDocumentation";
import { Status } from "./pages/Status";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Security } from "./pages/Security";
import { Compliance } from "./pages/Compliance";
import { Blog } from "./pages/Blog";
import { Product } from "./pages/Product";
import { Features } from "./pages/Features";
import { CaseStudies } from "./pages/CaseStudies";
import { Documentation } from "./pages/Documentation";
import { Contact } from "./pages/Contact";

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeLoginOpen, setEmployeeLoginOpen] = useState(false);
  const [employeeDashboardOpen, setEmployeeDashboardOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for URL changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Navigation function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Expose navigate globally for components
  (window as any).navigate = navigate;

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleLogin = (password: string) => {
    setIsAuthenticated(true);
    setAdminLoginOpen(false);
    setAdminDashboardOpen(true);
  };

  const handleDashboardClose = () => {
    setAdminDashboardOpen(false);
    // Keep authenticated for session
  };

  const handleEmployeeClick = () => {
    if (employeeData) {
      setEmployeeDashboardOpen(true);
    } else {
      setEmployeeLoginOpen(true);
    }
  };

  const handleEmployeeLogin = (data: any) => {
    setEmployeeData(data);
    setEmployeeLoginOpen(false);
    setEmployeeDashboardOpen(true);
  };

  const handleEmployeeDashboardClose = () => {
    setEmployeeDashboardOpen(false);
    // Keep employee data for session
  };

  // Route to component mapping
  const renderPage = () => {
    switch (currentPath) {
      case '/help':
        return <HelpCenter />;
      case '/community':
        return <Community />;
      case '/api':
        return <ApiDocumentation />;
      case '/status':
        return <Status />;
      case '/privacy':
        return <Privacy />;
      case '/terms':
        return <Terms />;
      case '/security':
        return <Security />;
      case '/compliance':
        return <Compliance />;
      case '/blog':
        return <Blog />;
      case '/product':
        return <Product />;
      case '/features':
        return <Features />;
      case '/case-studies':
        return <CaseStudies />;
      case '/documentation':
        return <Documentation />;
      case '/contact':
        return <Contact />;
      case '/':
      default:
        return (
          <main className="relative">
            <Hero3D />
            <Services3D />
            <ClientWorkflows />
            <Model3DSection />
            <Features3D />
            <Stats3D />
            <Careers />
            <CTA3D />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Employee Dashboard - Full Screen Overlay */}
      {employeeDashboardOpen && employeeData ? (
        <EmployeeDashboard
          employee={employeeData}
          onLogout={() => {
            setEmployeeData(null);
            setEmployeeDashboardOpen(false);
          }}
          onBack={() => setEmployeeDashboardOpen(false)}
        />
      ) : (
        <>
          <ParticleBackground />
          <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
          <Header
            onContactClick={() => {
              if ((window as any).navigate) {
                (window as any).navigate('/contact');
              } else {
                setContactModalOpen(true);
              }
            }}
            onAdminClick={handleAdminClick}
            onEmployeeLoginClick={handleEmployeeClick}
          />
          {renderPage()}
          <Footer />
          
          {/* Contact Modal */}
          <ContactModal
            isOpen={contactModalOpen}
            onClose={() => setContactModalOpen(false)}
          />
          
          {/* Admin Login */}
          {adminLoginOpen && (
            <AdminLogin
              onLogin={handleLogin}
              onClose={() => setAdminLoginOpen(false)}
            />
          )}
          
          {/* Admin Dashboard */}
          <AdminDashboard
            isOpen={adminDashboardOpen}
            onClose={handleDashboardClose}
          />
          
          {/* Employee Login */}
          <EmployeeLoginModal
            isOpen={employeeLoginOpen}
            onClose={() => setEmployeeLoginOpen(false)}
            onLoginSuccess={handleEmployeeLogin}
          />
        </>
      )}
      
      {/* Toast Notifications */}
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}