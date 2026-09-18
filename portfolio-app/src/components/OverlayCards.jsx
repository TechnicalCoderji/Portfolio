import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './OverlayCards.css';

const OverlayCards = ({ scrollProgress }) => {
  const cardRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null)
  };

  // Track which cards have been shown
  const shownCards = useRef(new Set());

  useEffect(() => {
    // Card 1: "Hi, I'm Dip Parmar" - Show at 15%+, keep visible
    if (cardRefs[1].current && scrollProgress >= 0.15 && !shownCards.current.has(1)) {
      shownCards.current.add(1);
      gsap.fromTo(cardRefs[1].current,
        { opacity: 0, y: 40, blur: 10 },
        { opacity: 1, y: 0, blur: 0, duration: 1, ease: 'expo.out' }
      );
    }

    // Card 2: "Code is easy thinking is rare" - Show at 30%+, keep visible
    if (cardRefs[2].current && scrollProgress >= 0.3 && !shownCards.current.has(2)) {
      shownCards.current.add(2);
      gsap.fromTo(cardRefs[2].current,
        { opacity: 0, y: 40, blur: 10 },
        { opacity: 1, y: 0, blur: 0, duration: 1, ease: 'expo.out' }
      );
    }

    // Card 3: "Engineer by skill" - Show at 45%+, keep visible
    if (cardRefs[3].current && scrollProgress >= 0.45 && !shownCards.current.has(3)) {
      shownCards.current.add(3);
      gsap.fromTo(cardRefs[3].current,
        { opacity: 0, y: 40, blur: 10 },
        { opacity: 1, y: 0, blur: 0, duration: 1, ease: 'expo.out' }
      );
    }

    // Card 4: "Strategist by mindset" - Show at 60%+, keep visible
    if (cardRefs[4].current && scrollProgress >= 0.6 && !shownCards.current.has(4)) {
      shownCards.current.add(4);
      gsap.fromTo(cardRefs[4].current,
        { opacity: 0, y: 40, blur: 10 },
        { opacity: 1, y: 0, blur: 0, duration: 1, ease: 'expo.out' }
      );
    }
  }, [scrollProgress]);

  return (
    <div className="overlay-cards">
      {/* Noise overlay for cinematic feel */}
      <div className="noise-overlay" />

      {/* Card 1: Main Intro - Top-left */}
      <div ref={cardRefs[1]} className="card card-1">
        <h1 className="intro-text">
          Hi, I'm <span className="highlight">Dip Parmar</span>
        </h1>
      </div>

      {/* Card 2: Code is easy thinking is rare - Bottom-left */}
      <div ref={cardRefs[2]} className="card card-2">
        <h2 className="final-message-text">
          Code is easy. <span className="highlight-red">Thinking</span> is rare.
        </h2>
      </div>

      {/* Card 3: Engineer by skill - Bottom-right */}
      <div ref={cardRefs[3]} className="card card-3">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
        </div>
        <div className="terminal-content">
          <span className="terminal-prompt">$</span>
          <span className="terminal-text">Engineer by skill.</span>
        </div>
      </div>

      {/* Card 4: Strategist by mindset - Top-right */}
      <div ref={cardRefs[4]} className="card card-4">
        <h2 className="strategic-text">
          <span className="highlight-red">Strategist</span> by mindset.
        </h2>
      </div>
    </div>
  );
};

export default OverlayCards;