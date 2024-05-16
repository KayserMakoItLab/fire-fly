import { Canvas } from "@react-three/fiber";
import Pointer from "./Pointer";
import { Environment, Lightformer, MeshTransmissionMaterial, PerspectiveCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import BoxBackground from "./BackgroundBox";
import Connector from "./Connector";
import Model from "./Model";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { useControls } from "leva";


const PhysicsBox = (props) => {
  const { x, y, z, px, py, pz } = useControls({
    x: 0,
    y: 0,
    z: 0,
    px: 0,
    py: 0,
    pz: 10,
  });

  return (
    <div className="physicbox-container">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: false }}
        {...props}
        style={{
          borderRadius: "0rem",
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[px, py, pz]}
          rotation={[x, y, z]}
          far={40}
        />
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={1} />
        <directionalLight intensity={1} position={[-100, -100, 100]} />
        <directionalLight intensity={2} position={[100, 100, 100]} />
        <spotLight
          position={[1, 1, 1]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Physics gravity={[0, 0, 0]} maxStabilizationIterations={1}>
          <Pointer />
          <BoxBackground />
          <Connector position={[10, 10, 5]}>
            <Model>
              <MeshTransmissionMaterial
                clearcoat={1}
                thickness={0.1}
                anisotropicBlur={0.1}
                chromaticAberration={0.1}
                samples={8}
                resolution={512}
              />
            </Model>
          </Connector>
        </Physics>
        <EffectComposer disableNormalPass multisampling={8}>
          <N8AO distanceFalloff={1} aoRadius={1} intensity={1} />
        </EffectComposer>
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={20}
              rotation-x={Math.PI / 2}
              position={[-100, -100, 100]}
              scale={10}
            />
            <Lightformer
              form="circle"
              intensity={4}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={2}
            />
            <Lightformer
              form="circle"
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={2}
            />
            <Lightformer
              form="circle"
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, -1, -1]}
              scale={2}
            />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
};

export default PhysicsBox;