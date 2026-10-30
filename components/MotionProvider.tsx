'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/** Framer animations follow the visitor's "Reduce Motion" setting (iOS: Settings › Accessibility › Motion). */
export default function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
