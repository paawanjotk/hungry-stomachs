import React from "react";
import { Link } from "react-router-dom";
const NavbarItem = ({ children, href }) => {
  return (
    <Link className="text-white rounded-md text-xl" to= {href}>
      {children}
    </Link>
  );
};
const Navbar = () => {
  return (
    <div className="p-4  flex justify-between bg-primary">
      
      <NavbarItem href = "/"> <h1 className="text-3xl text-secondary">Hungry Stomachs </h1> </NavbarItem>
      <ul className="flex gap-4 justify-center items-center">
        <NavbarItem href="/" >Home</NavbarItem>
        <NavbarItem href="/categories">Categories</NavbarItem>
        <NavbarItem href="/cart" >Cart</NavbarItem>
        <NavbarItem href="/track" >Track Order</NavbarItem>
      </ul>
    </div>
  );
};

export default Navbar;
