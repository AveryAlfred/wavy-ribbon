import { Audio } from './Audio';
import { Analyser } from './Analyser';
import { Suspense, useRef } from 'react';

interface AudioLayerProps {
  track: string;
  trackProgress?: boolean;
  volume?: number;
}
const AudioLayer = ({ track, trackProgress, volume }: AudioLayerProps) => {
  const sound = useRef<HTMLAudioElement>(null!);

  return (
    <>
      <Audio ref={sound} track={track} volume={volume ? volume : 1} />
      <Analyser track={track} sound={sound} trackProgress={trackProgress} />
    </>
  );
};

export const Music = () => {
  return (
    <Suspense fallback={null}>
      <AudioLayer track="oneSwells" trackProgress />
      {/* <AudioLayer track="onePlucks" /> */}
      {/* <AudioLayer track="oneEcho" /> */}
      <AudioLayer track="twoKick" volume={0.55} />
      <AudioLayer track="twoClack" volume={0.25} />
      <AudioLayer track="twoHat" volume={0.25} />
      <AudioLayer track="twoShaker" volume={0.35} />
    </Suspense>
  );
};