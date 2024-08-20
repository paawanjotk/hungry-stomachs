import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductsById } from "../http/products";
import ProductCartButtons from "../components/ProductCartButtons";
import { createOrder } from "../http/orders";
import { setLocalCart } from "../storage";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);

  const [fetchedItems, setFetchedItems] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [currTotal, setCurrTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
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
      const cart = { items: cartItems, address, ph: phone };
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
    console.log("Form submitted");
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
    <div className=" flex p-4 ">
      <div className="flex flex-col gap-5 w-full items-center">
        <h1 className="text-4xl">Your Cart</h1>
        <div className="flex justify-between w-[80vw]">
          <div className="flex flex-col gap-5 p-8">
            {fetchedItems.map((item, idx) => (
              <div className="flex gap-5 bg-secondary text-darkBrand p-4 rounded-lg border-2 border-black">
                <div className="relative w-[150px] rounded-lg bg-gray-200 overflow-hidden">
                  <img
                    src={item.imgUrl}
                    alt="chocolate"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-7 items-start">
                  <p className="  font-extrabold text-3xl">{item.name}</p>
                  <p className="  ">{item.description}</p>
                  <p className=" ">₹ {item.price}</p>
                </div>

                {cartItems[idx] && <ProductCartButtons _id={item._id} />}
                {cartItems[idx] && (
                  <p> Price: ₹{item.price * cartItems[idx].quantity} </p>
                )}
              </div>
            ))}
            <p>Your cart total: ₹ {currTotal}</p>
          </div>
          {cartItems.length > 0 && (
            <div className="flex flex-col gap-5">
              <h1 className="text-black  text-4xl font-bold"> Checkout </h1>
              <form
                className="flex flex-col border-2 p-8 text-white rounded-md text-xl gap-4 bg-darkBrand"
                onSubmit={onSubmit}
              >
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
                <button
                  type="submit"
                  className="bg-darkBrand p-2  text-white rounded-lg"
                  disabled={isSubmitLoading}
                >
                  Confirm
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
