import { useEffect, useRef } from 'react';

interface CursorProps {
  onHover: boolean;
}

export const Cursor = ({ onHover }: CursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);

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
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const outerCircle = outerCircleRef.current;
    const innerCircle = innerCircleRef.current;
    if (!cursor || !outerCircle || !innerCircle) {
      return;
    }

    if (onHover) {
      cursor.style.transform = 'scale(0.45)';
      outerCircle.style.opacity = '.75';
      innerCircle.style.width = 49 + 'px';
      innerCircle.style.height = 49 + 'px';
    } else {
      cursor.style.transform = 'scale(1)';
      outerCircle.style.opacity = '1';
      innerCircle.style.width = 0 + 'px';
      innerCircle.style.height = 0 + 'px';
    }
  }, [onHover]);

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
