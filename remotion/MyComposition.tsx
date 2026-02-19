import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const MyComposition = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        fps,
        frame,
        config: {
            damping: 200,
        },
    });

    const opacity = spring({
        fps,
        frame: frame - 10,
        config: {
            damping: 200,
        },
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 100,
                backgroundColor: '#0a0a0a', // Dark Navy background or similar
                color: '#6366f1', // Indigo-500 matching the theme
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
            }}
        >
            <div style={{ transform: `scale(${scale})` }}>
                McPrime Digital
            </div>
            <div
                style={{
                    fontSize: 40,
                    color: 'white',
                    marginTop: 20,
                    opacity: opacity,
                    transform: `translateY(${50 * (1 - opacity)}px)`
                }}
            >
                Programmatic Video
            </div>
        </AbsoluteFill>
    );
};
