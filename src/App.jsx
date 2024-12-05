import * as THREE from "three"
import { useCallback, useEffect } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import {
  Scroll,
  Preload,
  ScrollControls,
  Plane,
  Environment,
} from "@react-three/drei"
import { Leva } from "leva"

import Images from "./Images.jsx"
import Typography from "./Typo.jsx"
import Shader from "./Shader.jsx"
import Model from "./model.jsx"

function ResizeHandler() {
  const { gl, camera } = useThree()

  const handleResize = useCallback(() => {
    const { innerWidth, innerHeight } = window
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    gl.setSize(innerWidth, innerHeight)
  }, [gl, camera])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  return null
}

export default function App() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 20],
        fov: 15,
        near: 0.1,
        far: 1000,
        aspect: window.innerWidth / window.innerHeight,
      }}
    >
      <ResizeHandler />

      <Environment files="./hdri/aerodynamics_workshop_2k.hdr" />
      <ScrollControls damping={0.2} pages={3} distance={0.5}>
        <Scroll>
          <Typography />
          <Images />
          <Shader position={[0, 0, 3]} uSize={0.6} />
          <Shader position={[0, -1, 7]} uSize={0.005} />
          <Model scale={0.1} position={[-1, -12, 3]} rotation={[0, 1.1, 0]} />
        </Scroll>
        <Scroll html>
          <div style={{ transform: "translate3d(65vw, 30vh, 0)" }}>
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit.
          </div>
          <div style={{ transform: "translate3d(15vw, 120vh, 0)" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div style={{ transform: "translate3d(85vw, 250vh, 0)" }}>
            Lorem ipsum
            <br />
            dolor sit amet,
            <br />
            consectetur
            <br />
            adipiscing elit.
          </div>
        </Scroll>
        <Preload />
      </ScrollControls>
    </Canvas>
  )
}
