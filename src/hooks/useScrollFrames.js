import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollFrames = (totalFrames, onFrameChange, containerRef, slowdownFactor = 1, isLocked = false) => {
  const frameIndexRef = useRef(0);
  const scrollTriggerRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || totalFrames === 0) return;

    // Stop animation if locked
    if (isLocked) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (isLocked) return;

          const rawProgress = self.progress;
          const adjustedProgress = Math.min(rawProgress * slowdownFactor, 1);
          const newTargetFrame = Math.floor(adjustedProgress * (totalFrames - 1));
          targetFrameRef.current = newTargetFrame;
        }
      });
    }, containerRef);

    // Smooth frame interpolation
    const updateFrame = () => {
      if (isLocked) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      const lerpFactor = 0.15;
      const newFrame = current + (target - current) * lerpFactor;
      const roundedFrame = Math.round(newFrame);

      if (roundedFrame !== frameIndexRef.current) {
        frameIndexRef.current = roundedFrame;
        currentFrameRef.current = newFrame;
        onFrameChange(roundedFrame);
      } else {
        currentFrameRef.current = newFrame;
      }

      rafIdRef.current = requestAnimationFrame(updateFrame);
    };

    rafIdRef.current = requestAnimationFrame(updateFrame);

    return () => {
      ctx.revert();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [totalFrames, onFrameChange, containerRef, slowdownFactor, isLocked]);

  return frameIndexRef;
};
