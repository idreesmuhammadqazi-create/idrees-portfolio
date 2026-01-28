# Easter Eggs System

A comprehensive easter egg and achievement system for the portfolio website with global state management, persistent tracking, and beautiful notifications.

## Architecture

### Core Components

1. **EasterEggProvider** (`lib/EasterEggContext.tsx`)
   - Global context provider for managing easter egg state
   - Handles achievement notifications with animations
   - Provides methods for adding achievements and checking progress
   - Syncs with localStorage for persistence across sessions

2. **EasterEggOrchestrator** (`components/EasterEggs/EasterEggOrchestrator.tsx`)
   - Orchestrates all easter egg components
   - Manages the achievements modal visibility
   - Centralized control for enabling/disabling features

### Easter Egg Components

#### AchievementsModal
Displays all discovered achievements with progress tracking, share functionality, and export capabilities.

Features:
- Visual progress bar
- Individual achievement cards with unlock animations
- Share achievements to social media
- Export statistics as JSON
- Real-time sync with localStorage

#### KonamiHandler
Detects the legendary Konami Code sequence (↑↑↓↓←→←→BA) and triggers spectacular visual effects.

Features:
- Matrix-style rain animation
- Dynamic theme color shifting
- Achievement unlock notification
- Auto-deactivates after 10 seconds

#### ClickCounter
Tracks clicks on wrapped elements (used for logo) with milestone rewards.

Features:
- Persistent click tracking
- Visual badge after 5 clicks
- Milestone notifications at 10, 25, 50, 100, 500, 1000 clicks
- Progress indicator for next milestone
- Click ripple animation

#### SecretConsole
A hidden developer console accessible through keypresses on the page.

Available Commands:
- `/help` - Show all commands
- `/projects` - Display project showcase
- `/unlock` - Unlock special features
- `/stats` - View achievement statistics

Features:
- ASCII art welcome message
- 2-second command buffer timeout
- Console-based interface with styled output
- Achievement tracking for command discovery

#### CustomCursor
Custom cursor effects with multiple modes (disabled by default).

Modes:
- `default` - Standard cursor
- `sparkles` - Particle effects following cursor
- `trail` - Rainbow trail effect
- `emoji` - Emoji particles on movement
- `rainbow` - Multi-colored trail

Trigger: Press 'c' key to cycle through modes

## Integration

### In app/layout.tsx

```tsx
import ClientLayout from '@/components/ClientLayout'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
```

### In components/ClientLayout.tsx

```tsx
import { EasterEggProvider } from '@/lib/EasterEggContext'
import EasterEggOrchestrator from '@/components/EasterEggs/EasterEggOrchestrator'

export default function ClientLayout({ children }) {
  return (
    <EasterEggProvider>
      {/* Your app content */}
      <EasterEggOrchestrator />
    </EasterEggProvider>
  )
}
```

### Using the Context

```tsx
import { useEasterEgg } from '@/lib/EasterEggContext'

function MyComponent() {
  const { 
    addAchievement, 
    hasAchievement, 
    getAchievementCount,
    showAchievementsModal 
  } = useEasterEgg()
  
  const handleSpecialAction = () => {
    addAchievement({
      id: 'special-action',
      name: 'Special Achievement',
      description: 'Did something special!'
    })
  }
}
```

## Achievement System

### Adding Achievements

```tsx
import { addAchievement } from '@/lib/easter-eggs'

addAchievement({
  id: 'unique-achievement-id',
  name: 'Achievement Name',
  description: 'What the user did to earn this'
})
```

### Achievement Types

All achievements are stored in `AchievementsModal.tsx` in the `ALL_POSSIBLE_ACHIEVEMENTS` array. Currently includes:
- Console Cowboy (dev console discovery)
- Project Explorer (secret projects list)
- Secret Keeper (console unlock command)
- Konami Master (Konami code activation)
- Cursor Explorer (custom cursor feature)
- Easter Egg Hunter (5+ secrets found)
- Completionist (all achievements)
- Speed Runner (3 secrets in 5 minutes)
- Night Owl (visited past midnight)
- Social Butterfly (shared achievements)
- Vault Explorer (secret page discovery)

## Notifications

Achievement notifications appear in the top-right corner with:
- Animated entrance/exit
- Auto-dismiss after 5 seconds
- Manual dismiss button
- Trophy icon animation
- Progress bar countdown

## Persistent Storage

All data is stored in localStorage with the key `easter-eggs-state`:

```typescript
{
  achievements: Achievement[],
  secretCommands: Record<string, boolean>,
  konamiCodeActivated: boolean
}
```

## Future Enhancements

- [ ] Time-based achievements (e.g., Night Owl)
- [ ] Social sharing integration
- [ ] Achievement sound effects
- [ ] Leaderboard/stats comparison
- [ ] Hidden achievement hints
- [ ] Achievement categories/badges
- [ ] Export/import achievement data
- [ ] Achievement unlock animations
