import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import { motion } from "motion/react";
import { AstrameLogo } from "./AstrameLogo";

export function Footer() {
  const footerLinks = {
    Product: [
      { label: "Features", href: "/features" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Documentation", href: "/documentation" },
    ],
    Resources: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "Community", href: "/community" },
      { label: "API", href: "/api" },
      { label: "Status", href: "/status" },
    ],
    Company: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "/contact" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Compliance", href: "/compliance" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
    { icon: Mail, href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          <div className="lg:col-span-2">
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
              className="flex items-center gap-2 mb-4 cursor-pointer w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <AstrameLogo className="w-10 h-10" />
              <span className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Astramaie
              </span>
            </motion.a>
            <p className="text-gray-400 mb-4">
              Empowering businesses with intelligent AI automation solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 5 }}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.href.startsWith('#')) {
                          // Scroll to section
                          const element = document.querySelector(link.href);
                          element?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          // Navigate to page
                          if ((window as any).navigate) {
                            (window as any).navigate(link.href);
                          } else {
                            window.location.href = link.href;
                          }
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Astramaie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}