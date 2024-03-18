// main.js

// Set up Three.js environment
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to create a cube with a color based on the fetched data
function createCube(color) {
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({ color: color });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}

// Fetch data from Django backend
fetch('/api/data/')
    .then(response => response.json())
    .then(data => {
        // Use the fetched data in your 3D scene
        let message = data.message;
        console.log(message);

        // Use the fetched data to determine the color of the cube
        let color;
        if (message === "Hello from Django!") {
            color = 0xff0000; // Red color
        } else {
            color = 0x00ff00; // Green color
        }

        // Create a cube with the determined color
        let cube = createCube(color);

        // Animate the cube rotation
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    })
    .catch(error => console.error('Error fetching data:', error));

// Set up camera position
camera.position.z = 5;
