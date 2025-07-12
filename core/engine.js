// core/engine.js: Gestiona el bucle principal del juego.

export class Engine {
    constructor(updateCallback, drawCallback) {
        this.update = updateCallback;
        this.draw = drawCallback;
        this.isRunning = false;
        this.lastTime = 0;
        this.loop = this.loop.bind(this);
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning = false;
    }

    loop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = (currentTime - this.lastTime) / 1000; // en segundos
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.loop);
    }
}