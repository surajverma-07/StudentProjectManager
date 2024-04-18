
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLog } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, SetError] = useState("");

  const login = async (data) => {
    SetError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLog(userData));
        navigate("/");
      }
    } catch (error) {
      SetError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full bgmain1 py-10 px-2 sm:px-0">
      <div
        className={`mx-auto w-full max-w-lg bg-slate-800  rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-orange-600">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-slate-200">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center ">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
           <div className="space-y-5">
              <Input 
               label="Email: "
               placeholder="Enter your email"
               type="email"
               {...register("email",{
                required:true,
                validate:{
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
                }
               })}
              />
              <Input 
              label="Password: "
              type="password"
              placeholder="Enter your Password"
              {...register("password",{
                required:true,
              })}
              /> 
              <Button 
              type="submit"
              className='w-full btn-1 hover:opacity-90 '
              >Sign in </Button>
           </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
