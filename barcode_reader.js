let codeReader;
let stream;
let showing = false;

// Inicializar el lector de códigos de barras y la cámara        
function initializeScanner() {
    codeReader = new ZXing.BrowserMultiFormatReader();
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
            stream = s;
            video.srcObject = stream;
            video.play();
            startDecoding();
        })
        .catch(err => console.error("Error al acceder a la webcam: ", err));
}

// Iniciar la decodificación del código de barras
function startDecoding() {
    codeReader.decodeFromVideoDevice(null, video, (result, err) => {
        if (result) {
            displayResult(result.getText());
        } else if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
        }
    });
}

// Detener la decodificación y apagar la cámara
function stopDecoding() {
    if (codeReader) {
        codeReader.reset();
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

// Mostrar el resultado del código de barras
function displayResult(text) {
    document.getElementById('result').textContent = text;
}

// Capturar la imagen actual del video
function captureImage() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    document.getElementById('canvas').style.display = 'block';
}

// Asignar eventos a los botones
document.getElementById('start').addEventListener('click', () => {
    document.getElementById('result').textContent = "";
    initializeScanner();
});

document.getElementById('capture').addEventListener('click', captureImage);

document.getElementById('stop').addEventListener('click', () => {
    video.pause();
    stopDecoding();
    document.getElementById('canvas').style.display = 'none';
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Insert') {
        event.preventDefault();
        document.getElementById('result').textContent = "";
        if (!showing) {
            initializeScanner();
        }
        else {
            video.pause();
            stopDecoding();
            document.getElementById('canvas').style.display = 'none';
        }
        showing = !showing;
    }
});

// Elemento select para elegir cámaras
const videoSelect = document.createElement('select');
document.body.insertBefore(videoSelect, document.getElementById('video'));

// Obtener las cámaras disponibles y llenar el select
navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.forEach(device => {
        if (device.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        }
    });
});

// Cambiar la cámara cuando se selecciona una opción diferente
videoSelect.addEventListener('change', () => {
    const selectedDeviceId = videoSelect.value;
    startCamera(selectedDeviceId);
});

// Función para iniciar la cámara seleccionada
function startCamera(deviceId) {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        video: { deviceId: { exact: deviceId } }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(s => {
            stream = s;
            video.srcObject = stream;
            video.play();
            startDecoding();
        })
        .catch(err => console.error("Error al acceder a la webcam: ", err));
}
