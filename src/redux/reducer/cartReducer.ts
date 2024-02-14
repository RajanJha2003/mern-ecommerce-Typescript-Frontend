import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { CartItemType, shippingInfoType } from "../../types/types";

const initialState: cartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

export const productReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.loading = true;
      const idx = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (idx !== -1) state.cartItems[idx] = action.payload;
      else state.cartItems.push(action.payload);
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      (state.loading = true),
        (state.cartItems = state.cartItems.filter(
          (i) => i.productId !== action.payload
        ));
      state.loading = false;
    },
    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<shippingInfoType>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = productReducer.actions;
