import { useState, useRef } from 'react';

export default function Custom360View({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);
  const threshold = 300 / images.length; // 임계값을 더 크게 설정하여 반응을 느리게 함

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > threshold) {
        const newIndex = currentIndex + (dx > 0 ? -1 : 1);
        setCurrentIndex((newIndex + images.length) % images.length);
        startX.current = e.clientX;
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    startX.current = null;
  };

  if(images.length > 0)
      return (
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 30px)',
            height: 'calc(100% - 30px)',
            overflow: 'hidden',
            cursor: 'grab',
          }}
        >
          <img
            src={images[currentIndex].url}
            alt={`Image ${currentIndex}`}
            onDragStart={(e) => e.preventDefault()}
            style={{ width: '100%', height: '100%', objectFit: "cover" }}
          />
        </div>
      );
}
