import { MeshReflectorMaterial, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
);

extend({ ColorShiftMaterial });

interface GroundProps {
  position?: THREE.Vector3;
  size?: number;
}
export const GroundGrid = ({
  position = new THREE.Vector3(0, 0, 0),
  size = 250,
}: GroundProps): JSX.Element => {
  return (
    <mesh position={position}>
      <planeGeometry args={[size, size]} />
      {/* <MeshReflectorMaterial
        mirror={1}
        blur={[500, 100]}
        resolution={1024}
        mixBlur={12}
        mixStrength={1.5}
        roughness={1}
        depthScale={0.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
      /> */}
    </mesh>
  );
};
