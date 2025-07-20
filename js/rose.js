document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("video");
    
    // Configuración especial para iOS/Android
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Asegurar atributos necesarios
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.muted = true;
        
        // Intentar reproducir (con manejo de errores)
        var playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(function(error) {
                // Si falla, esperar interacción del usuario
                document.addEventListener('touchstart', function handler() {
                    video.play();
                    document.removeEventListener('touchstart', handler);
                }, { once: true });
            });
        }
    }

    // Configurar tiempo inicial
    video.addEventListener("loadedmetadata", function() {
        video.currentTime = 15;
        video.play().catch(e => console.log("Error al reproducir:", e));
    });
    
    // Manejar la repetición
    video.addEventListener('ended', function() {
        video.currentTime = 15;
        video.play();
    });
});