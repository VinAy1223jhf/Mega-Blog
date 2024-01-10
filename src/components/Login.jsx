import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import React from 'react';
import { login as loginAction } from "../store/authSlice";
import Button from "./button";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth_serices";
import { useForm } from 'react-hook-form'
import Logo from "./Logo/logo";
import Input from "./input";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(loginAction(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="w-full flex items-center justufy-center">
            <div className={`x-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2  flex justify-center">
                    <span className="inine-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos; have an account?&nbsp;
                    <Link to='/signup' className="font-medium text-primary transition-all duration-200 hover:underline">Sign Up</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form className="mt-8" onSubmit={handleSubmit(login)}>
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="password"
                            placeholder="enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 8,
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                            })}
                        />

                        <Button type="submit" className="w-full" >Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
