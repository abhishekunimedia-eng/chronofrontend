import React, {

    useEffect,
    useState

} from 'react';

import {

    useNavigate

} from 'react-router-dom';

import CustomerLayout from '../../layouts/CustomerLayout';

import api from '../../api/api';


const CustomerShipments = () => {

    const navigate = useNavigate();

    const [shipments, setShipments] =
        useState([]);

    const [search, setSearch] =
        useState('');

    const [status, setStatus] =
        useState('');

    const [page, setPage] =
        useState(1);

    const [pagination, setPagination] =
        useState({});


    // ======================================
    // FETCH SHIPMENTS
    // ======================================

    const fetchShipments = async () => {

        try {

            const response =
                await api.get(
                    `/shipments/customer-shipments?search=${search}&status=${status}&page=${page}&limit=10`
                );

            setShipments(
                response.data.data
            );

            setPagination(
                response.data.pagination
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchShipments();

    }, [page]);


    // ======================================
    // STATUS BADGES
    // ======================================

    const getStatusColor = (status) => {

        switch (status) {

            case 'Delivered':
                return 'bg-green-100 text-green-700';

            case 'In Transit':
                return 'bg-yellow-100 text-yellow-700';

            case 'Booked':
                return 'bg-blue-100 text-blue-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    };


    return (

        <CustomerLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold">

                        My Shipments

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Shipment history & tracking
                    </p>

                </div>

            </div>


            {/* Filters */}
            <div className="bg-white p-6 rounded shadow mb-6">

                <div className="grid grid-cols-3 gap-4">

                    {/* Search */}
                    <input
                        type="text"

                        placeholder="Search AWB or Receiver"

                        value={search}

                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }

                        className="border p-3 rounded"
                    />


                    {/* Status */}
                    <select
                        value={status}

                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }

                        className="border p-3 rounded"
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="Booked">
                            Booked
                        </option>

                        <option value="In Transit">
                            In Transit
                        </option>

                        <option value="Delivered">
                            Delivered
                        </option>

                    </select>


                    {/* Search Button */}
                    <button
                        onClick={() => {

                            setPage(1);

                            fetchShipments();
                        }}

                        className="bg-green-600 text-white rounded"
                    >
                        Search
                    </button>

                </div>

            </div>


            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto">

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
                                Booking Date
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {shipments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"

                                    className="p-6 text-center"
                                >

                                    No Shipments Found

                                </td>

                            </tr>

                        ) : (

                            shipments.map((shipment) => (

                                <tr
                                    key={shipment.shipment_id}

                                    className="border-t"
                                >

                                    <td className="p-4 font-semibold">

                                        {
                                            shipment.awb_no
                                        }

                                    </td>


                                    <td className="p-4">

                                        {
                                            shipment.receiver_name
                                        }

                                    </td>


                                    <td className="p-4">

                                        {
                                            shipment.receiver_city
                                        }

                                    </td>


                                    <td className="p-4">

                                        ₹ {
                                            shipment.shipping_amount
                                        }

                                    </td>


                                    <td className="p-4">

                                        {
                                            new Date(
                                                shipment.booking_date
                                            ).toLocaleDateString()
                                        }

                                    </td>


                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm

                                            ${
                                                getStatusColor(
                                                    shipment.status_name
                                                )
                                            }
                                            `}
                                        >

                                            {
                                                shipment.status_name
                                            }

                                        </span>

                                    </td>


                                    {/* Actions */}
                                    <td className="p-4">

                                        <div className="flex gap-2">

                                            {/* Track */}
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/customer-tracking?awb=${shipment.awb_no}`
                                                    )
                                                }

                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Track
                                            </button>


                                            {/* Label */}
                                            <a
                                                href={`https://chronodz.onrender.com/api/labels/${shipment.awb_no}`}

                                                target="_blank"

                                                rel="noreferrer"

                                                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Label
                                            </a>

                                        </div>

                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>


            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">

                <button
                    disabled={page <= 1}

                    onClick={() =>
                        setPage(page - 1)
                    }

                    className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>


                <p>

                    Page {pagination.page || 1}
                    {' '}of{' '}
                    {pagination.total_pages || 1}

                </p>


                <button
                    disabled={
                        page >=
                        pagination.total_pages
                    }

                    onClick={() =>
                        setPage(page + 1)
                    }

                    className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </CustomerLayout>
    );
};

export default CustomerShipments;