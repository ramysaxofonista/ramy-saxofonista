let currentAudio = null;
let currentButton = null;
let fadeInterval = null;

function togglePlay(audioId, btn) {
  const audio = document.getElementById(audioId);

  // Si hay otro audio sonando, pausarlo con Fade Out
  if (currentAudio && currentAudio !== audio) {
    fadeOutAndPause(currentAudio, currentButton);
  }

  if (audio.paused) {
    fadeInAndPlay(audio, btn);
  } else {
    fadeOutAndPause(audio, btn);
  }
}

function fadeInAndPlay(audio, btn) {
  clearInterval(fadeInterval);
  audio.volume = 0;
  audio.play();
  btn.textContent = "❚❚ Pausar";
  btn.classList.add("reproduciendo");

  currentAudio = audio;
  currentButton = btn;

  let volume = 0;
  fadeInterval = setInterval(() => {
    if (volume < 1) {
      volume += 0.05;
      audio.volume = Math.min(volume, 1);
    } else {
      clearInterval(fadeInterval);
    }
  }, 50); // Ajusta la velocidad del Fade In (50ms por paso)
}

function fadeOutAndPause(audio, btn) {
  clearInterval(fadeInterval);
  let volume = audio.volume;

  fadeInterval = setInterval(() => {
    if (volume > 0.05) {
      volume -= 0.05;
      audio.volume = Math.max(volume, 0);
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fadeInterval);
      if (btn) {
        btn.textContent = "▶ Escuchar";
        btn.classList.remove("reproduciendo");
      }
    }
  }, 50); // Ajusta la velocidad del Fade Out
}
