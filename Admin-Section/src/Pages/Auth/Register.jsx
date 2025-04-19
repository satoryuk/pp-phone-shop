import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../Fetch/FetchAPI";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await register({ username, email, password });
      const token = response.data.token;
      localStorage.setItem("Access-token", token);
      navigation("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  return (
    <section>
      <h2 className="font-AntonSC font-bold text-center text-blue-600 text-5xl">
        Register
      </h2>
      <div className="flex flex-col align-center items-center p-20">
        <form onSubmit={handleSignUp}>
          <label className="text-login">Username</label>
          <input
            type="text"
            placeholder="UserName"
            className="text-xl ml-[70px] rounded-lg w-[500px] h-12 p-4 border-2 border-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <br />

          <label className="text-login">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="text-xl ml-[135px] rounded-lg w-[500px] h-12 p-4 border-2 border-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />

          <label className="text-login">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="text-xl ml-[80px] rounded-lg w-[500px] h-12 p-4 border-2 border-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />

          <p className="text-red-500">{error}</p>

          <div className="flex justify-between w-[730px] mt-32">
            <Link
              to="/"
              className="font-bold px-8 py-4 w-40 text-center rounded-xl bg-red-500 text-gray-100 hover:bg-red-600 duration-150"
            >
              Login
            </Link>
            <button
              type="submit"
              className="font-bold px-8 py-4 w-40 rounded-xl bg-blue-600 text-gray-100 hover:bg-blue-700 duration-150"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
