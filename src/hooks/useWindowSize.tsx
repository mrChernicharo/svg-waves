import { useEffect, useState } from 'react';

export interface ISize {
  width: number;
  height: number;
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<ISize>({ width: 0, height: 0 });

  function handleResize() {
    const size = { width: window.innerWidth, height: window.innerHeight };
    setWindowSize(size);
  }

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => console.log(windowSize), [windowSize]);

  return { width: windowSize.width, height: windowSize.height };
}
