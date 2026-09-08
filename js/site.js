const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const video = document.querySelector('.hero-video');
const toggle = document.querySelector('.video-toggle');

if (video && toggle) {
  let wantsPlayback = !reducedMotion.matches && !navigator.connection?.saveData;
  let onScreen = true;
  const status = document.querySelector('.video-status');
  const update = () => {
    const playing = !video.paused;
    toggle.textContent = playing ? 'Ⅱ Pausar fondo' : '▶ Reproducir fondo';
    toggle.setAttribute('aria-label', playing ? 'Pausar video de fondo' : 'Reproducir video de fondo');
  };
  const sync = async () => {
    if (!wantsPlayback || document.hidden || !onScreen) {
      video.pause();
      return;
    }
    try { await video.play(); } catch { /* Autoplay may require a user gesture. The play button remains available. */ }
    update();
  };
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    wantsPlayback = video.paused;
    sync();
  });
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  const handleError = () => {
    wantsPlayback = false;
    toggle.hidden = true;
    if (status) status.textContent = 'Video no disponible';
  };
  video.addEventListener('error', handleError);
  video.querySelector('source')?.addEventListener('error', handleError);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', () => {
    wantsPlayback = !reducedMotion.matches && !navigator.connection?.saveData;
    sync();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    }, { threshold: 0.05 }).observe(video);
  }
  sync();
}

// Load third-party players only when requested; close removes the player to stop audio.
document.querySelectorAll('.album-player').forEach(details => {
  details.addEventListener('toggle', () => {
    const frame = details.querySelector('iframe');
    if (!frame) return;
    if (details.open) {
      document.querySelectorAll('.album-player[open]').forEach(other => {
        if (other !== details) other.open = false;
      });
      frame.src = frame.dataset.src;
    } else {
      frame.removeAttribute('src');
    }
  });
});
