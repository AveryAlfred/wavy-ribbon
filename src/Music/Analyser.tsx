import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { AudioAnalyser } from 'three';
import { useSnapshot } from 'valtio';
import { _music } from '../State/_music';

interface AnalyserProps {}
export const Analyser = ({ track, sound, trackProgress = false }: any) => {
  const analyser = useRef<AudioAnalyser>();
  const { setAudioData, setProgress, init } = useSnapshot(_music);

  useFrame(() => {
    if (!analyser.current && sound.current) {
      analyser.current = new AudioAnalyser(sound.current, 32);
    }

    if (analyser.current && init) {
      const data = analyser.current.getAverageFrequency();
      setAudioData(track, data);

      if (trackProgress) {
        const progress =
          (Math.max(sound.current.context.currentTime - sound.current._startedAt, 0) *
            sound.current.playbackRate) /
          sound.current.buffer.duration;

        setProgress(progress);
      }
    }
  });
  return null;
};
