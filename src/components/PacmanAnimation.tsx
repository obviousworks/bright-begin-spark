
import React, { useEffect, useRef } from 'react';

const PacmanAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const dotSpacing = 30;
    const totalDots = Math.floor(containerWidth / dotSpacing);
    
    let animationId: number;

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

    // Animation loop for dots
    const animate = () => {
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
        {/* Dots Container */}
        <div className="dots-container absolute top-1/2 left-0 w-full transform -translate-y-1/2"></div>
      </div>

      {/* CSS Styles */}
      <style>
        {`
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
