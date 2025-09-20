// src/hooks/useCustomCursor.ts
import { useState, useEffect, useCallback } from 'react';

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    
    // Check if hovering over interactive elements
    const target = e.target as HTMLElement;
    const isInteractive = target.tagName === 'A' || 
                        target.tagName === 'BUTTON' || 
                        !!target.closest('a') || 
                        !!target.closest('button') ||
                        target.style.cursor === 'pointer';
    
    setIsHovering(isInteractive);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [updateMousePosition]);

  return { ...position, isHovering };
};