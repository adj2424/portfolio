import { useEffect, useRef, useState } from 'react';
import { useMyContext } from './Context';

export const Cursor = () => {
  const scale = useRef(1);
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const ctx = useMyContext();
  const isMobile = ctx.isMobile;
  const { onHover, onWorksHover } = ctx;
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const outerCircle = outerCircleRef.current;
    const image = imageRef.current;
    if (!cursor || !outerCircle || !image) {
      return;
    }
    const width = outerCircle.getBoundingClientRect().width;
    image.style.top = width / 2 + 'px';
    image.style.left = width / 2 + 'px';
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.top = e.clientY - width / 2 + 'px';
      cursor.style.left = e.clientX - width / 2 + 'px';
    };
    const handleMouseDown = () => {
      setIsMouseDown(true);
      scale.current *= 0.6;
      outerCircle.style.transform = `scale(${scale.current})`;
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
      scale.current /= 0.6;
      outerCircle.style.transform = `scale(${scale.current})`;
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

  // handles cursor during hover and click
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
      outerCircle.style.transform = `scale(${scale.current})`;
      outerCircle.style.opacity = '.75';
      // size of outer circle - 1
      innerCircle.style.width = 49 + 'px';
      innerCircle.style.height = 49 + 'px';
    }
    //
    else {
      scale.current = 1;
      if (isMouseDown) {
        scale.current = 1 * 0.6;
      }
      outerCircle.style.transform = `scale(${scale.current})`;
      outerCircle.style.opacity = '1';
      innerCircle.style.width = 0 + 'px';
      innerCircle.style.height = 0 + 'px';
    }
  }, [isMouseDown, onHover]);

  // handles works image during hover
  useEffect(() => {
    const image = imageRef.current;
    if (!image) {
      return;
    }
    image.src = onWorksHover.worksImgSrc;
    image.style.opacity = onWorksHover.isWorksTitleHover ? '1' : '0';
  }, [onWorksHover]);

  return (
    <>
      {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-[100] transition-transform duration-500 ease-in-out"
        >
          <div
            ref={outerCircleRef}
            className="absolute flex items-center justify-center w-[50px] h-[50px] border-[2px] border-accent rounded-full transition-all duration-500 ease-in-out z-[3]"
          >
            <div ref={innerCircleRef} className="bg-accent rounded-full transition-all duration-500 "></div>
          </div>
          <div style={{ width: 'clamp(210px, 27vw, 540px)' }}>
            <img ref={imageRef} className="absolute transition-all duration-500 ease-in-out z-[1]"></img>
          </div>
        </div>
      )}
    </>
  );
};
