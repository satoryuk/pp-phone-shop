
import React from 'react';
import { AiOutlineEyeInvisible, AiOutlineLock, AiOutlineLogout, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import Navbar from '../home/Navbar';
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
            <Navbar/>
            <h1 className="text-green-600 text-3xl font-bold mb-4 ">Sign Up</h1>
            <XTextfield
                label="Full Name"
                placeholder="X_AE_A13b"
                icon={<AiOutlineUser />}
            />
            <XTextfield
                label="Email Address"
                placeholder="X_AE_A13b"
                icon={<AiOutlineMail />}
            />

            <XTextfield
                label="Password"
                placeholder="X_AE_A13b"
                icon={<AiOutlineLock />}
                suffixIcon={<AiOutlineEyeInvisible />}
            />
            <h1>Password strength: Strong </h1>
            <XTextfield
                label="Confirm Password"
                placeholder="X_AE_A13b"
                icon={<AiOutlineLock />}
                suffixIcon={<AiOutlineEyeInvisible />}
            />
            <h1>Password strength: Strong </h1>
            <XButton label="Sign Up" icon={<AiOutlineLogout />} />
            <div className='flex items-center justify-center'>
                <h2 className='font-semibold'>Already have an account?</h2>
                <h2 className='text-green-600  font-semibold'>Sign In.</h2>
            </div>
        </div>

    )
}
export default Signup;

