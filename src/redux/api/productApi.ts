import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoriesResponse,
  LatestProductReponse,
  MessageResponse,
  ProductDetailResponse,
  SearchResponse,
} from "../../types/api-types";
import {
  DeleteProductRequest,
  NewProductRequest,
  SearchProductsRequest,
  UpdateProductRequest,
} from "../../types/types";

export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_API}/api/v1/product`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestproducts: builder.query<LatestProductReponse, string>({
      query: () => "/latest",
      providesTags: ["product"],
    }),
    alladminproducts: builder.query<LatestProductReponse, string>({
      query: (id) => `/admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `/category`,
      providesTags: ["product"],
    }),
    searchProducts: builder.query<SearchResponse, SearchProductsRequest>({
      query: ({ price, page, category, search, sort }) => {
        let base = `/all?search=${search}&page=${page}`;

        if (price) {
          base = base + `&price=${price}`;
        }
        if (sort) {
          base = base + `&sort=${sort}`;
        }
        if (category) {
          base = base + `&category=${category}`;
        }

        return base;
      },
      providesTags: ["product"],
    }),
    productDetails: builder.query<ProductDetailResponse, string>({
      query: (id) => `/${id}`,
      providesTags: ["product"],
    }),
    newProducts: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ id, formData }) => ({
        url: `/new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProducts: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ userid, productid, formData }) => ({
        url: `/${productid}?id=${userid}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProducts: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userid, productid }) => ({
        url: `/${productid}?id=${userid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestproductsQuery,
  useAlladminproductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductsMutation,
  useProductDetailsQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
} = productApi;
