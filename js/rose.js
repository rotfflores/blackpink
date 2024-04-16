document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("video");
    video.addEventListener("loadedmetadata", function() {
      // Establecer el tiempo de inicio en el segundo 30 después de que se carguen los metadatos
      video.currentTime = 15;
    });
  }
  );

  document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("video");

    // Detectar si el dispositivo es móvil
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
    }

    video.addEventListener("loadedmetadata", function() {
        // Establecer el tiempo de inicio en el segundo 15 después de que se carguen los metadatos
        video.currentTime = 15;
    });
});

//scroll 
function callback(entries){
  entries.forEach(entry => {
    console.log(entry);
  });
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

const observer = new IntersectionObserver(callback, options);
const element = document.getElementById('video');
observer.observe(element);