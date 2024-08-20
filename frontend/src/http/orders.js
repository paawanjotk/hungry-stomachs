import axios from "axios";

export const createOrder = async (order, token) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.result);
};

export const getOrders = async () => {
  const token= localStorage.getItem("token")
  return axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.result);
};
export const getOrderById = async (orderId) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/${orderId}`)
    .then((res) => res.data.result);
};
