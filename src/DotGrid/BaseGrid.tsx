import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Lut } from 'three/examples/jsm/math/Lut.js';
import { Matrix4 } from 'three';
import { folder, useControls } from 'leva';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { _music } from '../State/_music';

interface BaseGridProps {
  getValueForNormalizedCoord: (
    normGridX: number,
    normGridY: number,
    elapsedTimeSec?: number
  ) => number;
}

export const BaseGrid = ({ getValueForNormalizedCoord }: BaseGridProps): JSX.Element => {
  // leva
  const { speed, start, rows, columns, zoom, spacing, dotX, dotY, dotZ } = useControls({
    speed: {
      value: 1.5,
      min: 0.5,
      max: 20,
      step: 1,
    },
    Swirl: folder(
      {
        dotX: {
          value: 0.10,
          min: 0,
          max: 0.5,
          step: 0.01,
        },
        dotY: {
          value: 0.15,
          min: 0,
          max: 0.5,
          step: 0.01,
        },
        dotZ: {
          value: 1,
          min: 0,
          max: 5,
          step: 0.01,
        },
        start: {
          value: 1,
          min: -15,
          max: 15,
          step: 0.1,
        },
        rows: {
          value: 200,
          min: 1,
          max: 500,
          step: 1,
        },
        columns: {
          value: 30,
          min: 1,
          max: 100,
          step: 1,
        },
        zoom: {
          value: 0.05,
          // value: 0.015,
          min: 0.01,
          max: 0.05,
          step: 0.005,
        },
        spacing: {
          value: 12,
          // value: 10,
          min: 3,
          max: 15,
          step: 0.5,
        },
      },
      { collapsed: true }
    ),
  });

  // state
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tmpMatrix = useMemo(() => new Matrix4(), []);
  const { amps } = useSnapshot(_music);

  useEffect(() => {
    const lut = new Lut('cooltowarm');
    const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);
    let instanceIdx, normGridX, normGridY, normRadialOffset;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        instanceIdx = row * columns + col;
        normGridX = row / rows;
        normGridY = col / columns;
        normRadialOffset =
          Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;
        meshRef.current.setColorAt(instanceIdx, lut.getColor(normRadialOffset));
      }
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [rows, columns, zoom, spacing, getValueForNormalizedCoord]);

  useFrame(({ clock }) => {
    //in ms
    const elapsedTimeSec = clock.getElapsedTime() / speed;
    const gridSizeX = rows * spacing * zoom;
    const gridSizeY = columns * spacing * zoom;
    let instanceIdx, normGridX, normGridY, x, y, z;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        instanceIdx = row * columns + col;
        normGridX = row / rows;
        normGridY = col / columns;
        z = getValueForNormalizedCoord(normGridX, normGridY, elapsedTimeSec);
        x = gridSizeX * (normGridX - 0.5);
        y = gridSizeY * (normGridY - 0.5);

        meshRef.current.setMatrixAt(instanceIdx, tmpMatrix.setPosition(x, y, z));
      }
    }
    // Update the instance
    meshRef.current.instanceMatrix!.needsUpdate = true;
  });

  return (
    <group position={[start, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <instancedMesh
        ref={meshRef}
        castShadow={true}
        receiveShadow={true}
        args={[new THREE.BoxGeometry(), new THREE.MeshBasicMaterial(), rows * columns]}
      >
        {/* <ringGeometry */}
        <sphereGeometry
          attach="geometry"
          args={[dotX, dotY, dotZ, 1]}
          // <boxGeometry
          // args={[zoom, zoom, zoom, 1]}
        />
        <meshBasicMaterial attach="material" color={'white'} toneMapped={false} />
      </instancedMesh>
    </group>
  );
};
