import * as THREE from "three"
import { useMemo } from "react"
import { useThree } from "@react-three/fiber"
function useShaderMaterial({ vertexShader, fragmentShader }) {
  const camera = useThree((state) => state.camera)
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
          uCamPos: { value: camera.position },
          uCamToWorldMat: { value: camera.matrixWorld },
          uCamInverseProjMat: { value: camera.projectionMatrixInverse },
          uInverseModelMat: { value: new THREE.Matrix4() },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2() },
          uPointerSize: { value: 0.001 },
          uResolution: { value: new THREE.Vector2() },
          uTexture: { value: new THREE.Texture() },
          uNoiseTexture: { value: new THREE.Texture() },
          iChannel0: { value: new THREE.CubeTexture() },
          uSpeed: { value: 0.5 },
          uIOR: { value: 0.84 },
          uCount: { value: 3 },
          uReflection: { value: 1.5 },
          uSize: { value: 0.005 },
          uDispersion: { value: 0.03 },
          uRefract: { value: 0.15 },
          uChromaticAberration: { value: 0.5 },
          uPointerSize: { value: 0.03 },
          uNoiseScale: { value: 0.56 },
          uNoiseAmount: { value: 0.17 },
          uSaturation: { value: 0.5 },
        },
      }),
    [vertexShader, fragmentShader]
  )
}

export default useShaderMaterial
