import React, {  Suspense } from "react";
import './App.css';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment,  Loader  } from "@react-three/drei";
import  {Template}  from './objects/Template.js';
import {EffectComposer, Bloom } from '@react-three/postprocessing'
import { ACESFilmicToneMapping } from "three/src/constants";
function AnimationCanvas() {


  return (
    <Canvas

      className="webgl"
      dpr={ window.devicePixelRatio }
      camera={ {  fov: 70, near: 0.001, position: [0, 0, -1] , rotation: [0, 0, 0] }}
      onCreated={({ gl, scene }) => {
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;

          gl.setPixelRatio( window.devicePixelRatio );
        }}>


        <Suspense >
            <Template />
        </Suspense>

            <ambientLight color={0xffffff} intensity={0.5} />
            <EffectComposer autoClear={false}>
              <Bloom intensity={0.1} height={480} luminanceThreshold={0.2} />
            </EffectComposer>
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
              borderRadius: "0.75rem",
              backgroundColor: 'black'
          }}
          innerStyles={{
            borderRadius: "0rem",
            width: "35vw",
            maxWidth: "35vw",
            minWidth: "325px",
            height: "100vh",
            backgroundColor: 'black'
          }}
          barStyles={{
            borderRadius: "0rem",
            width: "35vw",
            maxWidth: "35vw",
            minWidth: "325px",
            height: "100vh",

            // LOADING SCREEN BACKGROUND COLORS
           // backgroundColor: "#0cbaba",
           // backgroundImage: "linear-gradient(30deg, #086187 0%, #520078 85%",
            backgroundColor: 'transparent'
            
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


