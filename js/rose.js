document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("video");
    
    // Forzar atributos necesarios para iOS
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('preload', 'auto');
    
    // Eliminar controles nativos (incluso si se añaden por defecto)
    video.removeAttribute('controls');
    
    // Estrategia de reproducción mejorada
    const attemptPlay = () => {
        video.play()
            .then(() => {
                // Ocultar video si no se está reproduciendo realmente
                if (video.paused || video.readyState < 3) {
                    video.style.opacity = '0';
                }
            })
            .catch(error => {
                console.log('Error al reproducir:', error);
                // Mostrar fallback si es necesario
                showFallback();
            });
    };
    
    // Intentar reproducir cuando haya metadatos
    video.addEventListener('loadedmetadata', function() {
        video.currentTime = 15;
        attemptPlay();
    });
    
    // Manejar la visibilidad de la página (para Safari)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            attemptPlay();
        }
    });
    
    // Forzar repetición
    video.addEventListener('ended', function() {
        video.currentTime = 15;
        attemptPlay();
    });
    
    // Función de fallback
    function showFallback() {
        const fallback = document.createElement('div');
        fallback.style.backgroundImage = 'url(fallback-image.jpg)';
        fallback.style.position = 'fixed';
        fallback.style.top = '0';
        fallback.style.left = '0';
        fallback.style.width = '100%';
        fallback.style.height = '100%';
        fallback.style.zIndex = '-1';
        document.body.appendChild(fallback);
        video.style.display = 'none';
    }
    
    // Detectar iOS específicamente
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
        // Estrategia especial para iOS
        video.volume = 0;
        video.playsInline = true;
        
        // Algunos iOS requieren este hack
        setTimeout(() => {
            video.play().catch(e => {
                // Usar un overlay que obligue al usuario a tocar
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.zIndex = '9999';
                overlay.addEventListener('click', function() {
                    video.play();
                    document.body.removeChild(overlay);
                }, { once: true });
                document.body.appendChild(overlay);
            });
        }, 300);
    } else {
        attemptPlay();
    }
});

// Justo después de cargar la página
window.scrollTo(0, 1);
setTimeout(() => {
    window.scrollTo(0, 0);
    video.play();
}, 100);

//scroll 

////////////////////////////////////////


const images = document.querySelectorAll('bio-img');

function triggerAnimation(entries){
  entries.forEach (entry => {
    const image = entry.target.querySelector('img');

    image.classList.toggle('unset', entry.isIntersecting);
  });
}

const options ={
  root: null,
  rootMargin: '0px',
  threshold: 1
};

const observe = new IntersectionObserver(triggerAnimation, options);

images.forEach(image => {
  observe.observe(image);
});