import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { MathUtils, Vector3 } from "three";
import Model from "./Model";

function Connector({
  position,
  children,
  vec = new Vector3(),
  scale,
  r = MathUtils.randFloatSpread,
  accent,
  glass,
  ...props
}) {
  const api = useRef();
  const pos = useMemo(() => position || [r(30), r(30), Math.abs(r(30))], []);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    );
  });
  return (
    <RigidBody
      linearDamping={2}
      // angularDamping={1}
      friction={1}
      position={pos}
      ref={api}
      colliders={"cuboid"}
      // angularVelocity={[1,1,1]}
      // gravityScale={1}
      // density={0.1}
    >
      {children ? children : <Model {...props} glass={glass} />}
      {accent && (
        <pointLight intensity={4} distance={2.5} color={props.color} />
      )}
    </RigidBody>
  );
}

export default Connector;
