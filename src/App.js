import React, {  Suspense } from "react";
import './App.css';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment,  Loader  } from "@react-three/drei";
import * as THREE from 'three';
import  Template  from './objects/Template.js';


function AnimationCanvas() {


  return (
    <Canvas

      className="webgl"
      dpr={ window.devicePixelRatio }
      camera={ {  fov: 70, position: [0, 0, -0.75] , rotation: [0, 0, 0] }}
      onCreated={({ gl, scene }) => {
          gl.inputEncoding = THREE.sRGBEncoding
          gl.outputEncoding = THREE.sRGBEncoding
          gl.setPixelRatio( window.devicePixelRatio );

          // CANVAS BACKGROUND COLOR
           gl.setClearColor(new THREE.Color('#020207'))
         // gl.setClearColor(new THREE.Color('#000077'))
        }}>


        <Suspense >
            <Template />
        </Suspense>

            <Environment
              background={false} // can be true, false or "only" (which only sets the background) (default: false)
              files="./img/env.hdr"
              preset={null}
              scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
              encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
              
            />
             <OrbitControls  />
        

     
      
      </Canvas>
  );
}

function App() {



  return (
  <div className="canvasSection">

    <div className="canvasContainer">
        <AnimationCanvas />
        <Loader
        // LOADING BAR CSS STYLES
          containerStyles={{
              overflow: 'hidden',
              borderRadius: "0.75rem"
          }}
          innerStyles={{
            borderRadius: "0rem",
            width: "35vw",
            maxWidth: "35vw",
            minWidth: "325px",
            height: "100vh"
          }}
          barStyles={{
            borderRadius: "0rem",
            width: "35vw",
            maxWidth: "35vw",
            minWidth: "325px",
            height: "100vh",

            // LOADING SCREEN BACKGROUND COLORS
            backgroundColor: "#0cbaba",
            backgroundImage: "linear-gradient(30deg, #086187 0%, #520078 85%",
            
            
          }}
          dataStyles={{ 
            fontSize: "2.5rem",
            bottom: 'calc(22.5rem + (100vh - 600px) * (15 - 250) / (600 -  1080))',
            fontFamily: "Orbitron",
            

                   
        }}
          dataInterpolation={(p) => `${p.toFixed(0)} %`} // Text
          initialState={(active) => active} // Initial black out state

        >
        </Loader>
          
    </div>



  </div>
  );

}

export default App;


