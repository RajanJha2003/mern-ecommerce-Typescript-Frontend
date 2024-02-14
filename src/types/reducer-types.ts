import { CartItemType, User, shippingInfoType } from "./types";

export interface userReducerInitialState {
  loading: boolean;
  user: User | null;
}

export interface cartReducerInitialState {
  loading: boolean;
  cartItems: CartItemType[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: shippingInfoType;
}
