import React, { useEffect, useRef } from 'react';

export default function UniqueLiquidBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track real sizing on resizing viewpoints
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse movement with interpolation targets
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const gridSize = 50; // Distance between grid cells

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth out the mouse tracking calculation (Lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw Vertical Lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 10) {
          let drawX = x;
          
          // Calculate grid distortion based on proximity to mouse
          if (mouse.x > 0 && mouse.y > 0) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 250) {
              // The push factor: bends lines slightly away from cursor or pulls inward
              const force = (250 - distance) / 250;
              drawX += dx * force * 0.25; 
            }
          }

          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)'; // Very faint jade base
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Horizontal Lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          let drawY = y;

          if (mouse.x > 0 && mouse.y > 0) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 250) {
              const force = (250 - distance) / 250;
              drawY += dy * force * 0.25;
            }
          }

          if (x === 0) ctx.moveTo(x, drawY);
          else ctx.lineTo(x, drawY);
        }
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Tactical Radar Overlay Highlight under the cursor
      if (mouse.x > 0 && mouse.y > 0) {
        // Soft Radial Glow
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 200);
        gradient.addColorStop(0, 'rgba(52, 211, 153, 0.07)'); // Emerald accent
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();

        // Delicate target intercept hashes
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
        ctx.lineWidth = 0.5;
        
        // Horizontal crosshair slice
        ctx.beginPath();
        ctx.moveTo(mouse.x - 30, mouse.y);
        ctx.lineTo(mouse.x + 30, mouse.y);
        ctx.stroke();

        // Vertical crosshair slice
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y - 30);
        ctx.lineTo(mouse.x, mouse.y + 30);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#020204]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}