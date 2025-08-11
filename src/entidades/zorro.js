// Lógica y estado del zorro
export class Zorro {
  constructor() {
    // Tamaño más grande para "zoom"
    this.ancho = Math.max(80, window.innerWidth * 0.07);
    this.alto = Math.max(60, window.innerHeight * 0.12);
    this.x = Math.max(60, window.innerWidth * 0.06);
    this.y = window.innerHeight - this.alto - 32;
    this.velY = 0;
    this.enSuelo = true;
    this.gravedad = 0.85;
    this.saltoFuerza = 25;
    this.saltando = false;
    this.agachado = false;
  }

  saltar() {
    if (this.enSuelo) {
      this.velY = -this.saltoFuerza;
      this.enSuelo = false;
      this.saltando = true;
    }
  }

  actualizar() {
    this.y += this.velY;
    if (!this.enSuelo) {
      this.velY += this.gravedad;
    }
    // Suelo (ajustado para que nunca caiga más abajo)
    const suelo = window.innerHeight - this.alto - 32;
    if (this.y >= suelo) {
      this.y = suelo;
      this.velY = 0;
      this.enSuelo = true;
      this.saltando = false;
    }
  }
}
