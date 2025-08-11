// Cargar frame de zorro agachado
const imgZorroAgachado = new Image();
imgZorroAgachado.src = './recursos/sprites/zorro-agachado/zorro_gris6.png';
// Renderizado de sprites y fondo
// Cargar fondos
const fondos = [
  new Image(), // Bosque
  new Image(), // Nieve
  new Image()  // Cueva
];
fondos[0].src = './recursos/sprites/fondos/fondoBosque2.png';
fondos[1].src = './recursos/sprites/fondos/FondoNevadoLoop.png';
fondos[2].src = './recursos/sprites/fondos/fondoCueva.png';
export let fondoActual = 0;

// Cargar frames de caminata
const imgZorroCam0 = new Image();
imgZorroCam0.src = './recursos/sprites/zorro-caminando/zorro_gris0.png';
const imgZorroCam1 = new Image();
imgZorroCam1.src = './recursos/sprites/zorro-caminando/zorro_gris1.png';
// Cargar frames de salto
const imgZorroSalto0 = new Image();
imgZorroSalto0.src = './recursos/sprites/zorro-saltando/zorro_gris2.png';
const imgZorroSalto1 = new Image();
imgZorroSalto1.src = './recursos/sprites/zorro-saltando/zorro_gris3.png';
const imgZorroSalto2 = new Image();
imgZorroSalto2.src = './recursos/sprites/zorro-saltando/zorro_gris4.png';
const imgZorroSalto3 = new Image();
imgZorroSalto3.src = './recursos/sprites/zorro-saltando/zorro_gris5.png';
// Cargar imágenes de obstáculos
const imgObstaculos = {
  piedrita: new Image(),
  tronquito: new Image()
};
imgObstaculos.piedrita.src = './recursos/sprites/obstaculos/Piedrita.png';
// imgObstaculos.tronquito.src = './recursos/sprites/obstaculos/Tronquito.png';

// Cargar imágenes de bayas
const imgBayas = {
  manzana: new Image(),
  naranja: new Image(),
  pera: new Image()
};
imgBayas.manzana.src = './recursos/sprites/bayas/Manzana.png';
let frameActual = 0;
let frameTimer = 0;
const frameInterval = 10; // menor = más rápido

// Recibe bayas como array opcional
// Ahora acepta un array de obstáculos para renderizar todos
// Offset para el scroll del fondo
let fondoOffset = 0;
let fondoVelocidad = 2;

export function renderizar(ctx, zorro, obstaculo, puntaje = 0, juegoTerminado = false, bayas = [], obstaculos = []) {
  // Fondo fijo, no cambia por puntaje
  
 

  // Ajustar velocidad del fondo según obstáculo
  fondoVelocidad = Math.max(1, Math.floor(obstaculo.velocidad * 0.5));
  // Fondo con scroll infinito tipo runner

  let jugando = !juegoTerminado; // V

  const fondo = fondos[fondoActual];
  if (fondo.complete && fondo.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    // Escalar el fondo para que cubra el alto disponible, pero centrar horizontalmente si sobra
    const altoFondo = Math.round(ctx.canvas.height - 32); //V
    const escala = altoFondo / fondo.naturalHeight;
    const anchoFondo = Math.round(fondo.naturalWidth * escala); //V
    const yFondo = 0;
    // Centrar el fondo si sobra espacio horizontal
    let offsetX = 0;
    if (anchoFondo < ctx.canvas.width) {
      offsetX = Math.round((ctx.canvas.width - anchoFondo) / 2); //V
    }
    // Actualizar offset para scroll
    if (jugando) {
      fondoOffset = (fondoOffset - fondoVelocidad) % anchoFondo;
      if (fondoOffset > 0) fondoOffset -= anchoFondo;
    }
    // Dibujar suficientes fondos para cubrir todo el canvas aunque el offset sea negativo
    let x = Math.round(fondoOffset + offsetX); //V
    while (x < ctx.canvas.width) {
      ctx.drawImage(fondo, x, yFondo, anchoFondo, altoFondo);
      x += anchoFondo;
    }
    // Si el offset es positivo, cubrir el hueco inicial a la izquierda
    if (fondoOffset + offsetX > 0) {
      let x2 = Math.round(fondoOffset + offsetX - anchoFondo); //V 
      while (x2 > -anchoFondo) {
        ctx.drawImage(fondo, x2, yFondo, anchoFondo, altoFondo);
        x2 -= anchoFondo;
      }
    }
  } else {
    ctx.fillStyle = '#7ec850';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  // Suelo
  ctx.fillStyle = '#3e2c1e';
  ctx.fillRect(0, ctx.canvas.height - 32, ctx.canvas.width, 32);
  // Animación del zorro
  let imgZorro = imgZorroCam0;
  if (zorro.agachado) {
    imgZorro = imgZorroAgachado;
  } else if (zorro.enSuelo) {
    // Caminando
    if (jugando) {
        frameTimer++;
      if (frameTimer >= frameInterval) {
        frameActual = (frameActual + 1) % 2;
        frameTimer = 0;
      }
      imgZorro = frameActual === 0 ? imgZorroCam0 : imgZorroCam1;
    } // V
    
  } else {
    // Saltando: elegir frame según la velocidad vertical
    if (zorro.velY < -6) {
      imgZorro = imgZorroSalto1; // despegue
    } else if (zorro.velY < 0) {
      imgZorro = imgZorroSalto0; // subida
    } else if (zorro.velY > 6) {
      imgZorro = imgZorroSalto3; // caída
    } else {
      imgZorro = imgZorroSalto2; // punto más alto
    }
  }
  if (imgZorro.complete && imgZorro.naturalWidth > 0) {
    ctx.drawImage(imgZorro, zorro.x, zorro.y, zorro.ancho, zorro.alto);
  } else {
    ctx.fillStyle = null;
    ctx.fillRect(zorro.x, zorro.y, zorro.ancho, zorro.alto);
  }
  // Renderizar bayas
  bayas.forEach(baya => {
    const img = imgBayas[baya.tipo];
    if (img && img.complete && img.naturalWidth > 0) {
      // Proporción original
      const aspect = img.naturalWidth / img.naturalHeight;
      let ancho = baya.ancho || Math.max(40, ctx.canvas.width * 0.04);
      let alto = baya.alto || Math.max(40, ctx.canvas.height * 0.07);
      if (ancho / alto > aspect) {
        ancho = alto * aspect;
      } else {
        alto = ancho / aspect;
      }
      baya.ancho = ancho;
      baya.alto = alto;
      ctx.drawImage(img, baya.x, baya.y, ancho, alto);
    } else {
      ctx.fillStyle = '#f39c12';
      ctx.fillRect(baya.x, baya.y, 40, 40);
    }
  });

  // Renderizar todos los obstáculos
  (obstaculos.length ? obstaculos : [obstaculo]).forEach(obst => {
    // Determinar sprite según obstáculo
    let img = imgObstaculos.piedrita;
    if (obst.sprite && typeof obst.sprite === 'string') {
      if (obst.sprite.toLowerCase().includes('tronco')) {
        img = imgObstaculos.tronquito;
      } else if (obst.sprite.toLowerCase().includes('piedra')) {
        img = imgObstaculos.piedrita;
      }
    }
    if (img.complete && img.naturalWidth > 0) {
      // Calcular proporción de la imagen
      const aspect = img.naturalWidth / img.naturalHeight;
      let ancho = obst.anchoVisual;
      let alto = obst.altoVisual;
      if (ancho / alto > aspect) {
        ancho = alto * aspect;
      } else {
        alto = ancho / aspect;
      }
      // Hitbox más permisivo (solo parte central)
      const hitboxReducida = 0.7;
      obst.ancho = ancho * hitboxReducida;
      obst.alto = alto * hitboxReducida;
      // Centrar la imagen y el hitbox reducido
      const offsetX = obst.x + (obst.anchoVisual - ancho) / 2;
      const offsetY = obst.y + obst.altoVisual - alto;
      obst.xHitbox = offsetX + (ancho - obst.ancho) / 2;
      obst.yHitbox = offsetY + (alto - obst.alto);
      ctx.drawImage(img, offsetX, offsetY, ancho, alto);
    } else {
      ctx.fillStyle = '#8d6748';
      ctx.fillRect(obst.x, obst.y, obst.ancho, obst.alto);
      obst.xHitbox = obst.x;
      obst.yHitbox = obst.y;
    }
  });

  // Puntaje visual (arranca en 0, pero el valor lógico se mantiene)
  ctx.fillStyle = '#fff';
  ctx.font = '24px monospace';
  ctx.fillText('Puntaje: ' + Math.max(0, puntaje - 20), 20, 40);
  // Mensaje de fin
  if (juegoTerminado) {
    ctx.fillStyle = '#c0392b';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('¡Perdiste!', ctx.canvas.width/2 - 100, ctx.canvas.height/2);
    ctx.font = '20px monospace';
    ctx.fillText('Presiona ESPACIO o toca para reiniciar', ctx.canvas.width/2 - 170, ctx.canvas.height/2 + 40);
  }
}
