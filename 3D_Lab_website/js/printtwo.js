import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

let scene, camera, renderer, model;

function initViewer() {
    // Configuración inicial de Three.js
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.domElement;
    document.getElementById('viewer').appendChild(renderer.domElement);

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 50);
    scene.add(directionalLight);

    // Control de cámara
    camera.position.z = 50;
}

function centerCamera() {
    if (!model) return;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3()).length();

    camera.position.copy(center);
    camera.position.z += size * 1.5;
    camera.lookAt(center);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.addEventListener("DOMContentLoaded", function() {
    initViewer();
    animate();

    const stlInput = document.getElementById('stlFile');
    const loaderElement = document.getElementById('loader');

    stlInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file || !file.name.endsWith('.stl')) {
            alert('Por favor selecciona un archivo .stl válido');
            return;
        }

        try {
            loaderElement.style.display = 'block';
            
            // Cargar modelo STL
            const loader = new STLLoader();
            const geometry = await loader.loadAsync(URL.createObjectURL(file));
            
            // Limpiar modelo anterior
            if (model) {
                scene.remove(model);
                model.geometry.dispose();
            }

            // Crear nuevo modelo
            model = new THREE.Mesh(
                geometry,
                new THREE.MeshPhongMaterial({
                    color: 0x00aaff,
                    specular: 0x111111,
                    shininess: 200
                })
            );
            
            scene.add(model);
            centerCamera();
            
            // Calcular costo aproximado (ejemplo)
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const volume = size.x * size.y * size.z;
            document.getElementById('amount').textContent = (volume * 0.05).toFixed(2);

        } catch (error) {
            console.error('Error cargando modelo:', error);
            alert('Error al cargar el archivo STL');
        } finally {
            loaderElement.style.display = 'none';
        }
    });
});

// Funciones de pago
function showPaymentModal() {
    document.getElementById('paymentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function processPayment() {
    const paymentData = {
        method: document.getElementById('paymentMethod').value,
        amount: document.getElementById('amount').textContent
    };

    // Validación básica
    if (paymentData.method === 'credit') {
        const cardNumber = document.getElementById('cardNumber').value;
        if (!cardNumber || cardNumber.length !== 16) {
            alert('Número de tarjeta inválido');
            return;
        }
        paymentData.cardNumber = cardNumber;
    }

    // Simular envío de pago
    console.log('Procesando pago:', paymentData);
    alert('Pago procesado exitosamente!');
    closeModal();
}