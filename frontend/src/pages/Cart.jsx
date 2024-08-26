
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductsById } from "../http/products";
import ProductCartButtons from "../components/ProductCartButtons";
import { createOrder } from "../http/orders";
import { setLocalCart } from "../storage";
import { useNavigate } from "react-router-dom";
import { CgSmileSad } from "react-icons/cg";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);
  const [fetchedItems, setFetchedItems] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [currTotal, setCurrTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setAddress(user.address);
      setPhone(user.phone);
    }
  }, [user]);
  const calcTotal = () => {
    let total = 0;
    for (let i = 0; i < fetchedItems.length; i++) {
      if (cartItems[i] === undefined) continue;
      total += fetchedItems[i].price * cartItems[i].quantity;
    }
    return total;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitLoading) return;
    try {
      setIsSubmitLoading(true);
      const cart = { items: cartItems, address, phone, notes };
      const res = await createOrder(cart, localStorage.getItem("token"));
      alert("Order Id: " + res._id);
      setLocalCart([]);
      const newUrl = `/order-placed/${res._id}`;
      window.location.replace(newUrl);
    } catch (e) {
      alert("Error while placing the order");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedItems) {
      setCurrTotal(calcTotal());
    }
  }, [fetchedItems, cartItems]);

  useEffect(() => {
    (async () => {
      try {
        const items = await Promise.all(
          cartItems.map(async (item) => {
            return await getProductsById(item._id);
          })
        );
        setFetchedItems(items);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [cartItems.length]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (fetchedItems === undefined) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-8">
      <div className="flex flex-col gap-5 w-full items-center">
        <h1 className="text-4xl">Your Cart</h1>
        <div className="flex flex-col gap-5 w-full lg:w-[70%]">
          {fetchedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-5 bg-secondary text-darkBrand p-4 rounded-lg border-2 border-black"
            >
              <div className="relative w-full md:w-[150px] h-[150px] rounded-lg bg-gray-200 overflow-hidden">
                <img
                  src={item.imgUrl}
                  alt="chocolate"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 md:gap-4 items-start w-full">
                <p className="font-extrabold text-2xl md:text-3xl break-words">
                  {item.name}
                </p>
                <p className="text-sm md:text-base break-words max-w-full">
                  {item.description}
                </p>
                <p className="text-lg md:text-xl">₹ {item.price}</p>
                {cartItems[idx] && (
                  <p className="font-semibold">
                    Price: ₹{item.price * cartItems[idx].quantity}
                  </p>
                )}
              </div>
              {cartItems[idx] && (
                <div className="self-end md:self-center">
                  <ProductCartButtons _id={item._id} />
                </div>
              )}
            </div>
          ))}
          {cartItems.length === 0 && (
            <div className="flex flex-col justify-center items-center text-center w-full h-[300px] md:h-[500px]">
              <div className="flex justify-center items-center text-center gap-3">
                <p className="text-2xl md:text-3xl">Why is your cart so empty?</p>
                <CgSmileSad className="h-[100px] w-[100px] md:h-[200px] md:w-[200px]" />
              </div>
              <button
                className="bg-darkBrand p-2 text-lg md:text-2xl text-white rounded-lg"
                onClick={() => navigate("/categories")}
              >
                Shop Now
              </button>
            </div>
          )}
          <p className="text-xl md:text-2xl font-semibold">
            Your cart total: ₹ {currTotal}
          </p>
        </div>
      </div>
      {user && cartItems.length > 0 && (
        <div className="flex flex-col gap-5 w-full lg:w-[30%]">
          <h1 className="text-black text-3xl md:text-4xl font-bold">Checkout</h1>
          <form
            className="flex flex-col border-2 p-8 text-white rounded-md text-lg md:text-xl gap-4 bg-darkBrand"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="name">Name:</label>
              <input
                placeholder="John Doe"
                className="rounded-md p-2 text-black"
                value={user.name}
                type="text"
                id="name"
                name="name"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email:</label>
              <input
                className="rounded-md p-2 text-black"
                value={user.email}
                type="email"
                id="email"
                name="email"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address:</label>
              <input
                placeholder="In your heart"
                className="rounded-md p-2 text-black"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                id="address"
                name="address"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone:</label>
              <input
                placeholder="1234567890"
                className="rounded-md p-2 text-black"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="tel"
                id="phone"
                name="phone"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text">Any additional requests about your order:</label>
              <textarea
                className="rounded-md p-2 text-black"
                placeholder="Please pack it with extra care"
                id="text"
                name="text"
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-darkBrand p-2 text-white rounded-lg"
              disabled={isSubmitLoading}
            >
              Confirm
            </button>
          </form>
        </div>
      )}
      {!user && (
        <div className="flex flex-col gap-5 w-full lg:w-[30%]">
          <h1 className="text-black text-3xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-darkBrand text-lg md:text-xl">
            Please login to continue to checkout
          </p>
          <button
            className="bg-darkBrand p-2 text-white rounded-lg"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <p className="text-lg md:text-xl">Don't have an account?</p>
          <button
            className="bg-darkBrand p-2 text-white rounded-lg"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
