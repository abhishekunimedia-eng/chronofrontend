import React, { useState } from 'react';

import api from '../../api/api';

import { useNavigate } from 'react-router-dom';


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

            const role =
    response.data.user.role;


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

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    CHRONO DZ
                </h2>
<p className="text-gray-500 text-center mb-4">
    Delivering Beyond Time
</p>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"

                    className="w-full border p-3 mb-4 rounded"

                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"

                    className="w-full border p-3 mb-4 rounded"

                    onChange={handleChange}
                />

                <button
                    type="submit"

                    className="w-full bg-blue-600 text-white p-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;