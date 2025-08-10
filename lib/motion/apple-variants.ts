import { Variants, Transition } from "framer-motion";

// Apple-level spring configurations
export const appleSpring: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  mass: 0.8,
};

export const appleSpringFast: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
  mass: 0.5,
};

export const appleSpringBouncy: Transition = {
  type: "spring",
  damping: 15,
  stiffness: 200,
  mass: 0.6,
};

// Common Apple-style animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: appleSpring,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: appleSpring,
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: appleSpring,
  },
};

export const slideInFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: appleSpring,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: appleSpringBouncy,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ...appleSpring,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Interactive hover variants
export const hoverLift: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: appleSpringFast,
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 500,
    },
  },
};

export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: appleSpringFast,
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 500,
    },
  },
};

// Card animations
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      ...appleSpring,
      rotateX: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: -2,
    transition: appleSpringFast,
  },
};

// Navigation animations
export const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: appleSpring,
  },
  hover: {
    x: 4,
    transition: appleSpringFast,
  },
};

// Modal/Dialog animations
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      mass: 0.7,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 400,
      mass: 0.5,
    },
  },
};

// Loading animations
export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// List item animations
export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      ...appleSpring,
      delay: index * 0.1,
    },
  }),
  hover: {
    x: 8,
    scale: 1.02,
    transition: appleSpringFast,
  },
};
