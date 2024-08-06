import axios from "axios";

export const getCategories = async () =>
  axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`)
    .then((res) => res.data.result);
