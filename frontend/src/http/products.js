import axios from "axios";

export const getProductsByCategoryId = async (categoryId) =>
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/products?categoryId=${categoryId}`
    )
    .then((res) => res.data.result);

export const getProductsById = async (id) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/${id}`)
    .then((res) => res.data.result);
};
