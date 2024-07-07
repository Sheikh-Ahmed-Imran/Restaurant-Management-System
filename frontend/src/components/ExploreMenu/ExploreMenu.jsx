import React, { useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';




const ExploreMenu = ({ category, setCategory }) => {
  const [subcategory, setSubcategory] = useState('All');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCategoryClick = (item) => {
    const newCategory = category === item.menu_name ? 'All' : item.menu_name;
    setCategory(newCategory);
    setSubcategory('All'); // Reset subcategory when category changes
    setDropdownVisible(true);
  };

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 className='h1e'>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div onClick={() => handleCategoryClick(item)} key={index} className='explore-menu-list-item'>
            <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
            <p className='item_menu'>{item.menu_name}</p>
          </div>
        ))}
      </div>
      
      <hr />
    </div>
  );
};

export default ExploreMenu;