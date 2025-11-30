
import * as React from 'react';

export const FoodieKingdomLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    {...props}
  >
    <defs>
      <path
        id="circlePath"
        d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
      />
    </defs>
    <circle cx="50" cy="50" r="48" fill="#F4E8D1" stroke="#8A5A2B" strokeWidth="2" />
    <g fontSize="10" fontFamily="serif" fill="#5C3D1E">
      <text>
        <textPath xlinkHref="#circlePath" startOffset="50%" textAnchor="middle">
          DELHI FOODIE KINGDOM
        </textPath>
      </text>
    </g>
    <text
      x="50"
      y="55"
      textAnchor="middle"
      fontSize="28"
      fontFamily="serif"
      fontWeight="bold"
      fill="#8A5A2B"
    >
      F.K
    </text>
  </svg>
);
