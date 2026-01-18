'use client';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { hightlightsSlides } from "../../constants";

const VideoCarousel = () => {
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

    const [videoId, setVideoId] = useState(0);

    useGSAP(() => {
        // Reset all indicators
        gsap.to(videoDivRef.current, {
            width: "12px",
            duration: 0.5,
            backgroundColor: "#afafaf"
        });
        gsap.to(videoSpanRef.current, {
            backgroundColor: "transparent",
            width: "0%",
            duration: 0.5
        });

        // Activate current indicator
        if (videoDivRef.current[videoId]) {
            gsap.to(videoDivRef.current[videoId], {
                width: window.innerWidth < 760 ? "10vw" : "4vw",
                backgroundColor: "white",
                duration: 0.5
            });

            // Animate progress bar filling up
            gsap.fromTo(videoSpanRef.current[videoId],
                { width: "0%", backgroundColor: "white" },
                {
                    width: "100%",
                    duration: 3, // Match the auto-rotation speed
                    ease: "none",
                    onComplete: () => {
                        setVideoId((prev) => (prev + 1) % hightlightsSlides.length);
                    }
                }
            );
        }
    }, [videoId]);

    return (
        <div className="w-full h-full py-10">
            {/* Main Carousel Container */}
            <div className="relative w-full max-w-6xl mx-auto h-[60vh] md:h-[75vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                {hightlightsSlides.map((list, i) => {
                    const isActive = i === videoId;
                    return (
                        <div
                            key={list.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            {/* Image with Ken Burns Scale Effect */}
                            <div className="relative w-full h-full overflow-hidden bg-black">
                                <Image
                                    src={list.image}
                                    alt={list.textLists[0]}
                                    fill
                                    priority={i === 0}
                                    className={`object-cover object-center transition-transform duration-[4000ms] ease-out ${isActive ? "scale-110" : "scale-100"
                                        }`}
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                />
                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                            </div>

                            {/* Text Content */}
                            <div className="absolute bottom-16 left-8 md:left-16 max-w-xl z-20">
                                {list.textLists.map((text, idx) => (
                                    <p
                                        key={idx}
                                        className={`text-2xl md:text-5xl font-bold text-white leading-tight tracking-wide font-display drop-shadow-lg transform transition-all duration-700 delay-[${idx * 100}ms] ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                            }`}
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Custom Indicators */}
            <div className="relative flex justify-center mt-10">
                <div className="flex items-center gap-3 py-4 px-6 bg-black/20 backdrop-blur-xl rounded-full border border-white/10 shadow-lg">
                    {hightlightsSlides.map((_, i) => (
                        <div
                            key={i}
                            className="relative h-2 rounded-full cursor-pointer bg-white/20 overflow-hidden transition-all duration-300"
                            ref={(el) => { videoDivRef.current[i] = el; }}
                            onClick={() => setVideoId(i)}
                            style={{ width: "12px" }} // Initial width, controlled by GSAP
                        >
                            <span
                                className="absolute top-0 left-0 h-full w-full bg-white block"
                                ref={(el) => { videoSpanRef.current[i] = el; }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoCarousel;
