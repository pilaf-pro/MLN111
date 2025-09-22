"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Environment, Float, Sparkles } from "@react-three/drei"
import { Suspense } from "react"

function ChineseCharacter() {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 2, 0.3]} />
                <meshStandardMaterial color="#0891b2" />
            </mesh>
        </Float>
    )
}

function Temple() {
    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
            <group position={[3, -1, -2]} scale={0.5}>
                {/* Temple base */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4, 0.2, 3]} />
                    <meshStandardMaterial color="#8b4513" />
                </mesh>
                {/* Temple pillars */}
                {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
                    <mesh key={i} position={[x, 1, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 2]} />
                        <meshStandardMaterial color="#d2691e" />
                    </mesh>
                ))}
                {/* Temple roof */}
                <mesh position={[0, 2.2, 0]} rotation={[0, 0, 0]}>
                    <coneGeometry args={[2.5, 0.8, 4]} />
                    <meshStandardMaterial color="#dc143c" />
                </mesh>
            </group>
        </Float>
    )
}

function ScrollingText() {
    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
            <group position={[-3, 1, -1]} rotation={[0, 0.3, 0]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 0.3, 0.05]} />
                    <meshStandardMaterial color="#dc2626" />
                </mesh>
            </group>
        </Float>
    )
}

export default function Scene3D() {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <Suspense fallback={null}>
                <Environment preset="sunset" />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0891b2" />

                <ChineseCharacter />
                <Temple />
                <ScrollingText />

                <Sparkles count={50} scale={10} size={2} speed={0.5} color="#0891b2" />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                />
            </Suspense>
        </Canvas>
    )
}