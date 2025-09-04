import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "../layout/header"
import Link from "next/link"
import Pattern from "./Pattern"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4
         w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0"
      style={{
        "--x": `${mousePosition.x * 100}%`,
        "--y": `${mousePosition.y * 100}%`,
      } as React.CSSProperties}
    >
      {/* Circuit Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Pattern />
      </div>

      {/* Add premium glow effect that follows mouse */}
      <div className="absolute inset-0 z-1 glow-container"></div>

      {/* Header positioned at top of hero container */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      <div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] mt-16 md:mt-[120px] lg:mt-[160px] px-4">
        <h1 className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
          Unleash the Power of Solana Development
        </h1>
        <p className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mx-auto">
          Accelerate your blockchain development workflow with Nex4&apos;s powerful suite of tools for Solana developers.
        </p>
      </div>

      <Link href="/terminal">
        <Button className="relative z-10 bg-[#2FFFD1] text-[#0B1120] hover:bg-[#20D6AE] px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
          Launch Terminal
        </Button>
      </Link>
    </section>
  )
}
