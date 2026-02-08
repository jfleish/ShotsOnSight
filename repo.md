# SOS: Shot On Sight - Repository Documentation

**SOS: Shot On Sight** is a sports-themed party drinking game application built as a React single-page app. Players watch a simulated NFL game unfold and take drinks (sips, shots, or shotguns) based on win probability swings and game events.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Game Logic](#game-logic)
5. [File Structure](#file-structure)
6. [Components](#components)
7. [State Management](#state-management)
8. [Styling](#styling)
9. [Demo Game Data](#demo-game-data)
10. [Player System](#player-system)
11. [Running the Project](#running-the-project)

---

## Project Overview

This is a party game where:
- Players join a "room" and pick an NFL team to support (Seahawks or Patriots)
- A demo football game plays out with 40 frames over 10 minutes
- When the win probability shifts significantly, players must drink
- The losing team's fans are primarily targeted for drinks
- Different drink modes affect frequency: Casual (50% drinks), Savage (150% drinks), DD (0% drinks)

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool and dev server |
| **React 18** | UI library with hooks |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Pre-built accessible UI components |
| **Radix UI** | Headless UI primitives |
| **TanStack Query** | Server state management |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |
| **Vitest** | Testing framework |

---

## Architecture

### Entry Point
```
index.html → src/main.tsx → src/App.tsx
```

### App Structure (`App.tsx`)
- Wraps the app in providers: `QueryClientProvider`, `TooltipProvider`
- Sets up `Toaster` and `Sonner` for notifications
- Uses `BrowserRouter` with two routes:
  - `/` → `Index` page (main game)
  - `*` → `NotFound` page (404)

### Main Page (`pages/Index.tsx`)
The Index page is the core game interface with a 12-column grid layout:
- **Left column (8 cols)**: Win probability, play feed, controls, game over summary
- **Right column (4 cols)**: Player panel, leaderboard

---

## Game Logic

### Core Hook: `useGameEngine` (`src/hooks/useGameEngine.ts`)

This is the brain of the application. It manages:

#### State
```typescript
interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  currentFrame: number;
  elapsedTime: number;
  frames: GameFrame[];
  players: Player[];
  alerts: DrinkAssignment[];
  currentAlert: DrinkAssignment | null;
}
```

#### Key Functions

| Function | Purpose |
|----------|---------|
| `addPlayer(name, team, mode)` | Add a player with name, team, and drink mode |
| `removePlayer(id)` | Remove a player by ID |
| `startGame()` | Begin the game loop (requires at least 1 player) |
| `pauseGame()` | Pause the interval |
| `resumeGame()` | Resume the interval |
| `resetGame()` | Reset all state to initial |
| `skipFrame()` | Manually advance one frame |

#### Drink Assignment Logic

Drinks are triggered by:

1. **Event-based triggers** (`EVENT_DRINKS` in `types/game.ts`):
   - Touchdown, turnover, interception, fumble → Shot
   - Field goal, first down, big play → Sip
   - Game end → Shotgun

2. **Probability delta triggers** (`DEFAULT_DRINK_RULES`):
   - Delta > 15% → Shot
   - Delta > 7% → Sip

3. **Target selection**:
   - 70% chance: Losing team's fan drinks
   - 30% chance: Random eligible player drinks

4. **Rate limiting**:
   - Minimum 2 minutes between shots
   - Minimum 5 minutes between shotguns
   - Downgrades to lower tier if rate limited

5. **Mode multipliers**:
   - Casual: 50% chance to skip (reduced drinking)
   - Savage: 150% normal (more drinking)
   - DD (Designated Driver): Never drinks

#### Game Loop
- Runs every 15 seconds (`FRAME_INTERVAL`)
- Advances to next frame
- Calculates win probability delta
- Determines if drink should be assigned
- Updates player drink counts
- Creates alert for 4 seconds

---

## File Structure

```
/Users/nikhildonde/Desktop/Hackathon/ShotsOnSight/
├── src/
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # App entry point
│   ├── index.css            # Global styles, CSS variables, animations
│   ├── vite-env.d.ts        # Vite type declarations
│   │
│   ├── components/
│   │   ├── game/            # Game-specific components
│   │   │   ├── AlertOverlay.tsx    # Full-screen drink alerts
│   │   │   ├── ControlPanel.tsx    # Start/pause/reset buttons
│   │   │   ├── HeaderBar.tsx       # Logo, teams, timer, progress
│   │   │   ├── Leaderboard.tsx     # Player rankings with medals
│   │   │   ├── PlayFeed.tsx        # Current play description
│   │   │   ├── PlayerPanel.tsx     # Add/remove players, roster search
│   │   │   └── WinProbCard.tsx     # Scoreboard + win probability bar
│   │   │
│   │   ├── ui/              # shadcn/ui components (49 components)
│   │   │   ├── button.tsx, card.tsx, dialog.tsx, etc.
│   │   │   └── sidebar.tsx, toast.tsx, etc.
│   │   │
│   │   └── NavLink.tsx      # Navigation link component
│   │
│   ├── data/
│   │   └── demoGame.ts      # 40-frame game data + rosters + helpers
│   │
│   ├── hooks/
│   │   ├── useGameEngine.ts # Core game logic hook (292 lines)
│   │   ├── use-mobile.tsx   # Mobile breakpoint detection
│   │   └── use-toast.ts     # Toast notification hook
│   │
│   ├── lib/
│   │   └── utils.ts         # cn() helper for Tailwind classes
│   │
│   ├── pages/
│   │   ├── Index.tsx        # Main game page (132 lines)
│   │   └── NotFound.tsx     # 404 page
│   │
│   ├── test/
│   │   ├── example.test.ts  # Sample test
│   │   └── setup.ts         # Test environment setup
│   │
│   └── types/
│       └── game.ts          # TypeScript interfaces & constants
│
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind with custom theme
├── vite.config.ts          # Vite config with path alias
├── vitest.config.ts        # Vitest test config
├── components.json         # shadcn/ui configuration
└── package.json            # Dependencies
```

---

## Components

### Game Components

#### AlertOverlay (`components/game/AlertOverlay.tsx`)
- Full-screen overlay for drink assignments
- Three drink types with distinct styling:
  - **Sip**: Gold/accent color, Wine icon
  - **Shot**: Red/primary color, Beer icon
  - **Shotgun**: Orange/fire gradient, Cylinder icon with flame
- Auto-dismisses after 4 seconds or on click
- Features pulse-glow animation and fire particles

#### ControlPanel (`components/game/ControlPanel.tsx`)
- Game control buttons:
  - START GAME (requires players)
  - PAUSE / RESUME
  - RESET (circular arrow)
  - SKIP (next frame)
- Disabled states prevent invalid actions

#### HeaderBar (`components/game/HeaderBar.tsx`)
- SOS logo with live indicator pulse when playing
- Team logos and names (Seahawks vs Patriots)
- Demo timer (elapsed / total)
- Fire gradient progress bar

#### Leaderboard (`components/game/Leaderboard.tsx`)
- Sorts players by weighted score: `sips + (shots × 2) + (shotguns × 5)`
- Shows drink breakdown per player
- Awards medals at game end: Crown (1st), Silver (2nd), Bronze (3rd)
- Highlights winner with accent color

#### PlayFeed (`components/game/PlayFeed.tsx`)
- Displays current play description
- Event badges (TD, INT, SACK, etc.) with colors
- Game situation: Down & distance, yardline, possession

#### PlayerPanel (`components/game/PlayerPanel.tsx`)
**Adding Players:**
- Search with roster suggestions from real NFL players
- Filter by team (All, Seahawks, Patriots)
- Player headshots from ESPN CDN
- Manual name entry supported

**Team Selection:**
- Two buttons: Seahawks (green) or Patriots (navy)

**Mode Selection:**
- Casual (blue), Savage (red), DD (gray)

**Player List:**
- Avatar (headshot or initials)
- Name, team, mode
- Drink counts (sips/shots/shotguns)
- Remove button (when game not active)

#### WinProbCard (`components/game/WinProbCard.tsx`)
- **Scoreboard**: Team logos, names, scores
- **Game clock**: Quarter and time remaining
- **Win probability bar**: Split bar showing both teams' chances
- **Delta indicator**: Shows swing direction and magnitude

---

## State Management

### Local State Only
This app uses **no global state library**. All state lives in `useGameEngine`:

```typescript
// React hooks pattern
const [gameState, setGameState] = useState<GameState>({...});
const intervalRef = useRef<NodeJS.Timeout | null>(null);
const lastDrinkTimeRef = useRef<Record<string, number>>({});
```

### Data Flow
1. `useGameEngine` manages all game state
2. `Index.tsx` subscribes to the hook
3. Props passed down to child components
4. Callbacks passed up for user actions

### TanStack Query
Installed but minimally used. Set up for future server integration.

---

## Styling

### Design System
**Theme**: Bold sports broadcast aesthetic with "fiery energy"
- **Primary**: Bold red (from logo) - `hsl(0 85% 50%)`
- **Accent**: Beer gold - `hsl(42 100% 50%)`
- **Background**: Rich dark black - `hsl(0 0% 5%)`

### CSS Variables (`src/index.css`)
Custom properties for:
- Core theme colors (background, foreground, primary, etc.)
- Team colors (Seahawks green, Patriots navy)
- Drink tier colors (sip gold, shot red, shotgun orange)
- Win probability colors (positive green, negative red)
- Gradients (hero, fire, win, etc.)

### Tailwind Extensions (`tailwind.config.ts`)
```typescript
// Custom colors
team: { home: 'hsl(var(--team-home))', away: '...' }
drink: { sip: '...', shot: '...', shotgun: '...' }
win: { positive: '...', negative: '...', neutral: '...' }
chart: { home: '...', away: '...', grid: '...' }

// Custom fonts
fontFamily: {
  display: ['Impact', 'Arial Black', 'sans-serif'],  // Headers
  body: ['Inter', 'system-ui', 'sans-serif'],        // Body text
  mono: ['JetBrains Mono', 'monospace'],              // Numbers
}

// Custom animations
keyframes: {
  'pulse-glow': '...',      // Pulsing glow effect
  'shake': '...',           // Shake animation for alerts
  'number-pop': '...',      // Score increment animation
  'alert-slide-in': '...',  // Alert entrance
}
```

### Utility Classes
Custom utilities in `index.css`:
- `.glow-primary`, `.glow-accent` - Box shadow glows
- `.glow-team-home`, `.glow-team-away` - Team-colored glows
- `.glow-fire` - Multi-layer fire glow
- `.text-shadow-glow` - Glowing text
- `.glass` - Backdrop blur effect

---

## Demo Game Data

### Game Simulation (`src/data/demoGame.ts`)

**Game**: Seahawks vs Patriots (Super Bowl LX comeback thriller)

**Structure**: 40 frames spanning 10 minutes (600 seconds)
- Frame 0: Kickoff, 0-0, Q1
- Frame ~15: Halftime, Patriots lead 17-7
- Frame ~30: Seahawks rally to take lead
- Frame 39: Seahawks win 27-24 on final field goal

**Each frame contains**:
```typescript
{
  t: 0,              // Demo timestamp (seconds)
  quarter: 1,        // 1-4
  clock: 900,        // Game clock in seconds (15 min quarters)
  home: 0,           // Seahawks score
  away: 0,           // Patriots score
  down: 1,           // 1-4
  distance: 10,      // Yards to go
  yardline: 25,      // Field position
  possession: 'home', // 'home' or 'away'
  event: 'game_start', // PlayEvent type
  win_prob: 0.50,    // 0-1, probability home team wins
  description: "..." // Play description for UI
}
```

### Team Data
```typescript
TEAMS = {
  home: { name: 'Seahawks', city: 'Seattle', abbreviation: 'SEA',
          color: 'team-home', logo: 'https://a.espncdn.com/.../sea.png' },
  away: { name: 'Patriots', city: 'New England', abbreviation: 'NE',
          color: 'team-away', logo: 'https://a.espncdn.com/.../ne.png' }
}
```

### Full Rosters
Complete 53-man rosters for both teams with:
- Player name
- Position (QB, RB, WR, etc.)
- Jersey number
- ESPN ID (for headshot images)

Headshot URL helper:
```typescript
getPlayerHeadshotUrl(espnId) => 
  `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/{id}.png`
```

---

## Player System

### Player Interface
```typescript
interface Player {
  id: string;           // Unique ID
  name: string;         // Display name
  team: 'home' | 'away'; // Team allegiance
  mode: 'casual' | 'savage' | 'dd'; // Drink frequency
  sips: number;         // Total sips taken
  shots: number;        // Total shots taken
  shotguns: number;     // Total shotguns taken
  lastDrinkTime: number;
  lastShotTime: number;
  lastShotgunTime: number;
}
```

### Drink Modes

| Mode | Multiplier | Description |
|------|------------|-------------|
| Casual | 0.5x | 50% chance to skip drinks, lighter play |
| Savage | 1.5x | Normal drinking pace |
| DD | 0x | Designated driver, never drinks |

### Scoring System
Leaderboard weights drinks by intensity:
- 1 sip = 1 point
- 1 shot = 2 points
- 1 shotgun = 5 points

---

## Running the Project

### Development
```bash
npm install
npm run dev
```
Server runs on `http://localhost:8080`

### Build
```bash
npm run build
```
Output to `dist/` folder

### Test
```bash
npm test          # Run once
npm run test:watch # Watch mode
```

### Scripts
| Script | Command |
|--------|---------|
| `dev` | `vite` |
| `build` | `vite build` |
| `build:dev` | `vite build --mode development` |
| `lint` | `eslint .` |
| `preview` | `vite preview` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |

---

## Key Configuration Files

### `vite.config.ts`
- React SWC plugin for fast compilation
- Path alias: `@` → `./src`
- `lovable-tagger` plugin in dev mode
- Server: port 8080

### `tailwind.config.ts`
- Content: scans all `.tsx` files
- Custom theme extensions (colors, fonts, animations)
- Plugin: `tailwindcss-animate`

### `tsconfig.json`
- Path alias: `@/*` maps to `src/*`
- React JSX transform
- Strict TypeScript settings

### `components.json` (shadcn/ui)
- Style: default
- RSC: false (uses standard React)
- TSX: true
- Aliases configured for components, utils, ui, lib, hooks

---

## Architecture Patterns

### Custom Hooks Pattern
Business logic isolated in `useGameEngine` - UI components are pure presentation.

### Component Composition
Large page broken into focused components with clear prop interfaces.

### Type Safety
All data structures typed; no `any` usage. Strict TypeScript configuration.

### Utility-First CSS
Tailwind for rapid styling; custom CSS for complex animations and design tokens.

### Accessibility
shadcn/ui components include ARIA attributes; Radix primitives handle focus management.

---

## Future Extension Points

1. **Real game integration**: Replace `DEMO_GAME` with API data
2. **Multiplayer rooms**: Add socket.io for synchronized play
3. **Custom rules**: Allow users to configure drink thresholds
4. **More sports**: Basketball, soccer variants with different frame structures
5. **User accounts**: Persist stats across sessions
6. **Mobile app**: React Native wrapper or PWA

---

## Summary

This is a well-architected React application demonstrating:
- Complex state management with React hooks
- Real-time game loop with intervals
- Sophisticated conditional logic for drink assignments
- Rich UI with animations and visual effects
- Type-safe development practices
- Modern tooling (Vite, Tailwind, shadcn/ui)

The game loop runs every 15 seconds through 40 frames of pre-defined game data, calculating win probability deltas and assigning drinks to players based on configurable rules and randomness. All UI updates reactively based on the central game state managed by `useGameEngine`.
