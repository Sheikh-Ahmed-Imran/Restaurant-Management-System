import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const NewComponent = ({ c }) => {
    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
    const [selectedOptions, setSelectedOptions] = useState({});

    // Update selectedOptions initially when cartItems change
    useEffect(() => {
        const initialOptions = {};
        food_list.forEach(item => {
            if (cartItems[item._id] > 0) {
                initialOptions[item._id] = getOptions(item.subcategory)[0]; // Select first option initially
            }
        });
        setSelectedOptions(initialOptions);
    }, [cartItems, food_list]);

    const getPriceForOption = (item, option) => {
        switch (option) {
            case 'F1':
                return 350; // Example price for A1 in your currency
            case 'F2':
                return 500 // Example price for A2 in your currency
            case 'Large':
                return 1200 // Example price for B1 in your currency
            case 'Medium':
                return 700 
            case 'Small':
                return 300
            case '2 Scoop':
                    return 100
            case '3 Scoop':
                    return 150
            
            case '4 Scoop':
                    return 200
            case 'zinger':
                    return 350
            case 'cheese':
                     return 300
            case 'chicken':
                    return 200
            case '50rp':
                     return 50
            case '100rp':
                    return 100
            case '1l':
                    return 150
            case '1.5l':
                    return 200
            case '2l':
                    return 250;
            case 'smallf':
                    return 150;
            case 'mediumf':
                    return 250;
            case 'largef':
                    return 400;
            case 'chickenshwarma':
                    return 200;
            case 'zingershwarma':
                     return 300;
            case 'zingercheeseshwarma':
                     return 350;
            default:
                return 0; // Default price if option is unknown
        }
    };

    const handleOptionChange = (event, itemId) => {
        const { value } = event.target;
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [itemId]: value,
        }));
    };

    const getOptions = (subcategory) => {
        switch (subcategory) {
            case 'pizza':
                return ['Large', 'Medium','Small'];
            case 'pasta':
                return ['F1', 'F2'];
            case 'icecream':
                return ['2 Scoop', '3 Scoop','4 Scoop'];
            case 'zingerburger':
                return ['zinger'];
            case 'cheeseburger':
                return ['cheese']
            case 'chickenburger':
                return ['chicken']
            case 'zingershwarma':
                 return ['zingershwarma'];
            case 'chickenshwarma':
                 return ['cheeseshwarma']
            case 'zingercheeseshwarma':
                return ['zingercheeseshwarma']
            case 'extras':
                return ['50rs','100rs']
            case 'coldrinks':
                    return ['1l','1.5l','2l']
            case 'fries':
                    return ['smallf','mediumf','largef']
            
        
                
            default:
                return [];
        }
    };

    return (
        <div className='new-component'>
            <h3>User Added Items</h3>
            {food_list.length > 0 ? (
                <ul className='cart-items-list'>
                    {food_list.map((item) => {
                        if (cartItems[item._id] > 0) {
                            const options = getOptions(item.subcategory);
                            const selectedOption = selectedOptions[item._id] || options[0]; // Default to the first option if not selected

                            return (
                                <React.Fragment key={item._id}>
                                    <li className='cart-items-item'>
                                        <p>Name : {item.name}</p>
                                        <select onChange={(e) => handleOptionChange(e, item._id)} value={selectedOption}>
                                            {options.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        <p>Price : {getPriceForOption(item, selectedOption)} pkr</p>
                                        <p>Quantity : {cartItems[item._id]}</p>
                                        <p>Total : {getPriceForOption(item, selectedOption) * cartItems[item._id]} pkr</p>
                                        <p onClick={() => removeFromCart(item._id)} className='cross'>Remove Item</p>
                                        <Link to='/cart'>Go to Cart</Link>
                                    </li>
                                    <hr />
                                </React.Fragment>
                            );
                        }

                        return null;
                    })}
                </ul>
            ) : (
                <p>No items added by the user.</p>
            )}
        </div>
    );
};

export default NewComponent;
