// Detección de colisiones
export function detectarColision(zorro, obstaculo) {
  // Usar hitbox ajustada si existe
  const x = obstaculo.xHitbox !== undefined ? obstaculo.xHitbox : obstaculo.x;
  const y = obstaculo.yHitbox !== undefined ? obstaculo.yHitbox : obstaculo.y;
  const ancho = obstaculo.ancho;
  const alto = obstaculo.alto;

  return (
    zorro.x < x + ancho &&
    zorro.x + zorro.ancho > x &&
    zorro.y < y + alto &&
    zorro.y + zorro.alto > y
  );
}
