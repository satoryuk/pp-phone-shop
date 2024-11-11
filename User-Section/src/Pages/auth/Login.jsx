
import React from 'react';
import { AiOutlineEyeInvisible, AiOutlineLock, AiOutlineLogout, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import Navbar from '../home/Navbar';
import { XTextfield } from './SignUpScreen';
import { XButton } from './SignUpScreen';
const Login = () => {
  return (
      <div>
          <Navbar/>
          <h1 className="text-green-600 text-3xl font-bold mb-4 ">Sign In</h1>
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
          <XButton label="Sign In" icon={<AiOutlineLogout />} />
          <div className='flex items-center justify-center'>
              <h2 className='font-semibold'>Don't have account yet?</h2>
              <h2 className='text-green-600  font-semibold'>Sign Up.</h2>
          </div>
      </div>

  )
}

export default Login
