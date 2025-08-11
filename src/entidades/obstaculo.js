// Obstáculos (troncos, piedras, lagos)
import { CONFIG } from '../configuracion.js';

export class Obstaculo {
  constructor() {
    // Tamaño visual y tipo aleatorio
    const tipos = [
      { w: 0.07, h: 0.20 }, // piedra
      { w: 0.10, h: 0.13 }, // tronco bajo
      { w: 0.06, h: 0.28 }  // tronco alto
    ];
    const t = tipos[Math.floor(Math.random() * tipos.length)];
    this.anchoVisual = Math.max(60, window.innerWidth * t.w * (0.8 + Math.random() * 0.6));
    this.altoVisual = Math.max(60, window.innerHeight * t.h * (0.8 + Math.random() * 0.6));
    this.x = window.innerWidth + Math.random() * 120;
    this.y = window.innerHeight - this.altoVisual - 32;
    this.velocidad = CONFIG.VELOCIDAD_INICIAL;
    // Hitbox igual al sprite
    this.ancho = this.anchoVisual;
    this.alto = this.altoVisual;
  }

  actualizar() {
    this.x -= this.velocidad;
    if (this.x + this.ancho < 0) {
      this.x = window.innerWidth + Math.random() * 200;
      this.y = window.innerHeight - this.altoVisual - 32;
    }
  }
}
