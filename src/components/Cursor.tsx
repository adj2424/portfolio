import { useEffect, useRef, useState } from 'react';

interface CursorProps {
  onHover: boolean;
}

export const Cursor = ({ onHover }: CursorProps) => {
  const scale = useRef(1);
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }
    const width = cursor.getBoundingClientRect().width;
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.top = e.clientY - width / 2 + 'px';
      cursor.style.left = e.clientX - width / 2 + 'px';
    };
    const handleMouseDown = () => {
      setIsMouseDown(true);
      scale.current *= 0.6;
      cursor.style.transform = `scale(${scale.current})`;
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
      scale.current /= 0.6;
      cursor.style.transform = `scale(${scale.current})`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const outerCircle = outerCircleRef.current;
    const innerCircle = innerCircleRef.current;
    if (!cursor || !outerCircle || !innerCircle) {
      return;
    }

    if (onHover) {
      scale.current = 0.45;
      if (isMouseDown) {
        scale.current = 0.45 * 0.6;
      }
      cursor.style.transform = `scale(${scale.current})`;
      outerCircle.style.opacity = '.75';
      innerCircle.style.width = 49 + 'px';
      innerCircle.style.height = 49 + 'px';
    }
    //
    else {
      scale.current = 1;
      if (isMouseDown) {
        scale.current = 1 * 0.6;
      }
      cursor.style.transform = `scale(${scale.current})`;
      outerCircle.style.opacity = '1';
      innerCircle.style.width = 0 + 'px';
      innerCircle.style.height = 0 + 'px';
    }
  }, [isMouseDown, onHover]);

  return (
    <>
      <div ref={cursorRef} className="fixed pointer-events-none z-[100] transition-transform duration-500 ease-in-out">
        <div
          ref={outerCircleRef}
          className="flex items-center justify-center w-[50px] h-[50px] border-[2px] border-accent rounded-full transition-all duration-500 ease-in-out"
        >
          <div ref={innerCircleRef} className="bg-accent rounded-full transition-all duration-500 "></div>
        </div>
      </div>
    </>
  );
};
