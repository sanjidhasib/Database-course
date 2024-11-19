import { useState } from "react";
import { NavLink } from "react-router-dom";
import './LoginValidation'
import LoginValidation from "./LoginValidation";


const Login = () => {

    const [values, setValues] = useState({
        email: ``,
        password: ``,
    })

    const [errors,setErrors] = useState({})

    const handleInput=event =>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit =(event) =>{
        event.preventDefault();
        setErrors(LoginValidation(values));
       
    }

    return (
        <div className="min-h-screen py-40 " style={{ backgroundImage: 'linear-gradient(115deg, #0488a4, #2563eb)' }}>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('images/Login-Background.png')" }}>
                        <h1 className="font-semibold text-7xl text-[#0488a4] mb-3 animate__animated animate__slideInLeft">Welcome Back</h1>
                        <div>
                            <p className="text-black text-base">Log in to access your account . Dont have an account yet? <NavLink to="/register" className="text-[#0488a4] font-semibold">Sign up here</NavLink>.</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 py-16 px-12">
                      
                            <div>
                                <h2 className="text-5xl mb-4 text-[#0488a4]">Login</h2>
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="mt-5">
                                        <input type="text" name="email" placeholder="Email" onChange={handleInput} className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full" required />
                                        <div>
                                            {errors.email && <span className="text-danger">{errors.email}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                    <input type="password" name="password" placeholder="Password" onChange={handleInput} className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full" required />
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                    </div>
                                    <div className="mt-5">
                                        <button type="submit" className="w-full bg-[#0488a4] hover:bg-blue-400 py-3 text-center text-white">Login</button>
                                    </div>
                                </form>
                                <div className="mt-5 text-sm text-gray-600">
                                    <a href="#" className="text-[#0488a4] font-semibold mb-5">Forgot password?</a>
                                </div>
                               
                            </div>
                        
                    </div>
                </div>
            </div>
        </div> 
        
    );
};

export default Login;