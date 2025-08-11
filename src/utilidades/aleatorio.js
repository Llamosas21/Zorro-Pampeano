// Funciones de aleatoriedad
export function aleatorioEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
