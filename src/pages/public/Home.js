import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [awb, setAwb] = useState('');

    const navigate = useNavigate();

    const handleTrack = () => {

        if (!awb.trim()) {

            alert('Please enter AWB Number');
            return;
        }

        navigate(`/track?awb=${awb}`);
    };

    return (

        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <nav className="bg-white shadow">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <div className="text-3xl font-bold text-blue-700">

                        CHRONO DZ

                    </div>

                    <div className="space-x-6">

                        <a href="#services" className="hover:text-blue-600">
                            Services
                        </a>

                        <a href="#about" className="hover:text-blue-600">
                            About
                        </a>

                        <a href="#contact" className="hover:text-blue-600">
                            Contact
                        </a>

                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Login
                        </button>

                    </div>

                </div>

            </nav>

            {/* Hero Section */}
            <section className="bg-blue-700 text-white py-24">

                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h1 className="text-5xl font-bold mb-6">

                        Delivering Beyond Time

                    </h1>

                    <p className="text-xl mb-10">

                        Fast, Secure & Reliable Logistics Across Algeria

                    </p>

                    <div className="bg-white p-4 rounded-lg max-w-2xl mx-auto flex gap-3">

                        <input
                            type="text"
                            placeholder="Enter AWB Number"
                            value={awb}
                            onChange={(e) =>
                                setAwb(e.target.value)
                            }
                            className="flex-1 border p-3 rounded text-black"
                        />

                        <button
                            onClick={handleTrack}
                            className="bg-orange-500 text-white px-6 rounded"
                        >
                            Track
                        </button>

                    </div>

                </div>

            </section>

            {/* Statistics */}
            <section className="py-16 bg-white">

                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold text-blue-700">
                            50K+
                        </h2>

                        <p>Shipments Delivered</p>

                    </div>

                    <div className="text-center">

                        <h2 className="text-4xl font-bold text-blue-700">
                            500+
                        </h2>

                        <p>Business Clients</p>

                    </div>

                    <div className="text-center">

                        <h2 className="text-4xl font-bold text-blue-700">
                            100+
                        </h2>

                        <p>Cities Covered</p>

                    </div>

                    <div className="text-center">

                        <h2 className="text-4xl font-bold text-blue-700">
                            98%
                        </h2>

                        <p>On-Time Delivery</p>

                    </div>

                </div>

            </section>

            {/* Services */}
            <section id="services" className="py-20">

                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center mb-12">

                        Our Services

                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-3">
                                Express Delivery
                            </h3>
                            <p>
                                Fast and secure parcel delivery.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-3">
                                Real-Time Tracking
                            </h3>
                            <p>
                                Track every shipment live.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-3">
                                Corporate Logistics
                            </h3>
                            <p>
                                Dedicated solutions for businesses.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-3">
                                COD Services
                            </h3>
                            <p>
                                Cash on Delivery support.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-3">
                                E-Commerce Logistics
                            </h3>
                            <p>
                                Complete online store delivery solutions.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-3">
                                International Shipping
                            </h3>
                            <p>
                                Global shipping support.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Why Choose Us */}
            <section id="about" className="bg-blue-50 py-20">

                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center mb-12">

                        Why Choose Chrono DZ

                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 text-lg">

                        <div>✓ Nationwide Coverage</div>
                        <div>✓ Real-Time Tracking</div>
                        <div>✓ Secure Deliveries</div>
                        <div>✓ Fast Transit Times</div>
                        <div>✓ Affordable Pricing</div>
                        <div>✓ 24/7 Support</div>

                    </div>

                </div>

            </section>

            {/* Footer */}
            <footer
                id="contact"
                className="bg-gray-900 text-white py-12"
            >

                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-3xl font-bold mb-4">

                        CHRONO DZ

                    </h2>

                    <p>

                        Delivering Beyond Time

                    </p>

                    <p className="mt-4">

                        support@chronodz.com

                    </p>

                    <p>

                        Algeria

                    </p>

                    <p className="mt-6 text-gray-400">

                        © 2026 CHRONO DZ. All Rights Reserved.

                    </p>

                </div>

            </footer>

        </div>
    );
};

export default Home;