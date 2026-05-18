import React from 'react';

import CourierSidebar from '../components/CourierSidebar';

import Navbar from '../components/Navbar';


const CourierLayout = ({ children }) => {

    return (

        <div className="flex min-h-screen bg-gray-100">

            <CourierSidebar />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>
    );
};

export default CourierLayout;