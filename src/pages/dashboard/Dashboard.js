import React, {

    useEffect,
    useState

} from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import api from '../../api/api';

import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,

    PieChart,
    Pie,
    Cell,

    LineChart,
    Line

} from 'recharts';


const Dashboard = () => {

    const [analytics, setAnalytics] =
        useState(null);


    // ======================================
    // FETCH ANALYTICS
    // ======================================

    const fetchAnalytics = async () => {

        try {

            const response =
                await api.get(
                    '/shipments/dashboard-analytics'
                );

            setAnalytics(
                response.data.analytics
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchAnalytics();

    }, []);


    if (!analytics) {

        return (

            <AdminLayout>

                <div>Loading...</div>

            </AdminLayout>
        );
    }


    const pieColors = [
        '#2563EB',
        '#16A34A',
        '#EAB308',
        '#DC2626'
    ];


    return (

        <AdminLayout>

            {/* Title */}
            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    CHRONO DZ Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Logistics Analytics & Operations

                </p>

            </div>


            {/* Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">

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


                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-gray-500">

                        Revenue

                    </h2>

                    <p className="text-4xl font-bold mt-2 text-blue-600">

                        ₹ {
                            analytics.total_revenue
                        }

                    </p>

                </div>

            </div>


            {/* Charts */}
            <div className="grid grid-cols-2 gap-6 mb-8">

                {/* Monthly Shipments */}
                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-xl font-bold mb-4">

                        Monthly Shipments

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={
                                analytics.monthly_shipments
                            }
                        >

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="total"

                                fill="#2563EB"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>


                {/* Status Wise */}
                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-xl font-bold mb-4">

                        Shipment Status

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <PieChart>

                            <Pie
                                data={
                                    analytics.status_wise
                                }

                                dataKey="total"

                                nameKey="status_name"

                                outerRadius={100}

                                label
                            >

                                {
                                    analytics.status_wise.map(
                                        (entry, index) => (

                                            <Cell
                                                key={index}

                                                fill={
                                                    pieColors[
                                                        index %
                                                        pieColors.length
                                                    ]
                                                }
                                            />
                                        )
                                    )
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* Revenue Trend */}
            <div className="bg-white p-6 rounded shadow mb-8">

                <h2 className="text-xl font-bold mb-4">

                    Shipment Trend

                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <LineChart
                        data={
                            analytics.monthly_shipments
                        }
                    >

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"

                            dataKey="total"

                            stroke="#16A34A"

                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

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
                                Amount
                            </th>

                            <th className="p-4 text-left">
                                Date
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

                                            ₹ {
                                                shipment.shipping_amount
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                new Date(
                                                    shipment.created_at
                                                ).toLocaleDateString()
                                            }

                                        </td>

                                    </tr>
                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
};

export default Dashboard;