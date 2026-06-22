import React, { useEffect, useRef } from 'react';

export default function UniqueLiquidBackground() {
  const canvasRef = useRef(null);
  // Track location, momentum, and an internal wave clock
  const stateRef = useRef({ 
    x: -1000, y: -1000, 
    targetX: -1000, targetY: -1000,
    speed: 0, lastX: 0, lastY: 0,
    cycle: 0 
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const state = stateRef.current;
      state.targetX = e.clientX;
      state.targetY = e.clientY;
      
      // Calculate instantaneous speed to fuel the ripple displacement amplitude
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      state.speed = Math.min(dist * 1.5, 120); // Clamp maximum distortion burst
      
      state.lastX = e.clientX;
      state.lastY = e.clientY;
    };

    const handleMouseLeave = () => {
      stateRef.current.targetX = -1000;
      stateRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const gridSize = 45; // slightly tighter cell blocks for crisper warp resolution

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const state = stateRef.current;
      // Interpolation (lerp) for smooth tracking action
      state.x += (state.targetX - state.x) * 0.08;
      state.y += (state.targetY - state.y) * 0.08;
      // Decay speed over time so ripple settles when cursor stops moving
      state.speed += (0 - state.speed) * 0.05;
      // Increment kinetic wave cycle
      state.cycle += 0.04;

      const maxDist = 220; // Radius of influence around cursor

      // Draw Vertical Lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 8) { // 8px segments to allow fluid bending
          let drawX = x;
          let alphaModifier = 1.0;
          
          if (state.x > 0 && state.y > 0) {
            const dx = x - state.x;
            const dy = y - state.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDist) {
              const force = (maxDist - distance) / maxDist;
              // Mix speed-induced tearing and a gentle periodic sine wave ripple
              const dynamicWarp = (state.speed * 0.4) + Math.sin(state.cycle - distance * 0.05) * 8;
              
              drawX += (dx / distance) * force * dynamicWarp;
              // Make lines flash and glow bright green right in the wave impact zone
              alphaModifier += force * 5.5; 
            }
          }

          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }
        
        ctx.strokeStyle = `rgba(52, 211, 153, ${0.05 * ctx.globalAlpha})`; 
        // We capture localized alpha enhancements using individual strokes for distorted groups
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Horizontal Lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 8) {
          let drawY = y;
          
          if (state.x > 0 && state.y > 0) {
            const dx = x - state.x;
            const dy = y - state.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDist) {
              const force = (maxDist - distance) / maxDist;
              const dynamicWarp = (state.speed * 0.4) + Math.sin(state.cycle - distance * 0.05) * 8;
              
              drawY += (dy / distance) * force * dynamicWarp;
            }
          }

          if (x === 0) ctx.moveTo(x, drawY);
          else ctx.lineTo(x, drawY);
        }
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Render a localized highlighted geometric structure underneath the ripple epicenter
      if (state.x > 0 && state.y > 0) {
        // High-contrast, vibrant radial light splash that travels with the wave
        const gradient = ctx.createRadialGradient(state.x, state.y, 5, state.x, state.y, maxDist);
        gradient.addColorStop(0, 'rgba(52, 211, 153, 0.12)'); // bright emerald node
        gradient.addColorStop(0.3, 'rgba(16, 185, 129, 0.04)');
        gradient.addColorStop(0.7, 'rgba(6, 78, 59, 0.01)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(state.x, state.y, maxDist, 0, Math.PI * 2);
        ctx.fill();

        // Tactical coordinate scope rings that expand based on cursor speed
        ctx.strokeStyle = `rgba(52, 211, 153, ${0.1 + (state.speed * 0.003)})`;
        ctx.lineWidth = 0.75;
        
        ctx.beginPath();
        // Dynamic expanding scanner rings mimicking soundwave transmissions
        ctx.arc(state.x, state.y, 40 + (state.speed * 0.2), 0, Math.PI * 2);
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