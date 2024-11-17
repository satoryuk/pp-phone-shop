
import React from 'react';
import { AiOutlineEyeInvisible, AiOutlineLock, AiOutlineLogout, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import Navbar from '../home/Navbar';
import { Spacer, XTextfield } from './SignUpScreen';
import { XButton } from './SignUpScreen';

import { Link } from 'react-router-dom';
const Login = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const toggleIconPass = () => {
        setShowPassword((prevShowpass) => !prevShowpass);
    }
    const handleInputChange = (e)=> {
        const value = e.target.value;
        setPassword(value);

        if(value.length < 8){
            setError("Password must be at least 6 characters long.");
        }
        else{
            setError("");
        }
    }
    return (
        <div>
            <Navbar />

            <div className="flex flex-col items-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">

                    <h1 className="text-green-600 text-3xl font-bold mb-4 ">Sign In</h1>
                    <XTextfield
                        label="Full Name"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineUser />}
                    />
                    <Spacer width={null} />
                    <XTextfield
                        label="Email Address"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineMail />}
                    />
                    <Spacer width={null} />
                    <XTextfield
                        label="Password"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineLock />}
                        suffixIcon={<AiOutlineEyeInvisible />}
                        
                    />
                    <Spacer width={null} height={5} />
                    <h1>Password strength: Strong </h1>
                    <Spacer width={null} />
                    <XButton label="Sign In" icon={<AiOutlineLogout />} />
                    <Spacer width={null} />
                    <div className='flex items-center justify-center'>
                        <h2 className='font-semibold'>Don't have account yet?</h2>
                        <Spacer width={5} />
                        <Link to="/auth/Signup">
                            <h2 className='text-green-600  font-semibold' >Sign Up.</h2></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
