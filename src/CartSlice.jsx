import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], //Initialize items as an empty array.
    },
    reducers: {
        //Adds item to Cart.
        addItem: (state, action) => {
            //Destructures product details from action payload.
            const { name, image, cost } = action.payload;
            //If item is found in current Cart's state array 'items', up its quantity by 1.
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                //Adds item to Cart's current state.
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },
        //Removes item from Cart.
        removeItem: (state, action) => {
            //Finds item in Cart's state and filters it out.
            state.items = state.items.filter(item => item.name !== action.payload);
        },
        //Updates quantity of item in Cart.
        updateQuantity: (state, action) => {
            //Destructures product details from action payload.
            const { name, quantity } = action.payload;
            //Finds item in Cart's state and updates item's quantity with new quantity from action payload.
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
