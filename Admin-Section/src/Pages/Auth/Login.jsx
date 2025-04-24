import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginFetch } from "../../Fetch/FetchAPI";
import { logo } from "../../Assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await loginFetch(email, password);
      console.log(response);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center px-12">
        <div className="flex items-center gap-3 absolute top-10 left-10">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
          <h1 className="text-4xl font-bold">Phone Shop</h1>
        </div>

        <h2 className="text-5xl font-bold mb-6 mt-10">Welcome!</h2>
        <div className="w-16 h-1 bg-white rounded-full mb-6" />
        <p className="text-center text-lg mb-12">
          Enter your personal information for log in to management! <br />
          Or you can register to have an account.
        </p>

        <Link
          to="/register"
          className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
        >
          Register
        </Link>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-blue-600 flex justify-center items-center pr-40">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-12 rounded-lg w-full max-w-lg shadow-lg"
        >
          <h2 className="text-4xl text-blue-600 font-bold text-center mb-10">
            Login
          </h2>

          <label htmlFor="email" className="block mb-2 text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />

          <label htmlFor="password" className="block mb-2 text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md w-[45%]"
            >
              Login
            </button>
            <Link
              to="/register"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md text-center w-[45%]"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
