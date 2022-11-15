import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import { useFrame } from "@react-three/fiber";
import gsap from 'gsap';
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);

export function Template(props) {
  const { nodes, materials } = useGLTF("/template.glb");
  const backTexture = new TextureLoader().load('./img/bg.jpg');
  const group = useRef();
  const pointer1 = useRef();
  const pointer2 = useRef();
  const icLogo = useRef();

  useEffect(() => {

    gsap.to(group.current.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 7.5,
      repeat: -1,
      repeatDelay: 12.5,
      ease: CustomEase.create(
        "custom",
        "M0,0,C0,0,0.108,0.255,0.17,0.34,0.242,0.44,0.363,0.474,0.448,0.53,0.636,0.654,0.617,0.731,0.708,0.84,0.816,0.97,1,1,1,1"
      ),
    });

  }, []);
  useFrame(({clock}) => {
    icLogo.current.rotation.y = clock.getElapsedTime() * 0.5;
    pointer1.current.rotation.x = -clock.getElapsedTime() * 0.5;
    pointer2.current.rotation.x = -clock.getElapsedTime() * 0.25;
  });

  return (
    <group ref={group} {...props} dispose={null} rotation={[0, Math.PI / 2, 0]} position={[0, -0.05, 0]}>
           <mesh
        castShadow
        receiveShadow
        geometry={nodes.backPlain.geometry}
       // material={materials.backMaterial}
        position={[-0.1909, 0.025, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.3769, 0.5899, 0.2453]}
      >
        <meshStandardMaterial color={0x0067ff} map={backTexture} roughness={0.25} metalness={0.25} />
      </mesh>
      <mesh
      ref={icLogo}
        castShadow
        receiveShadow
        geometry={nodes.icLogo.geometry}
        material={materials.LogoMaterial}
        position={[-0.1099, 0.3342, 0.1564]}
        rotation={[0.6155, Math.PI / 6, -0.9553]}
        scale={0.0185}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.frontPlain.geometry}
        material={materials.frontMaterial}
        position={[0.2299, 0.025, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.4028, 0.6305, 0.2622]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.topText.geometry}
          material={materials.textMaterial}
          position={[-0.9697, -0.0269, 0.2522]}
          rotation={[0, 1.5705, 0]}
          scale={[0.1936, 0.0805, 0.126]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rightText.geometry}
          material={materials.textMaterial}
          position={[-0.4984, -0.0269, -0.9651]}
          scale={[0.126, 0.0805, 0.1936]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leftText.geometry}
          material={materials.textMaterial}
          position={[0.0155, -0.0269, 0.9628]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.126, 0.0805, 0.1936]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.iceText.geometry}
        material={materials.logoIceMaterial}
        position={[-0.1174, 0.2634, 0.2264]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.0331}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials.sphereOne}
        position={[0.149, 0.0263, -0.0015]}
        rotation={[-Math.PI / 2, 1.5549, Math.PI / 2]}
        scale={[0.082, 0.0834, 0.0072]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chainText.geometry}
        material={materials.textMaterial}
        position={[-0.1174, 0.2634, 0.1743]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.0331}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials.logoIceMaterial}
        position={[0.1535, 0.0153, -0.0276]}
        rotation={[-1.4297, -0.0158, -1.5686]}
        scale={[-0.0322, -0.0031, -0.0322]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials.logoIceMaterial}
        position={[0.1531, 0.0366, 0.0218]}
        rotation={[1.7559, -0.0158, -1.5686]}
        scale={[-0.0322, -0.0031, -0.0322]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.unknown2.geometry}
        material={materials.unknown2}
        position={[-0.2172, 0, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.6362}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials.MenMetal2}
        position={[0.1451, 0.0253, -0.0015]}
        rotation={[-Math.PI / 2, 1.5549, Math.PI / 2]}
        scale={[0.1106, 0.1106, 0.0125]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials.MenMetal2}
        position={[0.1629, 0.0256, -0.0015]}
        rotation={[Math.PI / 2, 0.0159, -Math.PI / 2]}
        scale={[0.0049, 0.0081, 0.0049]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FinalStrap1_MenMetal2_0.geometry}
        material={materials.MenMetal2}
        position={[0.0128, 0.0218, -0.0015]}
        rotation={[Math.PI / 2, 0.0309, -Math.PI / 2]}
        scale={0.0285}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FinalStrap1_MenMetal_0.geometry}
          material={materials.MenMetal2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.strapClip_MenMetal2_0.geometry}
          material={materials.MenMetal2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FinalStrap2_MenMetal2_0.geometry}
          material={materials.MenMetal2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FinalStrap2_MenMetal_0.geometry}
          material={materials.MenMetal2}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials.MenMetal2}
        position={[0.1483, 0.0257, -0.0015]}
        rotation={[-Math.PI / 2, 1.5549, Math.PI / 2]}
        scale={[0.0926, 0.0874, 0.0136]}
      />
      <mesh
        ref={pointer1}
        castShadow
        receiveShadow
        geometry={nodes.WatchCubeOne.geometry}
        material={materials.MenMetal2}
        position={[0.1609, 0.0256, -0.0015]}
        rotation={[1.2995, 0.0153, -3.1373]}
        scale={[0.0031, 0.1086, 0.1086]}
      />
      <mesh
       ref={pointer2}
        castShadow
        receiveShadow
        geometry={nodes.WatchCubeSecond.geometry}
        material={materials.MenMetal2}
        position={[0.1678, 0.0256, -0.0015]}
        rotation={[0.7887, 0.0113, -3.1304]}
        scale={[0.0031, 0.1086, 0.1086]}
      />
    </group>
  );
}

useGLTF.preload("/template.glb");


