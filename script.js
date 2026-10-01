* {
  box-sizing: border-box;
}

:root {
  --bg: #09101d;
  --bg-2: #111b2d;
  --panel: rgba(19, 30, 48, 0.92);
  --panel-strong: rgba(11, 18, 30, 0.96);
  --line: rgba(155, 218, 255, 0.2);
  --card: rgba(24, 41, 62, 0.9);
  --text: #edf5ff;
  --muted: #9db7d0;
  --cyan: #72eaff;
  --blue: #5a8bff;
  --purple: #9d75ff;
  --pink: #ff7fd2;
  --green: #5df2a5;
  --yellow: #ffd35a;
  --red: #ff6076;
  --shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(circle at top, #13213a, #090d17 45%, #070b12 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

.hidden {
  display: none !important;
}

.loading-screen {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at center, rgba(32, 50, 78, 0.85), rgba(7, 11, 18, 0.97));
  z-index: 100;
  transition: opacity 0.5s ease;
}

.loading-screen.visible {
  opacity: 1;
}

.loading-screen:not(.visible) {
  opacity: 0;
  pointer-events: none;
}

.loading-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(88, 164, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(88, 164, 255, 0.08) 1px, transparent 1px);
  background-size: 30px 30px;
}

.loading-content {
  position: relative;
  width: min(900px, 88vw);
  padding: 36px 28px 28px;
  border: 1px solid var(--line);
  background: rgba(10, 16, 24, 0.7);
  border-radius: 28px;
  box-shadow: var(--shadow);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
}

.mini-logo,
.logo-mark,
.brand-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  background: linear-gradient(135deg, var(--purple), var(--cyan));
  color: #091423;
  box-shadow: 0 10px 32px rgba(114, 234, 255, 0.5);
}

.brand-sub,
.eyebrow {
  letter-spacing: 0.22em;
  font-size: 11px;
  text-transform: uppercase;
  color: var(--cyan);
  opacity: 0.9;
}

.loading-content h1,
.auth-panel h2,
.title {
  margin: 0;
  font-family: 'Orbitron', sans-serif;
}

.loading-arena {
  position: relative;
  height: 220px;
  border: 1px solid rgba(125, 214, 255, 0.16);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(12, 20, 32, 0.8), rgba(16, 27, 42, 0.6));
  overflow: hidden;
  margin-bottom: 20px;
}

.loading-arena::before,
.loading-arena::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(114, 234, 255, 0.22), transparent 52%);
}

.avatar {
  position: absolute;
  bottom: 28px;
  width: 76px;
  height: 120px;
  animation: float 2.2s ease-in-out infinite alternate;
}

.avatar:nth-child(1) { left: 18%; animation-delay: 0.1s; }
.avatar:nth-child(2) { left: 36%; animation-delay: 0.4s; }
.avatar:nth-child(3) { right: 36%; animation-delay: 0.7s; }
.avatar:nth-child(4) { right: 18%; animation-delay: 1s; }

.avatar .head {
  position: absolute;
  left: 50%;
  top: 0;
  width: 26px;
  height: 26px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: var(--text);
  box-shadow: 0 0 0 5px rgba(255,255,255,0.08);
}

.avatar .body {
  position: absolute;
  left: 50%;
  bottom: 5px;
  width: 52px;
  height: 70px;
  transform: translateX(-50%);
  border-radius: 18px 18px 14px 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.06));
}

.avatar-red .body { background: linear-gradient(180deg, #ff9da9, #ff6076); }
.avatar-blue .body { background: linear-gradient(180deg, #8ecbff, #5a8bff); }
.avatar-gold .body { background: linear-gradient(180deg, #ffe89a, #ffd35a); }
.avatar-cyan .body { background: linear-gradient(180deg, #9ef6ff, #72eaff); }

.loading-bar-wrap {
  display: grid;
  gap: 12px;
}

.loading-bar {
  position: relative;
  height: 14px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255,255,255,0.08);
  border: 1px solid var(--line);
}

.loading-fill {
  height: 100%;
  width: 0%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--pink), var(--purple), var(--cyan));
  box-shadow: 0 0 18px rgba(114, 234, 255, 0.6);
  animation: loadPulse 3s ease-in-out infinite;
}

.loading-text {
  text-align: center;
  font-size: 0.92rem;
  color: var(--muted);
}

.auth-screen {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at center, rgba(14, 22, 35, 0.75), rgba(4, 8, 14, 0.96));
  padding: 24px;
}

.auth-panel {
  width: min(460px, 100%);
  padding: 28px 24px 22px;
  background: rgba(8, 14, 22, 0.88);
  border: 1px solid var(--line);
  border-radius: 28px;
  box-shadow: var(--shadow);
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.auth-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.auth-tab,
.nav-item,
.ghost-btn,
.primary-btn,
.text-btn,
.secondary-btn {
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  background: rgba(255,255,255,0.04);
  color: var(--text);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.auth-tab,
.nav-item,
.ghost-btn,
.secondary-btn {
  padding: 10px 14px;
}

.auth-tab.active,
.nav-item.active {
  background: linear-gradient(135deg, rgba(122, 140, 255, 0.34), rgba(114, 234, 255, 0.12));
  border-color: rgba(114, 234, 255, 0.45);
}

.auth-tab:hover,
.nav-item:hover,
.ghost-btn:hover,
.primary-btn:hover,
.text-btn:hover,
.secondary-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(114, 234, 255, 0.4);
}

#authForm {
  display: grid;
  gap: 16px;
}

#authForm label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

#authForm input {
  width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(18, 27, 39, 0.9);
  color: var(--text);
}

.primary-btn {
  padding: 12px 18px;
  border: none;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  color: #08141c;
  font-weight: 800;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.auth-help {
  margin-top: 18px;
  color: var(--muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.text-btn {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--cyan);
}

.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  gap: 24px;
  padding: 24px;
}

.topbar {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(11, 19, 28, 0.9);
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cyber-coin {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(17, 22, 36, 0.9);
}

.coin-icon {
  color: var(--yellow);
  text-shadow: 0 0 16px rgba(255, 211, 90, 0.8);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px;
  border-radius: 28px;
  border: 1px solid var(--line);
  background: rgba(10, 14, 22, 0.9);
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(90, 139, 255, 0.22), rgba(114, 234, 255, 0.08));
  border: 1px solid rgba(114, 234, 255, 0.2);
}

.avatar-badge {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  color: #0b1422;
  font-weight: 800;
  font-family: 'Orbitron', sans-serif;
}

.profile-name {
  font-weight: 800;
}

.profile-role {
  color: var(--muted);
  font-size: 0.8rem;
}

.nav-list {
  display: grid;
  gap: 8px;
}

.nav-item {
  text-align: left;
  width: 100%;
}

.content-area {
  position: relative;
  min-height: 580px;
  padding: 18px;
  border-radius: 28px;
  border: 1px solid var(--line);
  background: rgba(10, 18, 30, 0.9);
}

.section {
  display: none;
  min-height: 100%;
}

.section.active {
  display: block;
}

.hero-panel {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 18px;
  margin-bottom: 18px;
}

.panel {
  background: rgba(17, 27, 39, 0.9);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 22px;
  box-shadow: 0 18px 42px rgba(0,0,0,0.18);
}

.hero-panel .panel:first-child {
  min-height: 200px;
  background: linear-gradient(135deg, rgba(42, 72, 133, 0.5), rgba(142, 108, 255, 0.25));
}

.hero-panel h3,
.section-title {
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.06em;
}

.hero-panel h3 {
  margin: 0 0 8px;
  font-size: clamp(1.8rem, 3vw, 3rem);
}

.hero-copy {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
  max-width: 60ch;
}

.stat-grid,
.mode-grid,
.shop-grid,
.achievement-grid,
.friend-grid,
.locker-grid,
.settings-grid {
  display: grid;
  gap: 16px;
}

.stat-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stat-chip,
.info-card,
.item-card,
.mode-card,
.friend-card,
.setting-card,
.leader-card,
.achievement-card,
.game-card {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  background: rgba(18, 30, 44, 0.88);
}

.stat-chip {
  padding: 18px;
}

.stat-label {
  display: block;
  color: var(--muted);
  margin-bottom: 8px;
}

.stat-value {
  font-size: clamp(1.5rem, 3vw, 2.3rem);
  font-weight: 800;
  font-family: 'Orbitron', sans-serif;
}

.inline-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.secondary-btn {
  padding: 10px 16px;
  background: rgba(17, 30, 42, 0.8);
}

.home-grid,
.categories-grid,
.locker-grid,
.friend-grid,
.shop-grid,
.settings-grid {
  display: grid;
  gap: 18px;
}

.home-grid {
  grid-template-columns: 1.3fr 0.7fr;
}

.categories-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.mode-grid {
  grid-template-columns: repeat(5, minmax(180px, 1fr));
}

.mode-card {
  padding: 18px;
  display: grid;
  gap: 10px;
}

.mode-card .mode-name {
  font-size: 1.2rem;
  font-weight: 700;
}

.mode-card .games-count {
  color: var(--muted);
}

.mode-card .mode-badge {
  justify-self: start;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  background: rgba(114,234,255,0.12);
  color: var(--cyan);
}

.mode-card button {
  margin-top: 8px;
  width: 100%;
}

.game-card {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.game-name {
  font-weight: 700;
}

.game-card .pill,
.achievement-card .pill,
.shop-item .pill,
.leader-card .rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 0.72rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.04);
  color: var(--muted);
}

.game-meta {
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  font-size: 0.8rem;
}

.shop-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.item-card {
  padding: 18px;
  display: grid;
  gap: 12px;
}

.item-card .item-icon {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  background: linear-gradient(135deg, rgba(114,234,255,0.18), rgba(157,117,255,0.18));
}

.item-card .price {
  color: var(--yellow);
  font-weight: 700;
}

.item-card button {
  width: 100%;
}

.achievement-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.achievement-card {
  padding: 16px;
  display: grid;
  gap: 10px;
}

.achievement-card .achievement-name {
  font-weight: 700;
}

.achievement-card .achievement-desc {
  color: var(--muted);
  line-height: 1.5;
}

.friend-grid,
.locker-grid,
.settings-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.friend-card,
.setting-card,
.leader-card {
  padding: 18px;
}

.friend-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.friend-avatar {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), var(--cyan));
  color: #091221;
  font-weight: 800;
}

.friend-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.friend-status {
  font-size: 0.72rem;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(93,242,165,0.12);
  color: var(--green);
}

.setting-card {
  display: grid;
  gap: 10px;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.switch {
  position: relative;
  width: 52px;
  height: 30px;
  background: rgba(255,255,255,0.12);
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.1);
}

.switch::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s ease;
}

.switch.on {
  background: rgba(93,242,165,0.26);
}

.switch.on::before {
  transform: translateX(20px);
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-table th,
.leaderboard-table td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.leaderboard-table th {
  color: var(--muted);
  font-weight: 600;
}

.rank-badge {
  display: inline-flex;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(114,234,255,0.12);
  color: var(--cyan);
}

.battle-banner {
  margin-top: 18px;
  padding: 18px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 96, 118, 0.18), rgba(93, 242, 165, 0.08));
  border: 1px solid rgba(255,255,255,0.08);
}

.chapter-list,
.packs-list {
  display: grid;
  gap: 10px;
}

.chapter-row,
.pack-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 12px 14px;
}

@keyframes float {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-10px) scale(1.03); }
}

@keyframes loadPulse {
  0% { width: 0%; }
  50% { width: 78%; }
  100% { width: 100%; }
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .mode-grid,
  .shop-grid,
  .achievement-grid,
  .categories-grid,
  .home-grid,
  .friend-grid,
  .locker-grid,
  .settings-grid {
    grid-template-columns: 1fr 1fr;
  }

  .hero-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .app-shell,
  .content-area,
  .sidebar,
  .topbar {
    padding-left: 12px;
    padding-right: 12px;
  }

  .mode-grid,
  .shop-grid,
  .achievement-grid,
  .categories-grid,
  .friend-grid,
  .locker-grid,
  .settings-grid,
  .stat-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
