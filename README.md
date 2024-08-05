
# Barcode_scanner_html

Esto es un ejemplo básico de cómo puedes usar la Cámara web de tu computadora para leer código de barra y códigos QR.

## Live demo
[Click para ir O ctrl + click para abrir nueva pestaña](https://hahawork.github.io/Barcode_scanner_html/)

## Library

```javascript
https://www.jsdelivr.com/package/npm/@zxing/library

```
## Authors

- [@hahawork](https://www.github.com/hahawork)


## Features

- Boton para inicializar la Cámara.
- Botón para guardar una captura de la Cámara.
- Botón para detener la captura de imagen de la Cámara.
- Uso de la tecla 'insert' del teclado para iniciar o detener la Cámara.


## Usage/Examples

```html
<!DOCTYPE html>
<html>
<body>
    <button id="start">Iniciar</button>
    <button id="capture">Capturar</button>
    <button id="stop">Pausar</button>
    <video id="video" width="300" height="200" autoplay></video>
    <p id="result"></p>
    <canvas id="canvas" style="display:none;"></canvas>

    <!-- Incluir ZXing desde un CDN -->
    <script src="zxing_library_0_21_2.js"></script>
    <script src="barcode_reader.js"></script>
</body>
</html>
```

