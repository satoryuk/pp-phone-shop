
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineLock, AiOutlineLogout, AiOutlineMail, AiOutlineUser,AiOutlineEye } from 'react-icons/ai';
import Navbar from '../home/Navbar';
import { Spacer } from './SignUpScreen';
import { XTextfield } from '../../Conponents/Bath_Component';
import { XButton } from './SignUpScreen';

import { Link } from 'react-router-dom';

const Login = () => {
    const[passwordToggle, setPasswordToggle] = useState(false)
    const [passwordState, setPassword] = useState("")
    const [passwordStrength, setPasswordStrength] = useState("");

    const toggleValidateIcon = ()=>{
        setPasswordToggle(!passwordToggle)
    }
    const handlePasswordLength = (value) => {
        setPassword(value)
        validatePasswordLength(value)
    }
    const validatePasswordLength = (passwordState) => {
        if (passwordState.length === 0) {
            setPasswordStrength("");
        } else if (passwordState.length < 8) {
            setPasswordStrength("Weak");
        } else {
            setPasswordStrength("Strong");
        }
    }
    const handleColorPasswordStrength = (passStrength) => {
        switch (passStrength) {
            case "Weak": return "red";
            case "Strong": return "green";
            default: 
            return "gray";
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
                        validation={validatePasswordLength}
                        onValueChange={handlePasswordLength}
                        suffixIcon={passwordToggle ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        onClick={toggleValidateIcon}
                        inputType={
                            passwordToggle ? "text" : "password"
                        }
                    />
                    <Spacer width={null} height={5} />
                    {passwordState && (
                        <p
                            className={`text-${handleColorPasswordStrength(passwordStrength)
                                }-500 font-semibold mt-2`}
                        >
                            Password strength: {passwordStrength}
                        </p>
                    )}
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