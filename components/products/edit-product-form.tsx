"use client";

import React, { useState } from "react";
import { EditProductFormProps, Product } from "@/lib/types/types";
import { Button } from "@/components/general/UI/button";
import { Textarea } from "@/components/general/UI/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";
import Image from "next/image";
import { X } from "lucide-react";
import { updateProduct } from "@/lib/actions/getAsyncData";
import { Label } from "../general/UI/label";
import { Input } from "../general/UI/input";
import { toast, Toaster } from "sonner";
import useScreenSize from "@/lib/hooks/useScreenSize";

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: product.title || "",
    brand: product.brand || "",
    model: product.model || "",
    price: product.price?.toString() || "",
    color: product.color || "",
    category: product.category || "",
    description: product.description || "",
    image: product.image || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(product.image || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isMobile } = useScreenSize();

  const categories = [
    "mobile",
    "laptop",
    "tv",
    "audio",
    "gaming",
    "accessories",
    "smartwatch",
    "tablet",
  ];

  const colors = [
    "Black",
    "White",
    "Silver",
    "Gold",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Pink",
    "Gray",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
    setImagePreview(url);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }

    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.color) {
      newErrors.color = "Color is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Product image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image,
        category: formData.category,
      };

      const { product: updatedProduct } = await updateProduct(
        product.id.toString(),
        updateData,
      );

      console.log("Product updated successfully:", updatedProduct);

      toast.success("Product updated successfully!");
      setTimeout(() => {
        onSave();
      }, 1500);
    } catch (error) {
      console.error("Error updating product:", error);
      if (error instanceof Error) {
        setErrors({ general: `Failed to update product: ${error.message}` });
      } else {
        setErrors({
          general:
            "Failed to update product. Please check your connection and try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: product.title || "",
      brand: product.brand || "",
      model: product.model || "",
      price: product.price?.toString() || "",
      color: product.color || "",
      category: product.category || "",
      description: product.description || "",
      image: product.image || "",
    });
    setImagePreview(product.image || "");
    setErrors({});
    toast.success("Form reset to original values");
  };

  return (
    <div className="rounded-xl bg-white p-6 dark:bg-dark-150">
      <Toaster
        richColors
        position={`${isMobile ? "top-center" : "bottom-right"}`}
      />

      {errors.general && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {errors.general}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter product title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                placeholder="Enter brand name"
                className={errors.brand ? "border-red-500" : ""}
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-red-500">{errors.brand}</p>
              )}
            </div>

            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                placeholder="Enter model name"
                className={errors.model ? "border-red-500" : ""}
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-500">{errors.model}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter product description"
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger
                  className={errors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white text-center dark:bg-dark-150">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div>
              <Label htmlFor="color">Color *</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => handleInputChange("color", value)}
              >
                <SelectTrigger className={errors.color ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent className="bg-white text-center dark:bg-dark-150">
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="mt-1 text-sm text-red-500">{errors.color}</p>
              )}
            </div>

            <div>
              <Label htmlFor="image">Product Image *</Label>
              <div className="space-y-3">
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="Enter image URL"
                  className={errors.image ? "border-red-500" : ""}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}

                {imagePreview && (
                  <div className="relative">
                    <div className="relative h-48 w-full overflow-hidden rounded-lg border">
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        className="object-contain"
                        onError={() => {
                          setImagePreview("");
                          setErrors((prev) => ({
                            ...prev,
                            image: "Invalid image URL",
                          }));
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        handleInputChange("image", "");
                      }}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset Form
            </Button>
          </div>

          <div className="flex gap-2 sm:order-last">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
