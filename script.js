// Mensajes románticos para cada regalo
const giftMessages = {
  1: "En esta Navidad quiero recordarte cuánto te amo y lo agradecido que estoy por tenerte en mi vida. Desde que llegaste, todo cambió para mejor: mis días tienen más sentido, mis sueños tienen dirección y mi corazón tiene un hogar contigo.
Este año nos enseñó mucho. Nos hizo crecer, caer, levantarnos y aprender juntos. Y aunque a veces el camino no sea fácil, sé que lo más hermoso es que lo caminamos de la mano. El próximo año viene lleno de retos, proyectos y metas, y quiero vivir cada uno contigo, apoyándonos, creciendo como personas y siendo nuestra mejor versión, juntos.
Quiero que nunca dudes de lo fuerte, valiosa y especial que eres. Yo estaré aquí, para impulsarte cuando te canses, para abrazarte cuando lo necesites y para amarte incluso en los días difíciles. Prometo cuidarte, respetarte y elegirte todos los días de mi vida.
Gracias por existir, por ser tú, por enseñarme tanto sin decir una palabra.
Te amo más de lo que las palabras pueden explicar… hoy, mañana y siempre.
Feliz Navidad, mi amor. 🎄❤️",
  2: null // Regalo 2 muestra imagen
};

// Variables globales
let musicPlaying = false;
let currentSong = 1;
const backgroundMusic = document.getElementById('background-music');
const startScreen = document.getElementById('start-screen');
const mainContent = document.getElementById('main-content');
const startButton = document.getElementById('start-button');

// =========================
// PANTALLA DE INICIO
// =========================
function startExperience() {
  console.log('🎉 Iniciando experiencia...');
  
  // Ocultar pantalla de inicio
  if (startScreen) {
    startScreen.classList.add('hidden');
  }
  
  // Mostrar contenido principal
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }
  
  // Iniciar música
  playSong(1);
  
  // Pequeño delay para mejor transición
  setTimeout(() => {
    if (startScreen) {
      startScreen.style.display = 'none';
    }
  }, 500);
}

// =========================
// SISTEMA DE MÚSICA
// =========================
function playSong(songNumber) {
  console.log('🎵 Reproduciendo canción:', songNumber);
  
  if (!backgroundMusic) {
    console.error('❌ Elemento de audio no encontrado');
    return;
  }
  
  currentSong = songNumber;
  
  // Cambiar la fuente del audio
  backgroundMusic.innerHTML = `
    <source src="./cancion${songNumber}.mp3" type="audio/mpeg">
    <source src="./cancion${songNumber}.wav" type="audio/wav">
  `;
  
  // Cargar y reproducir
  backgroundMusic.load();
  
  const playPromise = backgroundMusic.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('✅ Música iniciada:', songNumber);
        musicPlaying = true;
        updateMusicButton();
      })
      .catch(error => {
        console.log('⚠️ Error al reproducir:', error);
        musicPlaying = false;
        updateMusicButton();
      });
  }
}

function updateMusicButton() {
  const toggleMusicBtn = document.getElementById('toggle-music');
  if (toggleMusicBtn) {
    toggleMusicBtn.textContent = musicPlaying ? '🎵' : '🔇';
    toggleMusicBtn.title = musicPlaying ? 'Pausar música' : 'Reproducir música';
  }
}

// =========================
// SISTEMA DE REGALOS MEJORADO
// =========================
function setupGifts() {
  const gifts = document.querySelectorAll('.clickable-gift');
  console.log('🎁 Configurando', gifts.length, 'regalos...');
  
  gifts.forEach((gift) => {
    const giftNumber = parseInt(gift.getAttribute('data-gift'));
    console.log('🎁 Configurando regalo', giftNumber);
    
    // Prevenir comportamiento por defecto
    gift.style.cursor = 'pointer';
    gift.style.userSelect = 'none';
    gift.style.webkitUserSelect = 'none';
    gift.style.webkitTouchCallout = 'none';
    
    // Variables para gestionar el toque
    let touchHandled = false;
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    
    // TOUCH START
    gift.addEventListener('touchstart', function(e) {
      touchHandled = false;
      touchStartTime = Date.now();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      
      // Efecto visual
      this.style.transform = 'scale(0.92)';
      this.style.filter = 'brightness(1.2)';
      
      console.log('👆 Touch start en regalo', giftNumber);
    }, { passive: true });
    
    // TOUCH END - EVENTO PRINCIPAL PARA MÓVILES
    gift.addEventListener('touchend', function(e) {
      e.preventDefault(); // Importante para evitar el click fantasma
      
      // Restaurar visual
      this.style.transform = '';
      this.style.filter = '';
      
      if (touchHandled) {
        console.log('⏭️ Touch ya manejado');
        return;
      }
      
      const touchDuration = Date.now() - touchStartTime;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = Math.abs(touchEndX - touchStartX);
      const deltaY = Math.abs(touchEndY - touchStartY);
      
      console.log('📊 Touch end - Duración:', touchDuration, 'ms, ΔX:', deltaX, 'ΔY:', deltaY);
      
      // Validar que sea un toque válido (no un scroll)
      if (touchDuration < 500 && deltaX < 30 && deltaY < 30) {
        console.log('✅ Touch válido, abriendo regalo', giftNumber);
        touchHandled = true;
        handleGiftClick(giftNumber);
      } else {
        console.log('❌ Touch inválido (scroll o toque largo)');
      }
    });
    
    // TOUCH CANCEL
    gift.addEventListener('touchcancel', function() {
      this.style.transform = '';
      this.style.filter = '';
      console.log('🚫 Touch cancelado');
    });
    
    // CLICK (para desktop)
    gift.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Solo ejecutar en desktop (cuando no hay soporte táctil)
      if (!('ontouchstart' in window)) {
        console.log('🖱️ Click en regalo', giftNumber, '(desktop)');
        handleGiftClick(giftNumber);
      } else {
        console.log('📱 Click ignorado (dispositivo táctil)');
      }
    });
    
    // MOUSE HOVER (solo desktop)
    if (window.matchMedia("(hover: hover)").matches) {
      gift.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) translateY(-8px)';
      });
      
      gift.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    }
  });
}

function handleGiftClick(giftNumber) {
  console.log('🎁 Abriendo regalo número:', giftNumber);
  
  // Manejar según el regalo
  if (giftNumber === 1) {
    // Regalo 1: Mostrar mensaje y cambiar a canción 2
    console.log('📝 Regalo 1: Mostrando mensaje y cambiando a canción 2');
    showTextModal(giftNumber);
    playSong(2);
  } else if (giftNumber === 2) {
    // Regalo 2: Mostrar imagen y canción 3
    console.log('🖼️ Regalo 2: Mostrando imagen y canción 3');
    showImageModal();
    playSong(3);
  }
}

// =========================
// MOSTRAR MODALES
// =========================
function showTextModal(giftNumber) {
  const modal = document.getElementById('modal-overlay');
  const textLetter = document.getElementById('text-letter');
  const imageLetter = document.getElementById('image-letter');
  const modalMessage = document.getElementById('modal-message');
  
  console.log('📄 Mostrando modal de texto para regalo', giftNumber);
  
  if (modal && textLetter && modalMessage) {
    // Mostrar carta de texto, ocultar carta de imagen
    textLetter.style.display = 'block';
    imageLetter.style.display = 'none';
    
    // Establecer mensaje
    modalMessage.textContent = giftMessages[giftNumber] || "Te amo mucho ❤️";
    
    // Mostrar modal
    modal.classList.add('active');
    
    // Prevenir scroll del body
    lockScroll();
    
    console.log('✅ Modal de texto mostrado');
  } else {
    console.error('❌ Elementos del modal no encontrados');
  }
}

function showImageModal() {
  const modal = document.getElementById('modal-overlay');
  const textLetter = document.getElementById('text-letter');
  const imageLetter = document.getElementById('image-letter');
  const modalImage = document.getElementById('modal-image');
  
  console.log('🖼️ Mostrando modal de imagen');
  
  if (modal && imageLetter && modalImage) {
    // Ocultar carta de texto, mostrar carta de imagen
    textLetter.style.display = 'none';
    imageLetter.style.display = 'block';
    
    // Establecer la imagen
    modalImage.src = './imagen-amor.jpg';
    
    // Manejar error de carga
    modalImage.onerror = function() {
      console.log('⚠️ Imagen no encontrada, usando placeholder');
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ff69b4" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" fill="white"%3E%E2%9D%A4%EF%B8%8F%3C/text%3E%3C/svg%3E';
    };
    
    // Mostrar modal
    modal.classList.add('active');
    
    // Prevenir scroll del body
    lockScroll();
    
    console.log('✅ Modal de imagen mostrado');
  } else {
    console.error('❌ Elementos del modal de imagen no encontrados');
  }
}

// =========================
// CERRAR MODAL
// =========================
function setupModalClose() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  
  console.log('⚙️ Configurando cierre de modal');
  
  if (modalClose) {
    // Cerrar con el botón X
    modalClose.addEventListener('click', closeModal);
    modalClose.addEventListener('touchend', (e) => {
      e.preventDefault();
      closeModal();
    });
  }
  
  if (modalOverlay) {
    // Cerrar tocando fuera del modal
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  
  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('modal-overlay');
  
  console.log('❌ Cerrando modal');
  
  if (modal) {
    modal.classList.remove('active');
    
    // Restaurar scroll
    unlockScroll();
    
    // Volver a canción 1 si estamos en canción 2 o 3
    if (currentSong === 2 || currentSong === 3) {
      console.log('🔄 Volviendo a canción 1');
      playSong(1);
    }
  }
}

// =========================
// GESTIÓN DE SCROLL
// =========================
let scrollPosition = 0;

function lockScroll() {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
  console.log('🔒 Scroll bloqueado');
}

function unlockScroll() {
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('position');
  document.body.style.removeProperty('top');
  document.body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
  console.log('🔓 Scroll desbloqueado');
}

// =========================
// INICIALIZACIÓN
// =========================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM cargado, inicializando...');
  
  // Configurar botón de inicio
  if (startButton) {
    startButton.addEventListener('click', startExperience);
    startButton.addEventListener('touchend', (e) => {
      e.preventDefault();
      startExperience();
    });
  }
  
  // Configurar control de música
  const toggleMusicBtn = document.getElementById('toggle-music');
  if (toggleMusicBtn) {
    toggleMusicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (musicPlaying) {
        backgroundMusic.pause();
        musicPlaying = false;
      } else {
        backgroundMusic.play();
        musicPlaying = true;
      }
      updateMusicButton();
    });
  }
  
  // Configurar regalos
  setupGifts();
  
  // Configurar cierre de modal
  setupModalClose();
  
  console.log('✅ Inicialización completa');
});

console.log('📜 Script cargado completamente');
