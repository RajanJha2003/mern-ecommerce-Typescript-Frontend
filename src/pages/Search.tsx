import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { CartItemType, CustomError } from "../types/types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const Search = () => {
  const {
    isLoading,
    isError,
    error,
    data: categoryResponse,
  } = useCategoriesQuery("");

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedProducts,
    isError: isproductError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    price: maxPrice,
    page,
  });

  const addToCartHandler = (cartItems: CartItemType) => {
    if (cartItems.stock < 1) return toast.error("Out of Stock");
    else {
      dispatch(addToCart(cartItems));
      return toast.success("Added to Cart");
    }
  };

  const isNextPage = page < 4;
  const isPrevPage = page > 1;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if (isproductError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {isLoading === false &&
              categoryResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="productList">
            {productLoading === false &&
              searchedProducts?.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              ))}
          </div>
        )}
        {searchedProducts && searchedProducts.totalPage > 1 && (
          <article>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={!isPrevPage}
            >
              Prev
            </button>
            <span>
              {page} of {searchedProducts.totalPage}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!isNextPage}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
