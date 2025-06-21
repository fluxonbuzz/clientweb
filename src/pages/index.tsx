import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Download,
  Smartphone,
  Heart,
  Settings,
  ShieldCheck,
  Trophy,
  Zap,
  Lock,
  Star,
  Award,
  Users,
  Shield,
  Gift,
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
  { label: "Toyss", value: "50+", icon: Gift },
  { label: "Happy Kids", value: "500K+", icon: Users },
  { label: "Cuteee Designs", value: "20+", icon: Heart },
];

const products = [
  {
    title: "Hello Kitty Plush",
    description: "Super soft and huggable plush toy",
    image: "/assets/kitty-plush.webm",
    features: ["30cm Size", "Premium Materials", "Washable"],
  },
  {
    title: "Hello Kitty Backpack",
    description: "Adorable school backpack for kids",
    image: "/assets/kitty-bag.webm",
    features: ["Lightweight", "Multiple Pockets", "Durable"],
  },
  {
    title: "Hello Kitty Stationery",
    description: "Complete school set with cute designs",
    image: "/assets/kitty-stationery.webm",
    features: ["10 Items", "Eraser Set", "Pencil Case"],
  },
];

const services = [
  {
    service: "Plush Toys",
    description: "Super soft and huggable Hello Kitty friends",
    icon: Gift,
  },
  {
    service: "School Supplies",
    description: "Cute stationery for school days",
    icon: Heart,
  },
  {
    service: "Quality",
    description: "Premium materials for lasting joy",
    icon: Star,
  },
  {
    service: "Safety",
    description: "100% child-safe materials",
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
    <div className="bg-pink-50 text-pink-900">
      <Container>
        <div className="flex flex-col items-center">
          {/* Hero Section */}
          <section className="flex w-full flex-col items-center py-20 md:py-32">
            <div className="container flex flex-col items-center text-center">
              <div className="mb-8 flex space-x-3">
                <span className="flex items-center rounded-full bg-pink-200 px-4 py-1 text-sm font-medium text-pink-700">
                  <Gift className="mr-1 h-4 w-4" /> Cute Toys
                </span>
                <span className="flex items-center rounded-full bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700">
                  <Heart className="mr-1 h-4 w-4" /> Made with Love
                </span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
              >
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Saanvi's</span> Hello Kitty World
              </motion.h1>
              
              <p className="mt-6 max-w-2xl text-lg leading-8 text-pink-700">
                Adorable Hello Kitty products for kids and collectors.
                <span className="mt-2 block text-sm text-pink-500">
                  <Star className="inline h-4 w-4" /> Special Edition - Limited stock available
                </span>
              </p>
              
              <div className="mt-10 flex gap-x-6">
                <Link href="#products">
                  <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 text-white shadow-lg hover:shadow-pink-500/20">
                    <Heart className="mr-2 h-5 w-5" /> See Products
                  </Button>
                </Link>
                <Link href="#premium">
                  <Button variant="outline" className="rounded-full border-pink-500 px-6 py-3 text-pink-500 hover:bg-pink-500/10">
                    <Award className="mr-2 h-5 w-5" /> Special Editions
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-16 w-full max-w-4xl">
              <Suspense fallback={<div className="h-64 w-full rounded-xl bg-pink-100" />}>
                <Spline 
                  scene="/assets/hello-kitty-scene.splinecode" 
                  className="rounded-2xl border-2 border-pink-200 shadow-xl"
                />
              </Suspense>
            </div>
          </section>

          {/* Stats Section */}
          <section className="w-full bg-pink-100 py-20">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Why Choose <span className="text-pink-400">Saanvi's</span> Collection? even idk
                </h2>
                <p className="mt-4 text-lg text-pink-700">
                  Loved by kids and collectors worldwide
                </p>
                
                <div className="mt-12 grid grid-cols-3 gap-8">
                  {aboutStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="flex justify-center">
                        <stat.icon className="h-10 w-10 text-pink-500" />
                      </div>
                      <div className="mt-4 text-4xl font-bold text-pink-400 sm:text-5xl">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-sm font-medium text-pink-600 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section id="products" className="w-full py-20">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <span className="flex items-center justify-center text-sm font-semibold tracking-wider text-pink-500">
                  <Heart className="mr-2 h-4 w-4" /> FEATURED PRODUCTS
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Adorable Hello Kitty Collection
                </h2>
                <p className="mt-4 text-lg text-pink-700">
                  Perfect gifts for kids and collectors
                </p>
              </div>

              <div className="mt-12">
                <Carousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {products.map((product) => (
                      <CarouselItem key={product.title} className="md:basis-1/2 lg:basis-1/3">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="h-full"
                        >
                          <Card className="h-full overflow-hidden border-0 bg-white shadow-lg">
                            <CardHeader className="p-0">
                              <div className="relative">
                                <video
                                  src={product.image}
                                  autoPlay
                                  loop
                                  muted
                                  className="aspect-video w-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-500/80 to-transparent p-4">
                                  <div className="flex items-center">
                                    <Star className="mr-2 h-4 w-4 text-yellow-300" />
                                    <span className="text-xs font-medium text-white">BESTSELLER</span>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <CardTitle className="text-xl font-semibold text-pink-900">
                                {product.title}
                              </CardTitle>
                              <p className="mt-2 text-pink-700">
                                {product.description}
                              </p>
                              <ul className="mt-4 space-y-2">
                                {product.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-sm text-pink-600">
                                    <Heart className="mr-2 h-3 w-3 text-pink-400" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button
                                className="mt-6 w-full rounded-full bg-pink-500 text-white hover:bg-pink-600"
                              >
                                Add to Cart
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 border-pink-300 bg-white text-pink-500 hover:bg-pink-100" />
                  <CarouselNext className="right-4 border-pink-300 bg-white text-pink-500 hover:bg-pink-100" />
                </Carousel>
                
                <div className="mt-4 text-center text-sm text-pink-500">
                  Slide {current} of {count} - More cute products available
                </div>
              </div>
            </div>
          </section>

          {/* Special Editions Section */}
          <section id="premium" className="w-full bg-gradient-to-br from-pink-100 to-purple-100 py-20">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <span className="flex items-center justify-center text-sm font-semibold tracking-wider text-purple-500">
                  <Award className="mr-2 h-4 w-4" /> SPECIAL EDITIONS
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Limited Edition for Just <span className="text-purple-500">$29.99</span>
                </h2>
                <p className="mt-4 text-lg text-pink-700">
                  Get exclusive Hello Kitty items with special packaging
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="rounded-xl border border-pink-200 bg-white p-8">
                  <h3 className="text-xl font-semibold text-pink-900">Basic Kit</h3>
                  <div className="mt-4 text-4xl font-bold text-pink-400">$14.99</div>
                  <ul className="mt-6 space-y-3 text-pink-600">
                    <li className="flex items-center"><Heart className="mr-2 h-4 w-4 text-pink-400" /> Standard Plush</li>
                    <li className="flex items-center"><Heart className="mr-2 h-4 w-4 text-pink-400" /> 1 Accessory</li>
                    <li className="flex items-center"><Heart className="mr-2 h-4 w-4 text-pink-400" /> Regular Packaging</li>
                  </ul>
                  <Button variant="outline" className="mt-8 w-full rounded-full border-pink-400 text-pink-500">
                    Choose Basic
                  </Button>
                </div>

                <div className="relative rounded-xl border-2 border-purple-400 bg-white p-8 shadow-lg shadow-purple-400/10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-500 px-4 py-1 text-xs font-bold text-white">
                    POPULAR CHOICE
                  </div>
                  <h3 className="text-xl font-semibold text-purple-900">Special Edition</h3>
                  <div className="mt-4 text-4xl font-bold text-purple-500">$29.99</div>
                  <ul className="mt-6 space-y-3 text-purple-700">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-purple-500" /> Exclusive Plush</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-purple-500" /> 5 Accessories</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-purple-500" /> Gift Box</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-purple-500" /> Collector's Card</li>
                  </ul>
                  <Button className="mt-8 w-full rounded-full bg-purple-500 text-white hover:bg-purple-600">
                    Get Special Edition
                  </Button>
                </div>

                <div className="rounded-xl border border-pink-200 bg-white p-8">
                  <h3 className="text-xl font-semibold text-pink-900">Deluxe Set</h3>
                  <div className="mt-4 text-4xl font-bold text-pink-500">$49.99</div>
                  <ul className="mt-6 space-y-3 text-pink-600">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-pink-500" /> 3 Plush Toys</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-pink-500" /> Complete Set</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-pink-500" /> Display Case</li>
                  </ul>
                  <Button variant="outline" className="mt-8 w-full rounded-full border-pink-500 text-pink-500 hover:bg-pink-500/10">
                    Get Deluxe Set
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="w-full py-20">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Our <span className="text-pink-400">Products</span> & Features
                </h2>
                <p className="mt-4 text-lg text-pink-700">
                  Everything a Hello Kitty fan needs
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
                    className="rounded-xl border border-pink-200 bg-white p-8 shadow-sm transition-all hover:border-pink-400 hover:shadow-pink-400/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-500">
                      <service.icon size={24} />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-pink-900">
                      {service.service}
                    </h3>
                    <p className="mt-2 text-pink-600">
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
              <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200 px-8 py-12 text-center shadow-xl">
                <h2 className="text-3xl font-bold text-pink-900 sm:text-4xl">
                  Join the <span className="text-pink-500">Hello Kitty</span> Club
                </h2>
                <p className="mt-4 text-lg text-pink-700">
                  Get the latest products, updates, and special offers.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 text-white shadow-lg hover:shadow-pink-500/20">
                    <Heart className="mr-2 h-5 w-5" /> Shop Now
                  </Button>
                  <Button variant="outline" className="rounded-full border-pink-500 px-8 py-3 text-pink-500 hover:bg-pink-500/10">
                    <Award className="mr-2 h-5 w-5" /> Special Editions
                  </Button>
                </div>
                <p className="mt-6 text-sm text-pink-500">
                  Made with love by Saanvi - For all Hello Kitty fans
                </p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
