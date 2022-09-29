import * as THREE from '../../libs/three126/three.module.js';
import { OrbitControls } from '../../libs/three126/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );


		// create a camera takes 4 params. 1: FOV in degrees, 2:aspect ratio, 3: near, 4:far 
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
		// real time computer graphics use a "cage" called a frustrum
		// set position of camera
		this.camera.position.set(0, 0, 4);


		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xAAAAAA );

		// create a light for the scene.
		// thie first parameter is the color of light as it hits the top of the object, second from the bottom, this is intensity
		const ambient = new THREE.HemisphereLight( 0xFFFFFF, 0xBBBBFF, 0.3);

		const light = new THREE.DirectionalLight();
		// sets the direction in which the light hits the objects.
		light.position.set(0.2, 1, 1);
		// add the light to the scene.
		this.scene.add(light)


			// reduce jaggedness along edges
		this.renderer = new THREE.WebGLRenderer({ antialias: true});
		// avoids blurring on retina screens
		this.renderer.setPixelRatio( window.devicePixelRatio );
		// set physical size of renderer , here we set full size of window
		this.renderer.setSize( window.innerWidth, window.innerHeight);

		// renders the scene repeatedly to keep up with changes in camera position
		container.appendChild( this.renderer.domElement);

		this.renderer.setAnimationLoop( this.render.bind(this));

		// use box gemoetry to create a cube
		const geometry = new THREE.BoxGeometry();
		// set the color but can't be seen yet without a light to shine on it.
		const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });

		this.mesh = new THREE.Mesh( geometry, material );
		this.scene.add( this.mesh );

		// Add some easy controls for the user. Orbit contros requirew Camera as first parameter and the dom element as the second.
		const controls= new OrbitControls( this.camera, this.renderer.domElement );

		// learn more in the docs.
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
		// update camera aspect ratio(window.innerWidth/window.innerHeight)
		this.camera.aspect = window.innerWidth / window.innerHeight;
		// next we need to update cameras projection matrix, so this aspect ratio ammend.
		// this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight);
    }
    
	render( ) {   

		// this.mesh.rotateY( 0.01 );
		this.mesh.rotateX( 0.01 );
		this.renderer.render( this.scene, this.camera);
    }
}

export { App };