"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/general/UI/carousel";
import Image from "next/image";
import { useState } from "react";

const ProductsCarousel = ({ products }) => {
  const [activeProductId, setActiveProductId] = useState(0);
  const activeProduct = products[activeProductId];

  const onProductSlideChange = (index) => {
    setActiveProductId(index);
  };

  return (
    <div className="p-8">
      <Carousel onSlideChange={onProductSlideChange}>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={220}
                height={250}
                className="rounded-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-8 flex flex-col items-center justify-center text-center">
        <h4 className="min-h-12 text-lg font-semibold">
          {activeProduct.brand.toUpperCase()} {activeProduct.model}
        </h4>
        <p className="text-lg font-bold text-[#F2AC34]">
          ${activeProduct.price}
        </p>
      </div>
    </div>
  );
};
export default ProductsCarousel;
