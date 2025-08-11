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

/* SALTO CON PRESIONAMIENTO PROLONGADO (NO EN USO) */

// Agregar al constructor: 
  /*

    this.saltoFuerzaMin = 10;  // Fuerza mínima del salto. VS
    this.saltoFuerzaMax = 25;  // Fuerza máxima del salto. VS

  */
// Funcion de empezar carga del salto:
  /*

    empezarCarga() { //VS
      if (this.enSuelo && !this.cargando) { // Solo carga si está en el suelo. VS
        this.cargando = true; // Marca que está cargando. VS
        this.inicioCarga = performance.now(); // Guarda el momento exacto en que empezó la carga. VS
      }
    }

  */

// Funcion soltar carga y saltar:
  /*

  // Llamar al soltar el espacio
  soltarCarga() { //VS
    if (this.cargando) { // Solo salta si estaba cargando y en suelo. VS
      const tiempoPresionado = performance.now() - this.inicioCarga; // Tiempo total presionando (ms). VS

     // tiempo máximo de carga en milisegundos
      const MAX_TIEMPO_CARGA = 300; // 0.3 segundos. VS

      const clamped = Math.max(0, Math.min(MAX_TIEMPO_CARGA, tiempoPresionado)); // VS
      const factor = clamped / MAX_TIEMPO_CARGA; // Normaliza a rango 0..1 según nuevo tiempo. VS

      const fuerza = this.saltoFuerzaMin + factor * (this.saltoFuerzaMax - this.saltoFuerzaMin); // Calcula fuerza final según tiempo. VS

      this.velY = -fuerza; // Aplica velocidad hacia arriba negativa (salto). VS
      this.enSuelo = false; // Ya no está en el suelo. VS
      this.saltando = true; // Marca que está saltando. VS
      this.cargando = false; // Resetea el estado de carga. VS
    }
  }
  
  */

// IMPORTANTE:

/*

  Hay que implementar las llamadas a estas funciones en el bucle de eventos:

  ESCRITORIO
  - empezarCarga() al presionar la tecla de slato (" ", flecha arriba o "w")
  - soltarCarga() al soltar la tecla de salto

    window.addEventListener('keydown', (e) => {
      if (e.key === 's' || e.key === 'ArrowDown') {
        estadoJuego.zorro.agachado = true;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === ' ') {
        estadoJuego.zorro.soltarCarga();
      }
    });

  CELULAR
  - empezarCarga() al tocar la parte derecha de la pantalla
  - soltarCarga() al soltar el toque

*/