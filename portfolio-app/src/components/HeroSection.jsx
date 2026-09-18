import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameCanvas from './FrameCanvas';
import OverlayCards from './OverlayCards';
import FinalCards from './FinalCards';
import { useScrollFrames } from '../hooks/useScrollFrames';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;
const SLOWDOWN_FACTOR = 0.9;
const END_THRESHOLD = 0.95; // 95% progress triggers ending

// Color stops for background interpolation
const colorStops = [
  { progress: 0, color: { r: 218, g: 222, b: 224 } },    // #dadee0
  { progress: 0.25, color: { r: 169, g: 170, b: 167 } }, // #a9aaa7
  { progress: 0.5, color: { r: 0, g: 0, b: 0 } },        // #000000
  { progress: 0.75, color: { r: 11, g: 16, b: 17 } },    // #0b1011
  { progress: 1, color: { r: 29, g: 35, b: 38 } }        // #1d2326
];

const interpolateColor = (progress) => {
  let startStop = colorStops[0];
  let endStop = colorStops[colorStops.length - 1];

  for (let i = 0; i < colorStops.length - 1; i++) {
    if (progress >= colorStops[i].progress && progress <= colorStops[i + 1].progress) {
      startStop = colorStops[i];
      endStop = colorStops[i + 1];
      break;
    }
  }

  const range = endStop.progress - startStop.progress;
  const localProgress = range === 0 ? 0 : (progress - startStop.progress) / range;

  const r = Math.round(startStop.color.r + (endStop.color.r - startStop.color.r) * localProgress);
  const g = Math.round(startStop.color.g + (endStop.color.g - startStop.color.g) * localProgress);
  const b = Math.round(startStop.color.b + (endStop.color.b - startStop.color.b) * localProgress);

  return `rgb(${r}, ${g}, ${b})`;
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(interpolateColor(0));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isAnimationLocked, setIsAnimationLocked] = useState(false);

  // Scroll blocking handlers
  const preventScrollRef = useRef(null);
  const preventTouchRef = useRef(null);
  const preventKeysRef = useRef(null);

  const handleFrameChange = useCallback((frameIndex) => {
    if (!isAnimationLocked) {
      setCurrentFrame(frameIndex);
    }
  }, [isAnimationLocked]);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleScrollToPortfolio = useCallback(() => {
    // Remove scroll lock
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    // Remove all blocking event listeners
    if (preventScrollRef.current) {
      window.removeEventListener("wheel", preventScrollRef.current, { passive: false });
      preventScrollRef.current = null;
    }
    if (preventTouchRef.current) {
      window.removeEventListener("touchmove", preventTouchRef.current, { passive: false });
      preventTouchRef.current = null;
    }
    if (preventKeysRef.current) {
      window.removeEventListener("keydown", preventKeysRef.current);
      preventKeysRef.current = null;
    }

    // Disable ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Smooth scroll to next section
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Setup scroll-based effects
  useEffect(() => {
    if (!containerRef.current || !isLoaded || isAnimationLocked) return;

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (isAnimationLocked) return;

          const rawProgress = self.progress;
          const adjustedProgress = Math.min(rawProgress * SLOWDOWN_FACTOR, 1);

          setScrollProgress(adjustedProgress);

          // Check if we've reached the end threshold
          if (adjustedProgress >= END_THRESHOLD && !hasReachedEnd) {
            setHasReachedEnd(true);
            setIsAnimationLocked(true);
            // Lock at final frame
            setCurrentFrame(TOTAL_FRAMES - 1);

            // COMPLETE SCROLL LOCK - NO AUTO-SCROLL
            // 1. Hide overflow on both body and html
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";

            // 2. Save current scroll position
            const lockY = window.scrollY;

            // 3. Force scroll position
            window.scrollTo(0, lockY);

            // 4. Block ALL scroll inputs
            const preventScroll = (e) => {
              e.preventDefault();
              e.stopPropagation();
            };

            const preventKeys = (e) => {
              const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"];
              if (keys.includes(e.code) || e.code === "Space") {
                e.preventDefault();
                e.stopPropagation();
              }
            };

            preventScrollRef.current = preventScroll;
            preventTouchRef.current = preventScroll;
            preventKeysRef.current = preventKeys;

            window.addEventListener("wheel", preventScroll, { passive: false });
            window.addEventListener("touchmove", preventScroll, { passive: false });
            window.addEventListener("keydown", preventKeys, false);
          }

          // Update background color
          setBackgroundColor(interpolateColor(adjustedProgress));

          // Update zoom
          if (canvasWrapperRef.current && !hasReachedEnd) {
            const scale = 1 + adjustedProgress * 0.05;
            gsap.set(canvasWrapperRef.current, {
              scale,
              ease: 'power3.out'
            });
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      // Cleanup event listeners on unmount
      if (preventScrollRef.current) {
        window.removeEventListener("wheel", preventScrollRef.current, { passive: false });
      }
      if (preventTouchRef.current) {
        window.removeEventListener("touchmove", preventTouchRef.current, { passive: false });
      }
      if (preventKeysRef.current) {
        window.removeEventListener("keydown", preventKeysRef.current);
      }
    };
  }, [isLoaded, hasReachedEnd, isAnimationLocked]);

  // Initialize frame-based scroll
  useScrollFrames(TOTAL_FRAMES, handleFrameChange, containerRef, SLOWDOWN_FACTOR, isAnimationLocked);

  return (
    <div
      ref={containerRef}
      style={{
        height: '200vh',
        position: 'relative',
        backgroundColor,
        transition: 'background-color 0.1s ease-out'
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1
          }}
        />

        {/* Canvas wrapper with rounded corners and soft edge fade */}
        <div
          ref={canvasWrapperRef}
          style={{
            width: 'calc(100% - 8%)',
            height: 'calc(100% - 8%)',
            position: 'relative',
            transformOrigin: 'center center',
            borderRadius: '20px',
            overflow: 'hidden',
            maskImage: 'radial-gradient(ellipse 100% 100% at center, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at center, black 60%, transparent 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
          }}
        >
          <FrameCanvas
            totalFrames={TOTAL_FRAMES}
            currentFrame={currentFrame}
            onLoadComplete={handleLoadComplete}
          />
        </div>

        {/* Overlay Cards (progressive appearance) */}
        {isLoaded && !hasReachedEnd && <OverlayCards scrollProgress={scrollProgress} />}

        {/* Final Cards (appear at end with lock) */}
        {isLoaded && hasReachedEnd && (
          <FinalCards onScrollClick={handleScrollToPortfolio} />
        )}
      </div>
    </div>
  );
};

export default HeroSection;