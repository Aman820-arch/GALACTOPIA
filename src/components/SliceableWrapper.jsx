import React, { useState, useRef, useEffect } from 'react';

export default function SliceableWrapper({ children }) {
  const containerRef = useRef(null);
  const [isSliced, setIsSliced] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const now = performance.now();
      const { clientX: x, clientY: y } = e;
      
      const deltaX = x - lastMousePos.current.x;
      const deltaY = y - lastMousePos.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      const timeDelta = now - lastMousePos.current.time;
      const velocity = timeDelta > 0 ? distance / timeDelta : 0;

      const rect = containerRef.current.getBoundingClientRect();
      const isHovering = (
        x >= rect.left && x <= rect.right &&
        y >= rect.top && y <= rect.bottom
      );

      // Slices elements cleanly when mouse speeds past 2.2 px/ms
      if (isHovering && velocity > 2.2) {
        setIsSliced(true);
      }

      lastMousePos.current = { x, y, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isSliced) {
      const timer = setTimeout(() => setIsSliced(false), 450);
      return () => clearTimeout(timer);
    }
  }, [isSliced]);

  return (
    <div ref={containerRef} className="relative group select-none">
      
      {/* Top Half Slice */}
      <div 
        className={`transition-all duration-150 ease-out ${
          isSliced ? 'transform -translate-x-3 -translate-y-2 -rotate-1 opacity-50 filter hue-rotate-60' : 'transform translate-x-0'
        }`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 48%, 0 58%)' }}
      >
        {children}
      </div>

      {/* Bottom Half Slice */}
      <div 
        className={`absolute inset-0 transition-all duration-150 ease-out pointer-events-none ${
          isSliced ? 'transform translate-x-3 translate-y-2 rotate-1 opacity-50' : 'transform translate-x-0'
        }`}
        style={{ clipPath: 'polygon(0 58%, 100% 48%, 100% 100%, 0 100%)' }}
      >
        {children}
      </div>

      {/* Laser Fracture Accent Overlays */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-150 z-30 ${
          isSliced ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          clipPath: 'polygon(0 57%, 100% 47%, 100% 49%, 0 59%)',
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)' 
        }}
      />
    </div>
  );
}