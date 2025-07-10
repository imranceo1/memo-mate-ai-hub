
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-primary/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-accent/10 rotate-12 animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-3/4 w-4 h-4 border border-primary/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      
      {/* Circuit-like Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 10h20v20h20v20h20" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.3"/>
            <circle cx="30" cy="30" r="2" fill="hsl(var(--primary))" opacity="0.5"/>
            <circle cx="50" cy="50" r="1.5" fill="hsl(var(--accent))" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
};

export default React.memo(AnimatedBackground);
