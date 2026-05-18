import React, {

    useEffect,
    useState

} from 'react';

import CustomerLayout from '../../layouts/CustomerLayout';

import api from '../../api/api';


const CustomerDashboard = () => {

    const [analytics, setAnalytics] =
        useState(null);


    // ======================================
    // FETCH DASHBOARD
    // ======================================

    const fetchDashboard = async () => {

        try {

            const response =
                await api.get(
                    '/shipments/customer-dashboard'
                );

            setAnalytics(
                response.data.analytics
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchDashboard();

    }, []);


    if (!analytics) {

        return (

            <CustomerLayout>

                <div>Loading...</div>

            </CustomerLayout>
        );
    }


    return (

        <CustomerLayout>

            {/* Header */}
            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Customer Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Welcome to CHRONO DZ
                </p>

            </div>


            {/* Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-gray-500">

                        Total Shipments

                    </h2>

                    <p className="text-4xl font-bold mt-2">

                        {
                            analytics.total_shipments
                        }

                    </p>

                </div>


                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-gray-500">

                        Delivered

                    </h2>

                    <p className="text-4xl font-bold mt-2 text-green-600">

                        {
                            analytics.delivered_shipments
                        }

                    </p>

                </div>


                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-gray-500">

                        In Transit

                    </h2>

                    <p className="text-4xl font-bold mt-2 text-yellow-600">

                        {
                            analytics.in_transit_shipments
                        }

                    </p>

                </div>

            </div>


            {/* Recent Shipments */}
            <div className="bg-white rounded shadow overflow-x-auto">

                <div className="p-6 border-b">

                    <h2 className="text-xl font-bold">

                        Recent Shipments

                    </h2>

                </div>


                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                AWB
                            </th>

                            <th className="p-4 text-left">
                                Receiver
                            </th>

                            <th className="p-4 text-left">
                                City
                            </th>

                            <th className="p-4 text-left">
                                Amount
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            analytics.recent_shipments.map(
                                (shipment) => (

                                    <tr
                                        key={shipment.awb_no}

                                        className="border-t"
                                    >

                                        <td className="p-4 font-semibold">

                                            {shipment.awb_no}

                                        </td>

                                        <td className="p-4">

                                            {shipment.receiver_name}

                                        </td>

                                        <td className="p-4">

                                            {shipment.receiver_city}

                                        </td>

                                        <td className="p-4">

                                            ₹ {
                                                shipment.shipping_amount
                                            }

                                        </td>

                                        <td className="p-4">

                                            {shipment.status_name}

                                        </td>

                                    </tr>
                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </CustomerLayout>
    );
};

export default CustomerDashboard;