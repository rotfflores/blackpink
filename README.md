# BLACKPINK · BLINK Space

Sitio de fans en español con HTML, CSS y JavaScript sin dependencias. Incluye portada, cuatro perfiles, discografía y página acerca del proyecto.

## Desarrollo

Requiere Node.js 18 o posterior. Ejecuta:

```sh
npm run build
npm run check
npm run dev
```

Abre http://127.0.0.1:4173. El servidor admite rangos para reproducir los videos. Después de editar las plantillas, ejecuta el build y recarga la página.

## Estructura

- `scripts/build.mjs`: contenido y plantillas compartidas; genera ocho páginas HTML.
- `css/site.css`: estilos compartidos y diseño adaptable.
- `js/site.js`: controles de fondos y carga bajo demanda de Spotify.
- `videos/` e `img/`: recursos originales; los cinco MP4 permanecen intactos.
- `scripts/check.mjs`: verifica rutas y anclas, mayúsculas de archivos, etiquetas accesibles y conservación de videos.

Las páginas generadas se incluyen en el repositorio para funcionar directamente en GitHub Pages. La navegación y los perfiles funcionan sin JavaScript. Spotify también tiene enlaces directos. Los videos incluyen pausa y respetan movimiento reducido y ahorro de datos cuando el navegador expone esa preferencia. Se pausan fuera de pantalla.

## Publicación

GitHub Pages sirve los archivos de la raíz. Para Sites, ejecuta `node scripts/prepare-hosting.mjs` después del build. Crea `dist/` con recursos ligeros y referencias a los videos originales en GitHub Pages. Esa vista depende de que los MP4 sigan disponibles en https://rotfflores.github.io/blackpink/videos/.

## Créditos

Proyecto independiente de fans, sin afiliación oficial. Imágenes, videos y música pertenecen a sus respectivos titulares. Spotify se carga únicamente al abrir un reproductor.
