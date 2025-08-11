// Manejo de controles (teclado/touch)
import { estadoJuego } from '../bucleJuego.js';

export function configurarControles() {
  // Mostrar mensaje si está en vertical
  function chequearOrientacion() {
    const mensaje = document.getElementById('orientacion-mensaje');
    if (window.matchMedia('(orientation: portrait)').matches) {
      mensaje.style.display = 'flex';
    } else {
      mensaje.style.display = 'none';
    }
  }
  window.addEventListener('orientationchange', chequearOrientacion);
  window.addEventListener('resize', chequearOrientacion);
  chequearOrientacion();
  // Teclado (PC)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp' || e.key === ' ') {
      estadoJuego.zorro.saltar();
    }
    if (e.key === 's' || e.key === 'ArrowDown') {
      estadoJuego.zorro.agachado = true;
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 's' || e.key === 'ArrowDown') {
      estadoJuego.zorro.agachado = false;
    }
  });

  // Mejor jugabilidad móvil: pantalla dividida en dos zonas
  const canvas = document.getElementById('lienzoJuego');
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const x = e.touches[0].clientX;
      if (x < window.innerWidth / 2) {
        // Zona izquierda: agacharse
        estadoJuego.zorro.agachado = true;
      } else {
        // Zona derecha: saltar
        estadoJuego.zorro.saltar();
      }
    }
  });
  canvas.addEventListener('touchend', (e) => {
    estadoJuego.zorro.agachado = false;
  });
  // Adaptar canvas automáticamente al tamaño de pantalla
  function ajustarCanvas() {
    let ancho, alto;
    if (window.visualViewport) {
      ancho = Math.round(window.visualViewport.width);
      alto = Math.round(window.visualViewport.height);
    } else {
      ancho = Math.min(window.innerWidth, document.documentElement.clientWidth);
      alto = Math.min(window.innerHeight, document.documentElement.clientHeight);
    }
    canvas.width = ancho;
    canvas.height = alto;
    canvas.style.width = ancho + 'px';
    canvas.style.height = alto + 'px';
  }
  window.addEventListener('resize', ajustarCanvas);
  window.addEventListener('orientationchange', ajustarCanvas);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', ajustarCanvas);
    window.visualViewport.addEventListener('scroll', ajustarCanvas);
  }
  ajustarCanvas();
}
