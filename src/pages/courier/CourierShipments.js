import React, {

    useEffect,
    useState

} from 'react';

import CourierLayout from '../../layouts/CourierLayout';

import api from '../../api/api';


const CourierShipments = () => {

    const [shipments, setShipments] =
        useState([]);

    const [selectedShipment, setSelectedShipment] =
        useState(null);

    const [statusCode, setStatusCode] =
        useState('');

    const [remarks, setRemarks] =
        useState('');

    const [location, setLocation] =
        useState('');

const [deliveryPhoto, setDeliveryPhoto] =
    useState(null);

const [receiverSignature, setReceiverSignature] =
    useState(null);

const [receiverName, setReceiverName] =
    useState('');
// ======================================
// UPLOAD POD
// ======================================

const uploadPOD = async () => {

    try {

        const formData = new FormData();

        formData.append(
            'shipment_id',
            selectedShipment.shipment_id
        );

        formData.append(
            'receiver_name',
            receiverName
        );

        formData.append(
            'remarks',
            remarks
        );

        formData.append(
            'delivery_photo',
            deliveryPhoto
        );

        formData.append(
            'receiver_signature',
            receiverSignature
        );


        await api.post(
            '/couriers/upload-pod',
            formData,
            {
                headers: {
                    'Content-Type':
                        'multipart/form-data'
                }
            }
        );

        alert(
            'POD Uploaded'
        );

    } catch (error) {

        console.error(error);
    }
};
    // ======================================
    // FETCH SHIPMENTS
    // ======================================

    const fetchShipments = async () => {

        try {

            const response =
                await api.get(
                    '/couriers/assigned-shipments'
                );

            setShipments(
                response.data.data
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchShipments();

    }, []);


    // ======================================
    // UPDATE STATUS
    // ======================================

    const updateStatus = async () => {

        try {

            await api.post(
                '/couriers/update-shipment-status',
                {
                    shipment_id:
                        selectedShipment.shipment_id,

                    status_code:
                        statusCode,

                    remarks,

                    location
                }
            );

            alert(
                'Shipment Updated'
            );

            setSelectedShipment(null);

            fetchShipments();

        } catch (error) {

            console.error(error);
        }
    };


    return (

        <CourierLayout>

            {/* Header */}
            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Assigned Shipments

                </h1>

                <p className="text-gray-500 mt-2">

                    Delivery operations
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
                                Mobile
                            </th>

                            <th className="p-4 text-left">
                                City
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {shipments.map((shipment) => (

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
                                        shipment.receiver_mobile
                                    }

                                </td>

                                <td className="p-4">

                                    {
                                        shipment.receiver_city
                                    }

                                </td>

                                <td className="p-4">

                                    {
                                        shipment.status_name
                                    }

                                </td>

                                <td className="p-4">

                                    <button
                                        onClick={() =>
                                            setSelectedShipment(
                                                shipment
                                            )
                                        }

                                        className="bg-orange-600 text-white px-4 py-2 rounded"
                                    >
                                        Update
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>


            {/* Update Modal */}
            {selectedShipment && (

                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

                    <div className="bg-white rounded p-6 w-[500px]">

                        <h2 className="text-2xl font-bold mb-4">

                            Update Shipment

                        </h2>


                        <div className="space-y-4">

                            {/* Status */}
                            <select
                                value={statusCode}

                                onChange={(e) =>
                                    setStatusCode(
                                        e.target.value
                                    )
                                }

                                className="w-full border p-3 rounded"
                            >

                                <option value="">
                                    Select Status
                                </option>

                                <option value="PICKED_UP">
                                    Picked Up
                                </option>

                                <option value="IN_TRANSIT">
                                    In Transit
                                </option>

                                <option value="DELIVERED">
                                    Delivered
                                </option>

                            </select>


                            {/* Remarks */}
                            <textarea
                                placeholder="Remarks"

                                value={remarks}

                                onChange={(e) =>
                                    setRemarks(
                                        e.target.value
                                    )
                                }

                                className="w-full border p-3 rounded"
                            />


                            {/* Location */}
                            <input
                                type="text"

                                placeholder="Location"

                                value={location}

                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }

                                className="w-full border p-3 rounded"
                            />
{/* Receiver Name */}
<input
    type="text"

    placeholder="Receiver Name"

    value={receiverName}

    onChange={(e) =>
        setReceiverName(
            e.target.value
        )
    }

    className="w-full border p-3 rounded"
/>


{/* Delivery Photo */}
<div>

    <label className="font-semibold">

        Delivery Photo

    </label>

    <input
        type="file"

        onChange={(e) =>
            setDeliveryPhoto(
                e.target.files[0]
            )
        }

        className="w-full mt-2"
    />

</div>


{/* Signature */}
<div>

    <label className="font-semibold">

        Receiver Signature

    </label>

    <input
        type="file"

        onChange={(e) =>
            setReceiverSignature(
                e.target.files[0]
            )
        }

        className="w-full mt-2"
    />

</div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={() =>
                                        setSelectedShipment(
                                            null
                                        )
                                    }

                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={updateStatus}

                                    className="bg-orange-600 text-white px-4 py-2 rounded"
                                >
                                    Update
                                </button>
<button
    onClick={uploadPOD}

    className="bg-green-600 text-white px-4 py-2 rounded"
>
    Upload POD
</button>
                            </div>

                        </div>

                    </div>

                </div>
            )}

        </CourierLayout>
    );
};

export default CourierShipments;