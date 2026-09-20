import { useEffect, useRef, useState, useCallback } from 'react';

const FrameCanvas = ({ totalFrames = 120, currentFrame, onLoadComplete }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / totalFrames) * 100));

      if (loadedCount === totalFrames) {
        imagesRef.current = images;
        setIsLoading(false);
        onLoadComplete?.();
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;

      img.onload = checkAllLoaded;
      img.onerror = () => {
        console.error(`Failed to load frame ${frameNumber}`);
        checkAllLoaded();
      };

      images[i - 1] = img;
    }

    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [totalFrames, onLoadComplete]);

  // Render current frame
  useEffect(() => {
    if (isLoading || !canvasRef.current || !imagesRef.current[currentFrame]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[currentFrame];

    // Set canvas display size
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate dimensions maintaining aspect ratio with 4% margin
    const margin = 0.04;
    const availableWidth = containerWidth * (1 - margin * 2);
    const availableHeight = containerHeight * (1 - margin * 2);

    let drawWidth, drawHeight;
    const imgAspect = img.width / img.height;
    const containerAspect = availableWidth / availableHeight;

    if (imgAspect > containerAspect) {
      drawWidth = availableWidth;
      drawHeight = availableWidth / imgAspect;
    } else {
      drawHeight = availableHeight;
      drawWidth = availableHeight * imgAspect;
    }

    // Set canvas size
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center the image
    const x = (containerWidth - drawWidth) / 2;
    const y = (containerHeight - drawHeight) / 2;

    // Draw the image
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  }, [currentFrame, isLoading]);

  // Handle window resize
  useEffect(() => {
    if (isLoading) return;

    const handleResize = () => {
      if (canvasRef.current && imagesRef.current[currentFrame]) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imagesRef.current[currentFrame];

        const container = canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const margin = 0.04;
        const availableWidth = containerWidth * (1 - margin * 2);
        const availableHeight = containerHeight * (1 - margin * 2);

        let drawWidth, drawHeight;
        const imgAspect = img.width / img.height;
        const containerAspect = availableWidth / availableHeight;

        if (imgAspect > containerAspect) {
          drawWidth = availableWidth;
          drawHeight = availableWidth / imgAspect;
        } else {
          drawHeight = availableHeight;
          drawWidth = availableHeight * imgAspect;
        }

        canvas.width = containerWidth;
        canvas.height = containerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = (containerWidth - drawWidth) / 2;
        const y = (containerHeight - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame, isLoading]);

  if (isLoading) {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        fontSize: '18px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center'
      }}>
        <div>Loading frames...</div>
        <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.7 }}>
          {loadProgress}%
        </div>
      </div>
    );
  }

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default FrameCanvas;
