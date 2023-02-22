import { MeshReflectorMaterial } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { MeshBasicMaterial } from 'three';

export const Floor = () => {
  const { z, blurStart, blurEnd, roughness, mixBlur, floor } = useControls({
    Floor: folder(
      {
        floor: { value: true },
        z: { value: -13, min: -20.5, max: 1.0, step: 0.01 },
        blurStart: { value: 50, min: 1, max: 1000.0, step: 0.01 },
        blurEnd: { value: 100, min: 1, max: 1000.0, step: 0.01 },
        mixBlur: { value: 0.5, min: 0.1, max: 1.0, step: 0.01 },
        roughness: { value: 1, min: 0.0, max: 1.0, step: 0.01 },
      },
      { collapsed: true }
    ),
  });
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, z, 0]}>
      <planeGeometry args={[400, 60]} />
      <meshBasicMaterial color={0x19191a} attach="material" />
      {/* <MeshReflectorMaterial
        visible={floor}
        mirror={1}
        blur={[blurStart, blurEnd]}
        resolution={1024}
        mixBlur={1}
        mixStrength={mixBlur}
        roughness={roughness}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
      /> */}
    </mesh>
  );
};
