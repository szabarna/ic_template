
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import gsap from 'gsap'
import { CustomEase } from "gsap/all";
import FinalWatch from "./FinalWatch.js";

const urls = [
  './img/env.hdr', './img/env.hdr',
  './img/env.hdr', './img/env.hdr',
  './img/env.hdr', './img/env.hdr'
];
const envMap = new THREE.CubeTextureLoader().load(urls);
const texture = new THREE.TextureLoader().load('./img/bg.jpg');

envMap.format = THREE.RGBFormat;

gsap.registerPlugin(CustomEase)


export default function Template({ ...props }) {


  const group = useRef();
  const { nodes, materials } = useGLTF("/iceTemplate.glb");
  // -  scene, animations
  // const { actions } = useAnimations(animations, group);

    // let mixer = new THREE.AnimationMixer(scene);
    // animations.forEach((clip) => {
    //     const action = mixer.clipAction(clip);
    //     action.play();
    // });

  const templateGroup = useRef();

  const iceCube = useRef();
  const dirLight = useRef();
  const ambLight = useRef();
  const iceImg = useRef();
  const frontPlain = useRef();



  const leftText = useRef();
  const topText = useRef();
  const rightText = useRef();


  const { camera, scene, gl } = useThree();

  useEffect(() => {
    

    scene.children[0].traverse((obj) => {
        if(obj.isMesh) {
          
          if(obj.material.map != undefined) {
            
            gl.initTexture(obj.material.map)
            gl.initTexture(envMap);
            gl.initTexture(texture);
          }
        }
    })

  }, [])
  
  
  
  materials.backMaterial.map = texture;

  materials.backMaterial.roughness = 0.15;
  materials.backMaterial.color = new THREE.Color(0, 0, 0.25);
  materials.backMaterial.metalness = 0.65;

  
 
  materials.frontMaterial.emmisive = new THREE.Color('#ff0000');
  materials.frontMaterial.emmisiveIntensity = 15.0;
  materials.frontMaterial.roughness = 0.2;
  materials.frontMaterial.metalness = 0.75;

  nodes.plainImg.material.transparent = true;
  nodes.plainImg.material.opacity = 1;
  nodes.plainImg.material.metalness = 1.0;
  nodes.plainImg.material.roughness = 0.2;
  nodes.plainImg.material.color = new THREE.Color('#aaaaaa');


  nodes.leftText.material.color = new THREE.Color('#00a1ff');
  nodes.leftText.material.roughness = 0.3;
  nodes.leftText.material.metalness = 0.9;
  

   useFrame(({clock}, delta)=> {

     iceCube.current.rotation.y = clock.getElapsedTime() * 0.35;

   })

   const tl = new gsap.timeline()
  
  return (
    <group ref={group} {...props} dispose={null}  >
      <group name="Scene" rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
      
        <group ref={ templateGroup } 
        onPointerOver={(e)=> {
          document.querySelector('.webgl').style.cursor = 'pointer'
        }}
        onPointerOut={(e)=> {
          document.querySelector('.webgl').style.cursor = 'default'
        }}
        onClick={(e)=> {
          
          if(!tl.isActive()) {
            tl.to(templateGroup.current.rotation, { y: "+=" + Math.PI * 2, duration: 5, ease: CustomEase.create("custom", "M0,0,C0,0,0.108,0.255,0.17,0.34,0.242,0.44,0.363,0.474,0.448,0.53,0.636,0.654,0.617,0.731,0.708,0.84,0.816,0.97,1,1,1,1")})
             gsap.to(camera.position, { z: "-=" + 0.3, duration: 2.2, ease: "power1.inOut", onComplete: () => {
              gsap.to(camera.position, { z: "+=" + 0.3, duration: 2.2, ease: "power1.inOut" })
            } })
            
            
            scene.traverse((obj) => {
              if(obj.isGroup && obj.name === "Watch") {
                gsap.to(obj.rotation, { y: "-=" + Math.PI * 2, duration: 5,  ease:  CustomEase.create("custom", "M0,0,C0,0,0.108,0.255,0.17,0.34,0.242,0.44,0.363,0.474,0.448,0.53,0.636,0.654,0.617,0.731,0.708,0.84,0.816,0.97,1,1,1,1")})
              }

             
            })

            
          }
         
        }}
        position={[0, 0, 0]}
        >
            
          <mesh
            name="backPlain"
            castShadow
            receiveShadow
            geometry={nodes.backPlain.geometry}
             material={materials.backMaterial}
            // material={new THREE.MeshNormalMaterial()}
          
            position={[-0.2, 0, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.38, 0.59, 0.25]}
          >
          
          </mesh>
        <mesh
          name="frontPlain"
          castShadow
          receiveShadow
          geometry={nodes.frontPlain.geometry}
           material={materials.frontMaterial}
        //  material={new THREE.MeshNormalMaterial()}
          position={[0.175, -0.09, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.36, 0.6, 0.185]}
          ref={frontPlain}
        />
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.unknown2.geometry}
        material={materials.unknown2}
        position={[-0.23, -0.025, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.61}
      />
        <mesh
          name="icLogo"
          castShadow
          receiveShadow
          geometry={nodes.icLogo.geometry}
          material={materials.LogoMaterial}
          position={[-0.15, 0.31, 0.16]}
          rotation={[0.62, Math.PI / 6, -0.96]}
          scale={0.02}
         // scale={1.5}
          ref={ iceCube }
        >
          <meshStandardMaterial color={0x049ef4}  roughness={ 0.25 } metalness={ 1.0 } side={ THREE.DoubleSide } /> 
          
        </mesh>
        <mesh
          name="icLogoPlain"
          castShadow
          receiveShadow
          geometry={nodes.icLogo.geometry}
          material={materials.LogoMaterial}
          position={[0.4, -0.45, 0]}
          rotation={[0.62, Math.PI / 7, -0.96]}
          scale={0}
         // scale={1.5}
 
        >
          <meshStandardMaterial color={0x049ef4}  roughness={ 0.0 } metalness={ 1.0 } side={ THREE.DoubleSide } /> 
          
        </mesh>
        <mesh
          name="leftText"
          castShadow
          receiveShadow
          geometry={nodes.leftText.geometry}
          material={nodes.leftText.material}
          position={[0.155, -0.075, 0.175]}
          rotation={[-Math.PI, 0, -Math.PI / 2]}
          scale={0.035}
          ref={leftText}
        />
        <mesh
          name="topText"
          castShadow
          receiveShadow
          geometry={nodes.topText.geometry}
          material={nodes.topText.material}
          position={[0.15, 0.255, 0.045]}
          rotation={[Math.PI / 2, -0.1, -Math.PI / 2]}
          scale={0.035}
          ref={topText}
        />
        <mesh
          name="rightText"
          castShadow
          receiveShadow
          geometry={nodes.rightText.geometry}
          material={nodes.rightText.material}
          position={[0.155, 0.075, -0.175]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.035}
          ref={rightText}
        />
        <mesh
          name="iceText"
          castShadow
          receiveShadow
          geometry={nodes.iceText.geometry}
          material={nodes.iceText.material}
          position={[-0.15, 0.24, 0.22]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.03}
        />

        <mesh
          name="chainText"
          castShadow
          receiveShadow
          geometry={nodes.chainText.geometry}
          material={materials.logoChainMaterial}
          position={[-0.15, 0.24, 0.17]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.03}
        />

    </group>
  
        <FinalWatch   />

        <mesh
          name="plainImg"
          castShadow
          receiveShadow
          geometry={nodes.plainImg.geometry}
          material={materials.unknown}
          position={[-0.01, -0.4, 0]}
          rotation={[0, Math.PI / 2, 0]}
         // scale={0.4}
         scale={0}
          ref={ iceImg }
        />
           
        
      </group>


      <directionalLight ref={dirLight} position={[10, 15, -10]} intensity={ 1.5} color={'blue'} />
          
       <ambientLight ref={ambLight} intensity={ 0.75 }/>
    </group>
  );
}

useGLTF.preload("/iceTemplate.glb");


