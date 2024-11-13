
import React from 'react';
import { AiOutlineEyeInvisible, AiOutlineLock, AiOutlineLogout, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import Navbar from '../home/Navbar';
import { Link } from 'react-router-dom';
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


export const XTextfield = ({ label = "labelTextfield", placeHolder = "hintText", icon, suffixIcon }) => {
    return (
        <div className='w-full'>
            <label className="text-gray-700 text-sm font-medium mb-1">{label}</label>
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 mt-1 shadow-sm">
                {icon && <span className="text-gray-400 mr-2">{icon}</span>}
                <input
                    type="text"
                    placeholder={placeHolder}
                    className="w-full outline-none text-gray-700"

                />
                {suffixIcon && <span className="text-gray-400 mr-2">{suffixIcon}</span>}
            </div>

        </div>
    )
}

const Signup = () => {
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
                    />
                    <Spacer height={5} />
                    <h1>Password strength: Strong </h1>
                    <Spacer />
                    <XTextfield
                        label="Confirm Password"
                        placeholder="X_AE_A13b"
                        icon={<AiOutlineLock />}
                        suffixIcon={<AiOutlineEyeInvisible />}
                    />
                    <Spacer height={5} />
                    <h1>Password strength: Strong </h1>
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
export const Spacer = ({ height = 10, width = 10  }) => {
    return (
        <div style={{
            height: `${height}px` ,
            width: `${width}px` 
        }}></div>
    )
}
export default Signup;

