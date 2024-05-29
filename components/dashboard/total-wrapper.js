"use client";

import Image from "next/image";
import profitIcon from "@/public/profit.svg";
import lossIcon from "@/public/loss.svg";
import { motion } from "framer-motion";

const TotalWrapper = ({ totalInfo }) => {
  const isProfit = totalInfo.status === "Up";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-1/4 rounded-2xl bg-white p-4 dark:border-2 dark:border-gray-600 dark:bg-dark-50"
    >
      <div className="flex items-start justify-between gap-10">
        <div className="flex flex-col gap-6">
          <h3 className="text-base font-semibold text-grey-50 dark:text-white">
            Total {totalInfo.name}
          </h3>
          <p className="text-3xl font-bold">{totalInfo.quantity}</p>
        </div>
        <Image src={totalInfo.icon} alt={totalInfo.name} />
      </div>
      <p className="mt-8 flex gap-3">
        <span
          className={`flex gap-2 text-base font-semibold ${isProfit ? "text-green-500" : "text-red-700"}`}
        >
          <Image src={isProfit ? profitIcon : lossIcon} alt="status" />
          {totalInfo.percentage}
        </span>
        {totalInfo.status} from {totalInfo.time}
      </p>
    </motion.div>
  );
};
export default TotalWrapper;
