import * as THREE from '../../libs/three126/three.module.js';
import { GLTFLoader } from '../../libs/three126/GLTFLoader.js';
import { RGBELoader } from '../../libs/three126/RGBELoader.js';
import { OrbitControls } from '../../libs/three126/OrbitControls.js';
import { LoadingBar } from '../../libs/LoadingBar.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        // Camera creation
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
		this.camera.position.set( 0, 0, 5 );
        

        // Scene creation
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xaaaaaa );
        
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.5);
		this.scene.add(ambient);
        
        const light = new THREE.DirectionalLight( 0xFFFFFF, 1.5 );
        light.position.set( 0.2, 1, 1);
        this.scene.add(light);
			

        // Renderer creation.
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        // when loading a gltf object the loader uses mesh standard material.. bc of this set the output encoding propert to THREE.sRGBencoded.
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild( this.renderer.domElement );
		this.setEnvironment();
		
        //Add loading bar

        this.loadingBar = new LoadingBar();
        this.loadGLTF();
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    setEnvironment(){
        const loader = new RGBELoader();
        const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        pmremGenerator.compileEquirectangularShader();
        
        const self = this;
        
        loader.load( '../../assets/hdr/venice_sunset_1k.hdr', ( texture ) => {
          const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
          pmremGenerator.dispose();

          self.scene.environment = envMap;

        }, undefined, (err)=>{
            console.error( 'An error occurred setting the environment');
        } );
    }
    
    loadGLTF(){
        // create an instance and a path to find the assets
        
        // The KEY method to a loader is the load method. this take in 4 parameters. 1: url of file, 2: calback for whe it's loaded, 3: progress calback, 4: error callback.
        const loader = new GLTFLoader().setPath('../../assets/plane/');
        // parameter 1: url of File 
        loader.load('microplane.glb', 
        //  2: calback for whe it's loaded
        gltf => {
            // add scene
            this.scene.add(gltf.scene);
            // hide load bar
            this.loadingBar.visible = false;
            //start rendering loop 
            this.renderer.setAnimationLoop(this.render.bind(this) );
            this.plane = gltf.scene;
        },
        // Param 3 Progress callback
        xhr => {
            // xml https request object, divde loaded by total used to upadte loading bar progress.
            this.loadingBar.progress = (xhr.loaded/xhr.total);
        },
        // Param 4: error callback
        err => {

            console.error( err);

        }
        )
        
    }
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );  
    }
    
	render( ) {   
        this.plane.rotateY( 0.01 );
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };