import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import {

    Link,
    useLocation

} from 'react-router-dom';

import {

    FaHome,
    FaBox,
    FaUsers,
    FaTruck,
    FaClipboardList

} from 'react-icons/fa';


const Sidebar = () => {

    const location = useLocation();


    const menus = [

        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: <FaHome />
        },

        {
            name: 'Shipments',
            path: '/shipments',
            icon: <FaBox />
        },
{
    name: 'Assignments',

    path: '/shipment-assignment',

    icon: <FaTruck />
},

        {
            name: 'Customers',
            path: '/customers',
            icon: <FaUsers />
        },

        {
            name: 'Couriers',
            path: '/couriers',
            icon: <FaTruck />
        },

        {
            name: 'Manifests',
            path: '/manifests',
            icon: <FaClipboardList />
        },

	{
    		name: 'Live Tracking',

		path: '/live-tracking',

	       icon: <FaMapMarkedAlt />
	}
    ];


    return (

        <div className="w-64 bg-blue-900 text-white min-h-screen">

            <div className="p-6 text-2xl font-bold border-b border-blue-700">

                CHRONO DZ

            </div>


            <ul className="mt-4">

                {menus.map((menu, index) => (

                    <li key={index}>

                        <Link
                            to={menu.path}

                            className={`flex items-center gap-3 px-6 py-4 hover:bg-blue-700 transition

                            ${
                                location.pathname === menu.path
                                    ? 'bg-blue-700'
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

export default Sidebar;