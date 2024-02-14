import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeFromCart,
} from "../redux/reducer/cartReducer";
import { CartItemType } from "../types/types";
import CartItems from "./CartItems";
import axios from "axios";
import { RootState, server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, shippingCharges, discount, total } =
    useSelector((state: RootState) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidcouponCode, setisValidCouponCode] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/coupon/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setisValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch((err: Error) => {
          console.log(err);
          dispatch(discountApplied(0));
          setisValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      cancel();
      setisValidCouponCode(false);
    };
  }, [couponCode, dispatch]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  const incrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error("Max Stock Reached");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity <= 1) return toast.error("Min Stock Reached");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItems
              key={index}
              cartItem={item}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red">- ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />

        {couponCode &&
          (isValidcouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
