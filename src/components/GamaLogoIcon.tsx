import React from 'react';

interface GamaLogoIconProps {
  light?: boolean;
  className?: string;
}

export default function GamaLogoIcon({ light = false, className = '' }: GamaLogoIconProps) {
  // Use exact brand colors: Dark Green (#0f5237) and Gold (#ac875a)
  const greenColor = light ? '#FFFFFF' : '#0f5237';
  const goldColor = light ? '#FFFFFF' : '#ac875a';
  const opacity = light ? 0.9 : 1;

  return (
    <div className={`flex items-center ${className}`}>
      <svg
        id="Layer_1"
        viewBox="0 0 320 181.7"
        className="h-10 w-auto shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <g>
          {/* Green interlocking segment */}
          <path
            fill={greenColor}
            d="M30.91,138.87C49.62,104.59,95.51,17.63,104.77,0h-24.62C70.69,0,61.98,5.17,57.37,13.5L1.7,117.56l-.05.09c-2.77,5.22-2.01,11.63,1.91,16.04l38.41,43.31c2.65,2.99,6.44,4.7,10.42,4.7h100.43c10.33,0,19.81-5.76,24.62-14.97l54.12-101.53c1.06-1.99-.35-4.4-2.59-4.4h-6.34v-.05h-65.02c-6.69,0-12.9,3.49-16.44,9.23l-6.63,10.77h49.83c1.52,0,2.5,1.62,1.81,2.98l-27.88,55.28c-2.37,4.74-7.2,7.69-12.45,7.64l-110.76-.66c-3.62-.02-5.91-3.92-4.17-7.12"
          />
          {/* Gold interlocking segment */}
          <path
            fill={goldColor}
            d="M147.51,35.05c-5.25-.05-10.08,2.9-12.45,7.64l-27.89,55.28c-.69,1.37.3,2.99,1.81,2.99h49.83l-6.63,10.77c-3.55,5.74-9.75,9.23-16.45,9.23h-65.02v-.04h-6.34c-2.24,0-3.66-2.41-2.59-4.4L115.91,14.98c4.81-9.21,14.3-14.98,24.62-14.98h100.44c3.97,0,7.76,1.71,10.42,4.7l38.41,43.31c3.91,4.41,4.67,10.82,1.91,16.04l-.05.09-55.68,104.05c-4.61,8.34-13.32,13.5-22.78,13.5h-24.62c9.26-17.63,55.15-104.59,73.86-138.87,1.74-3.2-.55-7.1-4.17-7.12l-110.76-.66Z"
          />
        </g>
      </svg>
    </div>
  );
}
