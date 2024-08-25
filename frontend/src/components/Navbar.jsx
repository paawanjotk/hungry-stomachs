// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { setUser } from "./AuthSlice";
// const NavbarItem = ({ children, href }) => {
//   return (
//     <Link className="text-white rounded-md text-xl" to={href}>
//       {children}
//     </Link>
//   );
// };

// const Navbar = () => {
//   let dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);


//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsDropdownOpen(false); // Close the dropdown if clicked outside
//     }
//   };
//   useEffect(() => {
//     if (isDropdownOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     // Clean up event listener on unmount
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isDropdownOpen]);
//   return (
//     <div className="sticky top-0 z-10 w-full p-6 rounded-md  flex justify-between bg-primary">
//       <NavbarItem href="/">
//         {" "}
//         <h1 className="text-3xl text-secondary">Hungry Stomachs</h1>{" "}
//       </NavbarItem>
//       <ul className="flex gap-4 justify-center items-center">
//         <NavbarItem href="/">Home</NavbarItem>
//         <NavbarItem href="/categories">Categories</NavbarItem>
//         <NavbarItem href="/cart">Cart</NavbarItem>
//         <NavbarItem href="/track">Track Order</NavbarItem>
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={toggleDropdown}
//               className="flex items-center text-secondary text-xl rounded-md hover:text-secondary-light"
//             >
//               Profile
//               <svg
//                 className="w-4 h-4 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 ></path>
//               </svg>
//             </button>
//             {isDropdownOpen && (
//               <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//                 <Link
//                   to="/profile"
//                   className=" text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Settings
//                 </Link>
//                 <Link
//                   to="/orders"
//                   className=" text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Your Orders
//                 </Link>
//                 <button
//                   onClick={() => {
//                     dispatch(setUser(null));
//                     localStorage.removeItem("token");
//                     window.location.href = "/";
//                   }}
//                   className=" w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <NavbarItem href="/login">Login</NavbarItem>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Navbar;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "./AuthSlice";

const NavbarItem = ({ children, href }) => {
  return (
    <Link className="text-white text-lg sm:text-xl hover:text-secondary-light transition" to={href}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="sticky top-0 z-10 w-full bg-primary p-4 md:px-6 flex items-center justify-between shadow-md">
      <div className="flex justify-between w-full md:w-auto">
        <NavbarItem href="/">
          <h1 className="text-2xl sm:text-3xl text-secondary">Hungry Stomachs</h1>
        </NavbarItem>
        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navbar Links */}
      <ul
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-4 items-center md:static absolute bg-primary w-full md:w-auto left-0 top-full md:top-0 md:bg-transparent p-4 md:p-0 transition duration-300`}
      >
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/categories">Categories</NavbarItem>
        <NavbarItem href="/cart">Cart</NavbarItem>
        <NavbarItem href="/track">Track Order</NavbarItem>
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-secondary text-lg sm:text-xl rounded-md hover:text-secondary-light transition"
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
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
              >
                <Link
                  to="/profile"
                  className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/orders"
                  className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Orders
                </Link>
                <button
                  onClick={() => {
                    dispatch(setUser(null));
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
