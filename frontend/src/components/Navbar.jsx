import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "./AuthSlice";
const NavbarItem = ({ children, href }) => {
  return (
    <Link className="text-white rounded-md text-xl" to={href}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  return (
    <div className="sticky top-0 z-10 w-full p-6 rounded-md  flex justify-between bg-primary">
      <NavbarItem href="/">
        {" "}
        <h1 className="text-3xl text-secondary">Hungry Stomachs</h1>{" "}
      </NavbarItem>
      <ul className="flex gap-4 justify-center items-center">
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/categories">Categories</NavbarItem>
        {user && <NavbarItem href="/cart">Cart</NavbarItem>}
        <NavbarItem href="/track">Track Order</NavbarItem>
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-secondary text-xl rounded-md hover:text-secondary-light"
            >
              Profile
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  to="/orders"
                  className=" text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Orders
                </Link>
                <button
                  onClick={() => {
                    dispatch(setUser(null));
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className=" w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavbarItem href="/login">Login</NavbarItem>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
