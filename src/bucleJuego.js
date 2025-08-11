// Bucle principal y control de frames
import { Zorro } from './entidades/zorro.js';
import { Obstaculo } from './entidades/obstaculo.js';
import { renderizar } from './motor/renderizador.js';
import { Baya } from './entidades/baya.js';
import { detectarColision } from './utilidades/colision.js';

// Variables globales del juego

export const estadoJuego = {
  zorro: null,
  obstaculo: null,
  bayas: [],
  canvas: null,
  ctx: null,
  puntaje: 20,
  juegoTerminado: false,
  saltoPrevio: false // para detectar salto
};


export function iniciarBucle() {
  // Inicialización robusta
  estadoJuego.canvas = document.getElementById('lienzoJuego');
  if (!estadoJuego.canvas) {
    console.error('No se encontró el canvas con id "lienzoJuego".');
    return;
  }
  estadoJuego.ctx = estadoJuego.canvas.getContext('2d');
  estadoJuego.zorro = new Zorro();
  estadoJuego.obstaculo = new Obstaculo();
  estadoJuego.bayas = [];
  estadoJuego.puntaje = 20;
  estadoJuego.juegoTerminado = false;
  estadoJuego.saltoPrevio = false;

  // Solo manzana, valor numérico
  const TIPO_BAYA = { tipo: 'manzana', valor: 5 };

  function generarBaya() {
    // Manzanas en posiciones lógicas y alcanzables, nunca cerca del obstáculo
    const alturaSuelo = estadoJuego.canvas.height - 32;
    const alturaZorro = estadoJuego.zorro.alto;
    const obstaculo = estadoJuego.obstaculo;
    const alturas = [
      alturaSuelo - alturaZorro * 1.7, // salto medio
      alturaSuelo - alturaZorro * 2.5  // salto máximo lógico
    ];
    const y = alturas[Math.floor(Math.random() * alturas.length)];
    let x;
    let intentos = 0;
    do {
      x = estadoJuego.canvas.width + Math.random() * 120 + 60;
      intentos++;
      if (intentos > 10) break; // Evita bucle infinito
    } while (
      x > obstaculo.x - 120 && x < obstaculo.x + obstaculo.ancho + 120
    );
    return new Baya(x, y, TIPO_BAYA.tipo, TIPO_BAYA.valor, TIPO_BAYA.tipo);
  }

  let timerBaya = 0;
  let intervaloBaya = 80 + Math.floor(Math.random() * 50);

  function bucle() {
    if (!estadoJuego.juegoTerminado) {
      // Velocidad y salto: parte de los valores ideales de 36 puntos, pero sigue aumentando
      const velocidadBase = 13;
      const velocidadActual = velocidadBase + Math.floor((estadoJuego.puntaje - 20) / 5);
      estadoJuego.zorro.saltoFuerza = 17;


      // Actualizar obstáculo único
      estadoJuego.obstaculo.velocidad = velocidadActual;
      estadoJuego.obstaculo.actualizar();
      // Si sale de pantalla, reiniciar posición
      if (estadoJuego.obstaculo.x + estadoJuego.obstaculo.ancho < 0) {
        estadoJuego.obstaculo = new Obstaculo();
      }

      estadoJuego.zorro.actualizar();

      // Bayas: generar periódicamente
      timerBaya++;
      if (timerBaya >= intervaloBaya) {
        // Solo una manzana a la vez, un poco más frecuente
        estadoJuego.bayas.push(generarBaya());
        timerBaya = 0;
        intervaloBaya = 80 + Math.floor(Math.random() * 50);
      }
      // Actualizar y filtrar bayas
      estadoJuego.bayas.forEach(baya => baya.actualizar(velocidadActual));
      estadoJuego.bayas = estadoJuego.bayas.filter(baya => baya.x + (baya.ancho || 40) > 0 && !baya.capturada);

      // Colisión con bayas usando el área completa del sprite (AABB)
      estadoJuego.bayas.forEach(baya => {
        if (!baya.capturada) {
          // Usar método circular si existe, si no, usar AABB
          let colisiona = false;
          if (typeof baya.colisiona === 'function') {
            colisiona = baya.colisiona(estadoJuego.zorro);
          } else {
            colisiona = (
              estadoJuego.zorro.x < baya.x + (baya.ancho || 40) &&
              estadoJuego.zorro.x + estadoJuego.zorro.ancho > baya.x &&
              estadoJuego.zorro.y < baya.y + (baya.alto || 40) &&
              estadoJuego.zorro.y + estadoJuego.zorro.alto > baya.y
            );
          }
          if (colisiona) {
            // Imprimir coordenada de colisión (centro de la baya)
            const cx = baya.x + (baya.ancho || 40) / 2;
            const cy = baya.y + (baya.alto || 40) / 2;
            //console.log('Colisión baya en:', Math.round(cx), Math.round(cy));
            estadoJuego.puntaje += 5; // Manzana suma 5
            baya.capturada = true;
          }
        }
      });

      // Puntaje por obstáculo único
      if (estadoJuego.obstaculo.x + estadoJuego.obstaculo.ancho < estadoJuego.zorro.x && !estadoJuego.obstaculo.contado) {
        estadoJuego.puntaje++;
        estadoJuego.obstaculo.contado = true;
      }
      if (estadoJuego.obstaculo.x + estadoJuego.obstaculo.ancho >= estadoJuego.zorro.x) {
        estadoJuego.obstaculo.contado = false;
      }

      // Puntaje por salto (solo cuando inicia el salto)
      if (!estadoJuego.saltoPrevio && estadoJuego.zorro.saltando) {
        estadoJuego.puntaje += 1;
        estadoJuego.saltoPrevio = true;
      }
      if (!estadoJuego.zorro.saltando) {
        estadoJuego.saltoPrevio = false;
      }

      // Colisión con el obstáculo único
      if (detectarColision(estadoJuego.zorro, estadoJuego.obstaculo)) {
        estadoJuego.juegoTerminado = true;
      }
    }
    // Limpiar y renderizar
    estadoJuego.ctx.clearRect(0, 0, estadoJuego.canvas.width, estadoJuego.canvas.height);
    renderizar(
      estadoJuego.ctx,
      estadoJuego.zorro,
      estadoJuego.obstaculo,
      estadoJuego.puntaje,
      estadoJuego.juegoTerminado,
      estadoJuego.bayas
    );
    requestAnimationFrame(bucle);
  }
  bucle();

  // Reiniciar con espacio o tap/click si termina
  function reiniciarJuego() {
    estadoJuego.zorro = new Zorro();
    estadoJuego.obstaculo = new Obstaculo();
    estadoJuego.bayas = [];
    estadoJuego.puntaje = 20;
    estadoJuego.juegoTerminado = false;
    estadoJuego.saltoPrevio = false;
  }
  window.addEventListener('keydown', (e) => {
    if (estadoJuego.juegoTerminado && (e.key === ' ' || e.key === 'ArrowUp'|| e.key === 'w')) {
      reiniciarJuego();
    }
    // Agacharse y caer de golpe
    if (!estadoJuego.juegoTerminado && (e.key === 's' || e.key === 'ArrowDown')) {
      estadoJuego.zorro.agachado = true;
      // Si está en el aire, fuerza la caída
      if (!estadoJuego.zorro.enSuelo) {
        estadoJuego.zorro.velY = Math.max(estadoJuego.zorro.velY, 18);
      }
    }
  });
  window.addEventListener('keyup', (e) => {
    if (!estadoJuego.juegoTerminado && (e.key === 's' || e.key === 'ArrowDown')) {
      estadoJuego.zorro.agachado = false;
    }
  });
  if (estadoJuego.canvas) {
    estadoJuego.canvas.addEventListener('touchend', () => {
      if (estadoJuego.juegoTerminado) {
        reiniciarJuego();
      }
    });
  }
}
