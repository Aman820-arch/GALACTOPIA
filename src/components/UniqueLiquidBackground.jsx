import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function UniqueLiquidBackground() {
  const canvasRef = useRef(null);
  const location = useLocation();
  
  const isContactRef = useRef(location.pathname === '/contact');

  useEffect(() => {
    isContactRef.current = location.pathname === '/contact';
  }, [location.pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Keep particles light for high-performance rendering
    const particleCount = 60; 
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseRadius = Math.random() * 1.2 + 0.4;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.2; 
        this.vy = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.2 + 0.05; 
        this.currentAlpha = this.alpha;
      }

      update(mouseX, mouseY) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }

        if (mouseX > 0 && mouseY > 0) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 140;

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            this.x += (dx / dist) * force * 1.2;
            this.y += (dy / dist) * force * 1.2;
            this.currentAlpha = Math.min(this.alpha + force * 0.3, 0.6);
            this.radius = this.baseRadius + force * 0.6;
          } else {
            this.currentAlpha += (this.alpha - this.currentAlpha) * 0.05;
            this.radius += (this.baseRadius - this.radius) * 0.05;
          }
        } else {
          this.currentAlpha += (this.alpha - this.currentAlpha) * 0.05;
          this.radius += (this.baseRadius - this.radius) * 0.05;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.currentAlpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const render = () => {
      // 1. BASE SYSTEM LAYER (PITCH BLACK ABSOLUTE VOID)
      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, width, height);

      // 2. CINEMATIC VIGNETTE (CENTER STAGE GRADIENT)
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.max(width, height) * 0.8;

      const vignetteGradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, maxRadius
      );
      vignetteGradient.addColorStop(0, 'rgba(39, 39, 42, 0.22)'); // Soft zinc spotlight illumination
      vignetteGradient.addColorStop(0.5, 'rgba(4, 4, 7, 0.6)');    // Deep mid-step transition
      vignetteGradient.addColorStop(1, 'rgba(2, 2, 4, 0)');        // Fade smoothly into pure void
      
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, width, height);

      const isContact = isContactRef.current;
      const glowColorRGB = isContact ? '245, 158, 11' : '16, 185, 129';

      // 3. DRAW CURSOR METADATA BLOOM
      if (mouse.x > 0 && mouse.y > 0) {
        const pointerGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        pointerGlow.addColorStop(0, `rgba(${glowColorRGB}, 0.05)`);
        pointerGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = pointerGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. OVERLAY DRIFTING COSMIC PARTICLES
      particles.forEach((particle) => {
        particle.update(mouse.x, mouse.y);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}