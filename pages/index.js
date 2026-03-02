import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const imageContainerRef = useRef(null)
  const statsRef = useRef([])
  const textBox1Ref = useRef(null)
  const textBox2Ref = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      const letters = headlineRef.current.querySelectorAll('.letter')
      const totalLetters = letters.length
      
      // Create a timeline for the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=3500',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })
      
      // Car moves from left to right (goes all the way)
      tl.fromTo(
        imageContainerRef.current,
        { x: '-20%' },
        { x: '105%', ease: 'none', duration: 1 },
        0
      )

      // Text boxes fade in slowly while car is moving
      tl.fromTo(
        textBox1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: 'power2.out' },
        0.35
      )
      
      tl.fromTo(
        textBox2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: 'power2.out' },
        0.5
      )

      // Each letter appears one by one behind the car
      letters.forEach((letter, index) => {
        const startTime = (index / totalLetters) * 0.9
        
        tl.fromTo(
          letter,
          {
            opacity: 0,
            scale: 0,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.05,
            ease: 'back.out(1.7)',
          },
          startTime
        )
      })

      // Stats appear at the end
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.1, stagger: 0.02 },
        0.92
      )
    }, heroRef)

    return () => ctx.revert()
  }, [mounted])

  const stats = [
    { value: '99%', label: 'Client Satisfaction Rate' },
    { value: '250+', label: 'Projects Delivered' },
    { value: '50+', label: 'Global Partners' },
    { value: '24/7', label: 'Support Available' },
  ]

  return (
    <>
      <Head>
        <title>Scroll Hero Animation - ITZFIZZ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Hero Section - Child-Friendly Design */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #a8edea 0%, #fed6e3 100%)',
          }}
        >
          {/* Animated Clouds Background */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="cloud absolute top-20 left-10 w-32 h-20 bg-white/40 rounded-full blur-xl"></div>
            <div className="cloud absolute top-40 right-20 w-40 h-24 bg-white/30 rounded-full blur-xl" style={{ animationDelay: '5s' }}></div>
            <div className="cloud absolute bottom-40 left-1/4 w-36 h-22 bg-white/35 rounded-full blur-xl" style={{ animationDelay: '10s' }}></div>
            <div className="cloud absolute top-1/3 right-1/3 w-28 h-18 bg-white/25 rounded-full blur-xl" style={{ animationDelay: '15s' }}></div>
          </div>

          {/* Soft Road */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-40 -translate-y-1/2"
              style={{
                background: 'linear-gradient(to bottom, rgba(169, 169, 169, 0.3) 0%, rgba(105, 105, 105, 0.5) 45%, rgba(105, 105, 105, 0.5) 55%, rgba(169, 169, 169, 0.3) 100%)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Road center line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 flex gap-8 overflow-hidden opacity-60">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="h-full w-12 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Car Container - Extra Large, starts from extreme left */}
          <div
            ref={imageContainerRef}
            className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] md:w-[550px] lg:w-[650px] xl:w-[750px] h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] pointer-events-none z-30 soft-shadow"
          >
            <img
              src="/figure-1.png"
              alt="Car"
              className="w-full h-full object-contain transform rotate-90 transition-all duration-300"
              style={{ 
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))',
              }}
            />
          </div>

          {/* Text Boxes at Top - Appear during animation */}
          <div className="absolute top-10 left-0 right-0 z-20 px-6">
            <div className="flex justify-center gap-8 max-w-6xl mx-auto">
              <div
                ref={textBox1Ref}
                className="bg-white/70 backdrop-blur-md border-2 border-white rounded-2xl p-6 shadow-xl opacity-0"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                }}
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#7C3AED' }}>
                  Welcome to ITZFIZZ! 🎉
                </h3>
                <p className="text-base" style={{ color: '#6B21A8' }}>
                  Enjoy the smooth journey as our car reveals the message!
                </p>
              </div>
              <div
                ref={textBox2Ref}
                className="bg-white/70 backdrop-blur-md border-2 border-white rounded-2xl p-6 shadow-xl opacity-0"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                }}
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#7C3AED' }}>
                  Fun Animation ✨
                </h3>
                <p className="text-base" style={{ color: '#6B21A8' }}>
                  Watch the letters appear one by one behind the car!
                </p>
              </div>
            </div>
          </div>

          {/* Letters - Appear one by one behind the car */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10">
            <div
              ref={headlineRef}
              className="flex items-center justify-start gap-2 md:gap-3 lg:gap-4 xl:gap-5 pl-[5%] pr-[5%]"
            >
              {'WELCOMEITZFIZZ'.split('').map((char, index) => (
                <span
                  key={index}
                  className="letter text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold opacity-0"
                  style={{ 
                    fontFamily: "'Fredoka', sans-serif",
                    color: '#5B21B6',
                    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: 'scale(0) translateY(30px)',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Container - Soft, child-friendly design */}
          <div className="absolute bottom-20 left-0 right-0 z-10 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto opacity-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  className="bg-white/60 backdrop-blur-sm border-2 border-white/80 rounded-3xl p-4 md:p-6 hover:bg-white/80 transition-all duration-300 shadow-lg"
                >
                  <div 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                    style={{ 
                      fontFamily: "'Fredoka', sans-serif",
                      color: '#7C3AED',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-xs md:text-sm font-medium"
                    style={{ color: '#6B21A8' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator - Child-friendly */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span 
                className="text-sm uppercase tracking-wider font-semibold"
                style={{ 
                  fontFamily: "'Fredoka', sans-serif",
                  color: '#7C3AED',
                }}
              >
                Scroll to See Magic ✨
              </span>
              <svg
                className="w-8 h-8"
                style={{ color: '#7C3AED' }}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Additional Content Section - Soft and calming */}
        <section 
          className="min-h-screen flex items-center justify-center px-6"
          style={{
            background: 'linear-gradient(to bottom, #fed6e3 0%, #fbc2eb 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ 
                fontFamily: "'Fredoka', sans-serif",
                color: '#5B21B6',
              }}
            >
              Learning Made Fun! 🎉
            </h2>
            <p 
              className="text-xl md:text-2xl leading-relaxed mb-12"
              style={{ color: '#6B21A8' }}
            >
              Our animations are designed to be calm, smooth, and easy to follow.
              Perfect for creating a comfortable learning environment.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white/60 rounded-3xl border-2 border-white shadow-lg">
                <div className="text-5xl mb-4">🚀</div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ 
                    fontFamily: "'Fredoka', sans-serif",
                    color: '#7C3AED',
                  }}
                >
                  Smooth Motion
                </h3>
                <p style={{ color: '#6B21A8' }}>Slow, predictable animations</p>
              </div>
              <div className="p-8 bg-white/60 rounded-3xl border-2 border-white shadow-lg">
                <div className="text-5xl mb-4">✨</div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ 
                    fontFamily: "'Fredoka', sans-serif",
                    color: '#7C3AED',
                  }}
                >
                  Calm Design
                </h3>
                <p style={{ color: '#6B21A8' }}>Soft colors, no harsh effects</p>
              </div>
              <div className="p-8 bg-white/60 rounded-3xl border-2 border-white shadow-lg">
                <div className="text-5xl mb-4">🎨</div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ 
                    fontFamily: "'Fredoka', sans-serif",
                    color: '#7C3AED',
                  }}
                >
                  Easy to Read
                </h3>
                <p style={{ color: '#6B21A8' }}>Large, rounded fonts for clarity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="py-12 text-center border-t-2"
          style={{
            background: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <p 
            className="text-lg"
            style={{ 
              fontFamily: "'Fredoka', sans-serif",
              color: 'white',
            }}
          >
            Built with 💜 for ITZFIZZ Assignment  BY DRK© 2026
          </p>
        </footer>
      </main>
    </>
  )
}
