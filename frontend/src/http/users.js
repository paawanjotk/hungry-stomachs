import axios from "axios";

export const signupUser = async (user) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/sign-up`, user)
    .then((res) => res);
};

export const loginUser = async (user) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/sign-in`, user)
    .then((res) => res);
};
export const getUser = async (token) => {

  return axios
    .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/user`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => res.data);
};
export const updateUser = async (user) => {
  const token = localStorage.getItem("token");
  return axios
    .put(`${process.env.REACT_APP_BACKEND_BASE_URL}/user`, user, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => res.data);
}
