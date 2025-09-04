import React from 'react';

const Pattern = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#0B1120] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-30">
        {/* Horizontal lines */}
        {Array.from({ length: 21 }).map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="col-span-full row-start-[var(--row)] row-end-[var(--row)] border-t border-[#2FFFD1]/20"
            style={{ '--row': i + 1 } as React.CSSProperties}
          />
        ))}
        
        {/* Vertical lines */}
        {Array.from({ length: 41 }).map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="row-span-full col-start-[var(--col)] col-end-[var(--col)] border-l border-[#2FFFD1]/20"
            style={{ '--col': i + 1 } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default Pattern;

