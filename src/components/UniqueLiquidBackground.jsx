import React, { useEffect, useRef } from 'react';

export default function UniqueLiquidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Using a slightly lower resolution buffer for organic pixel bleeding/blending
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2, speed: 0 };
    let lastMouseX = mouse.x;
    let lastMouseY = mouse.y;

    // Custom configuration parameters for liquid blobs
    const blobCount = 14;
    const blobs = [];

    // Instantiate custom fluid droplets with unique sine-wave speeds and weights
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 90 + 70,
        baseRadius: Math.random() * 90 + 70,
        seed: Math.random() * 100,
      });
    }

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // The Main Liquid Matrix Render Step
    const loop = () => {
      // Clear the canvas buffer cleanly
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, width, height);

      // Track cursor speed to calculate dynamic fluid displacement force
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      
      const dx = mouse.x - lastMouseX;
      const dy = mouse.y - lastMouseY;
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.4, 45);
      
      lastMouseX = mouse.x;
      lastMouseY = mouse.y;

      // Update and draw glowing metaball elements
      blobs.forEach((b, idx) => {
        // Natural wander calculations based on unique seeds
        b.seed += 0.003;
        b.vx += Math.sin(b.seed * 2) * 0.04;
        b.vy += Math.cos(b.seed * 1.5) * 0.04;

        // Apply mouse drag displacement if the cursor gets close
        const mdx = mouse.x - b.x;
        const mdy = mouse.y - b.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mDist < 280) {
          const approachForce = (280 - mDist) / 280;
          // Twist blobs slightly outward based on cursor velocity
          b.vx += (mdx / mDist) * approachForce * 0.25;
          b.vy += (mdy / mDist) * approachForce * 0.25;
          
          // Pulse droplet scale dynamically with cursor speed
          b.radius = b.baseRadius + mouse.speed * 1.2;
        } else {
          // Gently scale back down to native rest weights
          b.radius += (b.baseRadius - b.radius) * 0.05;
        }

        // Limit maximum velocities for stable fluid properties
        b.vx = Math.max(Math.min(b.vx, 3), -3);
        b.vy = Math.max(Math.min(b.vy, 3), -3);

        b.x += b.vx;
        b.y += b.vy;

        // Wrap around screen boundaries smoothly
        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        // Draw individual soft lighting masks
        const glow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        
        // Custom color interpolation scheme: shifting from dark emerald to rich velvet greens
        if (idx % 2 === 0) {
          glow.addColorStop(0, 'rgba(16, 185, 129, 0.22)'); 
          glow.addColorStop(0.5, 'rgba(4, 120, 87, 0.08)');
        } else {
          glow.addColorStop(0, 'rgba(0, 255, 204, 0.18)');
          glow.addColorStop(0.5, 'rgba(13, 148, 136, 0.06)');
        }
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- UNIQUE LIQUID POST-PROCESSING EXTRACTION LAYER ---
      // This reads the drawn glow fields and clips alpha variables to create a distinct velvet look
      try {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          // If the lighting density passes our threshold value, clamp it to create clean edges
          if (alpha > 35) {
            data[i + 3] = Math.min(alpha * 1.8, 255); 
            // Subtly enrich color tones inside active liquid centers
            data[i + 1] = Math.min(data[i + 1] * 1.1, 255); // Green channel amplifier
          } else {
            data[i + 3] = alpha * 0.2; // Soft falloff mask outside fluid cores
          }
        }
        ctx.putImageData(imageData, 0, 0);
      } catch (e) {
        // Fallback catch to shield performance if local browser parameters restrict image data scraping
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* High-density tactical dot mesh stacked neatly on top of the custom canvas layer */}
      <div 
        className="absolute inset-0 opacity-[0.14] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '1.6rem 1.6rem'
        }}
      />
    </div>
  );
}