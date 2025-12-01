
'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import type { MouseEvent, TouchEvent } from 'react';
import { CeoAvatar } from "./ceo-avatar";

export default function HelplineFab() {
  const { toast } = useToast();
  const fabRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize position to bottom-right
     if (fabRef.current) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      setPosition({ 
        x: vw - fabRef.current.offsetWidth - 24, 
        y: vh - fabRef.current.offsetHeight - 80 
      });
    }
  }, []);

  const handleClick = () => {
    // Prevent triggering click if a drag happened
    if (hasDragged) {
        setHasDragged(false);
        return;
    }
    const whatsappUrl = `https://wa.me/9821073025`;
    window.open(whatsappUrl, '_blank');
    toast({
        title: "Opening WhatsApp",
        description: "Redirecting to chat with the CEO..."
    })
  };

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    if (fabRef.current) {
        setHasDragged(false);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const fabRect = fabRef.current.getBoundingClientRect();
        
        setOffset({
            x: clientX - fabRect.left,
            y: clientY - fabRect.top,
        });
        
        setIsDragging(true);
    }
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !fabRef.current) return;

    e.preventDefault();
    setHasDragged(true); // A move has occurred, so it's a drag

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    let newX = clientX - offset.x;
    let newY = clientY - offset.y;

    // Constrain within viewport
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const fabWidth = fabRef.current.offsetWidth;
    const fabHeight = fabRef.current.offsetHeight;

    newX = Math.max(0, Math.min(newX, vw - fabWidth));
    newY = Math.max(0, Math.min(newY, vh - fabHeight));
    
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => handleDragMove(e as unknown as MouseEvent);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e: globalThis.TouchEvent) => handleDragMove(e as unknown as TouchEvent);
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
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
      className="fixed z-50 cursor-grab active:cursor-grabbing"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        // Default position if JS is disabled
        bottom: '20px', 
        right: '16px',
        ... (position.x !== 0 && position.y !== 0 && { bottom: 'auto', right: 'auto' }) // Apply JS position only when set
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onClick={handleClick}
    >
      <div className="h-16 w-16" aria-label="Chat with CEO on WhatsApp">
        <CeoAvatar />
      </div>
    </div>
  );
}
