// Ítems de bayas

export class Baya {
  constructor(x, y, tipo, valor, sprite) {
    this.x = x;
    this.y = y;
    this.tipo = tipo; // nombre o id de la baya
    this.valor = ""; // puntos que otorga
    this.sprite = sprite; // imagen
    this.ancho = 60; // tamaño mayor
    this.alto = 60;
    this.capturada = false;
  }

  actualizar(velocidad) {
    this.x -= velocidad;
  }

  colisiona(zorro) {
    // Colisión simple tipo AABB
    return (
      this.x < zorro.x + zorro.ancho &&
      this.x + this.ancho > zorro.x &&
      this.y < zorro.y + zorro.alto &&
      this.y + this.alto > zorro.y
    );
  }
}
