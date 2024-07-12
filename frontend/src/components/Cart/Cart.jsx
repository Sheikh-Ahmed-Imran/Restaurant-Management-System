import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const NewComponent = () => {
    const { cartItems, food_list, selectedOptions, setSelectedOptions, calculateTotalPrice } = useContext(StoreContext);

    useEffect(() => {
        const initialOptions = {};
        food_list.forEach(item => {
            if (cartItems[item._id] > 0) {
                initialOptions[item._id] = {
                    selectedSubcategories: [],
                    quantities: {},
                };
            }
        });
        setSelectedOptions(initialOptions);
    }, [cartItems, food_list]);

    const getPriceForOption = (subcategory) => {
        switch (subcategory) {
            case 'pizza':
                return { 'Large': 1200, 'Medium': 700, 'Small': 300 };
            case 'pasta':
                return { 'F1': 350, 'F2': 500 };
            case 'icecream':
                return { '2 Scoop': 100, '3 Scoop': 150, '4 Scoop': 200 };
            case 'zingerburger':
                return { 'zinger': 350 };
            case 'cheeseburger':
                return { 'cheese': 300 };
            case 'chickenburger':
                return { 'chicken': 200 };
            case 'zingershwarma':
                return { 'zingershwarma': 300 };
            case 'chickenshwarma':
                return { 'chickenshwarma': 200 };
            case 'zingercheeseshwarma':
                return { 'zingercheeseshwarma': 350 };
            case 'extras':
                return { '50rp': 50, '100rp': 100 };
            case 'coldrinks':
                return { '1l': 150, '1.5l': 200, '2l': 250 };
            case 'fries':
                return { 'smallf': 150, 'mediumf': 250, 'largef': 400 };
            default:
                return {};
        }
    };

    const handleCheckboxChange = (event, itemId, subcategory) => {
        const { checked } = event.target;
        setSelectedOptions(prevOptions => {
            const updatedSelectedOptions = {
                ...prevOptions,
                [itemId]: {
                    ...prevOptions[itemId],
                    selectedSubcategories: checked
                        ? [...prevOptions[itemId]?.selectedSubcategories, subcategory]
                        : prevOptions[itemId]?.selectedSubcategories.filter(sc => sc !== subcategory),
                },
            };
            return updatedSelectedOptions;
        });
    };

    const handleQuantityChange = (event, itemId, subcategory) => {
        const { value } = event.target;
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [itemId]: {
                ...prevOptions[itemId],
                quantities: {
                    ...prevOptions[itemId]?.quantities,
                    [subcategory]: parseInt(value) || 0,
                },
            },
        }));
    };

    return (
        <div className='new-component'>
            <h3>User Added Items</h3>
            {food_list.length > 0 ? (
                <ul className='cart-items-list'>
                    {food_list.map((item) => {
                        if (cartItems[item._id] > 0) {
                            const options = Object.keys(getPriceForOption(item.subcategory));
                            const { selectedSubcategories, quantities } = selectedOptions[item._id] || {
                                selectedSubcategories: [],
                                quantities: {},
                            };

                            return (
                                <React.Fragment key={item._id}>
                                    <li className='cart-items-item'>
                                        <p>Name : {item.name}</p>
                                        <div>
                                            {options.map((option, idx) => (
                                                <label key={idx}>
                                                    <input
                                                        type='checkbox'
                                                        checked={selectedSubcategories.includes(option)}
                                                        onChange={(e) => handleCheckboxChange(e, item._id, option)}
                                                    />
                                                    {option}
                                                    <input
                                                        type='number'
                                                        value={quantities[option] || 0}
                                                        onChange={(e) => handleQuantityChange(e, item._id, option)}
                                                        disabled={!selectedSubcategories.includes(option)}
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </li>
                                    <hr />
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </ul>
            ) : (
                <p>No items in the cart</p>
            )}
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Total Price</h2>
                    <div className='cart-total-details'>
                        <b>Total</b>
                        <b>{calculateTotalPrice()} pkr</b>
                    </div>
                    <Link to='/cart'>
                        <button>Proceed to Cart</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewComponent;
