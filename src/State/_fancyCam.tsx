import { Euler, Vector3, Color } from 'three';
import { proxy } from 'valtio';

const PI = Math.PI;

export interface SpotType {
  cordTar: Vector3 | number[];
  cordCam: Vector3 | number[];
  duration?: number;
}
export interface FancyCamType {
  urls: number[];
  activeIndex: number;
  active: SpotType;
  previous: SpotType | null;
  setActive: (id: number) => void;
  incActive: () => void;
  decActive: () => void;
  spots: SpotType[];
}
export const _fancyCam = proxy<FancyCamType>({
  urls: [1, 2, 3, 4, 5, 6],
  activeIndex: 0,
  active: {
    // cordTar: [20, -20, -8],
    // cordCam: [-5, 2, 2],
    cordTar: [30, 0, 0],
    cordCam: [20, 20, 50],
    // duration: 0.01,
  },
  previous: null,
  setActive: (id: number) => {
    _fancyCam.previous = _fancyCam.active;
    _fancyCam.active = _fancyCam.spots[id];
    _fancyCam.activeIndex = id;
    console.log(_fancyCam.activeIndex + 1);
  },
  incActive: () => {
    _fancyCam.activeIndex += 1;
  },
  decActive: () => {
    _fancyCam.activeIndex -= 1;
  },
  spots: [
    {
      cordTar: [30, 0, 0],
      cordCam: [20, 20, 50],
    },
    {
      cordTar: [50, 0, -5],
      cordCam: [-1, 30, 20],
    },
    {
      cordTar: [50, -3, 3],
      cordCam: [50, 10, -2],
    },
    {
      cordTar: [30, 2, -2],
      cordCam: [100, -10, 25],
    },
    {
      cordTar: [0, 0, 0],
      cordCam: [5, 15, 4],
    },
    {
      cordTar: [0, 0, 0],
      cordCam: [5, 15, 4],
    },
    {
      cordTar: [0, 0, 0],
      cordCam: [5, 15, 4],
    },
    {
      cordTar: [0, 0, 0],
      cordCam: [5, 15, 4],
    },
    {
      cordTar: [0, 0, 0],
      cordCam: [5, 15, 4],
    },
    {
      cordTar: [0, 0, 0],
      cordCam: [5, 15, 4],
    },
    {
      cordTar: [0, 0, 0],
      cordCam: [5, 15, 4],
    },
    {
      cordTar: [-2, 2, 2],
      cordCam: [-8, 6, 9],
    },
    {
      cordTar: [2, 2, 0],
      cordCam: [1, 7, 0],
    },
  ],
});
