# Zorro Pampeano – Juego Arcade Endless Runner

Zorro Pampeano es un **juego arcade** diseñado para funcionar de forma óptima en celulares. El jugador controla a un zorro que corre automáticamente por un escenario repleto de obstáculos, y debe **saltar tocando la pantalla** para sobrevivir el mayor tiempo posible.

## Proyecto desarrollado desde cero con: 
- HTML y CSS 
- JavaScript vanilla


 
## Cómo probar el juego localmente

### 1. Clonar el repositorio
```batch 
git clone https://github.com/Llamosas21/Zorro-Pampeano.git
cd Zorro-Pampeano
```

### 2. Verificar que tengas Python 3 instalado
El servidor local usa http.server, que viene incluido en Python 3 por defecto.

#### Verificar versión de Python
* En Linux/Windows/macOS:

```batch 
python3 --version
```
#### Instalar 
En Linux (Debian):
```batch 
sudo apt update
sudo apt install python3
```
En Windows:
+ Ir a: https://www.python.org/downloads/

Durante la instalación, marcar la opción “Add Python to PATH”.


## 3. Levantar un servidor local con Python
Desde la raíz del proyecto, ejecutá:

```batch 
python3 -m http.server 8000 --bind 0.0.0.0
```
* Esto va a levantar un servidor accesible en tu navegador en:
http://localhost:8000

## 4. Acceder desde tu celular (opcional)
Si querés probar el juego en tu celular:

- Paso 1: Averiguá la IP local de tu PC

- Paso 2: Accedé desde el navegador de tu celular, conectá el celular a la misma red Wi-Fi y abrí:

```batch 
http://<IP_DE_TU_PC>:8000
```
> ⚠️ Asegurate de que el firewall no bloquee el puerto 8000.