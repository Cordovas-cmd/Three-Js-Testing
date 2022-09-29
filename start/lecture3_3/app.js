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
			// reduce jaggedness along edges
		this.renderer = new THREE.WebGLRenderer({ antialias: true});
		// avoids blurring on retina screens
		this.renderer.setPixelRatio( window.devicePixelRatio );
		// set physical size of renderer , here we set full size of window
		this.renderer.setSize( window.innerWidth, window.innerHeight);

		// renders the scene repeatedly to keep up with changes in camera position
		container.appendChild( this.renderer.domElement);

		this.renderer.setAnimationLoop( this.render.bind(this));

		// learn more in the docs.
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){

    }
    
	render( ) {   
		this.renderer.render( this.scene, this.camera);
    }
}

export { App };