import axios from "axios";

export const createOrder = async (order) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders`, order)
    .then((res) => res.data.result);
};
export const getOrderById = async (orderId) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/${orderId}`)
    .then((res) => res.data.result);
}