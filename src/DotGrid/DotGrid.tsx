import { useControls } from 'leva';
import { _music } from '../State/_music';
import { WaveformGrid } from './WaveformGrid';

export const DotGrid = () => {
  const { amplitude } = useControls({
    amplitude: { value: 1.3, min: 0.1, max: 2.0, step: 0.01 },
  });

  return <WaveformGrid amplitude={amplitude} />;
};
