import { BaseGrid } from './BaseGrid';
import { folder, useControls } from 'leva';
import { useSnapshot } from 'valtio';
import { _music } from '../State/_music';

interface WaveformGridProps {
  amplitude?: number;
}

export const WaveformGrid = ({ amplitude = 1.0 }: WaveformGridProps): JSX.Element => {
  const { frequency, skip } = useControls({
    frequency: {
      value: 4,
      // value: 1.9,
      min: 0.0,
      max: 10,
      step: 0.05,
    },
    skip: {
      value: .5,
      min: 0.0,
      max: 1,
      step: 0.05,
    },
  });

  const { init, alt, amps } = useSnapshot(_music);
  const periodSec = 1 / frequency;
  const b = (2 * Math.PI) / periodSec;
  const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);

  const getValueForNormalizedCoord = (
    normGridX: number,
    normGridY: number,
    elapsedTimeSec: number = 0
  ): number => {
    const normRadialOffset =
      Math.hypot(normGridX - 0.15, normGridY - 0.45) / normQuadrantHypotenuse;
    const phaseShift = elapsedTimeSec;

    // STUB
    // const musicShift = Math.sin(amps.twoClack * 3) + alt.twoKick + alt.twoShaker;
    const clackShift = Math.sin(amps.twoClack ) 
    const kickShift = Math.sin(amps.twoKick / 3) 
    const musicShift = clackShift + kickShift

    if (init) {
      return amplitude * Math.sin(b * normRadialOffset + phaseShift + musicShift * skip);
    }
    return amplitude * Math.sin(b * normRadialOffset + phaseShift);
  };

  return <BaseGrid getValueForNormalizedCoord={getValueForNormalizedCoord} />;
};
