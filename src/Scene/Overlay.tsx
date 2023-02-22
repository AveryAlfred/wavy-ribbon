import { forwardRef, MutableRefObject } from 'react';

export interface OverlayProps {
  caption: any;
  scroll: MutableRefObject<number>;
}
const Overlay = forwardRef<HTMLDivElement, OverlayProps>(({ scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e: React.BaseSyntheticEvent) => {
      scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
    }}
    className="scroll"
  >
    <div style={{ height: '100vh' }}>
      <div className="segment">
        <h1 id="title">Wavy Ribbon</h1>
      </div>
    </div>
    <div style={{ height: '100vh' }}>
      <div className="segment">
        <h1>What else </h1>
        <p className="slide">The camera transitions between view positions based on how far one's scrolled</p>
      </div>
    </div>
    <div style={{ height: '100vh' }}>
      <div className="segment">
        <h1>Close up</h1>
        <p className="slide">
          It's all geometric and wavy
        </p>
      </div>
    </div>
    <div style={{ height: '100vh' }}>
      <div className="segment">
        <h1>Cheers</h1>
        <p className="slide">
          <li>:]</li>
          <li>Have a good one</li>
        </p>
      </div>
    </div>
    <div style={{ height: '800vh' }}>
      <div id="segment">
        <h1>{``}</h1>
        <p></p>
      </div>
    </div>
  </div>
));

export default Overlay;
