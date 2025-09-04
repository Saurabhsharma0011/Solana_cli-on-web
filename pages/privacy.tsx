import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/layout/Footer";
import { Terminal, Activity, FileText, Bot, Github, Twitter, Menu, X } from 'lucide-react';
import WalletSelector from '../components/ui/WalletSelector';

const PrivacyPolicy = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Privacy Policy | NEX4</title>
        <meta name="description" content="Privacy Policy for NEX4 platform and services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/IMG_8326.PNG" />
      </Head>

      {/* Navigation */}
      <nav
        className={`relative w-full z-[70] transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with link to homepage */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src="/IMG_8326.PNG" alt="NEX4DEV Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-primary">NEX4DEV</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/terminal"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <Terminal className="w-4 h-4" />
                <span>Terminal</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/tracker"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <Activity className="w-4 h-4" />
                <span>Tracker</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="#documentation"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <FileText className="w-4 h-4" />
                <span>Documentation</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/#bot"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <Bot className="w-4 h-4" />
                <span>NEX4 BOT</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Connect Wallet Button */}
            <div className="hidden md:flex items-center space-x-4">
              <WalletSelector />
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-foreground">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm pt-4 pb-6 px-6 absolute top-16 left-0 right-0 border-b border-border z-50">
            <div className="flex flex-col space-y-4">
              <Link href="/terminal" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <Terminal size={18} />
                <span>Terminal</span>
              </Link>
              <Link href="/tracker" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <Activity size={18} />
                <span>Tracker</span>
              </Link>
              <a href="#documentation" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <FileText size={18} />
                <span>Documentation</span>
              </a>
              <a href="/#bot" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <Bot size={18} />
                <span>NEX4 BOT</span>
              </a>
              
              <div className="mt-2">
                <WalletSelector />
              </div>
              
              <div className="pt-2 flex items-center space-x-4 border-t border-border">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-foreground">Terms and Conditions – NEX4</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to NEX4. By accessing or using our website, platform, or services, you agree to comply with and be bound by these Terms and Conditions, which, together with our Privacy Policy, govern the relationship between NEX4 ("Company", "we", "us", or "our") and you ("user", "your").
            </p>
            <p className="text-muted-foreground mb-4">
              If you do not agree with any part of these Terms, please discontinue the use of our website and services immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">1. Use of the Website</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>The content of this website is provided for general information and use only.</li>
              <li>Content may be updated or modified at any time without prior notice.</li>
              <li>You agree to use the website and services only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the platform.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">2. Accuracy and Liability</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>NEX4 and its partners make no warranties or guarantees as to the accuracy, timeliness, performance, completeness, or suitability of any information or materials provided on this website.</li>
              <li>You acknowledge that such information may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
              <li>Your use of any information or materials is entirely at your own risk, and we shall not be liable for any consequences of such use.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">3. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All material on this website, including but not limited to design, layout, code, graphics, and appearance, is owned by or licensed to NEX4.</li>
              <li>Unauthorized reproduction, distribution, or modification is prohibited.</li>
              <li>Trademarks not owned by NEX4 but appearing on this website are acknowledged.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">4. Unauthorized Use</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Unauthorized use of this website may give rise to a claim for damages and/or may constitute a criminal offense.</li>
              <li>You may not create a link to this website from another platform without prior written consent from NEX4.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">5. Third-Party Links</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>This website may include links to other websites for your convenience.</li>
              <li>These links do not signify endorsement, and NEX4 bears no responsibility for the content, policies, or practices of external sites.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">6. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Payments made via credit card, digital wallets, or gateways will be processed only after authorization from the payment providers.</li>
              <li>All payments are final and strictly non-refundable.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">7. Educational Purpose Disclaimer</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>The NEX4 platform is intended solely for educational and skill-development purposes.</li>
              <li>We do not guarantee any income, job placement, or business success resulting from the use of our platform.</li>
              <li>All resources are provided for personal learning and growth only.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">8. No Income Assurance</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>NEX4 makes no assurances or representations regarding financial outcomes, earnings, or business growth.</li>
              <li>Any claims of success are dependent solely on individual effort and external factors outside our control.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">9. User Responsibility</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You are entirely responsible for how you apply the knowledge, tools, or skills learned on NEX4.</li>
              <li>NEX4 and its affiliates shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your usage of the platform.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">10. Governing Law</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>These Terms are governed by and construed in accordance with the laws of India.</li>
              <li>Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of India.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">11. Changes to Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>NEX4 reserves the right to update or modify these Terms at any time.</li>
              <li>Continued use of the website after changes indicates acceptance of the revised Terms.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">12. Contact Us</h2>
            <p className="text-muted-foreground mb-2">For any questions or concerns regarding these Terms and Conditions:</p>
            <div className="text-muted-foreground">
              <p>📧 Email: <a href="mailto:support@nex4.io" className="text-[#2FFFD1] hover:underline">support@nex4.io</a></p>
              <p>🌐 Website: <a href="https://nex4.io" target="_blank" rel="noopener noreferrer" className="text-[#2FFFD1] hover:underline">https://nex4.io</a></p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-[#1E293B]">
            <p className="text-sm text-muted-foreground">Last updated: September 3, 2025</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;