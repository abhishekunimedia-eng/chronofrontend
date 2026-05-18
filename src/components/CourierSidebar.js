import React from 'react';

import {

    Link,
    useLocation

} from 'react-router-dom';

import {

    FaHome,
    FaTruck,
    FaMapMarkedAlt

} from 'react-icons/fa';


const CourierSidebar = () => {

    const location = useLocation();


    const menus = [

        {
            name: 'Dashboard',

            path: '/courier-dashboard',

            icon: <FaHome />
        },

        {
            name: 'Assigned Shipments',

            path: '/courier-shipments',

            icon: <FaTruck />
        },

        {
            name: 'Live Tracking',

            path: '/courier-live-tracking',

            icon: <FaMapMarkedAlt />
        }
    ];


    return (

        <div className="w-64 bg-orange-700 text-white min-h-screen">

            <div className="p-6 text-2xl font-bold border-b border-orange-600">

                CHRONO DZ

            </div>


            <ul className="mt-4">

                {menus.map((menu, index) => (

                    <li key={index}>

                        <Link
                            to={menu.path}

                            className={`flex items-center gap-3 px-6 py-4 hover:bg-orange-600 transition

                            ${
                                location.pathname === menu.path
                                    ? 'bg-orange-600'
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

export default CourierSidebar;