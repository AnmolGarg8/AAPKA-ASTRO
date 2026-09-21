import React from "react";

interface DiyaIconProps {
  className?: string;
  size?: number;
}

export const DiyaIcon: React.FC<DiyaIconProps> = ({ className = "text-[#E8A33D]", size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flame */}
      <path
        d="M12 2C12 2 9.5 6 9.5 8.5C9.5 10 10.5 11 12 11C13.5 11 14.5 10 14.5 8.5C14.5 6 12 2 12 2Z"
        fill="#E8A33D"
      />
      <circle cx="12" cy="8" r="1" fill="#FFF" opacity="0.8" />
      {/* Diya Clay Bowl */}
      <path
        d="M4 14C4 18 7.5 21 12 21C16.5 21 20 18 20 14H4Z"
        fill="#C1662F"
      />
      {/* Lip rim */}
      <path
        d="M3 13.5C3 13.5 7.5 15 12 15C16.5 15 21 13.5 21 13.5C21 13.5 16.5 12.5 12 12.5C7.5 12.5 3 13.5 3 13.5Z"
        fill="#7B2D26"
      />
    </svg>
  );
};
