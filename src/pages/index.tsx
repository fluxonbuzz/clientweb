'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cake, 
  Gift, 
  Heart, 
  Sparkles, 
  Music, 
  Camera,
  PartyPopper,
  Star,
  Flower2,
  MessageCircleHeart,
  Volume2,
  VolumeX,
  User,
  Smile
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
  const [funnyMessages, setFunnyMessages] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const funnyQuotes = [
    "Wait, you're telling me you're NOT a teenager anymore? 🤔",
    "18 years of putting up with us... you deserve a pyara sa tulip! 🌷",
    "Birthday tip: Eat cake for breakfast. It's scientifically proven! 🧪",
    "Warning: Adulting may cause sudden urges to buy plants 🪴",
    "Remember when 18 seemed old? 😂 Welcome to the buddhe log!",
    "Pro tip: You can now vote but still blame being 'young' 🗳️",
    "18 = Legally adult, but forever our little Didi 💕"
  ];

  useEffect(() => {
    audioRef.current = new Audio('/assets/didi-birthday.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
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

  const addFunnyMessage = () => {
    const availableQuotes = funnyQuotes.filter(quote => !funnyMessages.includes(quote));
    if (availableQuotes.length > 0) {
      const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
      if (randomQuote) {
        setFunnyMessages(prev => [...prev, randomQuote]);
      }
    }
  };

  const handleStart = () => {
    setStep(1);
    setTimeout(() => addFunnyMessage(), 500);
    
    if (!musicPlaying && audioRef.current) {
      audioRef.current.play().then(() => {
        setMusicPlaying(true);
      });
    }
  };

  const handleLightCandles = () => {
    setCandlesLit(true);
    setStep(2);
    setTimeout(() => {
      addFunnyMessage();
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1500);
    }, 1000);
  };

  const handleMakeWish = () => {
    setWishMade(true);
    setStep(3);
    setTimeout(() => {
      addFunnyMessage();
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
    }, 1000);
  };

  const handleCutCake = () => {
    setCakeCut(true);
    setConfetti(true);
    setTimeout(() => {
      setShowCakeCut(true);
      setStep(4);
      addFunnyMessage();
      setTimeout(() => setConfetti(false), 2500);
    }, 800);
  };

  const handleNextStep = (nextStep: number) => {
    setStep(nextStep);
    if (nextStep === 5) setShowTulips(true);
    if (nextStep === 6) setShowMessage(true);
    addFunnyMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 opacity-10">
          <Cake className="w-24 h-24 text-pink-300" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Heart className="w-24 h-24 text-rose-300" />
        </div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 20}px`
            }}
          >
            {['🌷', '🎂', '🩷', '✨', '🥳', '🎈'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-110"
        title={musicPlaying ? "Mute music" : "Play music"}
      >
        {musicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>

      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                animate={{ 
                  y: window.innerHeight,
                  x: Math.random() * 200 - 100 + (Math.random() * window.innerWidth),
                  rotate: 360,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random(),
                  ease: "easeOut"
                }}
                className="absolute"
                style={{
                  width: 8 + Math.random() * 15,
                  height: 8 + Math.random() * 15,
                  background: `hsl(${Math.random() * 60 + 300}, 100%, 65%)`,
                  borderRadius: '50%'
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-20"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-block mb-8"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Cake className="w-20 h-20 text-pink-500" />
                </div>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              🎂 SURPRISE DIDI! 🎂
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Someone's turning <span className="font-bold text-pink-600">18</span> and trying to act all grown up!<br />
              Let's celebrate properly... with cake first, obviously! 🍰
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
            >
              🎉 Let's Start the Party! 🎉
            </motion.button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
              {musicPlaying ? (
                <>
                  <Music size={16} className="text-pink-500" />
                  <span>Music is playing! 🎵</span>
                </>
              ) : (
                <>
                  <VolumeX size={16} className="text-yellow-500" />
                  <span>Click anywhere to start music! 🎵</span>
                </>
              )}
            </div>
            
            <p className="text-gray-500 mt-6 text-sm">
              P.S. There might be cake. Just saying. 🍰
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-pink-700 mb-4">Step 1: The Birthday Cake! 🎂</h2>
              <p className="text-lg text-gray-600">Look at this beauty! Freshly baked with 18 candles waiting for you!</p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-80 mb-8 rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
            >
              <Image
                src="/assets/cake-whole.jpg"
                alt="Whole birthday cake with candles"
                fill
                className="object-cover"
                unoptimized
              />
              
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 flex gap-2 flex-wrap justify-center max-w-full px-4">
                {[...Array(18)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative"
                  >
                    <div className="w-2 h-12 bg-gradient-to-b from-yellow-100 to-amber-200 rounded-t-lg mx-auto" />
                    
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-3 h-4 bg-gray-300 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLightCandles}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
            >
              ✨ Light Those Candles! ✨
            </motion.button>
            
            <p className="text-gray-500 mt-4">
              (Don't worry, we have fire extinguishers. Probably. 🔥)
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-pink-700 mb-4">Step 2: Make a Wish! 🤫</h2>
              <p className="text-lg text-gray-600">Quick! Blow them out before the wax ruins the frosting!</p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-80 mb-8 rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
            >
              <Image
                src="/assets/cake-whole.jpg"
                alt="Birthday cake with lit candles"
                fill
                className="object-cover"
                unoptimized
              />
              
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 flex gap-2 flex-wrap justify-center max-w-full px-4">
                {[...Array(18)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={candlesLit ? {
                      y: [0, -3, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.05
                    }}
                    className="relative"
                  >
                    <div className="w-2 h-12 bg-gradient-to-b from-yellow-100 to-amber-200 rounded-t-lg mx-auto" />
                    
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-4 h-6 bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 rounded-full blur-sm" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMakeWish}
              disabled={wishMade}
              className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all ${
                wishMade
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 cursor-default'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
              } text-white`}
            >
              {wishMade ? '🎉 Wish Made! 🎉' : '🤫 Blow & Make a Wish! 🤫'}
            </motion.button>
            
            <p className="text-gray-500 mt-4">
              (No peeking! We can't tell you if it'll come true! 🌟)
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-pink-700 mb-4">Step 3: The Best Part! 🔪🎂</h2>
              <p className="text-lg text-gray-600">Time to cut the cake! Don't worry, we'll save you the corner piece!</p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-80 mb-8 rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
            >
              <Image
                src="/assets/cake-whole.jpg"
                alt="Birthday cake ready to cut"
                fill
                className="object-cover"
                unoptimized
              />
              
              {!cakeCut && (
                <motion.div
                  animate={{ x: [0, 100, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-1/2 left-1/4 w-16 h-16"
                >
                  <div className="w-16 h-1 bg-white rotate-45" />
                </motion.div>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCutCake}
              disabled={cakeCut}
              className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all ${
                cakeCut
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 cursor-default'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
              } text-white`}
            >
              {cakeCut ? '🎂 Cake is Cut! 🎂' : '🔪 Cut the Cake! 🔪'}
            </motion.button>
            
            <p className="text-gray-500 mt-4">
              (The first slice is always the messiest. That's a rule! 🍰)
            </p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-pink-700 mb-4">Perfect! Look at that slice! 🍰</h2>
              <p className="text-lg text-gray-600">Now THAT'S what we call a proper birthday cake slice!</p>
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative h-80 mb-8 rounded-3xl overflow-hidden border-4 border-white shadow-2xl mx-auto max-w-lg"
            >
              <Image
                src="/assets/cake-cut.jpg"
                alt="Delicious cake slice"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNextStep(5)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
              >
                🌷 Next: Your Tulip Garden! 🌷
              </motion.button>
              
              <p className="text-gray-500">
                (Because cake and flowers make everything better! 💐)
              </p>
            </div>
          </motion.div>
        )}

        {step >= 5 && showTulips && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-pink-700 mb-4">Your Tulip Garden! 🌷</h2>
              <p className="text-lg text-gray-600">18 tulips for 18 amazing years! They're not real, but the love is! 💕</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {Array.from({ length: 18 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
                  className="relative h-32 rounded-xl overflow-hidden border-2 border-white shadow-lg"
                >
                  <Image
                    src={`/assets/tulip${(index % 5) + 1}.jpg`}
                    alt={`Tulip ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNextStep(6)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
            >
              💌 Next: Pyara Message! 💌
            </motion.button>
          </motion.div>
        )}

        {step >= 6 && showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 border-4 border-pink-200 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <MessageCircleHeart className="w-12 h-12 text-pink-500" />
              <h2 className="text-4xl font-bold text-pink-700">A Message For Our Didi! 💝</h2>
            </div>
            
            <div className="space-y-6 text-lg text-gray-700 bg-white/50 p-6 rounded-2xl">
              <p className="text-2xl text-center font-semibold text-pink-600">
                Happyyyy 18th Birthday, Didi! 🎉
              </p>
              
              <p>
                Wowwww, 18 years! That's <span className="font-bold text-pink-600">6,570 days</span> of being prettyyyy, 
                <span className="font-bold text-pink-600"> 157,680 hours</span> of making me smile, and 
                <span className="font-bold text-pink-600"> too many moments</span> to count of being the best Didi ever!
              </p>
              
              <p>
                I know you're all "grown up" now (officially!), but you'll always be our little sister or maybe dadi ma. 
                Even when you're 80 and telling kids about "the good old days" 📱➡️🧓
              </p>
              
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-4 rounded-xl border-l-4 border-pink-400">
                <p className="font-bold text-pink-700">Things that won't change now that you're 18:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>You're still the cutest person we know 🩷</li>
                  <li>i will still ask you for practical file help (sorry not sorry) 💻</li>
                  <li>You still get first dibs on birthday cake 🍰</li>
                  <li>I will always be proud of you, no matter what! 🌟</li>
                </ul>
              </div>
              
              <p className="text-center text-xl font-bold text-rose-600">
                May your 18th year be filled with laughter, love, and lots of cake! 🎂✨
              </p>
              
              <div className="flex justify-center gap-4 text-pink-500 mt-6">
                <Heart className="w-8 h-8 fill-pink-300" />
                <Heart className="w-8 h-8 fill-pink-300" />
                <Heart className="w-8 h-8 fill-pink-300" />
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-6xl mb-6">
                🎂🎁🎈✨🩷🌷
              </div>
              
              <p className="text-lg text-pink-600 font-semibold">
                With all our love on your special day! 💖
              </p>
            </div>
          </motion.div>
        )}

        {step > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-pink-600">Birthday Progress:</span>
              <span className="text-sm font-bold text-pink-700">{step}/6 Complete</span>
            </div>
            <div className="w-full bg-pink-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 6) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-pink-500 mt-2">
              <span>Cake</span>
              <span>Wish</span>
              <span>Cut</span>
              <span>Tulips</span>
              <span>Message</span>
              <span>Celebrate!</span>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
