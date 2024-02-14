import { ShippingInfoType } from "../../../ecommerce-backend/src/types/user";

export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Products = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};

export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductRequest = {
  productid: string;
  userid: string;
  formData: FormData;
};

export type DeleteProductRequest = {
  productid: string;
  userid: string;
};

export type CustomError = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type shippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItemType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItemType = Omit<CartItemType, "stock"> & { _id: string };

export type OrderType = {
  orderItems: OrderItemType[];
  shippingInfo: ShippingInfoType;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountType = {
  totalRevenue: number;
  productCount: number;
  userCount: number;
  ordersCount: number;
};

type ChangePercentType = {
  revenue: number;
  products: number;
  users: number;
  orders: number;
};

type LatestOrderTransactionType = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

type GenderRatioType = {
  male: number;
  female: number;
};

export type StatsType = {
  categoryCount: Record<string, number>[];
  changePercent: ChangePercentType;
  count: CountType;
  latestTransaction: LatestOrderTransactionType[];
  chart: {
    order: number[];
    revenue: number[];
  };
  genderRatio: GenderRatioType;
};

export type PieType = {
  orderFulfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  productCategories: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  adminCustomers: {
    adminUsers: number;
    customerUsers: number;
  };
  usersAgeGroup: {
    teen: number;
    adult: number;
    old: number;
  };
};

export type BarType = {
  products: number[];
  users: number[];
  orders: number[];
};

export type LineType = {
  products: number[];
  users: number[];
  discount: number[];
  revenue: number[];
};
