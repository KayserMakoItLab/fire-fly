'use client'
import { PhysicsBox } from "@/section/physicsBox";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="app">
        <Suspense fallback={<Loader />}>
          <PhysicsBox />
        </Suspense>
      </div>
    </>
  );
}
