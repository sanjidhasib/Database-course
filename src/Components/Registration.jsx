
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import RegistrationValidation from "./RegistrationValidation";
import axios from "axios";


const Registration = () => {

    const [values, setValues] = useState({
        name: ``,
        email: ``,
        password: ``,
        number: ``,
        Role:``


    })
    

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleInput = event => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5004/registration", values);
            console.log("Response from server: ", response.data);
            navigate("/"); 
        } catch (error) {
            console.error("Error during registration: ", error);
            if (error.response && error.response.data) {
                setErrors({ api: error.response.data });
            } else {
                setErrors({ api: "Registration failed. Please try again." });
            }
        }
    };



    
    return (
        <div>
            <div className="min-h-screen py-40" style={{ backgroundImage: 'linear-gradient(115deg, #0488a4,   #2563eb)' }}>
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('images/Register-Background.png')" }}>
                            <h1 className="text-[#0488a4] font-semibold text-7xl mb-3 animate__animated animate__slideInLeft">Welcome</h1>
                            <div>
                                <p className="text-black text-base "> Register to observe the Finance Process <a href="#" className="text-[#0488a4] font-semibold">Learn more</a></p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 py-16 px-12">
                            <h2 className="text-5xl mb-4 text-[#0488a4]">Register</h2>
                            <p className="mb-4">
                                Create your account. It’s free and only take a minute
                            </p>
                            <form onSubmit={handleSubmit} >

                                <div className="mt-5">
                                    <input onChange={handleInput} type="text" id="name" name="name" placeholder="Full Name"  className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full  text-black font-semibold" required />
                                    <div>
                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="mt-5">

                                   
                                    <select onChange={handleInput} className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full  text-slate-600 font-semibold ">
                                            <option disabled selected>Register as</option>
                                            <option className=" text-black ">Teacher</option>
                                            <option className=" text-black ">Student</option>
                                        </select>
                                    
                                    <div>
                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                    
                                </div>

                                <div className="mt-5">
                                    <input onChange={handleInput} type="email" id="email" name="email" placeholder="Email" className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full  text-black font-semibold" required />
                                    <div>
                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <input onChange={handleInput} type="number" id="number" name="number" placeholder="Number" className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full  text-black font-semibold" required />
                                    <div>
                                        {errors.number && <span className="text-danger">{errors.number}</span>}
                                    </div>
                                </div>
                                
                               
                                <div className="mt-5">
                                    <input onChange={handleInput} type="password" name="password" placeholder="Password" className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full  text-black font-semibold" required />
                                    <div>
                                        {errors.password && <span className="text-danger">{errors.password}</span>}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="outline-none h-12 rounded-xl bg-gray-100 py-1 px-2 w-full  text-black font-semibold" required />
                                    <div>
                                        {errors.password && <span className="text-danger">{errors.password}</span>}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <input type="checkbox" className="border border-gray-400  text-black font-semibold" required />
                                    <span>
                                        I accept the <span className="text-[#0488a4] font-semibold">Terms of Use</span> <span className="text-[#0488a4] font-semibold">Privacy Policy</span>
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="w-full bg-[#0488a4] hover:bg-blue-400 py-3 text-center text-white">Register Now</button>

                                    <p className="text-black text-base">Already have an account? <NavLink to="/login" className="text-[#0488a4] font-semibold">Log In here</NavLink>.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Registration;