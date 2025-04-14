// Three.js Background Animation for VibeForum
import * as THREE from 'three';

let scene, camera, renderer, orbs = [];
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Colors from our theme
const colors = {
    background: 0x0f0c29,
    nebula: 0x302b63,
    accent: 0x00f260,
    secondary: 0x0575e6,
    warm: 0xff6a00,
    glow: 0xf7971e
};

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.06);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Create multiple green glowing orbs
    createFloatingOrbs();
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x00ff66, 0.5);
    const pointLight = new THREE.PointLight(0x00ff66, 1, 100);
    pointLight.position.set(0, 0, 50);
    scene.add(ambientLight, pointLight);

    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    // Start animation
    animate();
}

function createFloatingOrbs() {
    const orbCount = 100;
    
    const orbMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff66,
        emissive: 0x00ff66,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.3,
    });

    for (let i = 0; i < orbCount; i++) {
        const radius = Math.random() * 0.5 + 0.2;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const orb = new THREE.Mesh(geometry, orbMaterial);

        orb.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 80
        );
        orb.userData.offset = Math.random() * Math.PI * 2;
        orbs.push(orb);
        scene.add(orb);
    }
}

function createNebulaClouds() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 20 - 10;
        const y = Math.random() * 20 - 10;
        const z = Math.random() * 20 - 10;
        vertices.push(x, y, z);

        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    nebulaClouds = new THREE.Points(geometry, material);
    scene.add(nebulaClouds);
}

function createStarField() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 40 - 20;
        const y = Math.random() * 40 - 20;
        const z = Math.random() * 40 - 20;
        vertices.push(x, y, z);

        const color = new THREE.Color();
        color.setHSL(0.6, 0.8, 0.5 + Math.random() * 0.5);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

function createShootingStar() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    const startPoint = new THREE.Vector3(
        Math.random() * 20 - 10,
        10,
        Math.random() * 20 - 10
    );
    const endPoint = new THREE.Vector3(
        startPoint.x - 5,
        -10,
        startPoint.z - 5
    );

    vertices.push(startPoint.x, startPoint.y, startPoint.z);
    vertices.push(endPoint.x, endPoint.y, endPoint.z);

    colors.push(1, 1, 1);
    colors.push(1, 0.5, 0);

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const shootingStar = new THREE.Line(geometry, material);
    scene.add(shootingStar);

    // Animate and remove
    const duration = 1000;
    const startTime = Date.now();
    
    function animateShootingStar() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            shootingStar.material.opacity = 1 - progress;
            requestAnimationFrame(animateShootingStar);
        } else {
            scene.remove(shootingStar);
        }
    }

    animateShootingStar();
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
}

function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        mouseX = (event.touches[0].pageX - windowHalfX) * 0.05;
        mouseY = (event.touches[0].pageY - windowHalfY) * 0.05;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        mouseX = (event.touches[0].pageX - windowHalfX) * 0.05;
        mouseY = (event.touches[0].pageY - windowHalfY) * 0.05;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth camera movement
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    // Rotate nebula clouds
    nebulaClouds.rotation.x += 0.0001;
    nebulaClouds.rotation.y += 0.0001;

    // Animate floating orbs
    orbs.forEach((orb) => {
        const offset = orb.userData.offset;
        orb.position.y += Math.sin(Date.now() * 0.001 + offset) * 0.002;
        orb.rotation.x += 0.001;
        orb.rotation.y += 0.001;
    });

    // Random shooting stars
    if (Math.random() < 0.001) {
        createShootingStar();
    }

    renderer.render(scene, camera);
}

// Export for use in HTML
window.init = init; 