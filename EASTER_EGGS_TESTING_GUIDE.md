# Easter Eggs Testing Guide

This guide explains how to find and test all easter eggs and hidden features in the portfolio website.

## Table of Contents
1. [Konami Code](#konami-code)
2. [Logo Click Counter](#logo-click-counter)
3. [Secret Developer Console](#secret-developer-console)
4. [Secret Page](#secret-page)
5. [Footer Inspector Mode](#footer-inspector-mode)
6. [Party Mode](#party-mode)
7. [Secret Menu](#secret-menu)
8. [Achievements System](#achievements-system)

---

## 1. Konami Code

**How to activate:**
Type the legendary Konami Code sequence using your keyboard:
```
↑ ↑ ↓ ↓ ← → ← → B A
```

**Expected behavior:**
- Matrix rain animation appears across the screen
- Theme colors shift dynamically every 2 seconds through 5 different themes:
  - Matrix Green
  - Cyber Purple
  - Neon Blue
  - Sunset Orange
  - Electric Pink
- A message displays: "KONAMI CODE ACTIVATED!"
- The effect lasts 10 seconds
- Achievement unlocked: "Konami Code Master"

**Testing notes:**
- Must press keys in exact sequence
- Works from any page
- Can only trigger once per page load

---

## 2. Logo Click Counter

**How to activate:**
Click on the logo (top-left corner with Code2 icon) repeatedly.

**Milestones:**
- **5 clicks**: "Curious, are we?" 👀
- **10 clicks**: "You really like clicking!" 🖱️ + Achievement: "Logo Clicker"
- **25 clicks**: "This is getting serious..." 😮
- **50 clicks**: "Half a hundred clicks!" 🎉 + Achievement: "Click Enthusiast"
- **100 clicks**: "Century Club member!" 💯 + Achievement: "Click Centurion"
- **250 clicks**: "You have dedication!" 🏆
- **500 clicks**: "Half a thousand! Wow!" ⚡ + Achievement: "Click Master"
- **1000 clicks**: "ONE THOUSAND CLICKS!" 🌟 + Achievement: "Click Legend"

**Expected behavior:**
- Click counter badge appears after 5 clicks (top-left)
- Shows current count and progress bar to next milestone
- Milestone messages appear at the bottom center of screen
- Progress persists in localStorage

**Testing notes:**
- Badge remains visible after reaching 5 clicks
- Each milestone only triggers once
- Counter persists across page reloads

---

## 3. Secret Developer Console

**How to activate:**
Open your browser's developer console (F12 or Cmd+Option+I), and you'll see:
- ASCII art welcome message
- Available commands listed

**Commands:**
Type these commands anywhere on the page (not in the console):

1. **`/help`** - Shows all available commands
2. **`/projects`** - Displays featured projects list with tech stacks
3. **`/unlock`** - Unlocks a special secret with animated sequence
4. **`/stats`** - Shows your achievement statistics

**Expected behavior:**
- Welcome message appears automatically in console
- Type commands directly on the page (they accumulate as you type)
- Press Enter to execute command
- Press Escape to clear command buffer
- Commands timeout after 2 seconds of inactivity
- Achievement: "Console Cowboy" (for opening console)
- Achievement: "Project Explorer" (for /projects command)
- Achievement: "Secret Keeper" (for /unlock command)

**Testing notes:**
- Commands are case-insensitive
- Must start with `/`
- Don't type in input fields or text areas

---

## 4. Secret Page

**How to access:**
Navigate directly to `/secret` URL or discover it through exploration.

**Features:**
- 12 developer secrets/stories organized in 3 categories:
  - Development Chronicles (4 stories)
  - Truth Bombs (4 stories)
  - Just For Fun (4 stories)
- Click individual cards to reveal secrets
- "Reveal All" button to show all secrets at once
- "Hide All" button to collapse all secrets
- Rotating fun facts carousel
- Confetti animation on first visit

**Expected behavior:**
- Achievement unlocked after 2 seconds: "Vault Explorer"
- Each secret card has an emoji, title, and hidden content
- Inspector icon appears when secret is revealed
- Background has floating animated emoji
- Fun facts rotate every 5 seconds

**Testing notes:**
- Achievement only unlocks once
- Secret states don't persist (reset on reload)
- All secrets are clickable individually

---

## 5. Footer Inspector Mode

**How to activate:**
Click the copyright text at the bottom of the footer **3 times quickly** (within 2 seconds).

**Expected behavior:**
- Banner appears at top of footer: "Inspector Mode Active"
- Hover over any footer link or social icon to see trivia tooltips
- Eye icon appears next to copyright text
- Achievement unlocked: "Inspector Gadget"
- Click 3 times again to deactivate

**Trivia examples:**
- Social links: GitHub history, Discord facts, email history
- Quick links: Easter egg hints, development facts
- Project links: Project descriptions and fun facts

**Testing notes:**
- Must click within 2 seconds for all 3 clicks
- Works on all pages (footer is global)
- Tooltip follows mouse cursor

---

## 6. Party Mode

**How to activate:**
Click the theme toggle button (Moon/Sun icon) **7 times quickly**.

**Expected behavior:**
- Theme button changes to animated Sparkles icon
- Header gets special party styling
- Active nav items get rainbow gradient
- Logo gets party animation
- Message appears: "🎉 PARTY MODE ACTIVATED! 🎉"
- Click theme button again to deactivate

**Testing notes:**
- Counter resets after 2 seconds of inactivity
- Party mode persists while active
- Works independently of dark/light theme
- Affects header styling globally

---

## 7. Secret Menu

**How to activate:**
**Long-press** (hold for 1 second) on the logo in the header.

**Expected behavior:**
- Vibration feedback (on supported devices)
- Notification: "🎁 Secret menu unlocked!"
- Dropdown menu appears with 4 options:
  1. **Secret Menu** - Shows info message
  2. **Party Mode** - Toggles party mode on/off
  3. **Made with Love** - Shows appreciation message
  4. **Activate Easter Eggs** - Shows hint message
- Click outside to close menu

**Testing notes:**
- Must hold for full 1 second
- Vibration only works on mobile devices
- Menu closes automatically after selecting option

---

## 8. Achievements System

**How to access:**
Click the Trophy icon in the header (top-right).

**All Available Achievements:**
1. **Konami Code Master** - Enter the Konami Code
2. **Logo Clicker** - Click logo 10 times
3. **Click Enthusiast** - Click logo 50 times
4. **Click Centurion** - Click logo 100 times
5. **Click Master** - Click logo 500 times
6. **Click Legend** - Click logo 1000 times
7. **Console Cowboy** - Open developer console
8. **Project Explorer** - Use /projects command
9. **Secret Keeper** - Use /unlock command
10. **Vault Explorer** - Visit the /secret page
11. **Inspector Gadget** - Activate footer Inspector Mode

**Expected behavior:**
- Trophy button shows count badge when achievements > 0
- Modal displays all unlocked achievements
- Each achievement shows:
  - Name
  - Description
  - Discovery timestamp
- Achievements persist in localStorage
- Toast notification appears when unlocking new achievement (top-right)

**Testing notes:**
- Achievements are stored permanently (localStorage)
- Each achievement can only be unlocked once
- Badge count updates immediately

---

## Quick Test Checklist

Use this checklist to verify all easter eggs are working:

- [ ] Konami Code animation plays
- [ ] Logo click counter appears and tracks clicks
- [ ] Milestone messages appear at correct click counts
- [ ] Console welcome message appears
- [ ] All 4 console commands work (/help, /projects, /unlock, /stats)
- [ ] Secret page loads at /secret
- [ ] Secret page achievement unlocks
- [ ] Footer Inspector Mode activates (3 clicks)
- [ ] Trivia tooltips appear on hover in Inspector Mode
- [ ] Party Mode activates (7 theme clicks)
- [ ] Secret Menu opens on logo long-press
- [ ] All 11 achievements can be unlocked
- [ ] Achievement notifications appear
- [ ] Trophy badge shows correct count
- [ ] Achievement modal displays all unlocked achievements

---

## Testing Tips

1. **Clear localStorage** to reset all progress:
   ```javascript
   localStorage.clear()
   ```

2. **Check achievement state** in console:
   ```javascript
   JSON.parse(localStorage.getItem('easter-eggs-state'))
   ```

3. **Check click count** in console:
   ```javascript
   localStorage.getItem('logo-click-count')
   ```

4. **Test on different devices**:
   - Desktop (full keyboard support)
   - Mobile (touch events, vibration)
   - Tablet (long-press gestures)

5. **Test in different browsers**:
   - Chrome/Edge (best support)
   - Firefox (good support)
   - Safari (test vibration, localStorage)

---

## Known Behaviors

- Konami Code can be triggered multiple times, but achievement only unlocks once
- Click counter persists across sessions
- Console commands reset after 2 seconds of inactivity
- Party Mode affects header styling globally
- Inspector Mode trivia follows cursor in real-time
- Achievement notifications auto-dismiss after 5 seconds
- Secret page confetti only shows on first visit per session

---

## Troubleshooting

**Easter eggs not working?**
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify localStorage is not disabled
- Try clearing localStorage and refreshing

**Achievements not saving?**
- Check localStorage quota
- Verify private/incognito mode isn't blocking storage
- Test in regular browser window

**Animations not playing?**
- Check if `prefers-reduced-motion` is enabled
- Verify GPU acceleration is available
- Try a different browser

---

## Developer Notes

All easter eggs are implemented using:
- React hooks (useState, useEffect, useCallback)
- Framer Motion for animations
- localStorage for persistence
- Custom event listeners for keyboard/mouse interactions
- Context API for global achievement state

Main files:
- `lib/easter-eggs.ts` - Core easter egg utilities
- `lib/EasterEggContext.tsx` - Achievement system provider
- `components/EasterEggs/` - Individual easter egg components
- `app/secret/page.tsx` - Secret page content
