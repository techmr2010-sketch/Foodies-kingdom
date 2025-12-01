
import * as React from 'react';

export const CeoAvatar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    {...props}
  >
    {/* Outer circle (border) */}
    <circle cx="50" cy="50" r="48" fill="#E6E6FA" stroke="#8A2BE2" strokeWidth="3" />
    
    {/* Head */}
    <path d="M 35 80 C 25 50, 75 50, 65 80" fill="#F5DEB3" />
    
    {/* Hair */}
    <path 
      d="M 35 45 Q 30 30, 50 30 T 68 40 C 75 45, 70 55, 65 50 C 60 45, 40 45, 35 45 Z"
      fill="#2C2C2C"
    />
     <path
      d="M 38 43 Q 45 35, 52 38 T 62 42"
      stroke="#4A4A4A"
      strokeWidth="2"
      fill="none"
    />
    
    {/* Glasses */}
    <circle cx="42" cy="55" r="7" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <circle cx="58" cy="55" r="7" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <path d="M 49 55 H 51" stroke="#2C2C2C" strokeWidth="1.5" />
    
    {/* Eyes */}
    <circle cx="42" cy="55" r="1.5" fill="#2C2C2C" />
    <circle cx="58" cy="55" r="1.5" fill="#2C2C2C" />
    
    {/* Eyebrows */}
    <path d="M 38 48 Q 42 46, 46 48" stroke="#2C2C2C" strokeWidth="1.5" fill="none" />
    <path d="M 54 48 Q 58 46, 62 48" stroke="#2C2C2C" strokeWidth="1.5" fill="none" />
    
    {/* Nose */}
    <path d="M 50 58 L 48 65 L 52 65 Z" fill="#D2B48C" />
    
    {/* Mouth */}
    <path d="M 45 70 Q 50 73, 55 70" stroke="#2C2C2C" strokeWidth="1.5" fill="none" />
    
    {/* Neck */}
    <rect x="45" y="78" width="10" height="7" fill="#F5DEB3" />
  </svg>
);
