import React, {

    useEffect,
    useState

} from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import api from '../../api/api';


const ShipmentAssignment = () => {

    const [shipments, setShipments] =
        useState([]);

    const [couriers, setCouriers] =
        useState([]);

    const [selectedCourier, setSelectedCourier] =
        useState({});


    // ======================================
    // FETCH SHIPMENTS
    // ======================================

    const fetchShipments = async () => {

        try {

            const response =
                await api.get(
                    '/shipments/all'
                );

            setShipments(
                response.data.data
            );

        } catch (error) {

            console.error(error);
        }
    };


    // ======================================
    // FETCH COURIERS
    // ======================================

    const fetchCouriers = async () => {

        try {

            const response =
                await api.get(
                    '/couriers'
                );

            setCouriers(
                response.data.data
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchShipments();

        fetchCouriers();

    }, []);


    // ======================================
    // ASSIGN COURIER
    // ======================================

    const assignCourier = async (
        shipment_id
    ) => {
console.log({

    shipment_id,

    courier_id:
        selectedCourier[
            shipment_id
        ]
});
        try {

            await api.post(
    '/shipments/assign-courier',
    {
        awb_no:
            shipments.find(
                s =>
                    s.shipment_id === shipment_id
            )?.awb_no,

        courier_id:
            selectedCourier[
                shipment_id
            ],

        remarks:
            'Assigned by admin'
    }
);

            alert(
                'Courier assigned successfully'
            );

        } catch (error) {

            console.error(error);

            alert(
    error.response?.data?.message ||
    'Assignment failed'
);
        }
    };


    return (

        <AdminLayout>

            {/* Header */}
            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Shipment Assignment

                </h1>

                <p className="text-gray-500 mt-2">

                    Dispatch Operations
                </p>

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
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Courier
                            </th>

                            <th className="p-4 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {shipments.map(
                            (shipment) => (

                            <tr
                                key={
                                    shipment.shipment_id
                                }

                                className="border-t"
                            >

                                <td className="p-4">

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

                                    {
                                        shipment.current_status
                                    }

                                </td>


                                {/* Courier Dropdown */}
                                <td className="p-4">

                                    <select

                                        className="border rounded px-3 py-2"

                                        value={
                                            selectedCourier[
                                                shipment.shipment_id
                                            ] || ''
                                        }

                                        onChange={(e) =>

                                            setSelectedCourier({

                                                ...selectedCourier,

                                                [shipment.shipment_id]:
                                                    e.target.value
                                            })
                                        }
                                    >

                                        <option value="">
                                            Select Courier
                                        </option>

                                        {couriers.map(
                                            (courier) => (

                                            <option

                                                key={
                                                    courier.courier_id
                                                }

                                                value={
                                                    courier.courier_id
                                                }
                                            >

                                                {
                                                    courier.courier_name
                                                }

                                            </option>
                                        ))}

                                    </select>

                                </td>


                                {/* Button */}
                                <td className="p-4">

                                    <button

                                        onClick={() =>

                                            assignCourier(
                                                shipment.shipment_id
                                            )
                                        }

                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >

                                        Assign

                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
};

export default ShipmentAssignment;