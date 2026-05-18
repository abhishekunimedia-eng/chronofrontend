import React, {

    useEffect,
    useState

} from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import api from '../../api/api';

import { useNavigate } from 'react-router-dom';

const Shipments = () => {

    const navigate = useNavigate();

    const [shipments, setShipments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');


    // ======================================
    // FETCH SHIPMENTS
    // ======================================

    const fetchShipments = async () => {

        try {

            const response = await api.get(
                '/shipments/all'
            );

            setShipments(response.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchShipments();

    }, []);


    // ======================================
    // FILTER SHIPMENTS
    // ======================================

    const filteredShipments =
        shipments.filter((shipment) =>

            shipment.awb_no
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );


    // ======================================
    // STATUS COLOR
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

        <AdminLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">

                    Shipments

                </h1>


                <button
    onClick={() => navigate('/shipments/new')}

    className="bg-blue-600 text-white px-4 py-2 rounded"
>
    + Book Shipment
</button>

            </div>


            {/* Search */}
            <div className="bg-white p-4 rounded shadow mb-6">

                <input
                    type="text"

                    placeholder="Search AWB..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    className="border p-3 rounded w-full"
                />

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
                                Weight
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

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="p-6 text-center"
                                >

                                    Loading...

                                </td>

                            </tr>

                        ) : filteredShipments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="p-6 text-center"
                                >

                                    No Shipments Found

                                </td>

                            </tr>

                        ) : (

                            filteredShipments.map((shipment) => (

                                <tr
                                    key={shipment.shipment_id}

                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4 font-semibold">

    <button
        onClick={() =>
            navigate(
                `/shipments/${shipment.awb_no}`
            )
        }

        className="text-blue-600 hover:underline"
    >

        {shipment.awb_no}

    </button>

</td>


                                    <td className="p-4">

                                        {shipment.receiver_name}

                                    </td>


                                    <td className="p-4">

                                        {shipment.receiver_city}

                                    </td>


                                    <td className="p-4">

                                        {shipment.actual_weight} KG

                                    </td>


                                    <td className="p-4">

                                        ₹ {shipment.shipping_amount}

                                    </td>


                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium

                                            ${getStatusColor(
                                                shipment.status_name
                                            )}
                                            `}
                                        >

                                            {shipment.status_name}

                                        </span>

                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
};

export default Shipments;