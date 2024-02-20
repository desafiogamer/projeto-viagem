import * as THREE from 'three';
import {OrbitControls} from '../jsm/OrbitControls.js';
import {GLTFLoader} from '../jsm/GLTFLoader.js';
import {RGBELoader} from '../jsm/RGBELoader.js'

function init(){
    var inicio = document.getElementById('inicio')
    var scene = new THREE.Scene();		
    scene.background = new THREE.Color(0xa8def0)
    scene.position.z = 2.6
    scene.position.y = 1
	
    //camera
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 1.5;
    camera.position.z = 5;
    camera.position.x = 0;

    var mixer

    //scene
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); 
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true; 

    //Light

    //const aambientLight = new THREE.AmbientLight(0xffffff, 1)
    //scene.add(aambientLight)

    // Equals
    //const directLight = new THREE.DirectionalLight(0xffffff, )
    //scene.add(directLight)
    
    //const light = new THREE.PointLight(0xffffff, 10, 100);
    //light.position.set(0, 5, 0);
    //scene.add(light);

    //const rectLight = new THREE.RectAreaLight(0xffffff, 4, 12, 1.2);
    //rectLight.position.set(0, 6, -2);
    //rectLight.lookAt(0, 5, 5);
    //scene.add(rectLight)
    
    //controls
    var orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true
    orbitControls.minDistance = 5
    orbitControls.maxDistance = 15
    orbitControls.enablePan = false
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05
    orbitControls.enableZoom = false
    orbitControls.enabled = false
    orbitControls.update();  

    const loader = new GLTFLoader().setPath('./models/');
    loader.load('animated_cuckoo_clock_flying_bird_loop.glb', function (glft) {
        const model = glft.scene
        scene.add(model)
        mixer = new THREE.AnimationMixer(model);
        glft.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });

    });

    new RGBELoader()
        .setPath('../')
        .load('golden_bay_4k.hdr', function(texture){
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture
        })

    const clock = new THREE.Clock()
    function animate() {

        orbitControls.update();
        var delta = clock.getDelta();

        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
 
    };
    animate();
    inicio.appendChild(renderer.domElement);
}


window.onload = init