function togglePlay(button, audioId) {
  const audioElement = document.getElementById(audioId);
  
  // Pausar otros audios si están sonando
  document.querySelectorAll('audio').forEach(audio => {
    if (audio !== audioElement) {
      audio.pause();
      const otherBtn = audio.previousElementSibling;
      if (otherBtn && otherBtn.classList.contains('play-btn')) {
        otherBtn.innerHTML = '▶ Escuchar';
        otherBtn.classList.remove('playing');
      }
    }
  });

  // Alternar el audio clickeado
  if (audioElement.paused) {
    audioElement.play().catch(e => console.log("Agrega el archivo .mp3 correspondiente para que suene."));
    button.innerHTML = '⏸ Pausar';
    button.classList.add('playing');
  } else {
    audioElement.pause();
    button.innerHTML = '▶ Escuchar';
    button.classList.remove('playing');
  }
}

function filterSongs() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const sections = document.querySelectorAll('.genre-section');

  sections.forEach(section => {
    let hasVisibleSongs = false;
    const songItems = section.querySelectorAll('.song-item');

    songItems.forEach(item => {
      const songText = item.querySelector('.song-info').textContent.toLowerCase();
      if (songText.includes(input)) {
        item.style.display = 'flex';
        hasVisibleSongs = true;
      } else {
        item.style.display = 'none';
      }
    });

    // Oculta todo el género si no hay resultados en esa categoría
    if (hasVisibleSongs) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}
