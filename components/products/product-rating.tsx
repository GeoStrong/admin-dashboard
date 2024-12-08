"use client";

import { Rating } from "react-simple-star-rating";

const ProductRating: React.FC = () => {
  const ratingStars = (Math.random() * 4 + 1).toFixed(1);
  const ratingValue = Math.floor(Math.random() * 100 + 1);

  return (
    <div className="flex items-center gap-1">
      <Rating
        size={15}
        initialValue={+ratingStars}
        allowFraction
        readonly
        SVGclassName="inline"
      />
      <p
        suppressHydrationWarning
        className="mt-[2px] text-sm text-gray-500 dark:text-white"
      >
        ({ratingValue})
      </p>
    </div>
  );
};
export default ProductRating;
