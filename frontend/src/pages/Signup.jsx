import React from "react";
import { signupUser } from "../http/users";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitLoading) return;
    setIsSubmitLoading(true);
    setError(null);
    try {
      const res = await signupUser({ name, email, password });
      if (res.data.success) {
        alert("Signup successful. You can browse our products and order.");
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      } else {
        setError(res.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setError(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
  return (
    //signup form
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-black  text-4xl font-bold"> Sign Up</h1>
      <form
        className="flex flex-col border-2 p-8 text-white rounded-md text-xl gap-4 bg-darkBrand"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Rachel Green"
            className="rounded-md p-2 text-black"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="name"
            id="name"
            name="name"
            required
          />
        </div>
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
        Already have an account?{" "}
        <span>
          <Link to={"/login"}>Login here</Link>
        </span>
      </p>
    </div>
  );
};

export default Signup;
