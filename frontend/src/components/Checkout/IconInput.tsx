import React from "react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ icon, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute -translate-y-2/4 flex items-center justify-center z-[1] left-3 top-2/4">
          {icon}
        </div>
        <input
          ref={ref}
          className={`w-full h-[42px] border border text-base bg-white pl-10 pr-4 py-0 rounded-lg border-solid ${className}`}
          {...props}
        />
      </div>
    );
  },
);

IconInput.displayName = "IconInput";
