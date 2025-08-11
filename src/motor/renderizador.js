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

export function renderizar(ctx, zorro, obstaculo, puntaje = 0, juegoTerminado = false, bayas = [], obstaculos = [], fondoInfo = {}) {
  // Lógica de transición de fondo
  const { fondoActual: fondoIdx = fondoActual, fondoSiguiente = null, transicionFondo = 0, enTransicion = false } = fondoInfo;

  // Ajustar velocidad del fondo según obstáculo
  fondoVelocidad = Math.max(1, Math.floor(obstaculo.velocidad * 0.5));
  let jugando = !juegoTerminado;

  const fondoPrincipal = fondos[fondoIdx];
  if (fondoPrincipal.complete && fondoPrincipal.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    const altoFondo = Math.round(ctx.canvas.height - 32);
    const escala = altoFondo / fondoPrincipal.naturalHeight;
    const anchoFondo = Math.round(fondoPrincipal.naturalWidth * escala);
    const offsetX = anchoFondo < ctx.canvas.width ? Math.round((ctx.canvas.width - anchoFondo) / 2) : 0;

    if (jugando) {
      fondoOffset = (fondoOffset - fondoVelocidad) % anchoFondo;
      if (fondoOffset > 0) fondoOffset -= anchoFondo;
    }

    // Fondo principal
    let x = Math.round(fondoOffset + offsetX);
    // Dibuja desde fuera de pantalla izquierda para cubrir huecos
    while (x < ctx.canvas.width) {
      ctx.drawImage(fondoPrincipal, x, 0, anchoFondo, altoFondo);
      x += anchoFondo;
    }
    // Dibuja también si x > 0 (por si hay hueco a la izquierda)
    if (fondoOffset + offsetX > 0) {
      let xExtra = Math.round(fondoOffset + offsetX - anchoFondo);
      while (xExtra >= -anchoFondo) {
        ctx.drawImage(fondoPrincipal, xExtra, 0, anchoFondo, altoFondo);
        xExtra -= anchoFondo;
      }
    }

    // Fondo en transición (superposición con alpha)
    if (enTransicion && fondoSiguiente !== null) {
      ctx.globalAlpha = transicionFondo;
      const fondoNuevo = fondos[fondoSiguiente];
      let x2 = Math.round(fondoOffset + offsetX);
      while (x2 < ctx.canvas.width) {
        ctx.drawImage(fondoNuevo, x2, 0, anchoFondo, altoFondo);
        x2 += anchoFondo;
      }
      // También cubrir hueco izquierdo
      if (fondoOffset + offsetX > 0) {
        let x2Extra = Math.round(fondoOffset + offsetX - anchoFondo);
        while (x2Extra >= -anchoFondo) {
          ctx.drawImage(fondoNuevo, x2Extra, 0, anchoFondo, altoFondo);
          x2Extra -= anchoFondo;
        }
      }
      ctx.globalAlpha = 1.0;
    }
  } else {
    ctx.fillStyle = null;
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
