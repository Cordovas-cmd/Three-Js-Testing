import * as THREE from '../../libs/three126/three.module.js';

// find this file in three js library in the examples/jsm/controls folder.
import { OrbitControls } from '../../libs/three126/OrbitControls.js';

class App{
	// whenever a new instance of this class is created, we call the contructor method.
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
    
		// resize if window is resized. 
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
        
    }
    
	render( ) {   
        
    }
}

export { App };