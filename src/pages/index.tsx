'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cake, 
  Heart, 
  Sparkles, 
  Music, 
  Volume2,
  VolumeX,
  MessageCircleHeart,
  Star,
  Flower2,
  Gift,
  PartyPopper
} from 'lucide-react';
import Image from 'next/image';

export default function DidisBirthday() {
  const [step, setStep] = useState(0);
  const [candlesLit, setCandlesLit] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [showCakeCut, setShowCakeCut] = useState(false);
  const [showTulips, setShowTulips] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const titleText = "Happy Birthday";
  const titleArray = titleText.split("");

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setShowTitle(true), 500);
      
      const timer = setTimeout(() => {
        setTitleComplete(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    audioRef.current = new Audio('/assets/didi-birthday.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    const playAudio = async () => {
      if (!audioRef.current) return;
      
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch (err) {
        setMusicPlaying(false);
        
        const startAudioOnInteraction = () => {
          if (audioRef.current && !musicPlaying) {
            audioRef.current.play().then(() => {
              setMusicPlaying(true);
            });
          }
          document.removeEventListener('click', startAudioOnInteraction);
          document.removeEventListener('touchstart', startAudioOnInteraction);
          document.removeEventListener('keydown', startAudioOnInteraction);
        };
        
        document.addEventListener('click', startAudioOnInteraction);
        document.addEventListener('touchstart', startAudioOnInteraction);
        document.addEventListener('keydown', startAudioOnInteraction);
      }
    };
    
    playAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener('click', () => {});
      document.removeEventListener('touchstart', () => {});
      document.removeEventListener('keydown', () => {});
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        setMusicPlaying(false);
      });
      setMusicPlaying(true);
    }
  };

  const handleStart = () => {
    setStep(1);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);
  };

  const handleLightCandles = () => {
    setCandlesLit(true);
    setTimeout(() => {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1500);
    }, 500);
    setTimeout(() => setStep(2), 1000);
  };

  const handleMakeWish = () => {
    setWishMade(true);
    setTimeout(() => {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
    }, 500);
    setTimeout(() => setStep(3), 1000);
  };

  const handleCutCake = () => {
    setCakeCut(true);
    setConfetti(true);
    setTimeout(() => {
      setShowCakeCut(true);
      setTimeout(() => setConfetti(false), 2500);
    }, 500);
    setTimeout(() => setStep(4), 1000);
  };

  const handleNextStep = (nextStep: number) => {
    setStep(nextStep);
    if (nextStep === 5) {
      setTimeout(() => setShowTulips(true), 300);
    }
    if (nextStep === 6) {
      setTimeout(() => setShowMessage(true), 300);
    }
    if (nextStep === 7) {
      setTimeout(() => setShowFinal(true), 300);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden font-sans cursor-pointer"
      onClick={() => {
        if (!musicPlaying && audioRef.current) {
          audioRef.current.play().then(() => setMusicPlaying(true));
        }
      }}
    >
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20">
          <Flower2 className="w-32 h-32 text-pink-300" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Flower2 className="w-32 h-32 text-rose-300 transform rotate-12" />
        </div>
        
        {/* Floating Hearts */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            initial={{ 
              y: Math.random() * 100 + 100, 
              x: Math.random() * 100,
              opacity: 0.1 + Math.random() * 0.2,
              scale: 0.3 + Math.random() * 0.7
            }}
            animate={{ 
              y: [Math.random() * 100 + 100, -Math.random() * 50 - 50, Math.random() * 100 + 100],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Heart className="w-8 h-8 text-pink-300 fill-pink-200" />
          </motion.div>
        ))}

        {/* Floating Tulips */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`tulip-${i}`}
            className="absolute text-3xl"
            initial={{ 
              y: Math.random() * 100 + 100,
              x: Math.random() * 100,
              opacity: 0.1 + Math.random() * 0.3,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [Math.random() * 100 + 100, -Math.random() * 100 - 30, Math.random() * 100 + 100],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 7}s`
            }}
          >
            🌷
          </motion.div>
        ))}

        {/* Sparkles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{ 
              y: Math.random() * 100,
              x: Math.random() * 100,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [Math.random() * 100, Math.random() * 100 - 20, Math.random() * 100]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        ))}
      </div>

      {/* Music Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-2xl hover:shadow-3xl transition-all hover:scale-110 group"
        title={musicPlaying ? "Mute music" : "Play music"}
      >
        {musicPlaying ? (
          <Volume2 size={28} className="group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX size={28} className="group-hover:scale-110 transition-transform" />
        )}
        <motion.div
          animate={musicPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-white/30"
        />
      </motion.button>

      {/* Confetti */}
      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -100, 
                  x: Math.random() * window.innerWidth, 
                  opacity: 1,
                  rotate: 0
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  x: Math.random() * 200 - 100 + (Math.random() * window.innerWidth),
                  rotate: 720,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random(),
                  ease: "easeOut"
                }}
                className="absolute"
                style={{
                  width: 10 + Math.random() * 20,
                  height: 10 + Math.random() * 20,
                  background: `hsl(${Math.random() * 60 + 300}, 100%, 65%)`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '20%'
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Start Screen */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center min-h-[80vh] flex flex-col justify-center items-center"
          >
            {/* Animated Title */}
            <div className="mb-12">
              <div className="flex justify-center mb-4">
                {showTitle && titleArray.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ 
                      y: -100, 
                      opacity: 0, 
                      scale: 0,
                      rotate: -180
                    }}
                    animate={{ 
                      y: 0, 
                      opacity: 1, 
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 12
                    }}
                    className="inline-block text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mx-1"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              
              {titleComplete && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-4xl md:text-5xl font-bold text-rose-600 mb-2"
                >
                  🎂 18th Birthday! 🎂
                </motion.div>
              )}
            </div>

            {/* Floating Cake Animation */}
            {titleComplete && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  scale: { repeat: Infinity, duration: 2 },
                  rotate: { repeat: Infinity, duration: 3 },
                  y: { repeat: Infinity, duration: 1.5 }
                }}
                className="mb-12"
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 p-3 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
                      <Cake className="w-32 h-32 text-pink-500" />
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-full border-4 border-pink-300/30"
                  />
                </div>
              </motion.div>
            )}

            {/* Main Button */}
            {titleComplete && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="space-y-8"
              >
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                  >
                    Do you wanna see what I've made for you?
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-lg text-gray-600 mb-2"
                  >
                    (It's something special... with lots of surprises!)
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="text-sm text-pink-500 italic"
                  >
                    Spoiler alert: There's cake involved!
                  </motion.p>
                </div>

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 60px rgba(236, 72, 153, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="relative px-12 py-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all group overflow-hidden"
                >
                  <span className="relative z-10">Let's Begin the Magic!</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-2xl border-4 border-pink-300/30"
                  />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-gray-500 text-sm space-y-2"
                >
                  <div className="flex items-center justify-center gap-2">
                    {musicPlaying ? (
                      <>
                        <Music className="w-5 h-5 text-pink-500 animate-pulse" />
                        <span className="text-pink-600">Music is playing! Feel the vibe!</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-5 h-5 text-yellow-500" />
                        <span>Click anywhere to start the magical music!</span>
                      </>
                    )}
                  </div>
                  <p className="text-pink-400 italic">Trust me, you're gonna love what comes next!</p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 1: Cake with candles */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
                Step 1: The Grand Reveal! 
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600"
              >
                Ta-da! Feast your eyes on this masterpiece!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-pink-500 mt-2"
              >
                (Wait till you see what happens when we light these candles... it's magical!)
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02 }}
              className="relative h-96 mb-12 rounded-3xl overflow-hidden border-4 border-white/80 shadow-3xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-rose-200/20 z-10" />
              <Image
                src="/assets/cake-whole.jpg"
                alt="Beautiful birthday cake with 18 candles"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              
              {/* Unlit Candles */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 flex gap-2 flex-wrap justify-center max-w-full px-4 z-20">
                {[...Array(18)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0, scale: 0 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.03, type: "spring" }}
                    whileHover={{ scale: 1.2 }}
                    className="relative"
                  >
                    <div className="w-2 h-14 bg-gradient-to-b from-yellow-100 via-amber-100 to-yellow-50 rounded-t-lg mx-auto shadow-md" />
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(245, 158, 11, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLightCandles}
                className="relative px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all group overflow-hidden"
              >
                <span className="relative z-10">Light the Candles!</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-200" />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-2"
              >
                <p className="text-gray-500 italic">
                  (Get ready for some sparkle magic!)
                </p>
                <p className="text-pink-500 text-sm">
                  Spoiler: Next step involves making a secret wish...
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Candles Lit */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
                Step 2: Make a Wish! 
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600"
              >
                Look at them glow! Now close your eyes and make it count!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-pink-500 mt-2"
              >
                (I won't peek, promise! But make it a good one...)
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className="relative h-96 mb-12 rounded-3xl overflow-hidden border-4 border-white/80 shadow-3xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 to-orange-200/10 z-10" />
              <Image
                src="/assets/cake-whole.jpg"
                alt="Birthday cake with magical lit candles"
                fill
                className="object-cover"
                unoptimized
              />
              
              {/* Lit Candles with Fire Animation */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 flex gap-2 flex-wrap justify-center max-w-full px-4 z-20">
                {[...Array(18)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={
                      candlesLit ? {
                        scale: 1,
                        y: [0, -3, 0, -2, 0],
                        scale: [1, 1.1, 1, 1.05, 1]
                      } : {
                        scale: 1
                      }
                    }
                    transition={
                      candlesLit ? {
                        scale: { delay: i * 0.05, type: "spring" },
                        y: {
                          repeat: Infinity,
                          duration: 1 + Math.random() * 0.5,
                          delay: i * 0.05
                        }
                      } : {
                        scale: { delay: i * 0.05, type: "spring" }
                      }
                    }
                    className="relative"
                  >
                    <div className="w-2 h-14 bg-gradient-to-b from-yellow-100 via-amber-100 to-yellow-50 rounded-t-lg mx-auto shadow-lg" />
                    
                    {/* Animated Flame */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8 + Math.random() * 0.4
                        }}
                        className="w-5 h-8 bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 rounded-full blur-sm"
                      />
                      <motion.div
                        animate={{
                          scale: [1.2, 1, 1.2],
                          opacity: [0.6, 0.9, 0.6]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6 + Math.random() * 0.3
                        }}
                        className="absolute inset-0 bg-yellow-200 blur rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Glow Effect */}
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-radial from-yellow-200/30 via-transparent to-transparent"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(239, 68, 68, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMakeWish}
                disabled={wishMade}
                className={`relative px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all group overflow-hidden ${
                  wishMade
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 cursor-default'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                } text-white`}
              >
                <span className="relative z-10">
                  {wishMade ? 'Wish Made!' : 'Make Your Wish!'}
                </span>
                {!wishMade && (
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-200 animate-pulse" />
                )}
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-2"
              >
                <p className="text-gray-500 italic">
                  (Shhh... don't tell anyone what you wished for!)
                </p>
                <p className="text-pink-500 text-sm">
                  Spoiler: Next up is the most delicious part...
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Cut the Cake */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
                Step 3: The Sweet Moment! 
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600"
              >
                Time for the most important ritual... cake cutting!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-pink-500 mt-2"
              >
                (I saved you the corner piece with extra frosting!)
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className="relative h-96 mb-12 rounded-3xl overflow-hidden border-4 border-white/80 shadow-3xl group"
            >
              <Image
                src="/assets/cake-whole.jpg"
                alt="Birthday cake ready to be cut"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              
              {/* Animated Knife */}
              {!cakeCut && (
                <motion.div
                  animate={{ 
                    x: [-50, 200, -50],
                    rotate: [0, 45, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/4 w-20 h-20 z-20"
                >
                  <div className="w-16 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="w-8 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
                </motion.div>
              )}
              
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCutCake}
                disabled={cakeCut}
                className={`relative px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all group overflow-hidden ${
                  cakeCut
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 cursor-default'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
                } text-white`}
              >
                <span className="relative z-10">
                  {cakeCut ? 'Cake Cut!' : 'Cut the Cake!'}
                </span>
                {!cakeCut && (
                  <Cake className="absolute -top-2 -right-2 w-6 h-6 text-yellow-200 animate-pulse" />
                )}
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-2"
              >
                <p className="text-gray-500 italic">
                  (The first slice is the best one... obviously!)
                </p>
                <p className="text-pink-500 text-sm">
                  Spoiler: Wait till you see this masterpiece slice... it's perfect!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Show Cut Cake */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
                Step 4: Perfection! 
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600"
              >
                Behold! The most perfect cake slice in existence!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-pink-500 mt-2"
              >
                (Look at those layers... it's almost too beautiful to eat!)
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative h-96 mb-12 rounded-3xl overflow-hidden border-4 border-white/80 shadow-3xl mx-auto max-w-lg group"
            >
              <Image
                src="/assets/cake-cut.jpg"
                alt="Perfectly cut cake slice"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
              
              {/* Glow Effect */}
              <motion.div
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent"
              />
              
              {/* Sparkle Effects */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.3 }}
                  className="absolute"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: `${30 + i * 15}%`,
                  }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-300" />
                </motion.div>
              ))}
            </motion.div>

            <div className="space-y-6">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNextStep(5)}
                className="relative px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all group overflow-hidden"
              >
                <span className="relative z-10">Continue the Magic!</span>
                <Flower2 className="absolute -top-2 -right-2 w-6 h-6 text-yellow-200 animate-pulse" />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-2"
              >
                <p className="text-gray-500 italic">
                  (I know what you're thinking... it looks delicious!)
                </p>
                <p className="text-pink-500 text-sm">
                  Spoiler: Next is something blooming beautiful...
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Tulip Garden */}
        {step >= 5 && showTulips && !showMessage && !showFinal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
                Step 5: A Garden Just For You! 
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600"
              >
                18 tulips for 18 wonderful years!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-pink-500 mt-2"
              >
                (Each one represents a year of your amazing journey!)
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
            >
              {Array.from({ length: 18 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -10,
                    rotate: [0, 5, -5, 0]
                  }}
                  className="relative h-32 rounded-xl overflow-hidden border-2 border-white/80 shadow-lg group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-rose-100/30 z-10" />
                  <Image
                    src={`/assets/tulip${(index % 5) + 1}.jpg`}
                    alt={`Tulip ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  
                  {/* Floating Number */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.5 }}
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500/80 to-rose-500/80 text-white text-sm font-bold px-2 py-1 rounded-full backdrop-blur-sm"
                  >
                    Year {index + 1}
                  </motion.div>
                  
                  {/* Hover Sparkle */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute top-2 left-2"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <div className="space-y-6">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 50px rgba(34, 197, 94, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNextStep(6)}
                className="relative px-10 py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all group overflow-hidden"
              >
                <span className="relative z-10">Next Beautiful Surprise!</span>
                <Heart className="absolute -top-2 -right-2 w-6 h-6 text-red-300 animate-pulse" />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-2"
              >
                <p className="text-gray-500 italic">
                  (A garden of memories, just for you!)
                </p>
                <p className="text-pink-500 text-sm">
                  Spoiler: The best part is yet to come... get ready for feels!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 6: Special Message */}
        {step >= 6 && showMessage && !showFinal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            {/* Background Hearts */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.1 + Math.random() * 0.2 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  <Heart className="w-12 h-12 text-pink-300 fill-pink-200/20" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-10 relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
                Step 6: A Special Message 
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600"
              >
                This one comes straight from the heart...
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-pink-50/90 via-rose-50/90 to-pink-50/90 rounded-3xl p-8 md:p-12 border-4 border-white/50 shadow-3xl backdrop-blur-sm relative z-10"
            >
              <div className="flex flex-col items-center gap-6 mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.7 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 p-2 shadow-2xl"
                >
                  <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
                    <MessageCircleHeart className="w-12 h-12 text-pink-500" />
                  </div>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-3xl font-bold text-pink-600"
                >
                  To Someone Extra Special...
                </motion.h3>
              </div>
              
              <div className="space-y-8 text-lg text-gray-700 bg-white/50 p-8 rounded-3xl border-2 border-pink-100 shadow-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold text-pink-600 mb-6">
                    Happy 18th Birthday!
                  </p>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full mb-6"
                  >
                    <span className="text-xl font-bold text-pink-600">
                      Welcome to adulthood!
                    </span>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="space-y-6"
                >
                  <p className="text-xl leading-relaxed">
                    Wow, 18 years! That's <span className="font-bold text-pink-600">6,570 days</span> of being absolutely amazing, 
                    <span className="font-bold text-pink-600"> 157,680 hours</span> of making the world brighter, and 
                    <span className="font-bold text-pink-600"> countless moments</span> of being the incredible person you are!
                  </p>
                  
                  <p className="text-xl leading-relaxed">
                    I know you're all "grown up" now (officially!), but you'll always be that special person who brings joy wherever you go. 
                    Even when you're 80 and telling stories about "back in my day"
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="bg-gradient-to-r from-pink-100/50 to-rose-100/50 p-6 rounded-2xl border-l-4 border-pink-400 shadow-inner"
                  >
                    <p className="font-bold text-pink-700 text-xl mb-4">
                      Things that will NEVER change:
                    </p>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-pink-500 fill-pink-300" />
                        <span>You're still the most wonderful person I know</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-300" />
                        <span>Your ability to light up any room</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Cake className="w-5 h-5 text-rose-500" />
                        <span>You still get first dibs on birthday cake (always!)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-purple-500" />
                        <span>The special place you hold in our hearts</span>
                      </li>
                    </ul>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="text-center text-2xl font-bold text-rose-600 pt-6"
                  >
                    May your 18th year be filled with:
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
                  >
                    {[
                      { emoji: '✨', text: 'Magic', color: 'from-yellow-400 to-orange-400' },
                      { emoji: '💕', text: 'Love', color: 'from-pink-400 to-rose-400' },
                      { emoji: '😂', text: 'Laughter', color: 'from-blue-400 to-purple-400' },
                      { emoji: '🎂', text: 'Cake', color: 'from-amber-400 to-yellow-400' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2.4 + index * 0.1, type: "spring" }}
                        className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-white shadow-lg text-center`}
                      >
                        <div className="text-3xl mb-2">{item.emoji}</div>
                        <div className="font-bold">{item.text}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Final Celebration */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                className="mt-12 text-center space-y-8"
            >
                <div className="text-4xl md:text-5xl mb-6">
                  🎂🎁🎈✨🩷🌷💝🌟
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 3.2, type: "spring" }}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full border-2 border-pink-300/50"
                >
                  <p className="text-2xl font-bold text-pink-700">
                    With all my love on your special day!
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5 }}
                  className="pt-8 border-t border-pink-200"
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    By your pyara Arnavi 🩷
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.8 }}
                    className="text-gray-600 mt-4"
                  >
                    (Made with lots of love, code, and virtual cake!)
                  </motion.p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                  className="pt-6"
                >
                  <PartyPopper className="w-16 h-16 text-pink-500 mx-auto" />
                  <p className="text-xl text-pink-600 font-semibold mt-4">
                    Hope you loved your virtual birthday surprise!
                  </p>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNextStep(7)}
                    className="mt-8 px-10 py-5 rounded-2xl bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-black text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all group overflow-hidden"
                  >
                    <span className="relative z-10">One Last Surprise!</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 7: Final Dark Theme Message */}
        {step >= 7 && showFinal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[80vh] flex flex-col items-center justify-center relative"
          >
            {/* Dark Background with Stars */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
              {/* Stars */}
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
              
              {/* Glowing Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative z-10 text-center space-y-12"
            >
              {/* Title with Glitch Effect */}
              <div className="relative">
                <motion.h1
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-wider"
                >
                  <span className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                    CHUDAIL
                  </span>
                </motion.h1>
                
                <motion.h2
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="text-6xl md:text-8xl font-bold text-white"
                >
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                    HAI TU
                  </span>
                </motion.h2>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="text-5xl mt-8 animate-pulse"
                >
                  😋
                </motion.div>
              </div>

              {/* Spooky Animated Elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="space-y-8"
              >
                {/* Floating Ghosts */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    animate={{ 
                      y: [0, -20, 0],
                      x: [0, 10, 0]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + i * 10}%`,
                    }}
                  >
                    👻
                  </motion.div>
                ))}

                {/* Final Message */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="bg-gradient-to-r from-gray-900/50 to-black/50 p-8 rounded-3xl border-2 border-red-900/50 backdrop-blur-sm max-w-2xl mx-auto"
                >
                  <p className="text-2xl text-gray-300 mb-6">
                    Just kidding! You're the sweetest, most amazing person ever!
                  </p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-xl text-pink-400 font-semibold"
                  >
                    But seriously, happy 18th birthday! 🎉
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="mt-8 text-3xl"
                  >
                    🩷🎂🌟
                  </motion.div>
                </motion.div>

                {/* Final Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5 }}
                  className="pt-8"
                >
                  <p className="text-xl text-gray-400">
                    With love and lots of mischief,
                  </p>
                  <p className="text-2xl text-pink-500 font-bold mt-2">
                    Your Arnavi 💕
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Hearts in Dark Theme */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`dark-heart-${i}`}
                className="absolute text-2xl"
                initial={{ 
                  y: Math.random() * 100 + 100,
                  x: Math.random() * 100,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: [Math.random() * 100 + 100, -Math.random() * 200 - 100, Math.random() * 100 + 100],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              >
                ❤️
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        @keyframes glow {
          0%, 100% { 
            opacity: 0.3;
            filter: brightness(1);
          }
          50% { 
            opacity: 0.6;
            filter: brightness(1.2);
          }
        }
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0;
            transform: scale(0);
          }
          50% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
