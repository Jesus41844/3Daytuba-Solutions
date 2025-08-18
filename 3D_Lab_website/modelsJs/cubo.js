// Configuración global
const modelContainers = [
    { id: 'model1', color: 0xff0000 },  // Rojo
    { id: 'model2', color: 0x00ff00 },  // Verde
    { id: 'model3', color: 0x0000ff }   // Azul
];

let sharedGeometry = null;
const loader = new THREE.STLLoader();

loader.load(
    '../models/Cubo.stl', // ¡Asegúrate de que la ruta es correcta!
    (geometry) => {
        sharedGeometry = geometry;
        sharedGeometry.center(); // Centrar

        // Inicializar modelos después de cargar
        modelContainers.forEach((container) => {
            initModel(container.id, container.color);
        });
    },
    (xhr) => console.log(`Cargado: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`),
    (error) => console.error('Error al cargar STL:', error)
);
function initModel(containerId, color) {
    const container = document.getElementById(containerId);
    
    // 1. Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. Escena y cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 8; // Alejar cámara

    // 3. Luces (¡crítico!)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 4. Crear malla
    const material = new THREE.MeshPhongMaterial({ 
        color: color,
        specular: 0x111111,
        shininess: 200 
    });
    const mesh = new THREE.Mesh(sharedGeometry, material);
    mesh.scale.set(0.2, 0.2, 0.2); // Ajusta según el tamaño del modelo
    scene.add(mesh);

    // 5. Animación
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // 6. Redimensionado
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}