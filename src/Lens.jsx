import { useRef, useState } from "react"
import { useFrame, useThree, createPortal } from "@react-three/fiber"
import { useTexture, useFBO } from "@react-three/drei"
import { MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"
import { easing } from "maath"

export default function Lens({ children, damping = 0.15, ...props }) {
  const ref = useRef()
  // const { nodes } = useGLTF('/lens-transformed.glb')
  const roughnessMap = useTexture("./Textures/waternormals.jpeg")
  const buffer = useFBO()
  const viewport = useThree((state) => state.viewport)
  const [scene] = useState(() => new THREE.Scene())
  useFrame((state, delta) => {
    // Tie lens to the pointer
    // getCurrentViewport gives us the width & height that would fill the screen in threejs units
    // By giving it a target coordinate we can offset these bounds, for instance width/height for a plane that
    // sits 15 units from 0/0/0 towards the camera (which is where the lens is)
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15])
    easing.damp3(
      ref.current.position,
      [
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        15,
      ],
      damping,
      delta
    )
    // This is entirely optional but spares us one extra render of the scene
    // The createPortal below will mount the children of <Lens> into the new THREE.Scene above
    // The following code will render that scene into a buffer, whose texture will then be fed into
    // a plane spanning the full screen and the lens transmission material
    state.gl.setRenderTarget(buffer)
    state.gl.setClearColor("#d8d7d7")
    state.gl.render(scene, state.camera)
    state.gl.setRenderTarget(null)

    // Rotation of the cube
    ref.current.rotation.x = ref.current.rotation.y += delta / 3
  })
  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
      <mesh
        scale={0.35}
        ref={ref}
        rotation={[Math.PI / 3, Math.PI / 3, Math.PI / 3]}
        // geometry={nodes.Cylinder.geometry}
        {...props}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          // buffer={buffer.texture}
          buffer={false}
          ior={1.2}
          thickness={1.5}
          anisotropy={0.1}
          chromaticAberration={0.04}
          roughness={0.2}
          backside={true}
          backsideThickness={0.1}
          transmission={1}
        />
      </mesh>
    </>
  )
}
