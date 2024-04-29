import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

type HeaderPropsTypes = {
  user: User | null;
};

const Header = ({ user }: HeaderPropsTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out Successfully");
      setIsOpen((prev) => !prev);
    } catch (error) {
      toast.error("Logged Out Failed");
    }
  };

  return (
    <nav className="header">
      <img src="../assets/images/logo.png" alt="logo" height={10} width={10} />
      <Link to={"/"} onClick={() => setIsOpen(false)}>
        HOME
      </Link>
      <Link to={"/search"} onClick={() => setIsOpen(false)}>
        <FaSearch />
      </Link>
      <Link to={"/cart"} onClick={() => setIsOpen(false)}>
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user?.role === "admin" && (
                <Link to={"/admin/dashboard"} onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              )}
              <Link to="/orders" onClick={() => setIsOpen(false)}>
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"} onClick={() => setIsOpen(false)}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
