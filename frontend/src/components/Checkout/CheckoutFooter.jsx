import React from "react";

export const CheckoutFooter = () => {
  return (
    <footer className="flex justify-center bg-white px-4 py-6 border-t border-solid">
      <div className="max-w-screen-xl w-full flex justify-center">
        <div className="flex gap-6">
          <div className="w-8 h-[30px] opacity-50 text-xs text-[#999] bg-[#F0F0F0]">
            IMG 32×32
          </div>
          <div className="w-8 h-[30px] opacity-50 text-xs text-[#999] bg-[#F0F0F0]">
            IMG 32×32
          </div>
          <div className="w-8 h-[30px] opacity-50 text-xs text-[#999] bg-[#F0F0F0]">
            IMG 32×32
          </div>
        </div>
      </div>
    </footer>
  );
};