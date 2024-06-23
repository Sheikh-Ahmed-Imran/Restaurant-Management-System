import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const subcategories = {
  Pizza: ['Vegetarian', 'Tandoori', 'BBQ ','Cheese'],
  Pastas: ['Vegetarian', 'Non-Vegetarian'],
  IceCream: ['Mango', 'Chocolate', 'Toti Faroti','Vanilla'],
  // Rice: ['Fried Rice', 'Steamed Rice'],
  BarBQ: ['Chicken', 'Beef'],
  ColdDrinks: ['Soda', 'Juice', 'Water'],
  Burger: ['Zinger', 'Chicken','Fried Chicken','Zinger Cheese',],
  Karahi: ['Chicken Karahi', 'Mutton Karahi']
};

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pizza', // Default category
    subcategory: 'Small', // Default subcategory
    cookTime: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('subcategory', data.subcategory);
    formData.append('cookTime', Number(data.cookTime));
    formData.append('image', image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: 'Pizza', // Reset to default category
        subcategory: 'Small', // Reset to default subcategory
        cookTime: ''
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img className='image' src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select className='selectt' onChange={onChangeHandler} name='category'>
              {Object.keys(subcategories).map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='add-subcategory flex-col'>
            <p>Product Subcategory</p>
            <select className='selectt' onChange={onChangeHandler} name='subcategory'>
              {subcategories[data.category].map((sub, index) => (     
                <option key={index} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input className='inputclasa' onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='pkr...' />
          </div>
        </div>
        <div className='add-cooktime flex-col'>
          <p>Cook Time (minutes)</p>
          <input className='inputclasa' onChange={onChangeHandler} value={data.cookTime} type='number' name='cookTime' placeholder='e.g., 30' required />
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
