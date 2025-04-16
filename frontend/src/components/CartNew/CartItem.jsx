import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export const CartItem = ({
  image,
  name,
  description,
  prices,
  selectedSubcategory,
  initialQuantity = 1,
  onQuantityChange,
  onRemove, // Function passed from parent
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isLoading, setIsLoading] = useState(true);
  

  // Wait for the necessary data to load
  useEffect(() => {
    if (image) {
      setIsLoading(false);
    }
  }, [image]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const currentPrice = prices?.[selectedSubcategory] || 0;
  const total = currentPrice * quantity;

  return (
    <div className="bg-white border border-orange-100 p-[17px] rounded-xl w-full">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <img
          src={image}
          alt={name}
          className="w-[96px] h-[96px] rounded-[8px] object-cover"
        />
        <div className="flex-1 w-full">
          <h3 className="text-lg font-bold text-black">{name}</h3>
          <p className="text-base text-gray-500">{description}</p>
          <p className="text-sm text-gray-400 mt-1 italic">
            {selectedSubcategory}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-2">
            <div className="flex items-center bg-gray-100 gap-3 p-1 rounded-full w-full sm:w-auto">
             
              <span className="text-base p-2">{quantity?quantity:'Expired Remove it from cart'}</span>
            
            </div>
            <p className="text-gray-600 text-sm">{quantity?quantity:''} x {prices?.[selectedSubcategory]}</p>
            <div className="text-lg font-bold text-orange-500">
              Rs: {quantity?quantity * prices?.[selectedSubcategory]:'No Total'}
            </div>
          </div>
        </div>
        <button
          className="mt-2 p-2 rounded-full hover:bg-gray-100"
          onClick={onRemove} // This will call the remove function passed as a prop
          aria-label="Remove item"
        >
          <Trash2 className="w-[18px] h-[20px] text-gray-400" />
        </button>
      </div>
    </div>
  );
};
