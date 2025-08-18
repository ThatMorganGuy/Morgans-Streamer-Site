// Basic progressive enhancement: embed Twitch player + chat if allowed
(function () {
  const currentYearEl = document.getElementById('year');
  if (currentYearEl) currentYearEl.textContent = String(new Date().getFullYear());

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav after clicking a link (mobile UX)
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest('a')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const container = document.querySelector('.embed-grid');
  const playerFrame = document.getElementById('twitch-player');
  const chatFrame = document.getElementById('twitch-chat');
  const fallback = document.getElementById('player-fallback');

  if (!container || !playerFrame || !chatFrame) return;

  const channel = container.getAttribute('data-channel') || 'ThatMorganGuy';

  // Twitch embed requires a parent parameter with the host serving the page
  const hostname = location.hostname;
  const isFile = location.protocol === 'file:' || hostname === '';
  const isIpV4 = /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname);

  // Show fallback when opened directly as a file OR served from a raw IP (Twitch embed blocks IP parents)
  if ((isFile || isIpV4) && fallback) fallback.hidden = false;

  if (!isFile && !isIpV4) {
    const parent = encodeURIComponent(hostname);
    const playerSrc = `https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&parent=${parent}&muted=true`;
    const chatSrc = `https://www.twitch.tv/embed/${encodeURIComponent(channel)}/chat?parent=${parent}`;

    playerFrame.src = playerSrc;
    chatFrame.src = chatSrc;
  }
})();


// Falling cherry blossoms on Mumma theme
(function () {
  const isMummaTheme = document.body.classList.contains('theme-mumma');
  if (!isMummaTheme) return;

  const MAX_BLOSSOMS = 24;
  const SPAWN_MS = 800; // cadence
  let spawned = 0;

  function spawnBlossom() {
    if (spawned >= MAX_BLOSSOMS) return;
    const el = document.createElement('div');
    el.className = 'blossom';
    const startLeft = Math.random() * 100; // vw
    const duration = 8 + Math.random() * 8; // seconds
    const drift = (Math.random() * 160 - 80) + 'px';
    const rot = (Math.random() * 720 - 360) + 'deg';
    const delay = Math.random() * 1.2;
    const size = 12 + Math.random() * 16; // px
    el.style.left = startLeft + 'vw';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.setProperty('--drift', drift);
    el.style.setProperty('--rot', rot);
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 's';
    document.body.appendChild(el);
    spawned++;
    // Cleanup after animation
    setTimeout(() => el.remove(), (delay + duration + 0.5) * 1000);
  }

  // Initial burst
  for (let i = 0; i < 8; i++) spawnBlossom();
  // Gentle stream
  const interval = setInterval(() => {
    spawnBlossom();
    if (spawned >= MAX_BLOSSOMS) clearInterval(interval);
  }, SPAWN_MS);
})();


