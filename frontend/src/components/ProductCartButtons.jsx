import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "./CartSlice";

function ProductCartButtons({ _id }) {
  let dispatch = useDispatch();
  function increase() {
    dispatch(addProduct(_id));
  }
  function decrease() {
    dispatch(removeProduct(_id));
  }
  let quantity = useSelector((state) => {
    return (
      state.cart.products.find((product) => product._id === _id)?.quantity || 0
    );
  });
  if (quantity === 0) {
    return (
      <button
        className="bg-darkBrand text-white px-5 py-2 rounded-lg"
        onClick={increase}
      >
        Add to cart
      </button>
    );
  } else {
    return (
      <div className="flex gap-3 items-center">
        <button
          className="bg-darkBrand text-white px-5 py-2 rounded-lg"
          onClick={decrease}
        >
          -
        </button>
        <span className="text-black">{quantity}</span>
        <button
          className="bg-darkBrand text-white px-5 py-2 rounded-lg"
          onClick={increase}
        >
          +
        </button>
      </div>
    );
  }
}
export default ProductCartButtons;
