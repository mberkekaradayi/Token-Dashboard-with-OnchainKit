"use client";

import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { FundCard } from "@coinbase/onchainkit/fund";

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="h-screen flex flex-col relative">
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity"
        style={{
          background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 76, 119, 0.15), transparent 80%)`,
        }}
      />
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
