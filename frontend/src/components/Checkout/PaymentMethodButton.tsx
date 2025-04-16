import React from "react";

interface PaymentMethodButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const PaymentMethodButton: React.FC<PaymentMethodButtonProps> = ({
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex-1 h-[58px] flex justify-center items-center border  bg-gray-100 rounded-lg border-solid hover:bg-gray-50 transition-colors"
    >
      {icon}
    </button>
  );
};
