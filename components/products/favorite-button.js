"use client";

import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
    navigator.vibrate([200, 100, 200]);
    console.log(navigator.vibrate);
    await Haptics.vibrate([200, 100, 200]);
    await Haptics.vibrate(300);
  };

  return (
    <div
      className="cursor-pointer rounded-full bg-gray-100 p-4 dark:bg-dark-150"
      onClick={handleFavorite}
    >
      {isFavorite ? <AiFillHeart fill="red" /> : <AiOutlineHeart />}{" "}
    </div>
  );
};
export default FavoriteButton;
