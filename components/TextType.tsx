"use client";

import { useState, useEffect } from 'react';

interface TextTypeProps {
    text?: string[]; // Fallback/Legacy prop
    texts: string[]; // Main texts to cycle
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    showCursor?: boolean;
    cursorCharacter?: string;
    variableSpeedEnabled?: boolean;
    variableSpeedMin?: number;
    variableSpeedMax?: number;
    cursorBlinkDuration?: number;
    className?: string;
}

const TextType: React.FC<TextTypeProps> = ({
    text = [],
    texts,
    typingSpeed = 75,
    deletingSpeed = 50,
    pauseDuration = 1500,
    showCursor = true,
    cursorCharacter = "|",
    variableSpeedEnabled = false,
    variableSpeedMin = 50,
    variableSpeedMax = 100,
    cursorBlinkDuration = 0.5,
    className = "",
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

    // Use 'texts' if available, otherwise fallback to 'text', otherwise empty
    const textArray = texts && texts.length > 0 ? texts : text;

    useEffect(() => {
        if (!textArray.length) return;

        let timer: NodeJS.Timeout;

        const handleTyping = () => {
            const i = loopNum % textArray.length;
            const fullText = textArray[i];

            setDisplayedText(
                isDeleting
                    ? fullText.substring(0, displayedText.length - 1)
                    : fullText.substring(0, displayedText.length + 1)
            );

            // Variable speed calculation
            let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
            if (variableSpeedEnabled && !isDeleting) {
                currentSpeed = Math.floor(Math.random() * (variableSpeedMax - variableSpeedMin + 1)) + variableSpeedMin;
            }

            setTypingSpeedState(currentSpeed);

            if (!isDeleting && displayedText === fullText) {
                // Finished typing full word
                timer = setTimeout(() => setIsDeleting(true), pauseDuration);
            } else if (isDeleting && displayedText === "") {
                // Finished deleting
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                timer = setTimeout(handleTyping, 500); // Small pause before next word
            } else {
                // Continue typing/deleting
                timer = setTimeout(handleTyping, currentSpeed);
            }
        };

        timer = setTimeout(handleTyping, typingSpeedState);

        return () => clearTimeout(timer);
    }, [
        displayedText,
        isDeleting,
        loopNum,
        textArray,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        variableSpeedEnabled,
        variableSpeedMin,
        variableSpeedMax,
        typingSpeedState // Included to prevent stale closures, though handled by logic
    ]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && (
                <span
                    className="ml-1 animate-blink"
                    style={{ animationDuration: `${cursorBlinkDuration}s` }}
                >
                    {cursorCharacter}
                </span>
            )}
            <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation-name: blink;
          animation-iteration-count: infinite;
        }
      `}</style>
        </span>
    );
};

export default TextType;
