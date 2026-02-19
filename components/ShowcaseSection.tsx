import { VideoPlayer } from './VideoPlayer';

export default function ShowcaseSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Programmatic Video
                    </span>
                    {' '}in Action
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-light">
                    We don't just edit videos; we code them. Scalable, data-driven, and perfectly consistent every time.
                    <br />
                    <span className="text-sm opacity-60 mt-2 block">(This video is rendered in real-time using React code)</span>
                </p>

                <div className="flex justify-center">
                    <VideoPlayer />
                </div>
            </div>
        </section>
    );
}
