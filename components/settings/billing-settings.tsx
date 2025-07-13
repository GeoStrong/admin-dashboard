"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Label } from "@/components/general/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";
import { Badge } from "@/components/general/UI/badge";
import { SettingsSection } from "./settings-layout";
import { BillingInfo, BillingTransaction } from "@/lib/types/types";
import { billingInfo } from "@/lib/dummy-database";

export const BillingSettingsComponent: React.FC = () => {
  const [billing, setBilling] = useState<BillingInfo>(billingInfo);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (field: keyof BillingInfo, value: string) => {
    setBilling((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
    console.log("Billing settings updated:", billing);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "secondary";
      case "failed":
        return "danger";
      default:
        return "secondary";
    }
  };

  const plans = [
    { value: "Free Plan", label: "Free Plan - $0/month" },
    { value: "Pro Plan", label: "Pro Plan - $29.99/month" },
    { value: "Business Plan", label: "Business Plan - $99.99/month" },
    { value: "Enterprise Plan", label: "Enterprise Plan - Custom" },
  ];

  const billingCycles = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly (Save 20%)" },
  ];

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Current Plan"
        description="Manage your subscription and billing preferences."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="plan">Subscription Plan</Label>
            <Select
              value={billing.plan}
              onValueChange={(value) => handleSelectChange("plan", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.value} value={plan.value}>
                    {plan.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Your current subscription plan
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingCycle">Billing Cycle</Label>
            <Select
              value={billing.billingCycle}
              onValueChange={(value) =>
                handleSelectChange("billingCycle", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent>
                {billingCycles.map((cycle) => (
                  <SelectItem key={cycle.value} value={cycle.value}>
                    {cycle.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              How often you&apos;re billed
            </p>
          </div>
        </div>

        <div className="rounded-md bg-muted/50 p-4">
          <h4 className="mb-2 font-medium">Plan Details</h4>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <span className="text-muted-foreground">Current Plan:</span>
              <span className="ml-2 font-medium">{billing.plan}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Billing Cycle:</span>
              <span className="ml-2 font-medium capitalize">
                {billing.billingCycle}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Next Billing Date:</span>
              <span className="ml-2 font-medium">
                {formatDate(billing.nextBillingDate)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="ml-2 font-medium">
                {billing.paymentMethod.type === "card"
                  ? `•••• ${billing.paymentMethod.last4}`
                  : "PayPal"}
              </span>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Payment Method"
        description="Manage your payment information."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <div className="font-medium">
                {billing.paymentMethod.type === "card"
                  ? "Credit Card"
                  : "PayPal"}
              </div>
              {billing.paymentMethod.type === "card" && (
                <div className="text-sm text-muted-foreground">
                  •••• •••• •••• {billing.paymentMethod.last4}
                  {billing.paymentMethod.expiryDate && (
                    <span> • Expires {billing.paymentMethod.expiryDate}</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          </div>
          <Button variant="outline">Add Payment Method</Button>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Billing History"
        description="View your past invoices and payments."
      >
        <div className="space-y-4">
          {billing.billingHistory.map((transaction: BillingTransaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{transaction.description}</span>
                  <Badge variant={getStatusBadgeVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(transaction.date)}
                  {transaction.invoice && (
                    <span> • Invoice #{transaction.invoice}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {formatAmount(transaction.amount)}
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Billing Actions"
        description="Manage your subscription and billing."
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Update Payment Method</Button>
          <Button variant="outline">Download All Invoices</Button>
          <Button variant="outline">Cancel Subscription</Button>
        </div>
      </SettingsSection>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setBilling(billingInfo)}>
          Reset
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
