import React from "react";
import { Button } from "@/components/general/UI/button";
import { Badge } from "@/components/general/UI/badge";
import CustomAvatar from "@/components/general/UI/custom-avatar";
import { UserProfile } from "@/lib/types/types";
import { formatDate } from "@/lib/functions/functions";
import { MotionDiv } from "@/components/motion/motion";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onEditClick,
}) => {
  // Apple-level spring configurations
  const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        mass: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        type: "spring",
        damping: 20,
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

  return (
    <MotionDiv
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <motion.div
          variants={avatarVariants}
          whileHover="hover"
          className="relative"
        >
          <CustomAvatar
            imageSrc={profile.avatar}
            alt={`${profile.firstName} ${profile.lastName}`}
            size="h-24 w-24 md:h-32 md:w-32"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              delay: 0.6,
            }}
            className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-3 w-3 rounded-full bg-white"
            ></motion.div>
          </motion.div>
        </motion.div>

        <div className="flex-1">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <motion.div variants={itemVariants}>
              <motion.h1
                variants={itemVariants}
                className="mb-2 text-3xl font-bold"
              >
                {profile.firstName} {profile.lastName}
              </motion.h1>
              <motion.div
                variants={itemVariants}
                className="mb-3 flex flex-wrap items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="secondary"
                    className="border-white/30 bg-white/20 text-white"
                  >
                    {profile.role}
                  </Badge>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="secondary"
                    className="border-white/30 bg-white/20 text-white"
                  >
                    {profile.department}
                  </Badge>
                </motion.div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-y-1 text-white/90"
              >
                <motion.p
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <span>📍</span>
                  {profile.location}
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <span>📅</span>
                  Joined {formatDate(profile.joinDate)}
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <span>🌐</span>
                  {profile.timezone}
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  onClick={onEditClick}
                >
                  Edit Profile
                </Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Share Profile
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};
