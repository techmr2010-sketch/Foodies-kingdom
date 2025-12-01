'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

const AvatarLogo = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Main circle with border */}
    <circle cx="60" cy="60" r="58" fill="#E9D5FF" stroke="#8B5CF6" strokeWidth="4" />

    {/* Face */}
    <circle cx="60" cy="65" r="30" fill="#F3E8FF" />

    {/* Hair */}
    <path
      d="M35,60
         Q50,40 85,60
         A30,30 0 0,0 85,60
         L80,50
         Q60,30 40,50 Z"
      fill="#2d2d2d"
    />

    {/* Glasses */}
    <circle cx="45" cy="65" r="10" stroke="#2d2d2d" strokeWidth="3" fill="none" />
    <circle cx="75" cy="65" r="10" stroke="#2d2d2d" strokeWidth="3" fill="none" />
    <line x1="55" y1="65" x2="65" y2="65" stroke="#2d2d2d" strokeWidth="3" />
    
    {/* Eyes inside glasses */}
    <circle cx="45" cy="65" r="2" fill="#2d2d2d" />
    <circle cx="75" cy="65" r="2" fill="#2d2d2d" />

    {/* Smile */}
    <path
      d="M50 80 Q60 90 70 80"
      stroke="#2d2d2d"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);


export default function HelplineFab() {
  const fabRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Start in bottom right corner
    setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (fabRef.current) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - fabRef.current.getBoundingClientRect().left,
        y: e.clientY - fabRef.current.getBoundingClientRect().top,
      });
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (fabRef.current) {
        setIsDragging(true);
        const touch = e.touches[0];
        setOffset({
            x: touch.clientX - fabRef.current.getBoundingClientRect().left,
            y: touch.clientY - fabRef.current.getBoundingClientRect().top,
        });
    }
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };
  
  const handleTouchMove = (e: globalThis.TouchEvent) => {
    if (isDragging) {
        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - offset.x,
            y: touch.clientY - offset.y,
        });
    }
  };


  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={fabRef}
      className="fixed z-50 rounded-full cursor-grab active:cursor-grabbing shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '64px',
        height: '64px',
        touchAction: 'none', // Prevent scrolling on mobile while dragging
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <AvatarLogo />
    </div>
  );
}