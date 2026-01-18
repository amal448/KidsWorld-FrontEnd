import Hero from "../components/home/Hero";
import Art from "../components/home/Art";
import Collection from "../components/home/Collection";
import VideoCarousel from "../components/home/VideoCarousel";

export default function Home() {
    return (
        <main className="bg-black overflow-x-hidden">
            <Hero />

            {/* Highlights / Video Carousel Section */}
            <section id="highlights" className="w-full overflow-hidden h-full bg-zinc-900 py-32">
                <div className="container mx-auto px-5 md:px-10">
                    <div className="mb-12 w-full md:flex items-end justify-between">
                        <h1 id="title" className="section-heading text-white">Get the Highlights.</h1>
                        <div className="flex flex-wrap items-end gap-5">
                            <p className="link">Watch the film
                                <img src="/images/watch.svg" alt="watch" className="ml-2" />
                            </p>
                        </div>
                    </div>
                    <VideoCarousel />
                </div>
            </section>

            <Collection />
            <Art />
        </main>
    );
}