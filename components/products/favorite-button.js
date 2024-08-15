"use client";

import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const FavoriteButton = ({ productId, className }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={`cursor-pointer rounded-full bg-gray-100 p-4 dark:bg-dark-150 ${className}`}
      onClick={handleFavorite}
    >
      {isFavorite ? <AiFillHeart fill="red" /> : <AiOutlineHeart />}{" "}
    </div>
  );
};
export default FavoriteButton;
