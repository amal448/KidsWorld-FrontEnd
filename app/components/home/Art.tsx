'use client';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featureLists, goodLists } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

const Art = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const start = isMobile ? 'top 20%' : 'top top';

        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start,
                end: '+=200%',
                scrub: 1.5,
                pin: true,
                pinSpacing: true
            }
        });

        maskTimeline
            .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut', })
            .to('.masked-img', {
                scale: isMobile ? 1.15 : 1.3,
                maskPosition: 'center',
                webkitMaskPosition: 'center',
                maskSize: '400%',
                webkitMaskSize: '400%',
                duration: 1,
                ease: 'power1.inOut'
            })
            .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
    });

    return (
        <section id="art" className="min-h-screen relative overflow-hidden bg-white text-slate-900 mb-0 z-10">
            <div className="w-full max-w-7xl mx-auto h-full pt-20 pb-32 flex flex-col items-center justify-center relative z-10 px-4 md:px-10">
                <h2 className="will-fade text-4xl md:text-6xl font-black mb-12 text-center text-secondary">Love begins at home—and so does play.</h2>

                <div className="content w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 h-[60vh]">
                    {/* Left List */}
                    {/* Left List */}
                    <div className="space-y-6 will-fade flex-1 w-full md:max-w-xs pl-4 md:pl-0 z-20">
                        {goodLists.map((feature, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                            >
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                </div>
                                <p className="text-lg font-bold text-slate-700 font-display group-hover:text-slate-900 transition-colors">{feature}</p>
                            </div>
                        ))}
                    </div>

                    {/* Centered Image Area */}
                    <div className="cocktail-img relative w-full md:w-[45%] h-full flex items-center justify-center py-10 md:py-0 z-10">
                        {/* 
                            NOTE: For the effect to work as requested:
                            - The 'src' should be the "Parents playing with children" image (Inside content).
                            - The 'mask-image' (in CSS) should be the "Parent uplifting child" shape (Outside shape).
                         */}
                        <img
                            src="/images/parents-playing.jpg" // Placeholder for inside image
                            alt="Parents playing with children"
                            className="abs-center masked-img w-full h-full object-cover shadow-2xl drop-shadow-2xl rounded-3xl"
                        />
                    </div>

                    {/* Right List */}
                    <div className="space-y-6 will-fade flex-1 w-full md:max-w-xs pr-4 md:pr-0 z-20">
                        {featureLists.map((feature, index) => (
                            <div
                                key={index}
                                className="group flex flex-row-reverse items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default text-right"
                            >
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </div>
                                <p className="text-lg font-bold text-slate-700 font-display group-hover:text-slate-900 transition-colors">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Revealed Content */}
                <div className="masked-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none">
                    {/* This h2 is part of the initial fade out group in the user's code, but logically might belong to the reveal? 
                        User's code puts it in 'will-fade' so it fades OUT. 
                        Keeping it consistent. */}

                    <div id="masked-content" className="opacity-0 mt-32 md:mt-0">
                        <h3 className="text-3xl md:text-5xl font-black text-primary mb-4">Pure Joy, Unwrapped</h3>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
                            It’s not just a toy. It’s a memory in the making.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Art;
