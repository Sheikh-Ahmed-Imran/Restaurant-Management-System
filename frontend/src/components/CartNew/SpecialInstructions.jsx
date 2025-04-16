import { useState } from "react";

const MAX_CHARS = 150;

export const SpecialInstructions = () => {
  const [instructions, setInstructions] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setInstructions(value);
    }
  };

  return (
    <div className="bg-white border border-orange-100 p-[17px] rounded-xl">
      <div className="text-base font-medium text-gray-700 mb-2">
        <span>Special Instructions</span>
        <span className="text-sm font-normal text-gray-400 ml-1">
          (Optional)
        </span>
      </div>
      <textarea
        value={instructions}
        onChange={handleChange}
        placeholder="Any special instructions for the kitchen?"
        className="w-full h-24 border border-gray-200 bg-gray-50 text-base text-gray-700 placeholder:text-[#ADAEBC] resize-none p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        maxLength={MAX_CHARS}
      />
      <div className="text-sm text-gray-400 text-right mt-1">
        {instructions.length}/{MAX_CHARS} characters
      </div>
    </div>
  );
};
