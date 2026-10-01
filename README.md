# Matrix Breaker

Matrix Breaker is an original, browser-playable battle-royale platform prototype. It runs without a build step and uses local browser storage for the demo account and progression data.

## Run it

```bash
python3 -m http.server 3000
```

Open `http://localhost:3000/`.

## Included

- Battle Royale lobby and giant procedurally drawn neon cyber-city map
- 5 categories: Zombie, Horror, FPS, Party, and Abyss
- 50 generated games per category and 200 generated achievements per category
- Starter costume, weapon, emote, lobby identity, stats, shop, packs, leaderboard, settings, and locker
- 6-slot inventory with common, rare, epic, and legendary loot
- Med packs, bandage rolls, original shield items, ammo, weapons, and build alloy
- Blue/rare loot generation through keyboard `E` while in a match
- Build, fire, heal, shield, minimap, health, shield, ammo, zone, and player HUD
- Cyber Bits earned from victories and spent in the shop
- Admin login is intentionally hidden behind the small invisible Admin tab; code is `156913`
- Admin-only crown name treatment, crown avatar, Crown Breaker weapon skin, VIP vault, tag, and boosted Cyber Bits

This is a client-side prototype: account data and the admin code are not secure for production. The artwork and names are original and do not use Fortnite assets or branding.
