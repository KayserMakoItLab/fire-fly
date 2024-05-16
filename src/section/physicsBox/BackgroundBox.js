import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useMemo, useReducer, useRef } from "react";
import Connector from "./Connector";

const accents = ["#b12423", "#0c9d8a", "#b79fd8"];
const roughness = 0;
const shuffle = (accent = 0) => [
  { color: "#FF474C", roughness: 0, glass: false },
  { color: "#FF474C", roughness: 1, glass: false },
  { color: "#FF474C", roughness: 0.5, glass: false },
  { color: "#FF474C", roughness: 0.75, glass: false },
  { color: "#AAAAAA", roughness: 0, glass: false },
  { color: "#AAAAAA", roughness: 1, glass: false },
  { color: "#AAAAAA", roughness: 0.5, glass: false },
  { color: "#AAAAAA", roughness: 0.75, glass: false },
  { color: "#FFFFFF", roughness: 0, glass: false },
  { color: "#FFFFFF", roughness: 1, glass: false },
  { color: "#FFFFFF", roughness: 0.5, glass: false },
  { color: "#FFFFFF", roughness: 0.75, glass: false },
  { color: "#FF474C", roughness: 0, glass: false },
  { color: "#FF474C", roughness: 1, glass: false },
  { color: "#FF474C", roughness: 0.5, glass: false },
  { color: "#FF474C", roughness: 0.75, glass: false },
  { color: "#AAAAAA", roughness: 0, glass: false },
  { color: "#AAAAAA", roughness: 1, glass: false },
  { color: "#AAAAAA", roughness: 0.5, glass: false },
  { color: "#AAAAAA", roughness: 0.75, glass: false },
  { color: "#FFFFFF", roughness: 0, glass: false },
  { color: "#FFFFFF", roughness: 1, glass: false },
  { color: "#FFFFFF", roughness: 0.5, glass: false },
  { color: "#FFFFFF", roughness: 0.75, glass: false },

  // { color: accents[accent], roughness: 0.1, accent: true },
  // { color: accents[accent], roughness: 0.75, accent: true },
  // { color: accents[accent], roughness: 0.1, accent: true },
  // { color: accents[accent], roughness: 0.75, accent: true },
];

const BoxBackground = () => {
  const { camera } = useThree();
  const moveableMeshRef = useRef();
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  useFrame(({ clock, mouse }) => {
    gsap.from(camera.position, {
      x: mouse.x * 0.1,
      y: mouse.y * 0.1,
      duration: 0.5,
    });
    if (moveableMeshRef?.current) {
      const time = clock.elapsedTime;
      gsap.from(moveableMeshRef?.current?.rotation, {
        x: time * 0.1,
        duration: 0.5,
      });
    }
  });

  return (
    <>
      <group ref={moveableMeshRef}>
        {
          connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */
        }
      </group>
    </>
  );
};

export default BoxBackground;