import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaGlobe,
  FaWarehouse
} from "react-icons/fa";

import {
  MdSecurity,
  MdSupportAgent
} from "react-icons/md";

import { BsTruck } from "react-icons/bs";

const Home = () => {

  const navigate = useNavigate();

  const [awb, setAwb] = useState("");

  const handleTrack = () => {

    if (!awb.trim()) {

      alert("Please enter AWB Number");
      return;
    }

    navigate(`/track?awb=${awb}`);
  };

  return (

    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="text-3xl font-extrabold text-blue-700">

            CHRONO DZ

          </div>

          <div className="hidden md:flex items-center gap-8">

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
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Login
            </button>

          </div>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-orange-500 text-white py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">

                Delivering Beyond Time

              </h1>

              <p className="text-xl mt-6">

                Fast, secure and reliable logistics services across Algeria.

              </p>

              <div className="bg-white p-5 rounded-xl shadow-xl mt-10">

                <h3 className="text-gray-800 font-bold mb-3">

                  Track Your Shipment

                </h3>

                <div className="flex gap-3">

                  <input
                    type="text"
                    placeholder="Enter AWB Number"
                    value={awb}
                    onChange={(e) => setAwb(e.target.value)}
                    className="flex-1 border rounded-lg p-3 text-black"
                  />

                  <button
                    onClick={handleTrack}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-lg font-bold"
                  >
                    TRACK
                  </button>

                </div>

              </div>

            </div>

            <div className="flex justify-center">

              <BsTruck
                size={250}
                className="drop-shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>

      {/* STATISTICS */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8">

            {[
              ["50K+", "Shipments Delivered"],
              ["500+", "Business Clients"],
              ["100+", "Cities Covered"],
              ["98%", "On-Time Delivery"]
            ].map(([value, label]) => (

              <div
                key={label}
                className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition"
              >

                <h2 className="text-5xl font-bold text-blue-700">

                  {value}

                </h2>

                <p className="mt-3 text-gray-600">

                  {label}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section
        id="services"
        className="py-24 bg-gray-100"
      >

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">

            Our Services

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <ServiceCard
              icon={<FaShippingFast size={45} />}
              title="Express Delivery"
              text="Fast and secure deliveries nationwide."
            />

            <ServiceCard
              icon={<FaMapMarkedAlt size={45} />}
              title="Real-Time Tracking"
              text="Track shipments from pickup to delivery."
            />

            <ServiceCard
              icon={<FaMoneyBillWave size={45} />}
              title="COD Services"
              text="Cash on Delivery collection and reconciliation."
            />

            <ServiceCard
              icon={<FaGlobe size={45} />}
              title="International Shipping"
              text="Worldwide logistics and freight services."
            />

            <ServiceCard
              icon={<FaWarehouse size={45} />}
              title="Warehousing"
              text="Storage and fulfillment solutions."
            />

            <ServiceCard
              icon={<MdSupportAgent size={45} />}
              title="24/7 Support"
              text="Dedicated customer support."
            />

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section
        id="about"
        className="py-24 bg-white"
      >

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">

            Why Choose Chrono DZ

          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-center">

            <Feature icon={<MdSecurity size={55} />} title="Secure Delivery" />

            <Feature icon={<FaGlobe size={55} />} title="Nationwide Coverage" />

            <Feature icon={<MdSupportAgent size={55} />} title="24/7 Support" />

            <Feature icon={<FaWarehouse size={55} />} title="Warehousing" />

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="py-24 bg-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">

            How It Works

          </h2>

          <div className="grid md:grid-cols-5 gap-8 text-center">

            <Step title="Book" icon="📦" />
            <Step title="Pickup" icon="🚚" />
            <Step title="Transit" icon="📍" />
            <Step title="Delivery" icon="🏠" />
            <Step title="Completed" icon="✅" />

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-blue-700 to-orange-500 text-white py-24">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-bold">

            Ready To Ship With Chrono DZ?

          </h2>

          <p className="mt-5 text-xl">

            Fast, reliable and trusted logistics partner.

          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold"
          >
            Get Started
          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer
        id="contact"
        className="bg-gray-900 text-white py-14"
      >

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold">

            CHRONO DZ

          </h2>

          <p className="mt-4">

            Delivering Beyond Time

          </p>

          <p className="mt-3">

            support@chronodz.com

          </p>

          <p>

            Algeria

          </p>

          <p className="mt-8 text-gray-400">

            © 2026 CHRONO DZ. All Rights Reserved.

          </p>

        </div>

      </footer>

    </div>
  );
};

const ServiceCard = ({ icon, title, text }) => (

  <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">

    <div className="text-blue-600 flex justify-center mb-4">

      {icon}

    </div>

    <h3 className="font-bold text-xl">

      {title}

    </h3>

    <p className="text-gray-600 mt-3">

      {text}

    </p>

  </div>
);

const Feature = ({ icon, title }) => (

  <div>

    <div className="text-blue-600 flex justify-center mb-4">

      {icon}

    </div>

    <h3 className="font-bold">

      {title}

    </h3>

  </div>
);

const Step = ({ icon, title }) => (

  <div className="bg-white p-8 rounded-xl shadow">

    <div className="text-5xl mb-4">

      {icon}

    </div>

    <h3 className="font-bold">

      {title}

    </h3>

  </div>
);

export default Home;