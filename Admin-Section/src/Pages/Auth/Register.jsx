import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../Fetch/FetchAPI";
import { logo } from "../../Assets";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await register({ username, email, password });
      const token = response.data.token;
      localStorage.setItem("Access-token", token);
      navigate("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left Side - Register Form */}
      <div className="w-1/2 bg-blue-600 flex justify-center items-center pl-40">
        <form
          onSubmit={handleSignUp}
          className="bg-white p-12 rounded-lg w-full max-w-lg shadow-lg"
        >
          <h2 className="text-4xl text-blue-600 font-bold text-center mb-10">
            Register
          </h2>

          <label className="block mb-2 text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-6 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-6 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="flex justify-between mt-6">
            <Link
              to="/"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md w-[45%] text-center"
            >
              Login
            </Link>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md w-[45%]"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Right Side - Welcome Message */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center px-12">
        <div className="flex items-center gap-3 absolute top-10 right-10">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
          <h1 className="text-4xl font-bold">Phone Shop</h1>
        </div>

        <h2 className="text-5xl font-bold mb-6 mt-10">Welcome!</h2>
        <div className="w-16 h-1 bg-white rounded-full mb-6" />
        <p className="text-center text-lg mb-12">
          To keep connected! <br /> please login with your personal info.
        </p>

        <Link
          to="/"
          className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
