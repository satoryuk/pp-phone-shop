import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../../Fetch/FetchAPI";



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signIn({ email, password });
      const token = response.data.token;
      localStorage.setItem('Access-token',token);
      navigation('/');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid password");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log('Sign-in failed', err);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h2 className="font-Roboto font-bold text-center text-primary text-5xl block">Login</h2>
      <div className="flex flex-col align-center items-center p-20">
        <form onSubmit={handleSubmit}>
          <label className="text-login pr-2">Email</label>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} // Controlled component
            onChange={(e) => setEmail(e.target.value)} 
            className="text-lg ml-[148px] rounded-lg w-[500px] h-12 p-4 border-2 border-primary" 
          /><br /><br />
          {console.log(email)}
          <label className="text-login">Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} // Controlled component
            onChange={(e) => setPassword(e.target.value)} 
            className="text-lg ml-24 rounded-lg w-[500px] h-12 p-4 border-2 border-primary"
          /><br /><br />
          {console.log(password)}
          <div className="flex justify-between w-[730px] mt-32">
            <button 
              type="submit" 
              className="font-bold px-24 py-4 rounded-xl bg-primary text-[white] hover:bg-green-500"
            >
              Login
            </button>
            <Link 
              to='/auth/register' 
              className="font-bold px-24 py-4 rounded-xl bg-red-600 text-[black] hover:text-[#9B9797] hover:bg-red-500"
            >
              Register
            </Link>
          </div>
        </form>
        
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if exists */}
    </section>
  );
}

export default Login;
