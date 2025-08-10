"use client";

import Image from "next/image";
import profitIcon from "@/public/profit.svg";
import lossIcon from "@/public/loss.svg";
import useScreenSize from "@/lib/hooks/useScreenSize";
import React from "react";
import { MotionDiv } from "../motion/motion";
import { TotalContainer } from "@/lib/types/types";
import { motion } from "framer-motion";

const TotalWrapper: React.FC<{ totalInfo: TotalContainer }> = ({
  totalInfo,
}) => {
  const isProfit = totalInfo.status === "Up";
  const { width } = useScreenSize();

  // Apple-level spring animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 0.9,
        staggerChildren: 0.1,
      },
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 500,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.2,
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
        delay: 0.1,
      },
    },
  };

  const statusVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        delay: 0.3,
      },
    },
  };

  return (
    <MotionDiv
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="w-full cursor-pointer rounded-2xl bg-white p-4 dark:border-2 dark:border-gray-600 dark:bg-dark-50"
    >
      <motion.div
        className={`flex items-start justify-between gap-10 ${width <= 300 ? "flex-col-reverse items-center" : "flex-row"}`}
      >
        <div className="flex flex-col gap-6">
          <motion.h3
            variants={textVariants}
            className="text-base font-semibold text-grey-50 dark:text-white"
          >
            Total {totalInfo.name}
          </motion.h3>
          <motion.p variants={numberVariants} className="text-3xl font-bold">
            {totalInfo.quantity}
          </motion.p>
        </div>
        <motion.div variants={iconVariants}>
          <Image src={totalInfo.icon} alt={totalInfo.name} />
        </motion.div>
      </motion.div>
      <motion.p
        variants={statusVariants}
        className={`mt-8 flex gap-3 ${width <= 300 ? "flex-col items-center" : "flex-row"}`}
      >
        <motion.span
          whileHover={{ scale: 1.1 }}
          className={`flex gap-2 text-base font-semibold ${isProfit ? "text-green-500" : "text-red-700"}`}
        >
          <motion.div
            animate={
              isProfit
                ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }
                : {
                    rotate: [0, -5, 5, 0],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image src={isProfit ? profitIcon : lossIcon} alt="status" />
          </motion.div>
          {totalInfo.percentage}
        </motion.span>
        {totalInfo.status} from {totalInfo.time}
      </motion.p>
    </MotionDiv>
  );
};
export default TotalWrapper;
