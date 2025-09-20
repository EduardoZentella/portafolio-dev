// src/components/CustomCursor.tsx
import { useCustomCursor } from '../hooks/useCustomCursor';

export const CustomCursor = () => {
  const { x, y, isHovering } = useCustomCursor();

  return (
    <div 
      className={`hidden md:block rounded-full fixed pointer-events-none z-[9999] will-change-transform custom-cursor ${
        isHovering 
          ? 'w-8 h-8 border-2 border-gray-600 bg-gray-600 bg-opacity-10' 
          : 'w-6 h-6 border border-gray-400'
      }`}
      style={{ 
        transform: `translate3d(${x - (isHovering ? 16 : 12)}px, ${y - (isHovering ? 16 : 12)}px, 0)`,
        transition: isHovering ? 'width 0.1s ease, height 0.1s ease, border-width 0.1s ease' : 'none'
      }}
    />
  );
};