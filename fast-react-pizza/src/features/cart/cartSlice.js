import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(
                (pizza) => pizza.pizzaId !== action.payload,
            );
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload,
            );
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload,
            );
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state) {
            state.cart = [];
        },
    },
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((acc, item) => item.totalPrice + acc, 0).toFixed(2);

export const getTotalCartItems = (state) =>
    state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getPizzaById = (id) => (state) =>
    state.cart.cart.find((pizza) => pizza.pizzaId === id) || 0;
