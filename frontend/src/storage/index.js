export const getLocalCart = () => {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
};

export const setLocalCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};