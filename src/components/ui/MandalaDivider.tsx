import React from "react";

interface MandalaDividerProps {
  className?: string;
  withOm?: boolean;
}

export const MandalaDivider: React.FC<MandalaDividerProps> = ({ className = "", withOm = false }) => {
  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`}>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#C1662F]/40 to-[#7B2D26]/60" />
      {withOm ? (
        <span className="font-temple text-sm font-bold text-[#7B2D26]">ॐ</span>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C1662F] opacity-75"
        >
          {/* Subtle Lotus / Sacred Petal Vector */}
          <path
            d="M12 3C12 3 10.5 7 10.5 10C10.5 11.5 11.2 12.5 12 13C12.8 12.5 13.5 11.5 13.5 10C13.5 7 12 3 12 3Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M6.5 7.5C6.5 7.5 7.5 11 9.5 12.5C10.2 11.8 11 11.2 12 11C10.5 9 8 7.5 6.5 7.5Z"
            fill="currentColor"
            opacity="0.65"
          />
          <path
            d="M17.5 7.5C17.5 7.5 16.5 11 14.5 12.5C13.8 11.8 13 11.2 12 11C13.5 9 16 7.5 17.5 7.5Z"
            fill="currentColor"
            opacity="0.65"
          />
          <circle cx="12" cy="15" r="1.5" fill="#E8A33D" />
          <path
            d="M5 17C8.5 16 15.5 16 19 17"
            stroke="#7B2D26"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#C1662F]/40 to-[#7B2D26]/60" />
    </div>
  );
};
