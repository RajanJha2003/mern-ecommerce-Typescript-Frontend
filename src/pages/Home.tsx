import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestproductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItemType } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestproductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItems: CartItemType) => {
    if (cartItems.stock < 1) return toast.error("Out of Stock");
    else {
      dispatch(addToCart(cartItems));
      return toast.success("Added to Cart");
    }
  };

  if (isError) {
    toast.error("Cannot Fetch the Products");
  }

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products?.map((i) => (
            <ProductCard
              key={i?._id}
              productId={i?._id}
              name={i?.name}
              price={i?.price}
              stock={i?.stock}
              handler={addToCartHandler}
              photo={i?.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
