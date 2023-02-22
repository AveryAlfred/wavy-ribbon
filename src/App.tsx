// libraries
import { useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Leva } from 'leva';
import { Canvas } from '@react-three/fiber';
// local
import { _fancyCam } from './State/_fancyCam';
import { _music } from './State/_music';
import { Lighting } from './Scene/Lighting';
import { Floor } from './Scene/Floor';
import { Music } from './Music/Music';
import { DotGrid } from './DotGrid/DotGrid';
import { VolumeOff, VolumeOn } from './Utils/Svg';
import Overlay from './Scene/Overlay';
import FancyCam from './Scene/FancyCam';
import useLongPress from './Utils/LongPress';
import { GlobalStyle } from './Style';

function App() {
  const overlay = useRef<HTMLDivElement>(null!);
  const caption = useRef<HTMLDivElement>(null!);
  const scroll = useRef<number>(0);
  const [leva, setLeva] = useState(true);

  const { init, setInit } = useSnapshot(_music);
  const { activeIndex, setActive } = useSnapshot(_fancyCam);

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const audioPress = useLongPress(
    () => setLeva(!leva),
    () => setInit(!init),
    defaultOptions
  );
  const scrollPress = useLongPress(
    () => setActive(0),
    () => setActive(11),
    defaultOptions
  );

  return (
    <>
      <GlobalStyle />
      <Leva hidden={leva} titleBar={true} />
      <Canvas id="renderCanvas" shadows>
        <Lighting />
        <DotGrid />
        <Floor />
        <FancyCam scroll={scroll} />
        <Music />
      </Canvas>

      {activeIndex !== 11 && <Overlay ref={overlay} caption={caption} scroll={scroll} />}
      <button id="playButton" {...scrollPress}>
      </button>

      {!init && (
        <button id="playButton" {...audioPress}>
          <VolumeOn />
        </button>
      )}
      {init && (
        <button id="playButton" {...audioPress}>
          <VolumeOff />
        </button>
      )}
    </>
  );
}

export default App;
