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

    // Create particle array
    const particleCount = 75; // Kept light for high-performance rendering
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
        // Randomize initial positions across the full viewport canvas
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseRadius = Math.random() * 1.5 + 0.5;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.3; // Very slow natural drift
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.3 + 0.1; // Faint, subtle ambient opacity
        this.currentAlpha = this.alpha;
      }

      update(mouseX, mouseY) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries smoothly
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }

        // Gentle interactive mouse push field
        if (mouseX > 0 && mouseY > 0) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 140;

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            // Push particles out gently along the distance vector
            this.x += (dx / dist) * force * 1.2;
            this.y += (dy / dist) * force * 1.2;
            // Temporarily illuminate particles near the cursor
            this.currentAlpha = Math.min(this.alpha + force * 0.4, 0.7);
            this.radius = this.baseRadius + force * 0.8;
          } else {
            // Smoothly decay back to native ambient values
            this.currentAlpha += (this.alpha - this.currentAlpha) * 0.05;
            this.radius += (this.baseRadius - this.radius) * 0.05;
          }
        } else {
          this.currentAlpha += (this.alpha - this.currentAlpha) * 0.05;
          this.radius += (this.baseRadius - this.radius) * 0.05;
        }
      }

      draw(colorRGB) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRGB}, ${this.currentAlpha})`;
        ctx.fill();
      }
    }

    // Initialize particle field
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
      // Create a solid deep background layer to prevent matrix grid remnants or bleeding
      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, width, height);

      const isContact = isContactRef.current;
      // Strict dynamic palette filtering: Amber/Gold for Contact, Premium Mint Green for default app
      const colorRGB = isContact ? '245, 158, 11' : '16, 185, 129';

      // Update and draw the particle array loop
      particles.forEach((particle) => {
        particle.update(mouse.x, mouse.y);
        particle.draw(colorRGB);
      });

      // Ambient radial magnetic pointer bloom
      if (mouse.x > 0 && mouse.y > 0) {
        const pointerGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
        pointerGlow.addColorStop(0, `rgba(${colorRGB}, 0.06)`);
        pointerGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = pointerGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
      }

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