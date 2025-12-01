
import * as React from 'react';

export const CeoAvatar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="64"
    height="64"
    {...props}
  >
    {/* Outer circle (border) */}
    <circle cx="50" cy="50" r="48" fill="#E6E6FA" stroke="#8A2BE2" strokeWidth="3" />
    
    {/* Head */}
    <path d="M 35 85 C 25 55, 75 55, 65 85" fill="#F5DEB3" />
    
    {/* Hair */}
    <path 
      d="M 35 45 Q 30 30, 50 30 T 65 45 C 75 50, 70 60, 65 55 C 60 50, 40 50, 35 45 Z"
      fill="#2C2C2C"
    />
    
    {/* Glasses */}
    <circle cx="42" cy="58" r="8" fill="none" stroke="#2C2C2C" strokeWidth="2" />
    <circle cx="60" cy="58" r="8" fill="none" stroke="#2C2C2C" strokeWidth="2" />
    <path d="M 50 58 H 52" stroke="#2C2C2C" strokeWidth="2" />
    
    {/* Eyes */}
    <circle cx="42" cy="58" r="2" fill="#2C2C2C" />
    <circle cx="60" cy="58" r="2" fill="#2C2C2C" />
    
    {/* Eyebrows */}
    <path d="M 38 50 Q 42 48, 46 50" stroke="#2C2C2C" strokeWidth="2" fill="none" />
    <path d="M 56 50 Q 60 48, 64 50" stroke="#2C2C2C" strokeWidth="2" fill="none" />
    
    {/* Nose */}
    <path d="M 51 62 L 49 69 L 53 69 Z" fill="#D2B48C" />
    
    {/* Mouth */}
    <path d="M 45 75 Q 50 78, 55 75" stroke="#2C2C2C" strokeWidth="2" fill="none" />
    
    {/* Neck */}
    <rect x="45" y="83" width="10" height="5" fill="#F5DEB3" />
  </svg>
);
