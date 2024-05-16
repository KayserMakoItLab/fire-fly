import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Color, Vector3 } from "three";

function Pointer({ vec = new Vector3() }) {
  const ref = useRef();
  const { scene } = useThree();

  scene.background = new Color("white");
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
    // console.log("mouse.y * viewport.height) / 2", (mouse.y * viewport.height) / 2)
  });
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      friction={0}
      ref={ref}
    >
      <CuboidCollider args={[0.5, 0.5, 2]} />
    </RigidBody>
  );
}

export default Pointer;