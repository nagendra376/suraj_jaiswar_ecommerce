import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  coupon: undefined,
  isCartOpen: false,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

const updateCartPricing = (state: CartReducerInitialState) => {
  const subtotal = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  state.subtotal = subtotal;
  state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
  state.tax = Math.round(state.subtotal * 0.18);
  state.total =
    state.subtotal + state.tax + state.shippingCharges - state.discount;
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else state.cartItems.push(action.payload);

      updateCartPricing(state);
      state.isCartOpen = true;
      state.loading = false;
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      updateCartPricing(state);
      state.loading = false;
    },

    openCart: (state) => {
      state.isCartOpen = true;
    },

    closeCart: (state) => {
      state.isCartOpen = false;
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    calculatePrice: (state) => {
      updateCartPricing(state);
    },

    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      updateCartPricing(state);
    },

    saveCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
  saveCoupon,
  openCart,
  closeCart,
  toggleCart,
} = cartReducer.actions;
