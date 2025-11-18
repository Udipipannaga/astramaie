import { Button } from "./ui/button";
import { Menu, X, Shield, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { AstrameLogo } from "./AstrameLogo";

interface HeaderProps {
  onContactClick?: () => void;
  onAdminClick?: () => void;
}

export function Header({ onContactClick, onAdminClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Product", href: "/product", isLink: true },
    { label: "Features", href: "/features", isLink: true },
    { label: "Case Studies", href: "/case-studies", isLink: true },
    { label: "Blog", href: "/blog", isLink: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isLink: boolean) => {
    e.preventDefault();
    
    if (isLink) {
      // Navigate to page
      if ((window as any).navigate) {
        (window as any).navigate(href);
      } else {
        window.location.href = href;
      }
    } else {
      // Scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if ((window as any).navigate) {
                (window as any).navigate('/');
              } else {
                window.location.href = '/';
              }
            }}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <AstrameLogo className="w-10 h-10" />
            <span className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Astramaie
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.isLink)}
                className="text-gray-300 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onAdminClick}
              className="hover:bg-white/10"
              title="Admin Dashboard"
            >
              <Shield className="w-4 h-4" />
            </Button>
            <Button
              onClick={onContactClick}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden py-4 border-t border-white/10"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.isLink)}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button
                onClick={onContactClick}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                onClick={onAdminClick}
                className="w-full border-white/10 hover:bg-white/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}