import { STLLoader } from 'three/addons/loaders/STLLoader.js';
let scene, camera, renderer, model;

function initViewer() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 200);
    document.getElementById('viewer').appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    camera.position.z = 50;
}

document.addEventListener("DOMContentLoaded", function() {
    const stlInput = document.getElementById('stlFile');

    if (!stlInput) {
        console.error("Error: El elemento #stlFile no existe en el HTML.");
        return;
    }

    stlInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return; // Si no se selecciona archivo

        const reader = new FileReader();
        
        reader.onload = function(event) {
            const geometry = new THREE.STLLoader().parse(event.target.result);
            if (model) {
                scene.remove(model); 
                model.geometry.dispose();
                model.material.dispose();
            }
            model = new THREE.Mesh(
                geometry, 
                new THREE.MeshPhongMaterial({ 
                    color: 0x00ff00,
                    specular: 0x111111,
                    shininess: 200 
                })
            );
            
            scene.add(model);
        };
        
        reader.readAsArrayBuffer(file);
    });
});


function showPaymentModal() {
    const dimensions = {
        width: document.getElementById('width').value,
        scale: document.getElementById('scale').value / 100
    };
    
    const amount = (dimensions.width * dimensions.scale).toFixed(2);
    document.getElementById('amount').textContent = amount;
    
    document.getElementById('paymentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function processPayment() {
    const paymentData = {
        method: document.getElementById('paymentMethod').value,
        amount: document.getElementById('amount').textContent,
        cardNumber: document.getElementById('cardNumber').value
    };
    
    alert('Pago procesado: ' + JSON.stringify(paymentData));
    closeModal();
}

initViewer();