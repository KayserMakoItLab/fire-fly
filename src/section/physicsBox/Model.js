import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

function Model({ children, color = "white", roughness = 0, glass, ...props }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/i.glb");
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });
  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      scale={15}
      geometry={nodes.Curve001.geometry}
    >
      {glass ? (
        <MeshTransmissionMaterial
          clearcoat={0}
          thickness={0.5}
          anisotropicBlur={0.1}
          chromaticAberration={0.1}
          samples={8}
          resolution={512}
        />
      ) : (
        <meshStandardMaterial
          metalness={0.2}
          roughness={roughness}
          map={materials[""].map}
        />
      )}
      {children}
    </mesh>
  );
}

export default Model;