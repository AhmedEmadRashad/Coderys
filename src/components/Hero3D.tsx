import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial 
          color="#4f46e5" // indigo-600
          emissive="#4338ca" // indigo-700
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.5}
          thickness={1}
        />
        
        {/* Inner glowing core */}
        <mesh>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial color="#a855f7" /> {/* purple-500 */}
        </mesh>
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-[400px] lg:h-[600px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PresentationControls 
          global 
          rotation={[0.13, 0.1, 0]} 
          polar={[-0.4, 0.2]} 
          azimuth={[-1, 0.75]} 
          snap={true}
        >
          <FloatingCube />
        </PresentationControls>

        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
