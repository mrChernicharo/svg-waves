import { DragEventHandler, SyntheticEvent, useEffect, useRef, useState } from 'react';
import useWindowSize, { ISize } from '../../hooks/useWindowSize';
import { drawCanvas } from './d3-canvas';
import { ResizeProvider, ResizeConsumer } from 'react-resize-context';

import { MdDragHandle, MdDragIndicator } from 'react-icons/md';

import { Container } from './Styles';

export default function Canvas() {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [canvasSize, setCanvasSize] = useState<ISize>({ width: 0, height: 0 });

  function handleCanvasResize(size: ISize) {
    setCanvasSize(size);
  }

  useEffect(() => {
    drawCanvas();
  }, []);

  useEffect(() => {
    console.log(canvasSize);
  }, [canvasSize]);

  return (
    <Container>
      <ResizeProvider>
        <ResizeConsumer onSizeChanged={handleCanvasResize}>
          <div id="canvas"></div>
        </ResizeConsumer>
      </ResizeProvider>
    </Container>
  );
}
