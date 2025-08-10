import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  enableMotion?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      enableMotion = true,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Apple-level motion variants
    const motionVariants = {
      initial: { scale: 1 },
      hover: {
        scale: 1.02,
        y: -1,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        },
      },
      tap: {
        scale: 0.98,
        y: 0,
        transition: {
          type: "spring",
          damping: 30,
          stiffness: 500,
          mass: 0.3,
        },
      },
    };

    if (enableMotion && !asChild) {
      // Create clean props for motion.button to avoid type conflicts
      const {
        onAnimationStart,
        onAnimationEnd,
        onTransitionEnd,
        onDrag,
        onDragStart,
        onDragEnd,
        ...cleanProps
      } = props;

      return (
        <motion.button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          variants={motionVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          {...(cleanProps as any)}
        />
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
