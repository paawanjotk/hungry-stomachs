

export const getLocalCart = () => {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
};

export const setLocalCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
export const getLocalToken = () => {
  return localStorage.getItem("token");
}
export const setLocalToken = (token) => {
  if(token) {
    localStorage.setItem("token", token);
  }
  else localStorage.removeItem("token");
}