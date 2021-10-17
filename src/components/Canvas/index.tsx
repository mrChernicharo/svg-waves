import { useEffect, useRef, useState } from 'react';
import useWindowSize, { ISize } from '../../hooks/useWindowSize';
import { drawCanvas, updateCanvas } from './d3-canvas';
import { ResizeProvider, ResizeConsumer } from 'react-resize-context';

import { MdDragHandle, MdDragIndicator } from 'react-icons/md';

const waveIconSrcs = ['/t-wave.svg', '/b-wave.svg', '/l-wave.svg', '/r-wave.svg'];

import Image from 'next/image';

import { Container } from './Styles';

export default function Canvas() {
  // const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [canvasSize, setCanvasSize] = useState<ISize>({ width: 0, height: 0 });

  function handleCanvasResize(size: ISize) {
    setCanvasSize(size);
  }

  useEffect(() => {
    drawCanvas();
  }, []);

  useEffect(() => {
    console.log(canvasSize);

    updateCanvas(canvasSize);
  }, [canvasSize]);

  return (
    <Container>
      <ResizeProvider>
        <ResizeConsumer onSizeChanged={handleCanvasResize}>
          <div id="canvas"></div>
        </ResizeConsumer>
      </ResizeProvider>

      {waveIconSrcs.map(iconSrc => (
        <button key={iconSrc}>
          <Image src={iconSrc} width={30} height={30} alt="icon" />
        </button>
      ))}
    </Container>
  );
}
