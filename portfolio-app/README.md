# Portfolio App - Frame-Based Scroll Animation

A cinematic scroll-driven animation using an image sequence (120 frames at 24 FPS).

## Features

- **Frame-Based Animation**: Uses image sequence instead of video for smooth, controllable playback
- **Scroll Control**: GSAP ScrollTrigger for bidirectional scroll control
- **Canvas Rendering**: High-performance canvas-based frame rendering
- **Color Transitions**: Smooth background color interpolation during scroll
- **Cinematic Effects**: Subtle zoom and vignette overlay
- **Performance Optimized**: Preloaded images with loading progress

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add your frames**:
   - Place your image sequence in `/public/frames/`
   - Naming convention: `ezgif-frame-001.jpg` to `ezgif-frame-120.jpg`
   - Ensure you have exactly 120 frames

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Technical Details

### Frame System
- **Total Frames**: 120 (5 seconds at 24 FPS)
- **Format**: JPG images
- **Resolution**: Any (automatically scaled with aspect ratio maintained)
- **Margin**: 4% minimum on all sides

### Background Colors (by scroll progress)
- 0% → #dadee0
- 25% → #a9aaa7
- 50% → #000000
- 75% → #0b1011
- 100% → #1d2326

### Effects
- Zoom: 1.0 → 1.05 scale
- Vignette: Radial gradient overlay
- Smooth easing: power3.out

## Structure

```
src/
├── components/
│   ├── FrameCanvas.jsx      # Canvas rendering & image loading
│   └── HeroSection.jsx       # Layout & scroll orchestration
├── hooks/
│   └── useScrollFrames.js    # GSAP scroll-to-frame mapping
├── App.jsx
└── App.css
```

## Requirements

- Desktop only (min-width: 1024px)
- Modern browser with Canvas support
- GSAP 3.x

## Performance Notes

- All frames are preloaded before animation starts
- Loading progress displayed during preload
- RequestAnimationFrame used for smooth updates
- Canvas rendering optimized for 60 FPS
- No re-renders during scroll (refs used)

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```
