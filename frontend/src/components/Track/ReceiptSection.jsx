import React from "react";
import Print from "../Print/Print";

export const ReceiptSection = ({order}) => {
  return (
    <div className="w-full bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)] flex flex-col items-center gap-4 p-8 rounded-2xl">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdf9c0b1f4c04f5945f9e38a8b5b2045cc1a7fe6"
        alt="Receipt printing illustration"
        className="w-[128px] h-[128px]"
      />
      <div className="text-xs text-center">
        &quot;Your receipt is printing in the kitchen...&quot;
      </div>
      <Print order={order}/>
    </div>
  );
};
