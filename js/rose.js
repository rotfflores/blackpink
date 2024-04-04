document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("video");
    video.addEventListener("loadedmetadata", function() {
      // Establecer el tiempo de inicio en el segundo 30 después de que se carguen los metadatos
      video.currentTime = 15;
    });
  
    video.oncanplay = function() {
      video.play();
    };
  });