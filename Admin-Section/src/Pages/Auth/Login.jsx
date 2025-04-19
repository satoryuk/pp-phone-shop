import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginFetch } from "../../Fetch/FetchAPI";

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
      // Navigate to the homepage
      console.log(response);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      console.error("Sign-in failed:", err);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h2 className="font-Roboto font-bold text-center text-blue-600 text-5xl block">
        Login
      </h2>
      <div className="flex flex-col align-center items-center p-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <label htmlFor="email" className="text-login pr-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-lg w-full rounded-lg h-12 p-4 border-2 border-gray-400 mb-8 focus:border-blue-500 focus:outline-none"
            required
          />

          <label htmlFor="password" className="text-login">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-lg w-full rounded-lg h-12 p-4 border-2 border-gray-400 mb-6 focus:border-blue-500 focus:outline-none"
            required
          />

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="font-bold px-8 py-4 w-40 rounded-xl bg-blue-600 text-gray-100 hover:bg-blue-700 duration-150"
            >
              Login
            </button>
            <Link
              to="/register"
              className="font-bold px-8 py-4 w-40 text-center rounded-xl bg-red-500 text-gray-100 hover:bg-red-600 duration-150"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
