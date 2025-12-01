
'use client';

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import type { MouseEvent, TouchEvent } from 'react';

export default function HelplineFab() {
  const { toast } = useToast();
  const fabRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
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

  const handleCall = () => {
    // Prevent triggering call when dragging ends
    if (isDragging) return;
    window.location.href = 'tel:9821073025';
    toast({
        title: "Calling Helpline",
        description: "Opening your phone's dialer..."
    })
  };

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    if (fabRef.current) {
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
    // Use a timeout to distinguish between a click and a drag-end
    setTimeout(() => {
        setIsDragging(false);
    }, 50);
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
    >
      <Button
        size="icon"
        className="rounded-full h-14 w-14 bg-gradient-to-br from-sky-400 to-emerald-400 hover:from-sky-500 hover:to-emerald-500 text-white shadow-lg"
        onClick={handleCall}
        aria-label="Call Helpline"
      >
        <Phone className="h-7 w-7" />
      </Button>
    </div>
  );
}
