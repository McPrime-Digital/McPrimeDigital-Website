'use client';

import { Player } from '@remotion/player';
import { MyComposition } from '../remotion/MyComposition';

export const VideoPlayer = () => {
    return (
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <Player
                component={MyComposition}
                durationInFrames={120}
                compositionWidth={1920}
                compositionHeight={1080}
                fps={30}
                style={{
                    width: '100%',
                }}
                controls
                autoPlay
                loop
            />
        </div>
    );
};
