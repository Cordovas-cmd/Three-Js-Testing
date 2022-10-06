import * as THREE from '../../libs/three126/three.module.js';
import { OrbitControls } from '../../libs/three126/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.set( 0, 0, 4 );
        
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xaaaaaa );

		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
		this.scene.add(ambient);
        
        const light = new THREE.DirectionalLight();
        light.position.set( 0.2, 1, 1);
        this.scene.add(light);
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild( this.renderer.domElement );
		
        const geometry = new THREE.TorusKnotGeometry(); 
        
        
        // const material = new THREE.MeshBasicMaterial( { color: 0xFF67 });


        // ---Lambert lighting--- calculates the value of the lighting at each vertex and interpolates it acros all rendered trianles
        // const material = new THREE.MeshLambertMaterial( { color: 0xFF67 });

        // To show specularity(shiny bright points of light) use MeshPhongMaterial instead and add specular and shininess properties, 
        const material = new THREE.MeshPhongMaterial( { color: 0xFF67, specular: 0x444444, shininess: 60 });

        // There is also MeshSTandardMaterial, for more info refer to the documentation at
        // " https://threejs.org/docs/index.html?q=meshstand#api/en/materials/MeshStandardMaterial "

        this.mesh = new THREE.Mesh( geometry, material );
        
        this.scene.add(this.mesh);
        
        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        
        this.renderer.setAnimationLoop(this.render.bind(this));
    
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {   
        this.mesh.rotateY( 0.01 );
        this.mesh.rotateX( 0.005 );
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };