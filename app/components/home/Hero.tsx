'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Custom helper to split text into chars (replaces SplitText plugin)
  const splitTextToChars = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block opacity-0 translate-y-full char">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useGSAP(
    () => {
      // 1. Initial Entry Animation
      const tl = gsap.timeline();

      // Animate chars up
      tl.to(".char", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.05,
      });

      // Animate subtitle lines (simple fade up for now as manual splitting is complex)
      tl.from(".subtitle", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: -1, // Overlap with title
      });

      // 2. Scroll Parallax Animation
      gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
        .to(".floating-shape-1", { y: -150, rotation: 45 }, 0)
        .to(".floating-shape-2", { y: -250, rotation: -45 }, 0)
        .to(".hero-content", { y: 100 }, 0); // Parallax text down slower

    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-secondary overflow-hidden"
    >
      {/* Decorative Floating Elements (Replacing Leaves) */}
      <div className="floating-shape-1 absolute top-10 left-10 md:top-20 md:left-20 w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full blur-xl" />
      <div className="floating-shape-2 absolute bottom-20 right-10 md:bottom-40 md:right-40 w-20 h-20 md:w-32 md:h-32 bg-primary/20 rounded-full blur-xl" />

      {/* Vector/Emoji Placeholders for Kids Theme */}
      <div className="floating-shape-1 absolute top-1/4 left-5 md:left-32 text-4xl md:text-6xl opacity-80 pointer-events-none">
        🎈
      </div>
      <div className="floating-shape-2 absolute bottom-1/3 right-5 md:right-32 text-4xl md:text-6xl opacity-80 pointer-events-none">
        🧸
      </div>

      <div className="hero-content text-center z-10 px-4 max-w-4xl mx-auto">
        <h1 ref={titleRef} className="title text-6xl md:text-8xl font-black text-white drop-shadow-sm tracking-wide mb-6">
          {splitTextToChars("KIDSWORLD")}
        </h1>

        <div className="space-y-6">
          <p className="subtitle text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto">
            Where imagination takes flight and every toy has a story.
          </p>

          <div className="subtitle pt-4">
            <button className="btn-primary bg-white text-secondary hover:bg-slate-50 border-2 border-transparent hover:border-white transition-all transform hover:scale-105 shadow-xl">
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;