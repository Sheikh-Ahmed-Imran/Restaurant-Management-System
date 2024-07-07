import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const FoodItem = ({ id, name, price, description, image,c }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [finalPrice, setFinalPrice] = useState(price);
 // Assuming foodCategories is defined somewhere

  const handleAddToCart = () => {
      
      addToCart(id,c);
      if(c=='pizza'){
        console.log('its pizza')
      }
      else{
        console.log('not pizza'+c)
        
      }
    
  };

 



  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" /> {/* Use image directly from Cloudinary URL */}
        {!cartItems[id]
          ? <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
            <p className='cartitemsp'>{cartItems[id]}</p>
            <img onClick={handleAddToCart} src={assets.add_icon_green} alt='' />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className='namewe'>{name}</p>
          <img className='ratingstars' src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs {finalPrice}</p>
      </div>

     
    </div>
  );
};

export default FoodItem;
