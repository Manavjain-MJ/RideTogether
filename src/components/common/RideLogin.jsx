import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../../assets/ridelogin.css"
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RideLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [loginData, setLoginData] = useState(null);
    const navigate = useNavigate()


    const onSubmit = async (data) => {
        // setLoginData(data);
        console.log("Login Data Submitted:", data);
        const res = await axios.post("/ride/login", data)
        console.log(res.data)
        if (res.status == 200) {
            // alert("Login Success")
            toast('😁 Login Success!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            localStorage.setItem("id", res.data.data._id)
            localStorage.setItem("role", res.data.data.roleId.roleName)
            setTimeout(() => {
                if (res.data.data.roleId.roleName === "rider") {
                    navigate("/")
                }
                if (res.data.data.roleId.roleName === "driver") {
                    navigate("/")
                }
            }, 3000);
        } else {
            alert("Login Failed")

        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="auth-background">
                <div className="auth-container login">
                    <h2>Log In</h2>
                    {/* <p>Login to continue your RideTogether journey</p> */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" placeholder="Email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} />
                        {errors.email && <span className="error">Email is required</span>}

                        <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} />
                        {errors.password && <span className="error">Password is required</span>}

                        <button type="submit" className="auth-button">Login</button>
                    </form>
                    <p className="switch-auth">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}
