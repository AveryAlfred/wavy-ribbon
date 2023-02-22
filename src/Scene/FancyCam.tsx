import * as THREE from 'three';
import React, { useRef } from 'react';
import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useSnapshot } from 'valtio';
import { _fancyCam } from '../State/_fancyCam';
import { folder, useControls } from 'leva';

interface Props {
  scroll: React.MutableRefObject<number>;
}
function FancyCam({ scroll, ...props }: Props) {
  const { fps, axis, cube, cameraX, cameraY, cameraZ } = useControls({
    Utils: folder(
      {
        fps: false,
        axis: false,
        cube: false,
        cameraX: {
          value: 0,
          min: -15,
          max: 15,
          step: 0.1,
        },
        cameraY: {
          value: 0,
          min: -15,
          max: 15,
          step: 0.1,
        },
        cameraZ: {
          value: 0,
          min: -15,
          max: 15,
          step: 0.1,
        },
      },
      { collapsed: true }
    ),
  });

  const group = useRef<THREE.Group>(null!);
  const meshRef = useRef<Mesh>(null!);

  const { spots, active, setActive, activeIndex } = useSnapshot(_fancyCam);
  const indexOfPercent = (arr: any[], percent: number) => Math.floor((arr.length - 1) * percent),
    valueOfPercent = (arr: any[], percent: number) => arr[indexOfPercent(arr, percent)];

  useFrame(({ camera }, dt) => {
    const i = indexOfPercent(spots as any[], scroll.current);
    if (activeIndex !== i) {
      console.log(Math.floor(scroll.current * 100));
      setActive(i);
    }

    const t = new THREE.Vector3(...(active.cordTar as number[]));
    const c = new THREE.Vector3(...(active.cordCam as number[]));
    const d = active.duration ? active.duration : 0.01;

    if (activeIndex !== 11) {
      meshRef.current.position.lerp(t, d * 0.9);
      camera.position.lerp(c, d);
      camera.lookAt(meshRef.current.position);
    }
  });

  return (
    <>
      {fps && <Stats showPanel={0} />}
      {axis && (
        <GizmoHelper alignment="bottom-right" margin={[180, 180]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        </GizmoHelper>
      )}
      {activeIndex === 11 && <OrbitControls />}
      <group name="Cube" ref={group} {...props} dispose={null}>
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'#5f79cc88'} visible={cube ? true : false} />
        </mesh>
        <group name="Camera" position={[cameraX, cameraY, cameraZ]}>
          <PerspectiveCamera makeDefault far={1000} near={0.1} fov={28}></PerspectiveCamera>
        </group>
      </group>
    </>
  );
}
export default FancyCam;
