import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function UniqueLiquidBackground() {
  const canvasRef = useRef(null);
  const location = useLocation();
  
  // Track location changes using a ref so the animation loop always reads the current page context instantly
  const isContactRef = useRef(location.pathname === '/contact');

  useEffect(() => {
    isContactRef.current = location.pathname === '/contact';
  }, [location.pathname]);

  const stateRef = useRef({ 
    x: -1000, y: -1000, 
    targetX: -1000, targetY: -1000,
    vx: 0, vy: 0, // Velocity vector components
    tearIntensity: 0
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

    let lastTime = performance.now();

    const handleMouseMove = (e) => {
      const state = stateRef.current;
      state.targetX = e.clientX;
      state.targetY = e.clientY;
      
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      lastTime = now;

      // Calculate direction and speed of the tear
      const dx = e.clientX - (state.x === -1000 ? e.clientX : state.x);
      const dy = e.clientY - (state.y === -1000 ? e.clientY : state.y);
      
      // Calculate continuous structural shear force
      state.vx = dx / dt;
      state.vy = dy / dt;
      const moveSpeed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
      
      // Surge the tear magnitude depending on fast slash gestures
      state.tearIntensity = Math.min(state.tearIntensity + moveSpeed * 4, 150);
    };

    const handleMouseLeave = () => {
      stateRef.current.targetX = -1000;
      stateRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const gridSize = 40; // Tight matrix mesh coordinates

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const state = stateRef.current;
      const isContact = isContactRef.current;

      // Dynamic theme color selection
      const gridColor = isContact ? 'rgba(245, 158, 11, 0.04)' : 'rgba(52, 211, 153, 0.04)';
      const shadowColor = isContact ? 'rgba(245, 158, 11, 0.8)' : 'rgba(16, 185, 129, 0.8)';
      const coreStrokeColor = isContact 
        ? `rgba(254, 243, 199, ${Math.min(state.tearIntensity / 50, 0.9)})`
        : `rgba(209, 250, 229, ${Math.min(state.tearIntensity / 50, 0.9)})`;

      // Track cursor position with stiff, high-performance tracking
      state.x += (state.targetX - state.x) * 0.15;
      state.y += (state.targetY - state.y) * 0.15;
      
      // Decay the space tear energy so it snaps back like elastic
      state.tearIntensity *= 0.92;
      state.vx *= 0.9;
      state.vy *= 0.9;

      const tearRadius = 180;

      // Loop over grid points to simulate spatial warping
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 12) {
          let drawX = x;
          let drawY = y;

          if (state.x > 0 && state.y > 0) {
            const dx = x - state.x;
            const dy = y - state.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < tearRadius) {
              // Gravitational pull factor: intense close to the center, dropping off sharply
              const falloff = Math.pow((tearRadius - dist) / tearRadius, 2.5);
              
              // 1. Spatial Pinch: Pull universe coordinates tight along the tear vector
              drawX -= state.vx * falloff * 8;
              drawY -= state.vy * falloff * 8;

              // 2. Gravitational Shockwave Refraction
              // Creates a distinct "lens ring" distortion edge that looks like cracked atmospheric glass
              const shockwaveRing = Math.sin(dist * 0.08 - state.tearIntensity * 0.05);
              if (dist > 30) {
                drawX += (dx / dist) * shockwaveRing * (state.tearIntensity * 0.3) * falloff;
                drawY += (dy / dist) * shockwaveRing * (state.tearIntensity * 0.3) * falloff;
              }
            }
          }

          if (y === 0) ctx.moveTo(drawX, drawY);
          else ctx.lineTo(drawX, drawY);
        }

        // Draw structural line coordinates
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Horizontal Lines (Drawn second to form the full spatial intersection mesh)
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 12) {
          let drawX = x;
          let drawY = y;

          if (state.x > 0 && state.y > 0) {
            const dx = x - state.x;
            const dy = y - state.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < tearRadius) {
              const falloff = Math.pow((tearRadius - dist) / tearRadius, 2.5);
              
              drawX -= state.vx * falloff * 8;
              drawY -= state.vy * falloff * 8;

              const shockwaveRing = Math.sin(dist * 0.08 - state.tearIntensity * 0.05);
              if (dist > 30) {
                drawX += (dx / dist) * shockwaveRing * (state.tearIntensity * 0.3) * falloff;
                drawY += (dy / dist) * shockwaveRing * (state.tearIntensity * 0.3) * falloff;
              }
            }
          }

          if (x === 0) ctx.moveTo(drawX, drawY);
          else ctx.lineTo(drawX, drawY);
        }
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Render the actual glowing "Space Tear Rift Line" along the velocity path
      if (state.x > 0 && state.y > 0 && state.tearIntensity > 5) {
        ctx.save();
        ctx.shadowBlur = 25;
        ctx.shadowColor = shadowColor; // Dynamic Emerald/Gold Core Discharge
        
        // Draw a sharp vector line representing the cut through the grid
        ctx.beginPath();
        ctx.moveTo(state.x, state.y);
        ctx.lineTo(state.x - state.vx * 4, state.y - state.vy * 4);
        ctx.strokeStyle = coreStrokeColor;
        ctx.lineWidth = Math.min(state.tearIntensity * 0.08, 4);
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();

        // Chromatic distortion overlay halo centered on the rip
        const singularityGlow = ctx.createRadialGradient(state.x, state.y, 2, state.x, state.y, tearRadius * 0.6);
        if (isContact) {
          singularityGlow.addColorStop(0, 'rgba(120, 53, 4, 0.15)'); // Deep amber glow
          singularityGlow.addColorStop(0.2, 'rgba(245, 158, 11, 0.04)');
          singularityGlow.addColorStop(0.6, 'rgba(245, 158, 11, 0.01)');
        } else {
          singularityGlow.addColorStop(0, 'rgba(6, 78, 59, 0.15)'); // Original emerald green glow
          singularityGlow.addColorStop(0.2, 'rgba(16, 185, 129, 0.04)');
          singularityGlow.addColorStop(0.6, 'rgba(16, 185, 129, 0.01)');
        }
        singularityGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = singularityGlow;
        ctx.beginPath();
        ctx.arc(state.x, state.y, tearRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
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