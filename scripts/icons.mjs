// Inline SVGs render independently of the device's fonts or emoji set.
export function icon(name) {
  const shapes = {
    'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
    'arrow-down-right': '<path d="m7 7 10 10M7 17h10V7"/>',
    'arrow-down': '<path d="M12 4v16m-7-7 7 7 7-7"/>',
    'arrow-up': '<path d="M12 20V4m-7 7 7-7 7 7"/>',
    'arrow-left': '<path d="M20 12H4m7-7-7 7 7 7"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/>',
    spotify: '<circle cx="12" cy="12" r="10"/><path d="M6 9c4-1.5 8-1 12 1M7 12.5c3-1 6.5-.7 10 1M8 16c3-.8 5-.5 8 .8"/>',
    github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.8c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4a5 5 0 0 0-.1-4s-1.3-.4-4.2 1.5a15 15 0 0 0-8 0C4.1-.4 2.8 0 2.8 0a5 5 0 0 0-.1 4A5.4 5.4 0 0 0 1.2 8.2c0 5.4 3.5 6.6 6.8 7A3.5 3.5 0 0 0 7 18v4" transform="translate(2 1) scale(.9)"/>',
    play: '<path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="3"/>',
  };
  if (!shapes[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon icon-${name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shapes[name]}</svg>`;
}

export function decorate(content) {
  const arrows = { '↗':'arrow-up-right', '↘':'arrow-down-right', '↓':'arrow-down', '↑':'arrow-up', '←':'arrow-left' };
  return content.replace(/[↗↘↓↑←]/g, arrow => icon(arrows[arrow]))
    .replace(/>Instagram /g, `>${icon('instagram')} Instagram `)
    .replace(/>YouTube /g, `>${icon('youtube')} YouTube `)
    .replace(/>Visita su canal oficial /g, `>${icon('youtube')} Visita su canal oficial `)
    .replace(/>Escuchar en Spotify /g, `>${icon('spotify')} Escuchar en Spotify `)
    .replace(/>Ver proyecto en GitHub /g, `>${icon('github')} Ver proyecto en GitHub `);
}
