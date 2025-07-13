"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSingleProduct } from "@/lib/actions/getAsyncData";
import BackNavigation from "@/components/general/UI/back-navigation";
import { Product } from "@/lib/types/types";
import { Skeleton } from "@/components/general/UI/skeleton";
import EditProductForm from "@/components/products/edit-product-form";
import EditProductLoading from "./loading";

type ProductIdParams = Promise<{ productId: string }>;

const EditProduct: React.FC<{ params: ProductIdParams }> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const { productId } = await params;
        const { product: fetchedProduct } = await getSingleProduct(productId);
        setProduct(fetchedProduct);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [params]);

  const handleSaveSuccess = () => {
    router.push(`/main/product/${product?.id}`);
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return <EditProductLoading />;
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {error || "Product not found"}
          </h2>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <BackNavigation />
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Product
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Update product information and save changes
          </p>
        </div>

        <EditProductForm
          product={product}
          onSave={handleSaveSuccess}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default EditProduct;
