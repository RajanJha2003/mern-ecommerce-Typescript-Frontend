import { ShippingInfoType } from "./../../../ecommerce-backend/src/types/user";
import {
  BarType,
  CartItemType,
  LineType,
  OrderType,
  PieType,
  Products,
  StatsType,
  User,
} from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type allUsersResponse = {
  success: boolean;
  users: User[];
};

export type LatestProductReponse = {
  success: boolean;
  products: Products[];
};

export type ProductDetailResponse = {
  success: boolean;
  product: Products;
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchResponse = {
  success: boolean;
  products: Products[];
  totalPage: number;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfoType;
  orderItems: CartItemType[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminId: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type AllOrdersResponse = {
  success: boolean;
  order: OrderType[];
};

export type OrderDetailResponse = {
  success: boolean;
  order: OrderType;
};

export type StatsResponse = {
  success: boolean;
  stats: StatsType;
};

export type PieResponse = {
  success: boolean;
  charts: PieType;
};

export type BarResponse = {
  success: boolean;
  charts: BarType;
};

export type LineResponse = {
  success: boolean;
  charts: LineType;
};
