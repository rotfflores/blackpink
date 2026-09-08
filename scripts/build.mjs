import { mkdir, writeFile } from 'node:fs/promises';
import { icon, decorate } from './icons.mjs';

// Static pages: content remains readable even when JavaScript is disabled.
const members = [
  { slug: 'rose', name: 'Rosé', surname: 'Park', image: 'rose.jpg', video: 'rose.mp4', full: 'Roseanne Park', birthday: '11 de febrero de 1997', instagram: 'roses_are_rosie', description: 'Una voz inconfundible. Rosé combina sensibilidad, fuerza y una conexión especial con la música. Su debut en solitario llegó con «On The Ground» en 2021.' },
  { slug: 'jennie', name: 'Jennie', surname: 'Kim', image: 'Jenie.jpg', video: 'jennie.mp4', full: 'Jennie Kim', birthday: '16 de enero de 1996', instagram: 'jennierubyjane', description: 'Rap, voz y una presencia que se reconoce al instante. Jennie lleva su identidad a cada escenario y abrió su camino individual con «SOLO».' },
  { slug: 'lisa', name: 'Lisa', surname: 'Manobal', image: 'lisa.jpg', video: 'lisa1.mp4', full: 'Lalisa Manobal', birthday: '27 de marzo de 1997', instagram: 'lalalalisa_m', description: 'Movimiento, ritmo y energía. Lisa convierte cada actuación en una expresión propia, desde las coreografías del grupo hasta su debut individual «LALISA».' },
  { slug: 'jisoo', name: 'Jisoo', surname: 'Kim', image: 'Jisoo.jpg', video: 'jisoo.mp4', full: 'Kim Ji-soo', birthday: '3 de enero de 1995', instagram: 'sooyaaa__', description: 'Una personalidad serena y una presencia inolvidable. Jisoo reúne música e interpretación en una trayectoria con un estilo propio.' },
];
const external = 'target="_blank" rel="noopener noreferrer"';
function header(active) {
  return `<a class="skip-link" href="#main">Saltar al contenido</a><header class="site-header"><a class="wordmark" href="home.html" aria-label="BLACKPINK, inicio">BLACKPINK</a><nav aria-label="Navegación principal">${[['home.html','Inicio'],['blackpink.html','El grupo'],['home.html#integrantes','Integrantes'],['blackpink.html#discografia','Música']].map(([href,label]) => `<a href="${href}"${active === href ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav><a class="header-note" href="about.html">BLINK SPACE <span aria-hidden="true">↗</span></a></header>`;
}
function footer() {
  return `<footer class="site-footer"><a class="wordmark" href="home.html">BLACKPINK</a><p>Hecho para BLINKs. Un espacio de fans, no oficial.</p><a href="about.html">Acerca del proyecto ↗</a><a href="#main">Volver arriba ↑</a></footer>`;
}
function page(title, description, content, active = '') {
  return `<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0b0b0d"><meta name="description" content="${description}"><title>${title} · BLACKPINK</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="css/site.css"><script src="js/site.js" defer></script></head><body>${decorate(header(active))}<main id="main">${decorate(content)}</main>${decorate(footer())}</body></html>\n`;
}
function video(src, poster) {
  return `<video class="hero-video" muted loop playsinline preload="metadata" poster="img/${poster}" aria-hidden="true" tabindex="-1"><source src="videos/${src}" type="video/mp4"></video>`;
}
function controls() { return `<button class="video-toggle" type="button" hidden aria-label="Reproducir video de fondo">${icon('play')}<span class="video-label">Reproducir fondo</span></button><span class="video-status" role="status"></span>`; }
function cards(exclude = '') {
  return `<div class="member-grid">${members.filter(m => m.slug !== exclude).map((m,i) => `<a class="member-card" href="${m.slug}.html"><img src="img/${m.image}" alt="Retrato de ${m.name}" width="600" height="900" loading="lazy"><span class="member-caption"><span><small>BLACKPINK</small><strong>${m.name}</strong></span><span class="circle-arrow" aria-hidden="true">↗</span></span></a>`).join('')}</div>`;
}
function albums() {
  return `<section class="section" id="discografia"><div class="section-heading"><div><p class="eyebrow">EL SONIDO DE BLACKPINK</p><h2>En repeat.</h2></div><p>Dos álbumes para volver a escuchar.</p></div><div class="album-grid">${[
    ['THE ALBUM','2020','album1.avif','71O60S5gIJSIAhdnrDIh3N'],
    ['BORN PINK','2022','album2.jpg','7jaSNQUBJbvfbZHLNFrV7P'],
  ].map(([name,year,img,id]) => `<article class="album-card"><img src="img/${img}" alt="Portada de ${name}" width="300" height="300" loading="lazy"><div><p class="eyebrow">ÁLBUM · ${year}</p><h3>${name}</h3><a class="text-link" href="https://open.spotify.com/album/${id}" ${external}>Escuchar en Spotify ↗</a><details class="album-player"><summary>Reproducir aquí</summary><iframe data-src="https://open.spotify.com/embed/album/${id}" title="Escuchar ${name} en Spotify" height="352" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe><p class="player-note">Reproductor de Spotify. Necesita conexión a internet.</p></details></div></article>`).join('')}</div></section>`;
}
const home = `<section class="hero home-hero">${video('blackpink.mp4','album2.jpg')}<div class="hero-shade"></div><div class="hero-content"><p class="eyebrow"><span class="pink-dot"></span> CUATRO ARTISTAS. UN UNIVERSO.</p><h1>BLACK<span>PINK</span></h1><p class="hero-tagline">In your area.</p><p class="hero-description">La música, el talento y la energía que nos conectan. Explora el universo de Jisoo, Jennie, Rosé y Lisa.</p><div class="hero-actions"><a class="button" href="#integrantes">Conoce a las integrantes <span aria-hidden="true">↘</span></a><a class="text-link" href="blackpink.html#discografia">Explora su música ↗</a></div></div><div class="hero-bottom"><span>BLACKPINK FAN SPACE </span>${controls()}<a href="#integrantes">DESCUBRE MÁS ↓</a></div></section><section class="section" id="integrantes"><div class="section-heading"><div><p class="eyebrow">CONOCE AL GRUPO</p><h2>Cuatro formas de brillar.</h2></div><p>Una identidad compartida.<br>Cuatro historias únicas.</p></div>${cards()}</section>${albums()}<section class="fan-banner"><p class="eyebrow">PARA QUIENES LO SIENTEN IGUAL</p><h2>Siempre hay un lugar<br>para otro BLINK.</h2><a class="button button-dark" href="https://www.youtube.com/@BLACKPINK" ${external}>Visita su canal oficial ↗</a></section>`;
await mkdir('css', { recursive: true });
await mkdir('js', { recursive: true });
for (const file of ['index.html','home.html']) await writeFile(file, page('Inicio', 'Explora BLACKPINK: integrantes, videos de fondo y música en un espacio creado para BLINKs.', home, 'home.html'));
await writeFile('blackpink.html', page('El grupo', 'Conoce el universo de BLACKPINK y escucha THE ALBUM y BORN PINK.', `<section class="hero group-hero">${video('blackpink.mp4','album2.jpg')}<div class="hero-shade"></div><div class="hero-content"><p class="eyebrow">JISOO · JENNIE · ROSÉ · LISA</p><h1>Better<br><span>together.</span></h1><p class="hero-description">BLACKPINK une cuatro personalidades en un sonido que mezcla pop, rap y una energía inconfundible. Desde su debut en 2016, la música es el punto de encuentro con BLINKs de todo el mundo.</p><a class="button" href="#discografia">Descubre su música ↓</a></div><div class="hero-bottom"><span>BLACKPINK / EL GRUPO</span>${controls()}</div></section>${albums()}<section class="section"><div class="section-heading"><div><p class="eyebrow">EL GRUPO</p><h2>Encuentra tu bias.</h2></div></div>${cards()}</section>`, 'blackpink.html'));

const soloAlbums = {
  rose: { title: 'rosie', id: '34Q2W5StgW4WC6HhbsNWnv', mood: 'Íntima. Honesta. Rosé.', line: 'Su voz, sus historias, su propio universo.', photo: 'rose-bio.jpeg' },
  jennie: { title: 'Ruby', id: '4gBtLWLja2rOze5SknGdUZ', mood: 'Sin límites. Sin etiquetas.', line: 'Todas las facetas de Jennie, en su propia voz.', photo: 'Jenie.jpg' },
  lisa: { title: 'Alter Ego', id: '5eoWRkeplmcCL97afSMJVm', mood: 'La energía toma forma.', line: 'Un universo de ritmos y personalidades.', photo: 'lisa.jpg' },
  jisoo: { title: 'AMORTAGE', id: '1hmW4opQGq4hIYTbEWsyqW', mood: 'Una nueva forma de sentir.', line: 'Entra en el universo musical de Jisoo.', photo: 'Jisoo.jpg' },
};
for (const [i,m] of members.entries()) {
  const next = members[(i + 1) % members.length];
  const album = soloAlbums[m.slug];
  const content = `<section class="hero profile-hero artist-${m.slug}">
    ${video(m.video,album.photo)}<div class="hero-shade"></div>
    <div class="artist-stage"><a class="eyebrow breadcrumb" href="home.html#integrantes">← INTEGRANTES</a>
      <div class="artist-title"><p class="eyebrow">BLACKPINK / SOLO WORLD</p><h1>${m.name}</h1><p class="artist-mood">${album.mood}</p></div>
      <div class="artist-bottom"><a class="button" href="#musica">${icon('play')} Escucha a ${m.name}</a><a class="social-link" href="https://www.instagram.com/${m.instagram}/" ${external}>Instagram ↗</a><a class="text-link" href="#perfil">Descubre su historia ↓</a></div>
    </div><div class="hero-bottom"><span>${m.name.toUpperCase()} / BLACKPINK</span>${controls()}</div>
  </section>
  <nav class="artist-nav" aria-label="Secciones de ${m.name}"><a href="#musica">Su música</a><a href="#perfil">Su historia</a><a href="${next.slug}.html">Descubre a ${next.name} ↗</a></nav>
  <section class="section solo-section" id="musica"><div class="solo-art"><img src="img/solo-${m.slug}.jpg" alt="Portada de ${album.title}, de ${m.name}" width="600" height="600" loading="lazy"></div>
    <div class="solo-content"><p class="eyebrow">SU MÚSICA / EN SOLITARIO</p><h2>${album.title}</h2><p class="solo-description">${album.line}</p>
    <details class="album-player solo-player"><summary>${icon('play')} Reproducir ${album.title}<span class="player-chevron">↓</span></summary><iframe data-src="https://open.spotify.com/embed/album/${album.id}" title="Escuchar ${album.title} de ${m.name} en Spotify" height="352" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></details>
    <a class="text-link" href="https://open.spotify.com/album/${album.id}" ${external}>Escuchar en Spotify ↗</a></div></section>
  <section class="section artist-story" id="perfil"><div class="story-photo"><img src="img/${album.photo}" alt="Retrato de ${m.name}" width="600" height="800" loading="lazy"></div><div class="story-copy"><p class="eyebrow">MÁS ALLÁ DEL ESCENARIO</p><h2>Esencia<br><span>${m.name}.</span></h2><p class="profile-intro">${m.description}</p><dl><div><dt>Nombre</dt><dd>${m.full}</dd></div><div><dt>Nombre artístico</dt><dd>${m.name}</dd></div><div><dt>Grupo</dt><dd>BLACKPINK</dd></div></dl><a class="social-link" href="https://www.instagram.com/${m.instagram}/" ${external}>Instagram ↗</a></div></section>
  <a class="next-member" href="${next.slug}.html"><span class="eyebrow">SIGUE EXPLORANDO</span><span>${next.name} <span aria-hidden="true">↗</span></span></a>`;
  await writeFile(`${m.slug}.html`, page(m.name, `Descubre a ${m.name}: su música, su historia y su universo dentro de BLACKPINK.`, content));
}
await writeFile('about.html', page('Acerca del proyecto', 'Un espacio independiente creado por fans de BLACKPINK.', `<section class="section about-section"><p class="eyebrow">BLINK SPACE</p><h1>De fans.<br><span>Para fans.</span></h1><p>Este proyecto celebra la música y las integrantes de BLACKPINK. Reúne perfiles, videos y enlaces para descubrir su trabajo.</p><h2>Un proyecto independiente</h2><p>Esta página no es un sitio oficial ni está afiliada a BLACKPINK o sus representantes. Las imágenes, videos y música pertenecen a sus respectivos titulares.</p><h2>Sigue al grupo</h2><div class="hero-actions"><a class="button" href="https://www.instagram.com/blackpinkofficial/" ${external}>Instagram ↗</a><a class="text-link" href="https://www.youtube.com/@BLACKPINK" ${external}>YouTube ↗</a></div><h2>Sobre esta página</h2><p>Los reproductores de Spotify se cargan cuando decides abrirlos. Los videos de fondo se pueden pausar y respetan la preferencia de movimiento reducido de tu dispositivo.</p><a class="text-link" href="https://github.com/rotfflores/blackpink" ${external}>Ver proyecto en GitHub ↗</a></section>`));
console.log('Generated 8 static pages.');
