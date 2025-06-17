import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    //Dispatch shorthand.
    const dispatch = useDispatch();
    //Gets Cart from state.
    const cart = useSelector(state => state.cart.items);
    const [totalAmount, setTotalAmount] = useState(0);
    //Calculate total price of all products in the Cart by summing products of each item's quantity and cost.
    const calculateTotalAmount = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity*parseFloat(item.cost.substring(1));
        });
        return total;
    };
    //Handles Continue Shopping button.
    const handleContinueShopping = (e) => {
        onContinueShopping(e)
    };
    //Handles Checkout button.
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };
    //Handles increment item's quantity in Cart with dispatch to CartSlice.
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };
    //Handles decrement of item's quantity in Cart with dispatch to CartSlice.
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else if (item.quantity <= 1) {
            dispatch(removeItem(item.name));
        }
    };
    //Handles removal of item from Cart with dispatch to CartSlice.
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };
    // Calculate total cost based on quantity for an item.
    const calculateTotalCost = (item) => {
        return item.quantity * parseFloat(item.cost.substring(1));
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
