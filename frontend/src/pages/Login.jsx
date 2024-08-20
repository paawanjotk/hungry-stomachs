import React, { useState } from "react";
import { loginUser } from "../http/users";
import { setLocalToken } from "../storage";
import { Link} from "react-router-dom";


const Login = () => {


  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  function goToHomePage() {
    window.location.href = '/'; // This triggers a full reload and navigates to "/"
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitLoading) return;
    setIsSubmitLoading(true);
    setError(null);
    try {
      const res = await loginUser({ email, password });
      if(res.data.success){
        setLocalToken(res.data.token);
        goToHomePage();
      } else{
        setError(res.data.message || "Login failed. Please try again.");
      }
    } catch (e) {
      if(e.response){
        setError(e.response.data.message || "Login failed. Please try again.");
      } else if(error.request){
        setError("No response from server. Please try again later.");
      } else{
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-black  text-4xl font-bold"> Login </h1>
      <form
        className="flex flex-col border-2 p-8 text-white rounded-md text-xl gap-4 bg-darkBrand"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="babygirl@gmail.com"
            className="rounded-md p-2 text-black"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Use a Strong Password"
            className="rounded-md p-2 text-black"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-darkBrand p-2  text-white rounded-lg"
          disabled={isSubmitLoading}
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500"> {error} </p>}
      <p>
        Don't have an account?{" "}
        <span>
          <Link to={"/signup"}>Sign up here</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
