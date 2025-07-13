import React from "react";
import { Button } from "@/components/general/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/general/UI/card";
import { Badge } from "@/components/general/UI/badge";
import Link from "next/link";
import {
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const LandingHero: React.FC = () => {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 space-y-6 text-center">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            🚀 Welcome to DashStack
          </Badge>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl">
            Modern Admin Dashboard
            <span className="block text-blue-600 dark:text-blue-400">
              Built for Excellence
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Experience a comprehensive admin dashboard solution with modern
            design, powerful features, and seamless user experience. Built with
            React, TypeScript, and Next.js for optimal performance.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              <Link href="/main/dashboard">
                Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="text-center">
              <BarChart3 className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <CardTitle className="text-xl">Analytics & Reports</CardTitle>
              <CardDescription>
                Comprehensive analytics with beautiful charts and detailed
                reports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-green-600" />
              <CardTitle className="text-xl">User Management</CardTitle>
              <CardDescription>
                Advanced user management with roles, permissions, and team
                collaboration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader className="text-center">
              <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-purple-600" />
              <CardTitle className="text-xl">E-commerce Ready</CardTitle>
              <CardDescription>
                Complete e-commerce features with product management and orders
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose DashStack?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Built with modern technologies and best practices to deliver
              exceptional performance and user experience.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: Shield,
                  text: "Secure & Reliable",
                  desc: "Enterprise-grade security and reliability",
                },
                {
                  icon: Zap,
                  text: "Lightning Fast",
                  desc: "Optimized for speed and performance",
                },
                {
                  icon: Globe,
                  text: "Multi-language",
                  desc: "Internationalization support",
                },
                {
                  icon: Smartphone,
                  text: "Mobile First",
                  desc: "Responsive design for all devices",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature.text}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 p-6 text-center shadow-lg">
              <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                99.9%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Uptime
              </div>
            </Card>

            <Card className="border-0 p-6 text-center shadow-lg">
              <Users className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                10K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Users
              </div>
            </Card>

            <Card className="border-0 p-6 text-center shadow-lg">
              <BarChart3 className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Features
              </div>
            </Card>

            <Card className="border-0 p-6 text-center shadow-lg">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Support
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-2xl bg-blue-600 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Join thousands of users who trust DashStack for their admin
            dashboard needs. Start exploring today!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="px-8 py-3">
              <Link href="/main/dashboard">Explore Dashboard</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white px-8 py-3 text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
