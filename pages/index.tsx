import { Geist, Geist_Mono } from "next/font/google";
import Layout from "../components/layout/Layout";
import Hero from "../components/ui/Hero";
import Features from "../components/ui/Features";
import CTA from "../components/ui/CTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      <Layout title="Nex4" description="Browser-based platform for Solana developers and researchers with live terminal, network tracker, and interactive documentation.">
        <Hero />
        <Features />
        <CTA />
      </Layout>
    </div>
  );
}
