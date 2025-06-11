import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Download,
  Smartphone,
  Gamepad2,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Games Modded", value: "50+" },
  { label: "Happy Users", value: "500K+" },
  { label: "RC Models", value: "20+" },
];

const mods = [
  {
    title: "Cricket 24 Mobile",
    description: "Enhanced graphics & realistic physics",
    image: "/assets/cricket-mod.webm",
  },
  {
    title: "RC Cricket Drone",
    description: "Custom ball tracking drone",
    image: "/assets/rc-drone.webm",
  },
  {
    title: "Real Cricket Mod",
    description: "Unlocked all premium features",
    image: "/assets/real-cricket.webm",
  },
];

const services = [
  {
    service: "Game Modding",
    description: "Enhanced mobile cricket games with new features",
    icon: Gamepad2,
  },
  {
    service: "RC Models",
    description: "Custom RC cricket models with advanced controls",
    icon: Settings,
  },
  {
    service: "Optimization",
    description: "Performance improvements for all devices",
    icon: Smartphone,
  },
  {
    service: "Safety",
    description: "Tested mods that won't get you banned",
    icon: ShieldCheck,
  },
];

export default function Home() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <Container>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex w-full flex-col items-center py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="mb-8 flex space-x-3">
              <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-500">
                Game Mods
              </span>
              <span className="rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-500">
                RC Models
              </span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            >
              Elevate Your <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Cricket</span> Experience
            </motion.h1>
            
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
              Premium mods for mobile cricket games and custom RC models designed for enthusiasts.
            </p>
            
            <div className="mt-10 flex gap-x-6">
              <Link href="#download">
                <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 text-white shadow-lg hover:shadow-emerald-500/20">
                  Download Mods
                </Button>
              </Link>
              <Link href="#products">
                <Button variant="outline" className="rounded-full px-6 py-3">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 w-full max-w-4xl">
            <Suspense fallback={<div className="h-64 w-full bg-gray-100 rounded-xl" />}>
              <Spline 
                scene="/assets/cricket-scene.splinecode" 
                className="rounded-2xl border border-gray-100 shadow-xl"
              />
            </Suspense>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-gray-50 py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by cricket enthusiasts worldwide
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our mods and models bring the joy of cricket to thousands of players.
              </p>
              
              <div className="mt-12 grid grid-cols-3 gap-8">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 sm:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mods Section */}
        <section id="download" className="w-full py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <span className="text-sm font-semibold tracking-wider text-emerald-500">
                FEATURED MODS
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Enhance Your Game
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Download our premium mods for the best cricket experience.
              </p>
            </div>

            <div className="mt-12">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {mods.map((mod) => (
                    <CarouselItem key={mod.title} className="md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="h-full"
                      >
                        <Card className="h-full overflow-hidden border-0 shadow-lg">
                          <CardHeader className="p-0">
                            <video
                              src={mod.image}
                              autoPlay
                              loop
                              muted
                              className="aspect-video w-full object-cover"
                            />
                          </CardHeader>
                          <CardContent className="p-6">
                            <CardTitle className="text-xl font-semibold">
                              {mod.title}
                            </CardTitle>
                            <p className="mt-2 text-gray-600">
                              {mod.description}
                            </p>
                            <Button
                              variant="outline"
                              className="mt-4 w-full rounded-full"
                            >
                              Download
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                Slide {current} of {count}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="products" className="w-full bg-gray-50 py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our <span className="text-emerald-500">Products</span> & Services
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Everything a cricket enthusiast needs in one place.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <service.icon size={24} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">
                    {service.service}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-12 text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Join Our Cricket Community
              </h2>
              <p className="mt-4 text-lg text-emerald-100">
                Get the latest mods, updates, and cricket gaming news.
              </p>
              <Button
                variant="secondary"
                className="mt-8 rounded-full px-8 py-3 text-lg font-medium shadow-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
