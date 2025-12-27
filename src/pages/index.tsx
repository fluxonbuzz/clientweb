'use client';

import { useState, useEffect } from 'react';
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
  VolumeX
} from 'lucide-react';
import Image from 'next/image';

export default function SejalsBirthday() {
  const [candlesLit, setCandlesLit] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [visibleComponents, setVisibleComponents] = useState<string[]>([]);

  // Local assets
  const tulipImages = [
    '/assets/tulip1.jpg',
    '/assets/tulip2.jpg', 
    '/assets/tulip3.jpg',
    '/assets/tulip4.jpg',
    '/assets/tulip5.jpg'
  ];

  const cakeImages = [
    '/assets/cake1.jpg',
    '/assets/cake2.jpg',
    '/assets/cake3.jpg'
  ];

  // Get the appropriate cake image
  const getCakeImage = () => {
    if (cakeCut && cakeImages[2]) {
      return cakeImages[2];
    }
    return cakeImages[0] || '';
  };

  // Music player
  const toggleMusic = () => {
    if (!audio) return;
    
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    setMusicPlaying(!musicPlaying);
  };

  // Component reveal sequence
  useEffect(() => {
    const sequence = [
      'header',
      'message',
      'cakeSection',
      'tulipGarden',
      'stats',
      'musicPlayer',
      'finalMessage'
    ];

    sequence.forEach((component, index) => {
      setTimeout(() => {
        setVisibleComponents(prev => [...prev, component]);
      }, index * 500);
    });

    // Auto light candles after 2 seconds
    setTimeout(() => {
      setCandlesLit(true);
    }, 2000);

    // Initialize audio
    const newAudio = new Audio('/assets/sejal.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.5;
    setAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.pause();
      }
    };
  }, []);

  const handleLightCandles = () => {
    setCandlesLit(true);
    setTimeout(() => {
      setMessageVisible(true);
    }, 500);
  };

  const handleMakeWish = () => {
    setWishMade(true);
    setConfetti(true);
    
    setTimeout(() => {
      setConfetti(false);
    }, 3000);
  };

  const handleCutCake = () => {
    setCakeCut(true);
    if (!confetti) {
      setConfetti(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden">
      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-all hover:scale-110"
      >
        {musicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Confetti */}
      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(100)].map((_, i) => (
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
                  width: 10 + Math.random() * 20,
                  height: 10 + Math.random() * 20,
                  background: `hsl(${Math.random() * 60 + 300}, 100%, 65%)`,
                  borderRadius: '50%'
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Header - Appears first */}
        <AnimatePresence>
          {visibleComponents.includes('header') && (
            <motion.header
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block mb-4"
              >
                <PartyPopper className="w-16 h-16 text-pink-500 mx-auto" />
              </motion.div>
              
              <motion.h1
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent"
              >
                Happy 18th Birthday Sejal! 🎉
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4 text-pink-600"
              >
                <Star className="w-6 h-6 fill-pink-400" />
                <span className="text-xl font-semibold">Welcome to Adulthood!</span>
                <Star className="w-6 h-6 fill-pink-400" />
              </motion.div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Birthday Message - Appears second */}
        <AnimatePresence>
          {visibleComponents.includes('message') && (
            <motion.section
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-12 border-4 border-pink-200 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <MessageCircleHeart className="w-10 h-10 text-pink-500" />
                <h2 className="text-3xl font-bold text-pink-700">A Special Message for You 💌</h2>
              </div>
              
              <div className="space-y-4 text-lg text-gray-700">
                <p className="text-xl text-pink-600 font-semibold">
                  Hey Sejal! Can you believe you're 18 already?! 🎂
                </p>
                
                <p>
                  Welcome to the amazing world of being an adult! It feels like just yesterday you were a little kid, 
                  and now look at you - all grown up and ready to take on the world! 🌍
                </p>
                
                <p>
                  Today is YOUR day - a day to feel special, loved, and celebrated! You deserve all the happiness 
                  in the world, and so much more. You're an incredible person with such a bright future ahead of you. ✨
                </p>
                
                <p className="text-pink-600 font-semibold">
                  May all your dreams come true, may you achieve everything you want in life, 
                  and may you always stay as amazing as you are today! 💖
                </p>
                
                <div className="flex items-center gap-2 mt-6 text-pink-500">
                  <Heart className="w-5 h-5 fill-pink-400" />
                  <span className="text-lg font-semibold">With lots of love and birthday wishes!</span>
                  <Heart className="w-5 h-5 fill-pink-400" />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Interactive Birthday Cake Section - Appears third */}
        <AnimatePresence>
          {visibleComponents.includes('cakeSection') && (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              {/* Cake Display */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-8 border-4 border-pink-200 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Cake className="w-8 h-8 text-pink-600" />
                  <h3 className="text-2xl font-bold text-pink-700">Birthday Cake Time! 🎂</h3>
                </div>

                {/* Cake Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 mb-6 rounded-2xl overflow-hidden border-4 border-white shadow-lg"
                >
                  <Image
                    src={getCakeImage()}
                    alt="Beautiful Birthday Cake"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  
                  {/* Animated Candles */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 flex gap-3">
                    {[...Array(18)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={candlesLit ? {
                          y: [0, -5, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: i * 0.1
                        }}
                        className="relative w-3"
                      >
                        {/* Candle */}
                        <div className="w-3 h-8 bg-gradient-to-b from-pink-300 to-rose-400 rounded-t-lg mx-auto" />
                        
                        {/* Flame */}
                        {candlesLit && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                          >
                            <div className="w-4 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full blur-sm" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Cake Actions */}
                <div className="space-y-4">
                  <button
                    onClick={handleLightCandles}
                    disabled={candlesLit}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      candlesLit 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 cursor-default' 
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
                    } text-white shadow-lg`}
                  >
                    {candlesLit ? '🎉 Candles Are Lit! 🎉' : '✨ Light the Candles ✨'}
                  </button>

                  {candlesLit && !wishMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button
                        onClick={handleMakeWish}
                        className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                      >
                        🤫 Make a Wish! 🤫
                      </button>
                    </motion.div>
                  )}

                  {wishMade && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <button
                        onClick={handleCutCake}
                        disabled={cakeCut}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                          cakeCut
                            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 cursor-default'
                            : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                        } text-white shadow-lg`}
                      >
                        {cakeCut ? '🍰 Cake is Cut! Time to Eat! 🍰' : '🎂 Cut the Cake! 🎂'}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Birthday Activities - Right side appears later */}
              <div className="space-y-6">
                {/* Tulip Garden - Appears fourth */}
                {visibleComponents.includes('tulipGarden') && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-6 border-4 border-pink-200 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Flower2 className="w-8 h-8 text-pink-600" />
                      <h4 className="text-2xl font-bold text-pink-700">Your Tulip Garden 🌷</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {tulipImages.map((src, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          className="relative h-32 rounded-xl overflow-hidden border-2 border-white shadow-md"
                        >
                          <Image
                            src={src}
                            alt={`Beautiful tulip ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Birthday Wishes Coming True */}
                {wishMade && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 border-4 border-purple-200 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                      <h4 className="text-2xl font-bold text-purple-700">Your Wish is Coming True! ✨</h4>
                    </div>
                    <p className="text-lg text-purple-600">
                      Your secret wish has been sent to the birthday stars! 🌟 
                      It's going to come true soon, we just know it!
                    </p>
                  </motion.div>
                )}

                {/* Birthday Stats - Appears fifth */}
                {visibleComponents.includes('stats') && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-6 border-4 border-pink-200 shadow-xl"
                  >
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-xl bg-white/50"
                      >
                        <div className="text-3xl font-bold text-pink-600">18</div>
                        <div className="text-sm text-pink-500">Amazing Years!</div>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 rounded-xl bg-white/50"
                      >
                        <div className="text-3xl font-bold text-rose-600">∞</div>
                        <div className="text-sm text-rose-500">Future Possibilities</div>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="p-4 rounded-xl bg-white/50"
                      >
                        <div className="text-3xl font-bold text-purple-600">100%</div>
                        <div className="text-sm text-purple-500">Special Today</div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Music Player - Appears sixth */}
                {visibleComponents.includes('musicPlayer') && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-6 border-4 border-pink-200 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Music className="w-8 h-8 text-pink-600" />
                      <h4 className="text-2xl font-bold text-pink-700">Birthday Music 🎵</h4>
                    </div>
                    <button 
                      onClick={toggleMusic}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
                    >
                      {musicPlaying ? '⏸️ Pause Music' : '🎶 Play Birthday Music!'}
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Final Birthday Message - Appears last */}
        <AnimatePresence>
          {visibleComponents.includes('finalMessage') && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-center bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-3xl p-8 border-4 border-pink-300/50 shadow-2xl"
            >
              <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-pink-700 mb-6">
                Sejal, You're Officially 18! 🥳
              </h2>
              <p className="text-2xl text-pink-600 font-semibold mb-4">
                This is just the beginning of your amazing journey!
              </p>
              <p className="text-lg text-gray-700">
                Remember to laugh a lot, dream big, and enjoy every moment of being 18. 
                You're going to do incredible things! We're all so proud of you and can't wait 
                to see all the amazing things you'll accomplish. 🚀
              </p>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-8"
              >
                <div className="text-6xl">🎂🎉🎁✨</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 py-6 text-center border-t border-pink-200 bg-white/50">
        <div className="container mx-auto px-4">
          <p className="text-pink-600 font-semibold">
            Made with 💖 for Sejal's Special 18th Birthday
          </p>
          <p className="text-pink-500 mt-2">
            May your year be filled with joy, laughter, and beautiful tulips! 🌷
          </p>
          
          <div className="mt-6 inline-flex gap-6 text-pink-600">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              <span>Take lots of photos!</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span>Enjoy your gifts!</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-pink-400" />
              <span>Feel loved today!</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
