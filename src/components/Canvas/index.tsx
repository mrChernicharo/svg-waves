import { DragEventHandler, SyntheticEvent, useEffect, useRef, useState } from 'react';
import useWindowSize, { ISize } from '../../hooks/useWindowSize';
import { drawCanvas } from './d3-canvas';
import { MdDragHandle, MdDragIndicator } from 'react-icons/md';

import { Container } from './Styles';

export default function Canvas() {
  const { width: windowWidth } = useWindowSize();
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ w: 0, h: 0 });

  let canvasRef = useRef<HTMLDivElement>(null);
  let btnRef = useRef<HTMLDivElement>(null);

  const initial = e => {
    setInitialPos({ x: e.clientX, y: e.clientY });
    setInitialSize({
      w: canvasRef.current?.offsetWidth || 0,
      h: canvasRef.current?.offsetHeight || 0,
    });
  };

  const resize = e => {
    console.log({ clientX: e.clientX, windowWidth });

    canvasRef.current.style.width = `${
      Number(initialSize.w) + Number(e.clientX - initialPos.x)
    }px`;
    canvasRef.current.style.height = `${
      Number(initialSize.h) + Number(e.clientY - initialPos.y)
    }px`;
    btnRef.current.style.visibility = 'hidden';
  };

  const handleDragStop = e => {
    console.log(e);

    resize(e);
    btnRef.current.style.right = `${windowWidth - Number(e.clientX)}`;
    btnRef.current.style.visibility = 'visible';
  };

  const capture = e => {
    // console.log(e);
  };

  useEffect(() => {
    drawCanvas();
  }, []);

  //   useEffect(() => {
  //     console.log(canvasRef.current.style.width);
  //   }, [canvasRef.current?.style.width]);

  return (
    <Container>
      <div ref={canvasRef} id="canvas"></div>

      <div
        className={'dragBtn'}
        ref={btnRef}
        draggable={true}
        onDragCapture={capture}
        onDragStart={initial}
        onDrag={resize}
        onDragEnd={handleDragStop}
      >
        <MdDragIndicator size={32} />
      </div>
    </Container>
  );
}
