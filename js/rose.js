document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("video");
    
    // Configuración para móviles (especialmente iOS)
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        video.muted = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('autoplay', '');
        
        // Forzar la reproducción en iOS (necesario en algunas versiones)
        var playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Intentar reproducir con un gesto del usuario
                document.body.addEventListener('touchstart', function once() {
                    video.play();
                    document.body.removeEventListener('touchstart', once);
                });
            });
        }
    }

    video.addEventListener("loadedmetadata", function() {
        video.currentTime = 15;
        // Intentar reproducir nuevamente después de establecer el tiempo
        video.play().catch(e => console.log("Error al reproducir:", e));
    });
    
    // Manejar la repetición del video
    video.addEventListener('ended', function() {
        video.currentTime = 15;
        video.play();
    });
});