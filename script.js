function togglePlay(button, audioId) {
  const audioElement = document.getElementById(audioId);
  
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

  if (audioElement.paused) {
    audioElement.play().catch(e => console.log("Agrega el archivo .mp3 correspondiente."));
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

    if (hasVisibleSongs) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

// Lógica del "Carrito" / Selección de canciones
const checkboxes = document.querySelectorAll('.song-checkbox');
const songCounter = document.getElementById('songCounter');

checkboxes.forEach(box => {
  box.addEventListener('change', () => {
    const selectedCount = document.querySelectorAll('.song-checkbox:checked').length;
    songCounter.textContent = selectedCount;
  });
});

function enviarWhatsApp() {
  const clientName = document.getElementById('clientName').value.trim();
  const selectedCheckboxes = document.querySelectorAll('.song-checkbox:checked');
  
  if (!clientName) {
    alert("Por favor, ingresa tu nombre o el del evento antes de enviar la selección.");
    document.getElementById('clientName').focus();
    return;
  }

  if (selectedCheckboxes.length === 0) {
    alert("Por favor, selecciona al menos una canción.");
    return;
  }

  let mensaje = `Hola RAMY, soy *${clientName}*. Esta es mi selección de canciones para el evento:%0A%0A`;
  
  let i = 1;
  selectedCheckboxes.forEach(box => {
    mensaje += `${i}. ${box.value}%0A`;
    i++;
  });

  // Reemplaza ESTE_NUMERO por tu número de WhatsApp real con código de país (ej. 5219991234567 para México)
  const numeroWhatsApp = "529811415935"; 
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  
  window.open(url, '_blank');
}
