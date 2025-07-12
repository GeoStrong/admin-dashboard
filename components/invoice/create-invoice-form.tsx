"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Input } from "@/components/general/UI/input";
import { Label } from "@/components/general/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";
import { Textarea } from "@/components/general/UI/textarea";
import { X, Plus, Trash2 } from "lucide-react";
import { Invoice, InvoiceItem } from "@/lib/types/types";
import { toast } from "sonner";

interface CreateInvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice: (invoice: Omit<Invoice, "id">) => void;
}

interface InvoiceFormData {
  invoiceNumber: string;
  fromName: string;
  fromAddress: string;
  toName: string;
  toAddress: string;
  invoiceDate: string;
  dueDate: string;
  status: Invoice["status"];
  items: Omit<InvoiceItem, "id">[];
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({
  isOpen,
  onClose,
  onCreateInvoice,
}) => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    fromName: "",
    fromAddress: "",
    toName: "",
    toAddress: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    status: "draft",
    items: [
      {
        description: "",
        quantity: 1,
        baseCost: 0,
        totalCost: 0,
      },
    ],
  });

  const handleInputChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof Omit<InvoiceItem, "id">,
    value: string | number,
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    // Auto-calculate total cost when quantity or base cost changes
    if (field === "quantity" || field === "baseCost") {
      updatedItems[index].totalCost =
        updatedItems[index].quantity * updatedItems[index].baseCost;
    }

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          quantity: 1,
          baseCost: 0,
          totalCost: 0,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.totalCost, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fromName.trim() ||
      !formData.toName.trim() ||
      !formData.dueDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.items.some((item) => !item.description.trim())) {
      toast.error("Please provide descriptions for all items");
      return;
    }

    // Create invoice object
    const newInvoice: Omit<Invoice, "id"> = {
      invoiceNumber: formData.invoiceNumber,
      from: {
        name: formData.fromName,
        address: formData.fromAddress,
      },
      to: {
        name: formData.toName,
        address: formData.toAddress,
      },
      invoiceDate: formData.invoiceDate,
      dueDate: formData.dueDate,
      status: formData.status,
      items: formData.items.map((item, index) => ({
        ...item,
        id: (index + 1).toString(),
      })),
      total: calculateTotal(),
    };

    onCreateInvoice(newInvoice);
    onClose();

    // Reset form
    setFormData({
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      fromName: "",
      fromAddress: "",
      toName: "",
      toAddress: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      status: "draft",
      items: [
        {
          description: "",
          quantity: 1,
          baseCost: 0,
          totalCost: 0,
        },
      ],
    });

    toast.success("Invoice created successfully!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-dark-150">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Invoice
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Invoice Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label
                htmlFor="invoiceNumber"
                className="text-gray-700 dark:text-gray-300"
              >
                Invoice Number *
              </Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) =>
                  handleInputChange("invoiceNumber", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label
                htmlFor="status"
                className="text-gray-700 dark:text-gray-300"
              >
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleInputChange("status", value as Invoice["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-center dark:bg-dark-150">
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label
                htmlFor="invoiceDate"
                className="text-gray-700 dark:text-gray-300"
              >
                Invoice Date *
              </Label>
              <Input
                id="invoiceDate"
                type="date"
                value={formData.invoiceDate}
                onChange={(e) =>
                  handleInputChange("invoiceDate", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label
                htmlFor="dueDate"
                className="text-gray-700 dark:text-gray-300"
              >
                Due Date *
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* From Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              From
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="fromName"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Name *
                </Label>
                <Input
                  id="fromName"
                  value={formData.fromName}
                  onChange={(e) =>
                    handleInputChange("fromName", e.target.value)
                  }
                  placeholder="Your company name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="fromAddress"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Address
                </Label>
                <Textarea
                  id="fromAddress"
                  value={formData.fromAddress}
                  onChange={(e) =>
                    handleInputChange("fromAddress", e.target.value)
                  }
                  placeholder="Your company address"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* To Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              To
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="toName"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Client Name *
                </Label>
                <Input
                  id="toName"
                  value={formData.toName}
                  onChange={(e) => handleInputChange("toName", e.target.value)}
                  placeholder="Client company name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="toAddress"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Client Address
                </Label>
                <Textarea
                  id="toAddress"
                  value={formData.toAddress}
                  onChange={(e) =>
                    handleInputChange("toAddress", e.target.value)
                  }
                  placeholder="Client company address"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Items
              </h3>
              <Button
                type="button"
                onClick={addItem}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            {formData.items.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Description *
                    </Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      placeholder="Item description"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Unit Price
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.baseCost}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "baseCost",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-700 dark:text-gray-300">
                      Total
                    </Label>
                    <Input
                      type="number"
                      value={item.totalCost}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <div className="flex items-end md:col-span-2">
                    <Button
                      type="button"
                      onClick={() => removeItem(index)}
                      variant="outline"
                      size="sm"
                      disabled={formData.items.length === 1}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-end">
              <div className="w-64 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              Create Invoice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoiceForm;
