# Frame-Based Scroll Animation - Setup Instructions

## ⚠️ IMPORTANT: Add Your Image Frames

Before running the app, you need to add your image sequence to the `/public/frames/` folder.

### Required Frame Structure

- **Location**: `/public/frames/`
- **Naming**: `ezgif-frame-001.jpg` to `ezgif-frame-120.jpg`
- **Format**: JPG (or update the extension in `FrameCanvas.jsx` if using PNG)
- **Count**: Exactly 120 frames
- **Frame Rate**: 24 FPS (5 seconds total)

### Example File Structure
```
public/
└── frames/
    ├── ezgif-frame-001.jpg
    ├── ezgif-frame-002.jpg
    ├── ezgif-frame-003.jpg
    ...
    ├── ezgif-frame-119.jpg
    └── ezgif-frame-120.jpg
```

### Getting Your Frames

If you have a video file, you can extract frames using:

**Online Tool:**
- Visit [ezgif.com/video-to-jpg](https://ezgif.com/video-to-jpg)
- Upload your video
- Set FPS to 24
- Extract frames

**FFmpeg (Command Line):**
```bash
ffmpeg -i your-video.mp4 -vf fps=24 public/frames/ezgif-frame-%03d.jpg
```

## Quick Start

1. **Add your frames** to `/public/frames/` (see above)

2. **Verify frames are in place**:
   ```bash
   ls public/frames/ | wc -l
   # Should output: 120
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to the localhost URL shown in the terminal

## What to Expect

- **Loading Screen**: Displays while frames preload (with progress %)
- **Smooth Animation**: Scroll down/up to control frame playback
- **Persistent Story Cards**: 5 cards appear and stay visible as you scroll
- **Cinematic Climax**: At 95% scroll, everything locks in place
- **Final Button**: "Scroll More ↓" appears to continue to portfolio
- **Color Transition**: Background smoothly changes from light to dark
- **Zoom Effect**: Subtle scale from 1.0 to 1.05
- **Vignette**: Cinematic overlay effect

## Troubleshooting

**Frames not loading?**
- Check that files are named exactly: `ezgif-frame-001.jpg` (with leading zeros)
- Verify files are in `/public/frames/`, not `/src/frames/`
- Check browser console for 404 errors

**Animation is choppy?**
- Ensure you have all 120 frames
- Check frame file sizes (optimize if >500KB each)
- Try reducing image resolution

**Different number of frames?**
- Update `TOTAL_FRAMES` constant in `HeroSection.jsx`
- Update frame count in `README.md`

## Customization

### Change Frame Count
In `src/components/HeroSection.jsx`:
```javascript
const TOTAL_FRAMES = 120; // Change this
```

### Change File Extension
In `src/components/FrameCanvas.jsx`, line ~30:
```javascript
img.src = `/frames/ezgif-frame-${frameNumber}.png`; // Change .jpg to .png
```

### Adjust Background Colors
In `src/components/HeroSection.jsx`, modify the `colorStops` array.

### Adjust Zoom Amount
In `src/components/HeroSection.jsx`, line ~78:
```javascript
const scale = 1 + adjustedProgress * 0.05; // Change 0.05 to adjust zoom
```

## Performance Tips

- Keep frame dimensions reasonable (1920x1080 max recommended)
- Compress images (70-80% quality is fine)
- Total frames folder should be under 50MB for best performance
- Frames load before animation starts (intentional)

## Desktop Only

This experience is optimized for desktop (min-width: 1024px). Mobile users will see a message directing them to desktop.

## Storytelling Flow

As you scroll down:
1. 0%: "Hi, I'm Dip Parmar" appears (top-left)
2. 20%: "Engineer by skill." appears (bottom-left terminal)
3. 35%: "Thinking beyond code." appears (right-side pill)
4. 55%: "Strategist by mindset." appears (left-side dark card)
5. 75%: "Code is easy. Thinking is rare." appears (right-side dark card)
6. 95%: Everything locks - final frame + all 5 cards visible
7. Button: "Scroll More ↓" appears to continue

Each card fades in and stays visible, creating a layered storytelling experience that builds to a powerful climax.