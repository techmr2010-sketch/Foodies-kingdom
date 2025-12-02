
'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { useRouter } from 'next/navigation';

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
         Q50,45 85,60
         A30,30 0 0,0 85,60
         L80,55
         Q60,35 40,55 Z"
      fill="#2d2d2d"
    />

    {/* Chef's Hat */}
    <g>
      {/* Hat Band */}
      <rect x="35" y="45" width="50" height="10" fill="white" stroke="#ccc" strokeWidth="1" />
      {/* Hat Top */}
      <path d="M 35 45 
               Q 30 25, 45 25 
               T 60 25 
               T 75 25
               Q 90 25, 85 45 Z" fill="white" stroke="#ccc" strokeWidth="1"/>
    </g>

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
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [wasDragged, setWasDragged] = useState(false);

  useEffect(() => {
    // Start in bottom right corner, adjusted for smaller size
    setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 150 });
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (fabRef.current) {
        setIsDragging(true);
        setWasDragged(false);
        setOffset({
            x: clientX - fabRef.current.getBoundingClientRect().left,
            y: clientY - fabRef.current.getBoundingClientRect().top,
        });
    }
  };

  const handleDragMove = (clientX: number, clientY: number) => {
     if (isDragging) {
      setWasDragged(true);
      setPosition({
        x: clientX - offset.x,
        y: clientY - offset.y,
      });
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false);
    // Use setTimeout to distinguish between drag and click
    setTimeout(() => {
      if (!wasDragged) {
        router.push('/recipe-finder');
      }
    }, 0);
  };
  
  // Mouse events
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => handleDragStart(e.clientX, e.clientY);
  const onMouseMove = (e: globalThis.MouseEvent) => handleDragMove(e.clientX, e.clientY);
  const onMouseUp = () => handleDragEnd();

  // Touch events
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: globalThis.TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => handleDragEnd();

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, offset]);


  return (
    <div
      ref={fabRef}
      className="fixed z-50 rounded-full cursor-grab active:cursor-grabbing shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '64px', // Reduced size
        height: '64px', // Reduced size
        touchAction: 'none', // Prevent scrolling on mobile while dragging
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onDragStart={(e) => e.preventDefault()}
    >
      <AvatarLogo />
    </div>
  );
}

