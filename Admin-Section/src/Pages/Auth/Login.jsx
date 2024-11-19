import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { adminLogin } from "../../Fetch/FetchAPI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await adminLogin({ email, password });

      // Check if the response contains access and refresh tokens
      if (response.accessToken) {
        // Store tokens in sessionStorage
        sessionStorage.setItem("accessToken", response.accessToken);

        navigate("/");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid password");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Sign-in failed", err);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h2 className="font-Roboto font-bold text-center text-primary text-5xl block">
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
            value={email} // Controlled component
            onChange={(e) => setEmail(e.target.value)}
            className="text-lg w-full rounded-lg h-12 p-4 border-2 border-primary mb-4"
          />

          <label htmlFor="password" className="text-login">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password} // Controlled component
            onChange={(e) => setPassword(e.target.value)}
            className="text-lg w-full rounded-lg h-12 p-4 border-2 border-primary mb-6"
          />

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="font-bold px-8 py-4 rounded-xl bg-primary text-white hover:bg-green-500"
            >
              Login
            </button>
            <Link
              to="/auth/register"
              className="font-bold px-8 py-4 rounded-xl bg-red-600 text-black hover:text-gray-700 hover:bg-red-500"
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
