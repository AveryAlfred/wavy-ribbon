import { proxy } from 'valtio';

function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  clamp: boolean
) {
  if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
    return outputMin;
  } else {
    var outVal =
      ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
}
const scale = (progress: number) => {
  if (progress > 0.5299 && progress < 0.605) {
    return mapRange(progress, 0.52, 0.605, 1, 1.5, true);
  }
  return 1;
};
export const _music = proxy({
  urls: {
    oneSwells: 'Music/001 Melody - Swells.mp3',
    onePlucks: 'Music/002 Melody - Plucks.mp3',
    oneEcho: 'Music/003 Melody - Echo.mp3',
    twoKick: 'Music/004 Kit - Kick.mp3',
    twoClack: 'Music/005 Kit - Clack.mp3',
    twoHat: 'Music/006 Kit - Hat.mp3',
    twoShaker: 'Music/007 Kit - Shaker.mp3',
  },
  didLoad: {
    oneSwells: false,
    onePlucks: false,
    oneEcho: false,
    twoKick: false,
    twoClack: false,
    twoHat: false,
    twoShaker: false,
  },
  amps: {
    oneSwells: 0,
    onePlucks: 0,
    oneEcho: 0,
    twoKick: 0,
    twoClack: 0,
    twoHat: 0,
    twoShaker: 0,
  },
  alt: {
    oneSwells: 0,
    onePlucks: 0,
    oneEcho: 0,
    twoKick: 0,
    twoClack: 0,
    twoHat: 0,
    twoShaker: 0,
  },

  init: false,
  scale: 1,
  progress: 0,
  sparkStorm: false,

  setInit: (value: boolean) => (_music.init = value),
  setAudioData: (type: string, data: number) => {
    const amp = mapRange(data, 0, 255, 0, 1, true);
    _music.amps = { ..._music.amps, [type]: amp };
    _music.alt = { ..._music.amps, [type]: amp / 3 };
  },
  setLoaded: (type: string, loaded: boolean) => {
    _music.didLoad = { ..._music.didLoad, [type]: loaded };
  },
  setProgress: (progress: number) => {
    _music.progress = progress;
    _music.scale = scale(progress);
  },
  didLoadAllAudio: () => Object.values(_music.didLoad).every(Boolean),
});
