import React from 'react';

import CustomerSidebar from '../components/CustomerSidebar';

import Navbar from '../components/Navbar';


const CustomerLayout = ({ children }) => {

    return (

        <div className="flex min-h-screen bg-gray-100">

            <CustomerSidebar />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>
    );
};

export default CustomerLayout;