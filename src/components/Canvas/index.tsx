import { useEffect } from 'react';
import { drawCanvas } from './d3';

export default function Canvas() {
  useEffect(() => {
    drawCanvas();
  }, []);

  return <div id="canvas"></div>;
}
