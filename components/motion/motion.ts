import { motion, type MotionProps } from "framer-motion";

// Define types for different HTML elements with motion props
type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;
type MotionSpanProps = MotionProps & React.HTMLAttributes<HTMLSpanElement>;
type MotionUListProps = MotionProps & React.HTMLAttributes<HTMLUListElement>;
type MotionLIProps = MotionProps & React.HTMLAttributes<HTMLLIElement>;

// Export typed motion components
export const MotionDiv = motion.div as React.FC<MotionDivProps>;
export const MotionSpan = motion.span as React.FC<MotionSpanProps>;
export const MotionUL = motion.ul as React.FC<MotionUListProps>;
export const MotionLI = motion.li as React.FC<MotionLIProps>;
