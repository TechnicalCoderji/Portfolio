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
const END_THRESHOLD = 0.95; // 95% progress triggers ending lock

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

const HeroSection = ({ onUnlockScroll, onIntroComplete }) => {
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

  const handleFrameChange = useCallback((frameIndex) => {
    if (!isAnimationLocked) {
      setCurrentFrame(frameIndex);
    }
  }, [isAnimationLocked]);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleScrollToProjects = useCallback(() => {
    // 1. Restore scroll position
    const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);

    // 2. Kill ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // 3. Notify App to reveal Navbar
    if (onUnlockScroll) {
      onUnlockScroll();
    }

    // 4. Smooth scroll to Projects section
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 10);
  }, [onUnlockScroll]);

  // Setup scroll-based animation and lock
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

          // Check if intro animation reaches end (>= 95%)
          if (adjustedProgress >= END_THRESHOLD && !hasReachedEnd) {
            setHasReachedEnd(true);
            setIsAnimationLocked(true);
            
            // Freeze frame completely at final frame
            setCurrentFrame(TOTAL_FRAMES - 1);

            // Show navbar immediately
            if (onIntroComplete) {
              onIntroComplete();
            }

            // HARD SCROLL LOCK: position fixed
            const lockY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${lockY}px`;
            document.body.style.width = "100%";
          }

          // Update background color continuously during scroll
          setBackgroundColor(interpolateColor(adjustedProgress));

          // Update zoom effect on canvas wrapper
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
            background: 'radial-gradient(circle at center, transparent 30%, rgba(12,19,26,0.6) 100%)',
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
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
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
          <FinalCards onScrollClick={handleScrollToProjects} />
        )}
      </div>
    </div>
  );
};

export default HeroSection;