import { useLoader, useThree } from '@react-three/fiber';
import React, { createRef, Ref, RefObject } from 'react';
import { forwardRef, MutableRefObject, useEffect, useState } from 'react';
import { AudioLoader, AudioListener } from 'three';
import { useSnapshot } from 'valtio';
import { _music } from '../State/_music';

type RefProps = JSX.IntrinsicElements['audio'];

interface AudioProps extends RefProps {
  track: string;
  volume: number;
}

export const Audio = React.forwardRef<any, any>(({ track, volume, ...props }, ref) => {
  const { camera } = useThree();
  const [listener] = useState<AudioListener>(() => new AudioListener());
  const { setLoaded, init, urls } = useSnapshot(_music);

  const buffer = useLoader(
    AudioLoader,
    urls[track as keyof typeof urls],
    undefined,
    (xhr) => {
      if (xhr.loaded === xhr.total) {
        setLoaded(track, true);
      }
    }
  );

  useEffect(() => {
    const soundRef = ref as MutableRefObject<any>;
    const sound = soundRef.current;

    if (sound && init) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(volume);
      sound.play();
    }

    return () => {
      if (sound && init) {
        sound.stop();
        sound.disconnect();
      }
    };
  }, [buffer, camera, listener, init]);

  return <audio ref={ref} args={[listener]} {...props} />;
});
