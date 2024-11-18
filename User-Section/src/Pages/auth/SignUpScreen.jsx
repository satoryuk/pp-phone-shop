
// import React from 'react';

import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineLock, AiOutlineLogout, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import Navbar from '../home/Navbar';
import { Link } from 'react-router-dom';
import { XTextfield } from '../../Conponents/Bath_Component';
export const XButton = ({ label, icon }) => {
    return (
        <div className='w-full'>
            <button className="flex items-center justify-center bg-green-600 text-white rounded font-semibold w-full py-2">
                {label}
                {icon && <span className="mr-2">{icon}</span>}

            </button>
        </div>
    );
};




const Signup = () => {
    const [passwordState, setPassword] = useState("")
    const [passwordStrength, setPasswordStrength] = useState("");
    const [confirmPasswordState, setConfirmPassword] = useState("")
    const [confirmPasswordStrength, setcoPasswordStrength] = useState("");

    const validatePasswordLength = (password) => {
        if (password.le === 0) {
            setPasswordStrength("");
            setcoPasswordStrength("");
        } else if (password.length < 8) {
            setPasswordStrength("Weak");
            setcoPasswordStrength("Weak");
        } else {
            setPasswordStrength("Strong");
            setcoPasswordStrength("Strong");
        }
    }

    const handlePasswordLength = (value) => {
        setPassword(value)
        validatePasswordLength(value)
        setConfirmPassword(value)
    }
    const handleColorPasswordStrength = (passwordStrength) => {
        switch (passwordStrength) {
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
                    <h1 className="text-green-600 text-3xl font-bold mb-4 ">Sign Up</h1>

                    <XTextfield
                        label="Full Name"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineUser />}
                    />
                    <Spacer />
                    <XTextfield
                        label="Email Address"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineMail />}
                    />
                    <Spacer />
                    <XTextfield
                        label="Password"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineLock />}
                        suffixIcon={<AiOutlineEyeInvisible />}
                        validation={validatePasswordLength}
                        onValueChange={handlePasswordLength}
                    />
                    <Spacer height={5} />
                    {passwordState && (
                        <p
                            className={`text-${handleColorPasswordStrength(passwordStrength)
                                }-500 font-semibold mt-2`}
                        >
                            Password strength: {passwordStrength}
                        </p>
                    )}
                    <Spacer />
                    <XTextfield
                        label="Confirm Password"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineLock />}
                        suffixIcon={<AiOutlineEyeInvisible />}

                        validation={validatePasswordLength}
                        onValueChange={handlePasswordLength}
                    />
                    <Spacer height={5} />
                    {confirmPasswordState && (
                        <p
                            className={`text-${handleColorPasswordStrength(confirmPasswordStrength)
                                }-500 font-semibold mt-2`}
                        >
                            Password strength: {confirmPasswordStrength}
                        </p>
                    )}
                    <Spacer />
                    <XButton label="Sign Up" icon={<AiOutlineLogout />} />
                    <Spacer />
                    <div className='flex items-center justify-center'>

                        <h2 className='font-semibold'>Already have an account?</h2>
                        <Spacer width={5} />
                        <Link to="/auth/Login">
                            <h2 className='text-green-600  font-semibold'>Sign In.</h2></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
export const Spacer = ({ height = 10, width = 10 }) => {
    return (
        <div style={{
            height: `${height}px`,
            width: `${width}px`
        }}></div>
    )
}
export default Signup;

