import React from 'react';

import {

    Link,
    useLocation

} from 'react-router-dom';

import {

    FaHome,
    FaBox,
    FaSearchLocation

} from 'react-icons/fa';


const CustomerSidebar = () => {

    const location = useLocation();


    const menus = [

        {
            name: 'Dashboard',

            path: '/customer-dashboard',

            icon: <FaHome />
        },

        {
            name: 'My Shipments',

            path: '/customer-shipments',

            icon: <FaBox />
        },

        {
            name: 'Track Shipment',

            path: '/customer-tracking',

            icon: <FaSearchLocation />
        }
    ];


    return (

        <div className="w-64 bg-green-800 text-white min-h-screen">

            <div className="p-6 text-2xl font-bold border-b border-green-700">

                CHRONO DZ

            </div>


            <ul className="mt-4">

                {menus.map((menu, index) => (

                    <li key={index}>

                        <Link
                            to={menu.path}

                            className={`flex items-center gap-3 px-6 py-4 hover:bg-green-700 transition

                            ${
                                location.pathname === menu.path
                                    ? 'bg-green-700'
                                    : ''
                            }
                            `}
                        >

                            {menu.icon}

                            {menu.name}

                        </Link>

                    </li>
                ))}

            </ul>

        </div>
    );
};

export default CustomerSidebar;