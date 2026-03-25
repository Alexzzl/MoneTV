# MoneTV - Samsung Tizen TV Streaming App (Vite + React + TypeScript)

A Samsung TV streaming application for short dramas, built with Vite, React 18, and TypeScript.

## Features

- 📺 Samsung TV remote control support
- 🎬 Video player with auto-play next episode
- 🔍 Hash-based routing (Tizen TV compatible)
- 📱 Responsive grid layouts
- 🎯 Focus management for TV navigation
- 💾 600+ KB mock data with 6 categories and multiple dramas

## Tech Stack

- **Build Tool**: Vite 6
- **Framework**: React 18 + React Router v6
- **Language**: TypeScript
- **Styling**: CSS (direct import, no CSS Modules)

## Project Structure

```
src/
├── main.tsx              # ReactDOM.createRoot + adjustZoom
├── App.tsx               # HashRouter + routes + useRemoteInit
├── types/index.ts        # TypeScript type definitions
├── data/mock.ts          # Mock data (631 KB after build)
├── remote.ts             # Samsung TV remote control logic
├── hooks/
│   ├── useRemote.ts      # Initialize Remote on mount
│   └── usePageFocus.ts   # Reset focus on page mount
├── components/
│   ├── Header/Header.tsx
│   └── ExitDialog/ExitDialog.tsx
├── pages/
│   ├── Home/Home.tsx
│   ├── Discover/Discover.tsx
│   ├── Detail/Detail.tsx
│   ├── Player/Player.tsx
│   └── Settings/Settings.tsx
└── styles/               # Original CSS files
    ├── common.css
    ├── page-header.css
    ├── home.css
    ├── discover.css
    ├── detail.css
    ├── player.css
    └── settings.css
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
# Open http://localhost:5173
# Use keyboard arrows to simulate remote control
```

### Production Build

```bash
npm run build
# Output: dist/
# Deploy dist/ to Tizen TV
```

## Key Implementation Details

### Remote Control
- `remote.ts`: Singleton managing focus, keyboard events, video controls
- All interactive elements use `data-focusable="true"`
- Grid navigation calculates columns for proper up/down movement

### Routing
- HashRouter for Tizen TV compatibility
- Routes: `/home`, `/discover`, `/detail/:dramaId`, `/player/:dramaId/:episodeId`, `/settings`

### Video Player
- HTML5 video with native controls
- Auto-play next episode on video end
- Cleanup on unmount (pause, remove src, load)

### CSS
- Original CSS files directly imported
- Global variables (e.g., `--primary-color`) preserved
- `.focused` class for TV navigation highlights

## Build Output

```
dist/
├── index.html                    # 0.69 kB
├── assets/
│   ├── index-*.js               # App logic (23 KB)
│   ├── vendor-*.js              # React + Router (159 KB)
│   ├── mock-data-*.js           # Mock data (617 KB)
│   ├── index-*.css              # All styles (23 KB)
│   └── CodeBubbyAssets/         # Images
└── config.xml                   # Tizen configuration
```

## Tizen TV Compatibility

- `vite.config.ts`: `base: './'` for relative paths
- `build.target: 'es2015'` for older Chromium
- Hash-based routing for TV platform
- 1920x1080 base resolution with dynamic scaling

---

**Ready for Samsung Tizen TV deployment!**
