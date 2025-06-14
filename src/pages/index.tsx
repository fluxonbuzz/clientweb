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
  Trophy,
  Zap,
  Lock,
  Star,
  Award,
  Users,
  Shield,
  Radio,
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
  { label: "Games Modded", value: "50+", icon: Gamepad2 },
  { label: "Happy Users", value: "500K+", icon: Users },
  { label: "RC Models", value: "20+", icon: Radio },
];

const mods = [
  {
    title: "Cricket 24 Mobile",
    description: "Enhanced graphics & realistic physics",
    image: "/assets/cricket-mod.webm",
    features: ["4K Textures", "60FPS Support", "All Teams Unlocked"],
  },
  {
    title: "RC Cricket Drone",
    description: "Custom ball tracking drone",
    image: "/assets/rc-drone.webm",
    features: ["HD Camera", "Auto Tracking", "2KM Range"],
  },
  {
    title: "Real Cricket Mod",
    description: "Unlocked all premium features",
    image: "/assets/real-cricket.webm",
    features: ["All Players", "Premium Stadiums", "No Ads"],
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
    icon: Radio,
  },
  {
    service: "Performance",
    description: "Optimized for all devices",
    icon: Zap,
  },
  {
    service: "Safety",
    description: "100% ban-free experience",
    icon: Shield,
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
    <div className="bg-gray-900 text-gray-100">
      <Container>
        <div className="flex flex-col items-center">
          {/* Hero Section */}
          <section className="flex w-full flex-col items-center py-20 md:py-32">
            <div className="container flex flex-col items-center text-center">
              <div className="mb-8 flex space-x-3">
                <span className="flex items-center rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-500">
                  <Gamepad2 className="mr-1 h-4 w-4" /> Game Mods
                </span>
                <span className="flex items-center rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-500">
                  <Trophy className="mr-1 h-4 w-4" /> RC Models
                </span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
              >
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Your name</span> Premium
              </motion.h1>
              
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                Professional cricket mods and RC models for serious players.
                <span className="mt-2 block text-sm text-yellow-400">
                  <Star className="inline h-4 w-4" /> Demo Version - Full features unlock for just ₹200
                </span>
              </p>
              
              <div className="mt-10 flex gap-x-6">
                <Link href="#download">
                  <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 text-white shadow-lg hover:shadow-emerald-500/20">
                    <Download className="mr-2 h-5 w-5" /> Download Demo
                  </Button>
                </Link>
                <Link href="#premium">
                  <Button variant="outline" className="rounded-full border-yellow-400 px-6 py-3 text-yellow-400 hover:bg-yellow-400/10">
                    <Award className="mr-2 h-5 w-5" /> Unlock Premium
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-16 w-full max-w-4xl">
              <Suspense fallback={<div className="h-64 w-full rounded-xl bg-gray-800" />}>
                <Spline 
                  scene="/assets/cricket-scene.splinecode" 
                  className="rounded-2xl border border-gray-800 shadow-xl"
                />
              </Suspense>
            </div>
          </section>

          {/* Stats Section */}
          <section className="w-full bg-gray-800/50 py-20">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Why Choose <span className="text-emerald-400">your name</span>?
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  Trusted by cricket enthusiasts worldwide
                </p>
                
                <div className="mt-12 grid grid-cols-3 gap-8">
                  {aboutStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="flex justify-center">
                        <stat.icon className="h-10 w-10 text-emerald-500" />
                      </div>
                      <div className="mt-4 text-4xl font-bold text-emerald-400 sm:text-5xl">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-wider">
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
                <span className="flex items-center justify-center text-sm font-semibold tracking-wider text-emerald-500">
                  <Zap className="mr-2 h-4 w-4" /> FEATURED MODS (DEMO)
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Premium Cricket Experience
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  Full version unlocks all features for just ₹200
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
                          <Card className="h-full overflow-hidden border-0 bg-gray-800 shadow-lg">
                            <CardHeader className="p-0">
                              <div className="relative">
                                <video
                                  src={mod.image}
                                  autoPlay
                                  loop
                                  muted
                                  className="aspect-video w-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                  <div className="flex items-center">
                                    <Lock className="mr-2 h-4 w-4 text-yellow-400" />
                                    <span className="text-xs font-medium text-yellow-400">DEMO LIMITED</span>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <CardTitle className="text-xl font-semibold">
                                {mod.title}
                              </CardTitle>
                              <p className="mt-2 text-gray-400">
                                {mod.description}
                              </p>
                              <ul className="mt-4 space-y-2">
                                {mod.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-sm text-gray-300">
                                    <Star className="mr-2 h-3 w-3 text-emerald-500" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button
                                variant="outline"
                                className="mt-6 w-full rounded-full border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
                              >
                                Download Demo
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700" />
                  <CarouselNext className="right-4 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700" />
                </Carousel>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  Slide {current} of {count} - Full version unlocks all mods
                </div>
              </div>
            </div>
          </section>

          {/* Premium Section */}
          <section id="premium" className="w-full bg-gradient-to-br from-gray-800 to-gray-900 py-20">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <span className="flex items-center justify-center text-sm font-semibold tracking-wider text-yellow-400">
                  <Award className="mr-2 h-4 w-4" /> PREMIUM UNLOCK
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Unlock Everything for Just <span className="text-yellow-400">₹200</span>
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  Get full access to all mods, updates, and premium support
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-8">
                  <h3 className="text-xl font-semibold">Demo Version</h3>
                  <div className="mt-4 text-4xl font-bold text-gray-400">Free</div>
                  <ul className="mt-6 space-y-3 text-gray-400">
                    <li className="flex items-center"><Lock className="mr-2 h-4 w-4 text-red-400" /> Limited Features</li>
                    <li className="flex items-center"><Lock className="mr-2 h-4 w-4 text-red-400" /> Watermarked</li>
                    <li className="flex items-center"><Lock className="mr-2 h-4 w-4 text-red-400" /> No Updates</li>
                  </ul>
                  <Button variant="outline" className="mt-8 w-full rounded-full border-gray-600 text-gray-300">
                    Current Version
                  </Button>
                </div>

                <div className="relative rounded-xl border-2 border-yellow-500 bg-gray-800 p-8 shadow-lg shadow-yellow-500/10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-xs font-bold text-gray-900">
                    RECOMMENDED
                  </div>
                  <h3 className="text-xl font-semibold">Premium Version</h3>
                  <div className="mt-4 text-4xl font-bold text-yellow-400">₹200</div>
                  <ul className="mt-6 space-y-3 text-gray-300">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-emerald-500" /> All Features Unlocked</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-emerald-500" /> No Watermarks</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-emerald-500" /> Source Code</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-emerald-500" /> Premium Support</li>
                  </ul>
                  <Button className="mt-8 w-full rounded-full bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                    Unlock Premium Now
                  </Button>
                </div>

                <div className="rounded-xl border border-gray-700 bg-gray-800 p-8">
                  <h3 className="text-xl font-semibold">Example store</h3>
                  <div className="mt-4 text-4xl font-bold text-blue-400">₹500</div>
                  <ul className="mt-6 space-y-3 text-gray-400">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-blue-500" /> All Mods + 3 RC Models</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-blue-500" /> Exclusive Designs</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-blue-500" /> Priority Support</li>
                  </ul>
                  <Button variant="outline" className="mt-8 w-full rounded-full border-blue-500 text-blue-500 hover:bg-blue-500/10">
                    Get RC Bundle
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="products" className="w-full py-20">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Our <span className="text-emerald-400">Products</span> & Services
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  Everything a cricket enthusiast needs
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
                    className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-emerald-500/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                      <service.icon size={24} />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">
                      {service.service}
                    </h3>
                    <p className="mt-2 text-gray-400">
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
              <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 px-8 py-12 text-center shadow-xl">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Join the <span className="text-emerald-400">TH Cricket</span> Community
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  Get the latest mods, updates, and cricket gaming news.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-3 text-white shadow-lg hover:shadow-emerald-500/20">
                    <Download className="mr-2 h-5 w-5" /> Download Demo
                  </Button>
                  <Button variant="outline" className="rounded-full border-yellow-400 px-8 py-3 text-yellow-400 hover:bg-yellow-400/10">
                    <Award className="mr-2 h-5 w-5" /> Unlock Premium
                  </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  Premium version of website available for just ₹200 - One time payment
                </p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
