import React, { useRef, useEffect } from "react"
import { useGLTF, useAnimations, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { MathUtils } from "three"

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    "./models/Montane_model_04.glb"
  )
  const { actions } = useAnimations(animations, group)
  const scrolling = useScroll()

  useEffect(() => {
    // Pause all animations initially
    Object.values(actions).forEach((action) => {
      if (action) {
        action.play().paused = true
      }
    })
  }, [actions])

  useFrame(() => {
    const scroll = scrolling.offset
    const startScroll = 0.8
    const endScroll = 1.0

    // Define stops with specific animation progress values
    const stops = [
      { scrollAt: 0.85, animationAt: 0.3 }, // At 70% scroll, stop at 30% of animation
      { scrollAt: 0.9, animationAt: 0.6 }, // At 80% scroll, stop at 60% of animation
      { scrollAt: 0.99, animationAt: 0.99 }, // At 90% scroll, stop at 80% of animation
    ]

    // Normalize scroll value
    let normalizedScroll = Math.max(
      0,
      Math.min(0.99, (scroll - startScroll) / (endScroll - startScroll))
    )

    // Find the appropriate animation progress based on stops
    let animationProgress = normalizedScroll
    for (let i = 0; i < stops.length; i++) {
      const currentStop = stops[i]
      const nextStop = stops[i + 1]

      if (normalizedScroll <= currentStop.scrollAt) {
        // Before this stop
        const prevStop = stops[i - 1] || { scrollAt: 0, animationAt: 0 }
        const scrollRange = currentStop.scrollAt - prevStop.scrollAt
        const animationRange = currentStop.animationAt - prevStop.animationAt
        const localProgress =
          (normalizedScroll - prevStop.scrollAt) / scrollRange
        animationProgress =
          prevStop.animationAt + localProgress * animationRange
        break
      } else if (!nextStop) {
        // After last stop
        const remainingScrollRange = 1 - currentStop.scrollAt
        const remainingAnimationRange = 0.99 - currentStop.animationAt
        const localProgress =
          (normalizedScroll - currentStop.scrollAt) / remainingScrollRange
        animationProgress =
          currentStop.animationAt + localProgress * remainingAnimationRange
      }
    }

    Object.values(actions).forEach((action) => {
      if (action) {
        const duration = action.getClip().duration
        action.time = duration * animationProgress
        action.paused = false
      }
    })
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="00_middle_large_01"
          position={[0, 23.7, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane"
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane_1.geometry}
            material={materials["Windows.001"]}
          />
          <mesh
            name="Plane_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane_2.geometry}
            material={materials["Windows.Frames.001"]}
          />
        </group>
        <group
          name="00_middle_large_02"
          position={[0, 28, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane001"
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={materials["Facade.002"]}
          />
          <mesh
            name="Plane001_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane001_1.geometry}
            material={materials["Windows.002"]}
          />
          <mesh
            name="Plane001_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane001_2.geometry}
            material={materials["Windows.Frames.002"]}
          />
        </group>
        <group
          name="00_middle_large_04"
          position={[0, 36.6, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane002"
            castShadow
            receiveShadow
            geometry={nodes.Plane002.geometry}
            material={materials["Facade.003"]}
          />
          <mesh
            name="Plane002_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane002_1.geometry}
            material={materials["Windows.003"]}
          />
          <mesh
            name="Plane002_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane002_2.geometry}
            material={materials["Windows.Frames.003"]}
          />
          <mesh
            name="Plane002_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane002_3.geometry}
            material={materials["Windows.Frames.003"]}
          />
        </group>
        <group
          name="00_middle_small_02"
          position={[6.3, 28, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane005"
            castShadow
            receiveShadow
            geometry={nodes.Plane005.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane005_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane005_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane005_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane005_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_small_01"
          position={[6.3, 23.7, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane006"
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane006_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane006_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane006_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane006_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_small_03"
          position={[6.3, 32.3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane007"
            castShadow
            receiveShadow
            geometry={nodes.Plane007.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane007_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane007_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane007_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane007_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_small_04"
          position={[6.3, 36.6, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane008"
            castShadow
            receiveShadow
            geometry={nodes.Plane008.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane008_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane008_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane008_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane008_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_large_03"
          position={[0, 32.3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane010"
            castShadow
            receiveShadow
            geometry={nodes.Plane010.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane010_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane010_1.geometry}
            material={materials["Windows.001"]}
          />
          <mesh
            name="Plane010_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane010_2.geometry}
            material={materials["Windows.Frames.001"]}
          />
        </group>
        <group
          name="00_corner_04"
          position={[11.7, 36.6, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane012"
            castShadow
            receiveShadow
            geometry={nodes.Plane012.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane012_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane012_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane012_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane012_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_03"
          position={[11.7, 32.3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane013"
            castShadow
            receiveShadow
            geometry={nodes.Plane013.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane013_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane013_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane013_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane013_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_02"
          position={[14.2, 28, -2.5]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane016"
            castShadow
            receiveShadow
            geometry={nodes.Plane016.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane016_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane016_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane016_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane016_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_small"
          position={[6.3, 40.9, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane004"
            castShadow
            receiveShadow
            geometry={nodes.Plane004.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane004_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane004_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane004_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane004_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_01"
          position={[14.2, 23.7, -2.5]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[2.7, 0.973, 2.15]}
        >
          <mesh
            name="Plane024"
            castShadow
            receiveShadow
            geometry={nodes.Plane024.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane024_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane024_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane024_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane024_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_corner"
          position={[11.7, 44.45, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane031"
            castShadow
            receiveShadow
            geometry={nodes.Plane031.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane031_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane031_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane031_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane031_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_floor_corner"
          position={[11.7, 18.254, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane032"
            castShadow
            receiveShadow
            geometry={nodes.Plane032.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane032_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane032_1.geometry}
            material={materials.Fast_Beton}
          />
          <mesh
            name="Plane032_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane032_2.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane032_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane032_3.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane032_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane032_4.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_large"
          position={[-0.021, 43.288, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane034"
            castShadow
            receiveShadow
            geometry={nodes.Plane034.geometry}
            material={materials["Facade.003"]}
          />
          <mesh
            name="Plane034_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane034_1.geometry}
            material={materials["Windows.003"]}
          />
          <mesh
            name="Plane034_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane034_2.geometry}
            material={materials["Windows.Frames.003"]}
          />
        </group>
        <group
          name="00_floor_small"
          position={[6.305, 13.604, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane035"
            castShadow
            receiveShadow
            geometry={nodes.Plane035.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane035_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane035_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane035_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane035_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
          <mesh
            name="Plane035_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane035_3.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane035_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane035_4.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_floor_large"
          position={[-0.021, 17.104, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane036"
            castShadow
            receiveShadow
            geometry={nodes.Plane036.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane036_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane036_1.geometry}
            material={materials.Fast_Beton}
          />
          <mesh
            name="Plane036_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane036_2.geometry}
            material={materials["Windows.001"]}
          />
          <mesh
            name="Plane036_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane036_3.geometry}
            material={materials["Windows.Frames.001"]}
          />
        </group>
        <group
          name="00_corner_04001"
          position={[-8.8, 36.6, -2.5]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane003"
            castShadow
            receiveShadow
            geometry={nodes.Plane003.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane003_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane003_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane003_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane003_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_corner001"
          position={[-8.8, 44.45, -2.457]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <mesh
            name="Plane009"
            castShadow
            receiveShadow
            geometry={nodes.Plane009.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane009_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane009_1.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_corner_02001"
          position={[-6.345, 40.909, 0.052]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane011"
            castShadow
            receiveShadow
            geometry={nodes.Plane011.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane011_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane011_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane011_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane011_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_corner002"
          position={[-8.8, 44.847, -2.497]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <mesh
            name="Plane014"
            castShadow
            receiveShadow
            geometry={nodes.Plane014.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane014_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane014_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane014_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane014_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_02002"
          position={[-6.3, 28, 0.016]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane015"
            castShadow
            receiveShadow
            geometry={nodes.Plane015.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane015_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane015_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane015_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane015_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_01001"
          position={[-6.3, 23.7, 0.016]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.7, 0.973, 2.15]}
        >
          <mesh
            name="Plane017"
            castShadow
            receiveShadow
            geometry={nodes.Plane017.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane017_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane017_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane017_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane017_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_floor_corner001"
          position={[-8.8, 18.254, -2.484]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <mesh
            name="Plane018"
            castShadow
            receiveShadow
            geometry={nodes.Plane018.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane018_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane018_1.geometry}
            material={materials.Fast_Beton}
          />
          <mesh
            name="Plane018_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane018_2.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane018_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane018_3.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane018_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane018_4.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_large_01001"
          position={[-0.014, 23.7, -10.383]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane019"
            castShadow
            receiveShadow
            geometry={nodes.Plane019.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane019_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane019_1.geometry}
            material={materials["Windows.001"]}
          />
          <mesh
            name="Plane019_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane019_2.geometry}
            material={materials["Windows.Frames.001"]}
          />
        </group>
        <group
          name="00_middle_large_02001"
          position={[-0.014, 28, -10.383]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane020"
            castShadow
            receiveShadow
            geometry={nodes.Plane020.geometry}
            material={materials["Facade.002"]}
          />
          <mesh
            name="Plane020_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane020_1.geometry}
            material={materials["Windows.002"]}
          />
          <mesh
            name="Plane020_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane020_2.geometry}
            material={materials["Windows.Frames.002"]}
          />
        </group>
        <group
          name="00_middle_large_04001"
          position={[-0.014, 36.6, -10.383]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane021"
            castShadow
            receiveShadow
            geometry={nodes.Plane021.geometry}
            material={materials["Facade.003"]}
          />
          <mesh
            name="Plane021_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane021_1.geometry}
            material={materials["Windows.003"]}
          />
          <mesh
            name="Plane021_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane021_2.geometry}
            material={materials["Windows.Frames.003"]}
          />
          <mesh
            name="Plane021_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane021_3.geometry}
            material={materials["Windows.Frames.003"]}
          />
        </group>
        <group
          name="00_middle_large_03001"
          position={[-0.014, 32.3, -10.383]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[3.6, 1, 2.15]}
        >
          <mesh
            name="Plane022"
            castShadow
            receiveShadow
            geometry={nodes.Plane022.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane022_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane022_1.geometry}
            material={materials["Windows.001"]}
          />
          <mesh
            name="Plane022_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane022_2.geometry}
            material={materials["Windows.Frames.001"]}
          />
        </group>
        <group
          name="00_roof_large001"
          position={[0.007, 43.288, -10.383]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane023"
            castShadow
            receiveShadow
            geometry={nodes.Plane023.geometry}
            material={materials["Facade.003"]}
          />
          <mesh
            name="Plane023_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane023_1.geometry}
            material={materials["Windows.003"]}
          />
          <mesh
            name="Plane023_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane023_2.geometry}
            material={materials["Windows.Frames.003"]}
          />
        </group>
        <group
          name="00_floor_large001"
          position={[0.007, 17.104, -10.383]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane025"
            castShadow
            receiveShadow
            geometry={nodes.Plane025.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane025_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane025_1.geometry}
            material={materials.Fast_Beton}
          />
          <mesh
            name="Plane025_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane025_2.geometry}
            material={materials["Windows.001"]}
          />
          <mesh
            name="Plane025_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane025_3.geometry}
            material={materials["Windows.Frames.001"]}
          />
        </group>
        <group
          name="00_corner_04002"
          position={[-6.333, 36.6, -10.407]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane026"
            castShadow
            receiveShadow
            geometry={nodes.Plane026.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane026_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane026_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane026_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane026_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_03001"
          position={[-6.333, 32.3, -10.407]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane027"
            castShadow
            receiveShadow
            geometry={nodes.Plane027.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane027_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane027_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane027_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane027_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_02003"
          position={[-8.833, 28, -7.907]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane028"
            castShadow
            receiveShadow
            geometry={nodes.Plane028.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane028_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane028_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane028_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane028_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_01002"
          position={[-8.833, 23.7, -7.907]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[2.7, 0.973, 2.15]}
        >
          <mesh
            name="Plane029"
            castShadow
            receiveShadow
            geometry={nodes.Plane029.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane029_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane029_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane029_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane029_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_corner003"
          position={[-6.38, 44.45, -10.394]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane030"
            castShadow
            receiveShadow
            geometry={nodes.Plane030.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane030_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane030_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane030_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane030_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_floor_corner002"
          position={[-6.333, 18.254, -10.407]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane033"
            castShadow
            receiveShadow
            geometry={nodes.Plane033.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane033_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane033_1.geometry}
            material={materials.Fast_Beton}
          />
          <mesh
            name="Plane033_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane033_2.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane033_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane033_3.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane033_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane033_4.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_04003"
          position={[14.192, 36.6, -7.918]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane037"
            castShadow
            receiveShadow
            geometry={nodes.Plane037.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane037_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane037_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane037_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane037_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_corner004"
          position={[14.192, 44.45, -7.899]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <mesh
            name="Plane038"
            castShadow
            receiveShadow
            geometry={nodes.Plane038.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane038_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane038_1.geometry}
            material={materials.Fast_Beton}
          />
          <mesh
            name="Plane038_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane038_2.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane038_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane038_3.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane038_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane038_4.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_02004"
          position={[11.704, 40.909, -10.42]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane039"
            castShadow
            receiveShadow
            geometry={nodes.Plane039.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane039_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane039_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane039_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane039_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_corner005"
          position={[14.192, 44.847, -7.921]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <mesh
            name="Plane040"
            castShadow
            receiveShadow
            geometry={nodes.Plane040.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane040_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane040_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane040_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane040_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_02005"
          position={[11.692, 28, -10.433]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane041"
            castShadow
            receiveShadow
            geometry={nodes.Plane041.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane041_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane041_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane041_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane041_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_corner_01003"
          position={[11.692, 23.7, -10.433]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 0.973, 2.15]}
        >
          <mesh
            name="Plane042"
            castShadow
            receiveShadow
            geometry={nodes.Plane042.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane042_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane042_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane042_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane042_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_floor_corner003"
          position={[14.192, 18.254, -7.933]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <mesh
            name="Plane043"
            castShadow
            receiveShadow
            geometry={nodes.Plane043.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane043_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane043_1.geometry}
            material={materials.Fast_Beton}
          />
          <mesh
            name="Plane043_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane043_2.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane043_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane043_3.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane043_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane043_4.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_small_02001"
          position={[6.302, 28, -10.41]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane044"
            castShadow
            receiveShadow
            geometry={nodes.Plane044.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane044_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane044_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane044_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane044_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_small_01001"
          position={[6.302, 23.7, -10.41]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane045"
            castShadow
            receiveShadow
            geometry={nodes.Plane045.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane045_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane045_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane045_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane045_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_small_03001"
          position={[6.302, 32.3, -10.41]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane046"
            castShadow
            receiveShadow
            geometry={nodes.Plane046.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane046_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane046_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane046_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane046_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_middle_small_04001"
          position={[6.302, 36.6, -10.41]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[2.7, 1, 2.15]}
        >
          <mesh
            name="Plane047"
            castShadow
            receiveShadow
            geometry={nodes.Plane047.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane047_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane047_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane047_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane047_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_small001"
          position={[6.302, 40.9, -10.382]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane048"
            castShadow
            receiveShadow
            geometry={nodes.Plane048.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane048_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane048_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane048_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane048_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_floor_small001"
          position={[6.297, 13.604, -10.41]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane049"
            castShadow
            receiveShadow
            geometry={nodes.Plane049.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane049_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane049_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane049_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane049_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
          <mesh
            name="Plane049_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane049_3.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane049_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane049_4.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_roof_corner006"
          position={[-8.8, 44.45, -2.497]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <mesh
            name="Plane050"
            castShadow
            receiveShadow
            geometry={nodes.Plane050.geometry}
            material={materials["Facade.005"]}
          />
          <mesh
            name="Plane050_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane050_1.geometry}
            material={materials["Windows.005"]}
          />
          <mesh
            name="Plane050_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane050_2.geometry}
            material={materials["Windows.Frames.004"]}
          />
        </group>
        <group
          name="00_roof_corner007"
          position={[-6.333, 44.45, -10.407]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane051"
            castShadow
            receiveShadow
            geometry={nodes.Plane051.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane051_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane051_1.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_roof_large002"
          position={[0.007, 43.288, -10.383]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane052"
            castShadow
            receiveShadow
            geometry={nodes.Plane052.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane052_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane052_1.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_roof_small002"
          position={[6.302, 40.9, -10.382]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <mesh
            name="Plane053"
            castShadow
            receiveShadow
            geometry={nodes.Plane053.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane053_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane053_1.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_roof_corner008"
          position={[11.7, 44.45, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane054"
            castShadow
            receiveShadow
            geometry={nodes.Plane054.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane054_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane054_1.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_roof_small003"
          position={[6.3, 40.9, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane055"
            castShadow
            receiveShadow
            geometry={nodes.Plane055.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane055_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane055_1.geometry}
            material={materials.Fast_Beton}
          />
        </group>
        <group
          name="00_roof_large003"
          position={[-0.021, 43.288, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane056"
            castShadow
            receiveShadow
            geometry={nodes.Plane056.geometry}
            material={materials["Facade.001"]}
          />
          <mesh
            name="Plane056_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane056_1.geometry}
            material={materials.Fast_Beton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("./models/Montane_model_04.glb")
