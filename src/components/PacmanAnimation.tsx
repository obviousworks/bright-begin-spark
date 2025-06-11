
import React, { useEffect, useRef } from 'react';

const PacmanAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pacmanRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !pacmanRef.current) return;

    const container = containerRef.current;
    const pacman = pacmanRef.current;
    const containerWidth = container.offsetWidth;
    const pacmanWidth = 60;
    const dotSpacing = 30;
    const totalDots = Math.floor(containerWidth / dotSpacing);
    
    let pacmanX = -70;
    let direction = 1; // 1 for right, -1 for left
    let animationId: number;
    let eatenDots = new Set<number>();

    // Create dots
    const createDots = () => {
      const dotsContainer = container.querySelector('.dots-container') as HTMLElement;
      if (!dotsContainer) return;
      
      dotsContainer.innerHTML = '';
      dotsRef.current = [];
      
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'pacman-dot';
        dot.style.left = `${i * dotSpacing + 20}px`;
        dotsContainer.appendChild(dot);
        dotsRef.current.push(dot);
      }
    };

    // Check collision with dots
    const checkDotCollision = () => {
      const pacmanCenter = pacmanX + pacmanWidth / 2;
      
      dotsRef.current.forEach((dot, index) => {
        if (eatenDots.has(index)) return;
        
        const dotX = parseInt(dot.style.left);
        const distance = Math.abs(pacmanCenter - dotX);
        
        if (distance < 25) {
          dot.style.opacity = '0';
          dot.style.transform = 'scale(0)';
          eatenDots.add(index);
          
          // Respawn dot after delay
          setTimeout(() => {
            if (eatenDots.has(index)) {
              dot.style.opacity = '1';
              dot.style.transform = 'scale(1)';
              eatenDots.delete(index);
            }
          }, 2000 + Math.random() * 1000);
        }
      });
    };

    // Animation loop
    const animate = () => {
      // Move pacman
      pacmanX += direction * 2;
      
      // Check boundaries and turn around
      if (direction === 1 && pacmanX > containerWidth - pacmanWidth) {
        direction = -1;
        pacman.style.transform = 'scaleX(-1)';
      } else if (direction === -1 && pacmanX < -70) {
        direction = 1;
        pacman.style.transform = 'scaleX(1)';
      }
      
      pacman.style.left = `${pacmanX}px`;
      
      // Check dot collisions
      checkDotCollision();
      
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    createDots();
    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="absolute bottom-10 left-0 w-full hidden sm:block">
      <div ref={containerRef} className="relative w-full h-16 overflow-hidden">
        {/* Pacman */}
        <div 
          ref={pacmanRef}
          className="pacman-character"
        >
          <div className="pacman-top"></div>
          <div className="pacman-bottom"></div>
        </div>
        
        {/* Dots Container */}
        <div className="dots-container absolute top-1/2 left-0 w-full transform -translate-y-1/2"></div>
      </div>

      {/* CSS Styles */}
      <style>
        {`
        .pacman-character {
          position: absolute;
          top: 50%;
          left: -70px;
          width: 60px;
          height: 60px;
          transform: translateY(-50%);
          z-index: 10;
          transition: transform 0.3s ease;
        }

        .pacman-top {
          background-color: #fbbf24;
          height: 30px;
          width: 60px;
          border-radius: 30px 30px 0 0;
          animation: spin1 0.5s infinite linear;
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
        }

        .pacman-bottom {
          background-color: #fbbf24;
          height: 30px;
          width: 60px;
          border-radius: 0 0 30px 30px;
          animation: spin2 0.5s infinite linear;
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
        }

        .pacman-dot {
          position: absolute;
          top: 50%;
          width: 8px;
          height: 8px;
          background: #ffffff;
          border-radius: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          transition: opacity 0.3s ease, transform 0.3s ease;
          animation: dotGlow 2s ease-in-out infinite alternate;
        }

        .pacman-dot:nth-child(3n) {
          background: #06d6a0;
          box-shadow: 0 0 8px rgba(6, 214, 160, 0.6);
        }

        .pacman-dot:nth-child(4n) {
          background: #f72585;
          box-shadow: 0 0 8px rgba(247, 37, 133, 0.6);
        }

        .pacman-dot:nth-child(5n) {
          background: #fbbf24;
          box-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
        }

        /* Pacman mouth animations */
        @keyframes spin1 {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-35deg); }
        }

        @keyframes spin2 {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(35deg); }
        }

        @keyframes dotGlow {
          0% { 
            transform: translateY(-50%) scale(1);
            opacity: 0.8;
          }
          100% { 
            transform: translateY(-50%) scale(1.1);
            opacity: 1;
          }
        }
        `}
      </style>
    </div>
  );
};

export default PacmanAnimation;
