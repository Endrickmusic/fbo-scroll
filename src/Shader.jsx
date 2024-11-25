import {
  useCubeTexture,
  useTexture,
  useFBO,
  Image,
  OrbitControls,
} from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useEffect, useCallback, useState } from "react"
import { useControls, Leva } from "leva"

import vertexShader from "./shaders/vertexShader.js"
import fragmentShader from "./shaders/fragmentShader.js"
import { Vector2, Matrix4 } from "three"
import useShaderMaterial from "./hooks/useShaderMaterial.jsx"

export default function Shader({ position }) {
  const meshRef = useRef()
  const buffer = useFBO()
  const viewport = useThree((state) => state.viewport)
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  const shaderMaterial = useShaderMaterial({ vertexShader, fragmentShader })

  // Memoize mouse position handler
  const mousePosition = useRef({ x: 0, y: 0 })

  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY }
  }, [])

  // Memoize textures
  const noiseTexture = useTexture("./textures/noise.png")
  const cubeTexture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "./cubemap/potsdamer_platz/" }
  )

  const [worldToObjectMatrix, setWorldToObjectMatrix] = useState(new Matrix4())

  // Memoize controls
  const controls = useControls({
    reflection: { value: 1.5, min: 0.01, max: 6.0, step: 0.1 },
    speed: { value: 0.5, min: 0.01, max: 3.0, step: 0.01 },
    IOR: { value: 0.98, min: 0.01, max: 2.0, step: 0.01 },
    count: { value: 3, min: 1, max: 20, step: 1 },
    size: { value: 1.0, min: 0.1, max: 2.5, step: 0.01 },
    dispersion: { value: 0.03, min: 0.0, max: 0.1, step: 0.001 },
    refract: { value: 1.1, min: -10.0, max: 10.0, step: 0.1 },
    chromaticAberration: {
      value: 0.18,
      min: 0,
      max: 1.5,
      step: 0.01,
    },
    saturation: { value: 1.05, min: 1, max: 1.25, step: 0.01 },
  })

  // Destructure controls for use in useFrame
  const {
    reflection,
    speed,
    IOR,
    count,
    size,
    dispersion,
    refract,
    chromaticAberration,
  } = controls

  // Matrix update effect
  useEffect(() => {
    const object = meshRef.current
    if (object) {
      const updateMatrix = () => {
        object.updateMatrixWorld()
        const inverseMatrix = new Matrix4().copy(object.matrixWorld).invert()
        setWorldToObjectMatrix(inverseMatrix)
        object.material.uniforms.uInverseModelMat.value = inverseMatrix
      }

      updateMatrix()
      return () => {
        object.material.uniforms.uInverseModelMat.value = new Matrix4()
      }
    }
  }, [])

  // Mouse event listener
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false)
    return () =>
      window.removeEventListener("mousemove", updateMousePosition, false)
  }, [updateMousePosition])

  // Add this useEffect to handle control changes
  useEffect(() => {
    if (!meshRef.current) return

    meshRef.current.material.uniforms.uReflection.value = controls.reflection
    meshRef.current.material.uniforms.uSpeed.value = controls.speed
    meshRef.current.material.uniforms.uIOR.value = controls.IOR
    meshRef.current.material.uniforms.uCount.value = controls.count
    meshRef.current.material.uniforms.uSize.value = controls.size
    meshRef.current.material.uniforms.uDispersion.value = controls.dispersion
    meshRef.current.material.uniforms.uRefract.value = controls.refract
    meshRef.current.material.uniforms.uChromaticAberration.value =
      controls.chromaticAberration
    meshRef.current.material.uniforms.uSaturation.value = controls.saturation
  }, [controls])

  // Simplified useFrame that only handles time-based and position-based updates
  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return

    const time = state.clock.getElapsedTime()
    mesh.material.uniforms.uCamPos.value.copy(camera.position)
    mesh.material.uniforms.uCamToWorldMat.value.copy(camera.matrixWorld)
    mesh.material.uniforms.uCamInverseProjMat.value.copy(
      camera.projectionMatrixInverse
    )
    mesh.material.uniforms.uMouse.value.set(
      mousePosition.current.x,
      mousePosition.current.y
    )
    mesh.material.uniforms.uTime.value = time * controls.speed

    // FBO rendering
    gl.setRenderTarget(buffer)
    gl.setClearColor("#d8d7d7")
    gl.render(scene, camera)
    gl.setRenderTarget(null)
  })

  // Create a ref for resolution to avoid recreating Vector2 on every frame
  const resolutionRef = useRef(new Vector2())

  // Handle resolution updates
  useEffect(() => {
    const updateResolution = () => {
      if (meshRef.current?.material) {
        resolutionRef.current
          .set(viewport.width, viewport.height)
          .multiplyScalar(Math.min(window.devicePixelRatio, 2))
        meshRef.current.material.uniforms.uResolution.value =
          resolutionRef.current
      }
    }

    window.addEventListener("resize", updateResolution)
    updateResolution() // Initial set

    return () => window.removeEventListener("resize", updateResolution)
  }, [viewport.width, viewport.height])

  // Update shader material with textures when they're available
  useEffect(() => {
    if (meshRef.current && noiseTexture && cubeTexture && buffer) {
      meshRef.current.material.uniforms.uNoiseTexture.value = noiseTexture
      meshRef.current.material.uniforms.iChannel0.value = cubeTexture
      meshRef.current.material.uniforms.uTexture.value = buffer.texture
    }
  }, [noiseTexture, cubeTexture, buffer])

  return (
    <>
      <mesh ref={meshRef} scale={4} position={position}>
        <boxGeometry args={[1, 1, 0.5]} />
        <primitive object={shaderMaterial} />
      </mesh>
    </>
  )
}
