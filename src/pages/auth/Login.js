import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                '/auth/login',
                formData
            );

            localStorage.setItem(
                'token',
                response.data.token
            );

            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );

            const role = response.data.user.role;

            if (role === 'ADMIN') {

                navigate('/dashboard');

            } else if (role === 'CUSTOMER') {

                navigate('/customer-dashboard');

            } else if (role === 'COURIER') {

                navigate('/courier-dashboard');

            } else {

                navigate('/');
            }

        } catch (error) {

            console.error(error);

            alert('Login Failed');
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-gray-100 to-gray-200">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-96"
            >

                {/* LOGO */}
                <div className="flex justify-center mb-4">

                    <img
                        src={logo}
                        alt="CHRONO DZ"
                        className="w-44 hover:scale-105 transition duration-300"
                    />

                </div>

                {/* TITLE */}
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    CHRONO DZ
                </h2>

                <p className="text-gray-500 text-center mb-6 mt-2">
                    Delivering Beyond Time
                </p>

                {/* EMAIL */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 mb-4 rounded-lg outline-none transition duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleChange}
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-3 mb-5 rounded-lg outline-none transition duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleChange}
                />

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white p-3 rounded-lg font-semibold shadow-md"
                >
                    Login
                </button>

                {/* FOOTER */}
                <p className="text-xs text-gray-400 text-center mt-6">
                    © 2026 CHRONO DZ EXPRESS MAIL
                </p>

            </form>

        </div>
    );
};

export default Login;