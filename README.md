const STORAGE_KEYS = {
  accounts: 'matrix_breaker_accounts',
  activePlayer: 'matrix_breaker_active_player'
};

const categorySeeds = {
  zombie: {
    color: '#5df2a5',
    subtitle: 'Undead quickfire survival',
    games: 50,
    achievements: 200,
    tag: 'ZB'
  },
  horror: {
    color: '#ff7fd2',
    subtitle: 'Shadow chases and fear waves',
    games: 50,
    achievements: 200,
    tag: 'HR'
  },
  fps: {
    color: '#72eaff',
    subtitle: 'Precision fire and tactical ops',
    games: 50,
    achievements: 200,
    tag: 'FP'
  },
  party: {
    color: '#ffd35a',
    subtitle: 'Chaotic co-op fun and emotes',
    games: 50,
    achievements: 200,
    tag: 'PR'
  },
  abyss: {
    color: '#9d75ff',
    subtitle: 'Deep world raids and secrets',
    games: 50,
    achievements: 200,
    tag: 'AB'
  }
};

const categoryNames = Object.keys(categorySeeds);

const baseGames = [
  'Rift Run', 'Glitch Haunt', 'Sky Litter', 'Mecha Munch', 'Lunar Last Stand',
  'Pulse Punch', 'Velvet Vault', 'Abyss Alley', 'Turbo Tumble', 'Night Circuit',
  'Dune Dash', 'Clover Crash', 'Granite Groove', 'Nova Nest', 'Vapor Vortex',
  'Bolt Bloom', 'Crystal Clash', 'Rocket Rumble', 'Desert Drift', 'Mosaic Maze',
  'Pixel Panic', 'Frost Flip', 'Cosmic Clash', 'Echo Echo', 'Rally Rift', 'Sunset Sled',
  'Jungle Jinx', 'Prism Punch', 'Wave Walker', 'Ghost Grove', 'Mirror Moon', 'Comet Catch',
  'Silver Sprint', 'Neon Noodle', 'Drift Dread', 'Hex Horizon', 'Spark Sway', 'Wrecked Wave',
  'Storm Spin', 'Velvet Vortex', 'Gravity Grit', 'Cannon Clash', 'Futuristic Flip', 'Core Combat',
  'Cloud Crash', 'Blitz Bloom', 'Moon Mutilator', 'Mist Melee', 'Plasma Pop', 'Storm Sprint',
  'Moonlight Mix', 'Violet Vault', 'Skyline Shatter', 'Iron Glide', 'Lava Loop', 'Chroma Chase'
];

const emotes = [
  'Laser Lope', 'Perfect Pop', 'Squad Slam', 'Bolt Bounce', 'Neon Nudge', 'Hyper Hype', 'Star Spin'
];

const songs = ['Night Circuit', 'Pixel Pulse'];
const costumes = ['Shadow Stalker', 'Prism Prowler', 'Volt Vixen', 'Neon Knight', 'Glitch Guardian'];
const gunSkins = ['Pulse Rifle', 'Nova Blaster', 'Aether Shot', 'Arc Burst'];
const packs = [
  { name: 'Cyber Starter Pack', price: 580, items: ['Starter Costume', 'Gun Skin', '1,200 Cyber Bits'] },
  { name: 'Drift Pack', price: 980, items: ['7 Emotes', '2 Loot boxes', '300 Cyber Bits'] },
  { name: 'Phantom Vault', price: 1400, items: ['Rare Costume', 'Epic Emote', 'Gun Skin'] },
  { name: 'Void Bomb Pack', price: 2100, items: ['Abyss Costume', 'Lobby Song', 'Cyber Bits Bundle'] }
];

const friendSeeds = [
  ['Nova', 'online'], ['Hexa', 'in-match'], ['Tide', 'online'], ['Mira', 'offline'], ['Quill', 'in-match'],
  ['Echo', 'online'], ['Rin', 'online'], ['Vex', 'away'], ['Kite', 'in-match'], ['Astra', 'online']
];

function generateGameList(categoryKey, amount = 50) {
  const prefix = categorySeeds[categoryKey].tag;
  return Array.from({ length: amount }, (_, index) => {
    const name = `${baseGames[index % baseGames.length]} ${prefix}${String(index + 1).padStart(2, '0')}`;
    return {
      id: `${categoryKey}-${index + 1}`,
      name,
      mode: categoryKey,
      difficulty: ['Easy', 'Medium', 'Hard', 'Epic'][index % 4],
      players: 120 + (index * 17) % 380,
      wins: (index * 11) % 500,
      badge: index % 2 === 0 ? 'Featured' : 'Arena'
    };
  });
}

const gameCatalog = Object.fromEntries(
  categoryNames.map((key) => [key, generateGameList(key, categorySeeds[key].games)])
);

function generateAchievements(categoryKey) {
  const prefix = categorySeeds[categoryKey].tag;
  return Array.from({ length: 200 }, (_, index) => ({
    id: `${prefix}-${String(index + 1).padStart(3, '0')}`,
    category: categoryKey,
    name: `${categoryKey[0].toUpperCase() + categoryKey.slice(1)} Trophy ${index + 1}`,
    description: `Complete ${index % 6 + 1} objective chains in ${categoryKey} matches and earn the ${prefix} title.`,
    reward: 55 + (index % 8) * 15
  }));
}

const achievementsByCategory = Object.fromEntries(
  categoryNames.map((key) => [key, generateAchievements(key)])
);

const allAchievements = categoryNames.flatMap((key) => achievementsByCategory[key]);

const marketRefreshes = Array.from({ length: 21000 }, (_, index) => ({
  id: index + 1,
  item: `${['Loot', 'Token', 'Cache', 'Boost', 'Box', 'Circuit'][index % 6]} ${String(index + 1).padStart(4, '0')}`,
  roll: index % 3 === 0 ? 'Rare' : 'Epic',
  value: 25 + (index % 15) * 15
}));

function readAccounts() {
  const raw = localStorage.getItem(STORAGE_KEYS.accounts);
  return raw ? JSON.parse(raw) : [];
}

function writeAccounts(accounts) {
  localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
}

function setActivePlayer(player) {
  localStorage.setItem(STORAGE_KEYS.activePlayer, JSON.stringify(player));
}

function getActivePlayer() {
  const raw = localStorage.getItem(STORAGE_KEYS.activePlayer);
  return raw ? JSON.parse(raw) : null;
}

function makePlayer(username, code, role = 'player') {
  return {
    username,
    code,
    role,
    wins: 0,
    cyberBits: 1200,
    achievements: [],
    locker: {
      costume: 'Starter Scout',
      gunSkin: 'Pulse Pistol',
      emotes: ['Laser Lope'],
      music: ['Night Circuit']
    },
    friends: friendSeeds.slice(0, 6).map(([name, status]) => ({ name, status })),
    settings: {
      sound: true,
      crosshair: true,
      motionBlur: false,
      vividMode: true,
      shadows: true
    }
  };
}

function loginAccount(username, code) {
  const accounts = readAccounts();
  let found = accounts.find((account) => account.username.toLowerCase() === username.toLowerCase() && account.code === code);

  if (!found) {
    if (username.trim().length < 2) {
      alert('Username must be at least 2 characters long.');
      return;
    }
    const newAccount = makePlayer(username.trim(), code.trim());
    accounts.push(newAccount);
    writeAccounts(accounts);
    found = newAccount;
  }

  setActivePlayer(found);
  renderApp();
}

function loginAsAdmin(username, code) {
  if (code === '156913') {
    const accounts = readAccounts();
    let admin = accounts.find((account) => account.username.toLowerCase() === username.toLowerCase() && account.role === 'admin');

    if (!admin) {
      admin = makePlayer(username.trim(), code.trim(), 'admin');
      admin.cyberBits = 999999;
      admin.wins = 9999;
      accounts.push(admin);
      writeAccounts(accounts);
    }

    setActivePlayer(admin);
    renderApp();
    return;
  }

  alert('Invalid admin code.');
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.activePlayer);
  location.reload();
}

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

function renderHome() {
  const player = getActivePlayer();
  if (!player) return;

  const totalAchievements = allAchievements.length;
  const totalWins = categoryNames.reduce((acc, key) => acc + gameCatalog[key].reduce((sum, game) => sum + game.wins, 0), 0);

  const homeMarkup = `
    <div class="hero-panel">
      <div class="panel">
        <div class="eyebrow">SEASON 09</div>
        <h3>Build the ultimate arena story.</h3>
        <p class="hero-copy">Fight through undead chaos, horror nightmares, precision battlegrounds, party frenzy, and abyss raids. Unlock gear, dominate the leaderboard, and stack Cyber Bits in Matrix Breaker.</p>
        <div class="inline-actions">
          <button class="primary-btn" data-call="play-random">Play Now</button>
          <button class="secondary-btn" data-call="open-category">Open Categories</button>
        </div>
      </div>
      <div class="panel">
        <div class="eyebrow">PLAYER PROFILE</div>
        <div class="stat-grid">
          <div class="stat-chip">
            <span class="stat-label">Wins</span>
            <span class="stat-value">${formatNumber(player.wins)}</span>
          </div>
          <div class="stat-chip">
            <span class="stat-label">Bits</span>
            <span class="stat-value">${formatNumber(player.cyberBits)}</span>
          </div>
          <div class="stat-chip">
            <span class="stat-label">Trophies</span>
            <span class="stat-value">${player.achievements.length || 0}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="home-grid">
      <div class="panel">
        <div class="section-title">Featured Modes</div>
        <div class="mode-grid" style="margin-top: 16px;">
          ${categoryNames.map((key) => `
            <div class="mode-card">
              <div class="mode-badge" style="background:${hexToRgba(categorySeeds[key].color, 0.15)}; color:${categorySeeds[key].color};">${key.toUpperCase()}</div>
              <div class="mode-name">${capitalize(key)}</div>
              <div class="games-count">${categorySeeds[key].games} games • ${categorySeeds[key].achievements} achievements</div>
              <button class="secondary-btn" data-action="open-mode" data-mode="${key}">Enter</button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="panel">
        <div class="section-title">Arena Pulse</div>
        <div class="battle-banner">
          <strong>Global overview</strong>
          <div style="margin-top:12px; color:var(--muted);">${formatNumber(totalWins)} recorded wins across ${totalAchievements} achievements.</div>
        </div>
        <div class="chapter-list" style="margin-top: 18px;">
          <div class="chapter-row"><span>Season Pass</span><strong>Matrix Breaker</strong></div>
          <div class="chapter-row"><span>Currency</span><strong>Cyber Bits</strong></div>
          <div class="chapter-row"><span>Refresh Count</span><strong>${formatNumber(marketRefreshes.length)}</strong></div>
          <div class="chapter-row"><span>Friends</span><strong>${player.friends.length}</strong></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('homeSection').innerHTML = homeMarkup;
  attachEventHandlers();
}

function renderCategories() {
  const markup = `
    <div class="section-title">Game Categories</div>
    <div class="categories-grid" style="margin-top: 18px;">
      ${categoryNames.map((key) => {
        const meta = categorySeeds[key];
        const gameNames = gameCatalog[key].slice(0, 6).map((game) => game.name).join(', ');
        return `
          <div class="panel">
            <div class="mode-badge" style="background:${hexToRgba(meta.color, 0.14)}; color:${meta.color};">${meta.tag}</div>
            <h3 style="margin: 12px 0 8px; font-size:1.6rem;">${capitalize(key)}</h3>
            <p class="hero-copy" style="margin-bottom: 12px;">${meta.subtitle}</p>
            <div class="games-count">${meta.games} games • ${meta.achievements} achievements</div>
            <div class="battle-banner" style="margin-top: 12px;">
              <strong>Featured</strong>
              <div style="margin-top: 8px; color: var(--muted);">${gameNames}</div>
            </div>
            <div class="inline-actions">
              <button class="primary-btn" data-action="play-mode" data-mode="${key}">Play ${capitalize(key)}</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  document.getElementById('categoriesSection').innerHTML = markup;
  attachEventHandlers();
}

function renderLocker() {
  const player = getActivePlayer();
  const locker = player.locker;

  const markup = `
    <div class="section-title">Locker</div>
    <div class="locker-grid" style="margin-top: 18px;">
      <div class="panel">
        <h3 style="margin-top: 0;">Equipped</h3>
        <div class="chapter-list">
          <div class="chapter-row"><span>Starter Costume</span><strong>${locker.costume}</strong></div>
          <div class="chapter-row"><span>Gun Skin</span><strong>${locker.gunSkin}</strong></div>
          <div class="chapter-row"><span>Emotes</span><strong>${locker.emotes.join(', ')}</strong></div>
          <div class="chapter-row"><span>Lobby Song</span><strong>${locker.music.join(', ')}</strong></div>
        </div>
      </div>
      <div class="panel">
        <h3 style="margin-top: 0;">Loadout</h3>
        <div class="chapter-list">
          <div class="chapter-row"><span>Style</span><strong>Cartoony</strong></div>
          <div class="chapter-row"><span>Back bling</span><strong>Glitch Halo</strong></div>
          <div class="chapter-row"><span>Trail</span><strong>Neon Byte</strong></div>
          <div class="chapter-row"><span>Ready</span><strong>Battle Pass</strong></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('lockerSection').innerHTML = markup;
  attachEventHandlers();
}

function renderShop() {
  const markup = `
    <div class="section-title">Shop</div>
    <div class="shop-grid" style="margin-top: 18px;">
      <div class="panel">
        <div class="section-title" style="font-size:1rem;">Costumes</div>
        ${costumes.map((item, index) => `
          <div class="item-card" style="margin-top: 12px;">
            <div class="item-icon">${['🧡', '⚡', '💠', '🪐', '🛡'][index]}</div>
            <div>
              <div style="font-weight:700;">${item}</div>
              <div class="price">${200 + index * 120} Cyber Bits</div>
            </div>
            <button class="secondary-btn" data-shop="costume" data-item="${item}">Buy</button>
          </div>
        `).join('')}
      </div>

      <div class="panel">
        <div class="section-title" style="font-size:1rem;">Gun Skins</div>
        ${gunSkins.map((item, index) => `
          <div class="item-card" style="margin-top: 12px;">
            <div class="item-icon">${['🔫', '🔫', '💥', '⚙️'][index]}</div>
            <div>
              <div style="font-weight:700;">${item}</div>
              <div class="price">${250 + index * 150} Cyber Bits</div>
            </div>
            <button class="secondary-btn" data-shop="gun" data-item="${item}">Buy</button>
          </div>
        `).join('')}
      </div>

      <div class="panel">
        <div class="section-title" style="font-size:1rem;">Emotes & Songs</div>
        ${[...emotes, ...songs].map((item, index) => `
          <div class="item-card" style="margin-top: 12px;">
            <div class="item-icon">${index < emotes.length ? '🎉' : '🎵'}</div>
            <div>
              <div style="font-weight:700;">${item}</div>
              <div class="price">${index < emotes.length ? 180 + index * 30 : 320 + index * 25} Cyber Bits</div>
            </div>
            <button class="secondary-btn" data-shop="misc" data-item="${item}">Buy</button>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="panel" style="margin-top: 18px;">
      <div class="section-title">Packs</div>
      <div class="packs-list" style="margin-top: 14px;">
        ${packs.map((pack) => `
          <div class="pack-row">
            <div>
              <strong>${pack.name}</strong>
              <div style="color: var(--muted); margin-top: 5px;">${pack.items.join(' • ')}</div>
            </div>
            <div style="display:grid; gap:8px; justify-items:end;">
              <strong style="color: var(--yellow);">${pack.price} Bits</strong>
              <button class="secondary-btn" data-shop="pack" data-item="${pack.name}">Claim</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('shopSection').innerHTML = markup;
  attachEventHandlers();
}

function renderLeaderboard() {
  const players = readAccounts().sort((a, b) => b.wins - a.wins).slice(0, 10);
  const rows = players.map((player, index) => `
    <tr>
      <td><span class="rank-badge">${index + 1}</span></td>
      <td>${player.username}</td>
      <td>${player.role === 'admin' ? 'Admin' : 'Player'}</td>
      <td>${formatNumber(player.wins)}</td>
      <td>${formatNumber(player.cyberBits)}</td>
    </tr>
  `).join('');

  document.getElementById('leaderboardSection').innerHTML = `
    <div class="section-title">Leaderboard</div>
    <div class="panel" style="margin-top: 18px;">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Type</th>
            <th>Wins</th>
            <th>Cyber Bits</th>
          </tr>
        </thead>
        <tbody>
          ${rows || '<tr><td colspan="5">No players yet</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

function renderAchievements() {
  const categories = categoryNames.map((key) => {
    const list = achievementsByCategory[key].slice(0, 12).map((achievement) => `
      <div class="achievement-card">
        <div class="game-header">
          <div class="achievement-name">${achievement.name}</div>
          <span class="pill">+${achievement.reward}</span>
        </div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
    `).join('');

    return `
      <div class="panel">
        <div class="section-title" style="font-size:1.1rem;">${capitalize(key)} ${categorySeeds[key].achievements}</div>
        <div class="achievement-grid" style="margin-top: 14px;">${list}</div>
      </div>
    `;
  }).join('');

  document.getElementById('achievementsSection').innerHTML = `
    <div class="section-title">Achievements</div>
    <div class="battle-banner" style="margin-top: 18px;">${allAchievements.length} achievements across all categories</div>
    <div class="categories-grid" style="margin-top: 18px;">${categories}</div>
  `;
}

function renderFriends() {
  const player = getActivePlayer();

  document.getElementById('friendsSection').innerHTML = `
    <div class="section-title">Friends</div>
    <div class="friend-grid" style="margin-top: 18px;">
      ${player.friends.map((friend) => `
        <div class="friend-card">
          <div class="friend-main">
            <div class="friend-avatar">${friend.name[0].toUpperCase()}</div>
            <div>
              <div style="font-weight:700;">${friend.name}</div>
              <div style="color:var(--muted);">${friend.status}</div>
            </div>
          </div>
          <span class="friend-status">${friend.status === 'online' ? 'Ready' : friend.status === 'in-match' ? 'Battle' : 'Away'}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSettings() {
  const player = getActivePlayer();
  const settings = player.settings;
  const rows = [
    ['Master Audio', settings.sound],
    ['Crosshair Overlay', settings.crosshair],
    ['Motion Blur', settings.motionBlur],
    ['Vivid Mode', settings.vividMode],
    ['Dynamic Shadows', settings.shadows]
  ];

  document.getElementById('settingsSection').innerHTML = `
    <div class="section-title">Settings</div>
    <div class="settings-grid" style="margin-top: 18px;">
      ${rows.map(([label, value]) => `
        <div class="setting-card">
          <div class="toggle-row">
            <strong>${label}</strong>
            <button class="switch ${value ? 'on' : ''}" data-setting="${label.toLowerCase().replace(/\s+/g, '-')}"></button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  attachEventHandlers();
}

function renderApp() {
  const player = getActivePlayer();

  if (!player) {
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('appShell').classList.add('hidden');
    return;
  }

  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('appShell').classList.remove('hidden');
  document.getElementById('profileName').textContent = player.username;
  document.getElementById('profileRole').textContent = player.role === 'admin' ? 'Admin Operator' : 'Arena Agent';
  document.getElementById('profileAvatar').textContent = player.username.charAt(0).toUpperCase();
  document.getElementById('cyberBitsDisplay').textContent = formatNumber(player.cyberBits);

  renderHome();
  renderCategories();
  renderLocker();
  renderShop();
  renderLeaderboard();
  renderAchievements();
  renderFriends();
  renderSettings();

  setDefaultSection('home');
}

function setDefaultSection(sectionName) {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.dataset.section === sectionName);
  });

  document.querySelectorAll('.section').forEach((section) => {
    section.classList.toggle('active', section.id === `${sectionName}Section`);
  });
}

function attachEventHandlers() {
  document.querySelectorAll('[data-action="open-mode"]').forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.mode;
      setDefaultSection('categories');
      const section = document.getElementById('categoriesSection');
      if (section) {
        const focused = section.querySelector(`[data-mode="${mode}"]`);
        if (focused) focused.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  document.querySelectorAll('[data-call="play-random"]').forEach((button) => {
    button.addEventListener('click', () => {
      const mode = categoryNames[Math.floor(Math.random() * categoryNames.length)];
      playMode(mode);
    });
  });

  document.querySelectorAll('[data-call="open-category"]').forEach((button) => {
    button.addEventListener('click', () => setDefaultSection('categories'));
  });

  document.querySelectorAll('[data-action="play-mode"]').forEach((button) => {
    button.addEventListener('click', () => playMode(button.dataset.mode));
  });

  document.querySelectorAll('[data-shop]').forEach((button) => {
    button.addEventListener('click', () => {
      const player = getActivePlayer();
      const item = button.dataset.item;
      const cost = 250;
      if (player.cyberBits < cost) {
        alert('Not enough Cyber Bits');
        return;
      }
      player.cyberBits -= cost;
      setActivePlayer(player);
      renderApp();
      alert(`${item} purchased successfully!`);
    });
  });

  document.querySelectorAll('.switch').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const player = getActivePlayer();
      const key = toggle.dataset.setting;
      const settingKey = key?.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      if (!settingKey || !player.settings[settingKey]) return;
      player.settings[settingKey] = !player.settings[settingKey];
      setActivePlayer(player);
      renderSettings();
    });
  });
}

function playMode(mode) {
  const player = getActivePlayer();
  const game = gameCatalog[mode][Math.floor(Math.random() * gameCatalog[mode].length)];
  const reward = 80 + (game.wins % 50) * 3;
  player.wins += 1;
  player.cyberBits += reward;
  player.achievements.push({ mode, reward, name: `Arena Victory — ${game.name}` });
  setActivePlayer(player);
  renderApp();
  alert(`Victory! You won ${game.name} and earned ${reward} Cyber Bits.`);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function hexToRgba(hex, alpha = 1) {
  const value = hex.replace('#', '');
  const bigint = parseInt(value, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('usernameInput').value.trim();
  const code = document.getElementById('codeInput').value.trim();

  if (!username || !code) {
    alert('Please enter both username and code.');
    return;
  }

  const mode = document.querySelector('.auth-tab.active')?.dataset.mode || 'login';
  if (mode === 'create') {
    loginAccount(username, code);
  } else if (mode === 'login') {
    loginAccount(username, code);
  }
}

function setupAuthUI() {
  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach((node) => node.classList.toggle('active', node === tab));
      const button = document.getElementById('authSubmitBtn');
      const mode = tab.dataset.mode || 'login';
      button.textContent = mode === 'create' ? 'Create Account' : mode === 'admin' ? 'Admin Login' : 'Enter Matrix';
    });
  });

  document.getElementById('authForm').addEventListener('submit', handleAuthSubmit);

  document.getElementById('quickCreateBtn').addEventListener('click', () => {
    const defaultName = `Shock${Math.floor(Math.random() * 900 + 100)}`;
    const defaultCode = String(Math.floor(Math.random() * 899999 + 100000));
    document.getElementById('usernameInput').value = defaultName;
    document.getElementById('codeInput').value = defaultCode;
    document.querySelector('.auth-tab[data-mode="create"]').click();
    document.getElementById('authSubmitBtn').click();
  });

  document.getElementById('adminTab').addEventListener('click', () => {
    document.querySelectorAll('.auth-tab').forEach((node) => node.classList.toggle('active', node === document.getElementById('adminTab')));
    const username = document.getElementById('usernameInput').value.trim();
    const code = document.getElementById('codeInput').value.trim();
    document.getElementById('authSubmitBtn').textContent = 'Admin Login';

    if (username && code) {
      loginAsAdmin(username, code);
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', logout);

  document.querySelectorAll('.nav-item').forEach((navItem) => {
    navItem.addEventListener('click', () => {
      const section = navItem.dataset.section;
      setDefaultSection(section);
      document.querySelectorAll('.nav-item').forEach((node) => node.classList.toggle('active', node === navItem));
    });
  });
}

function showLoadingScreen() {
  const loadingFill = document.getElementById('loadingFill');
  const loadingText = document.getElementById('loadingText');
  let progress = 0;
  const messages = [
    'Booting up the arena...',
    'Syncing battle pass data...',
    'Loading cosmetics vault...',
    'Linking squad chat...',
    'Ready for launch...'
  ];

  const timer = setInterval(() => {
    progress += 12;
    loadingFill.style.width = `${progress}%`;
    loadingText.textContent = messages[Math.min(Math.floor(progress / 25), messages.length - 1)];

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        document.getElementById('loadingScreen').classList.remove('visible');
        setTimeout(() => {
          document.getElementById('loadingScreen').classList.add('hidden');
          renderApp();
        }, 500);
      }, 450);
    }
  }, 250);
}

setupAuthUI();
showLoadingScreen();

if (!localStorage.getItem(STORAGE_KEYS.accounts)) {
  const starter = makePlayer('Nova', '2024');
  writeAccounts([starter]);
}

const navigationButtons = document.querySelectorAll('.nav-item');
if (navigationButtons.length) {
  navigationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.section;
      document.querySelectorAll('.section').forEach((panel) => {
        panel.classList.toggle('active', panel.id === `${section}Section`);
      });
    });
  });
}

function handleShopPurchase(button) {
  const player = getActivePlayer();
  const item = button.dataset.item;
  const price = 300;
  if (player.cyberBits < price) {
    alert('Not enough Cyber Bits');
    return;
  }
  player.cyberBits -= price;
  setActivePlayer(player);
  renderApp();
  alert(`${item} purchased.`);
}

window.addEventListener('load', () => {
  const existingPlayer = getActivePlayer();
  if (existingPlayer) {
    renderApp();
  }
});
