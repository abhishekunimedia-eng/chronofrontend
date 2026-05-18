import React, {

    useEffect,
    useState

} from 'react';

import {

    useParams

} from 'react-router-dom';

import AdminLayout from '../../layouts/AdminLayout';

import api from '../../api/api';

import socket from '../../socket/socket';


const ShipmentDetails = () => {

    const { awb_no } = useParams();

    const [shipment, setShipment] = useState(null);

    const [tracking, setTracking] = useState([]);

    const [pod, setPod] = useState(null);


    // ======================================
    // FETCH DETAILS
    // ======================================

    const fetchShipmentDetails = async () => {

        try {

            const response =
                await api.get(
                    `/shipments/details/${awb_no}`
                );

            setShipment(response.data.shipment);

            setTracking(response.data.tracking);

            setPod(response.data.pod);

        } catch (error) {

            console.error(error);
        }
    };


    // ======================================
    // INITIAL LOAD
    // ======================================

    useEffect(() => {

        fetchShipmentDetails();

    }, [awb_no]);


    // ======================================
    // SOCKET LIVE TRACKING
    // ======================================

    useEffect(() => {

        socket.emit(
            'joinShipmentRoom',
            awb_no
        );


        socket.on(
            'shipmentStatusUpdated',

            (data) => {

                fetchShipmentDetails();
            }
        );


        return () => {

            socket.off(
                'shipmentStatusUpdated'
            );
        };

    }, [awb_no]);


    if (!shipment) {

        return (

            <AdminLayout>

                <div>Loading...</div>

            </AdminLayout>
        );
    }


    return (

        <AdminLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold">

                        Shipment Details

                    </h1>

                    <p className="text-gray-500 mt-1">

                        AWB:
                        {shipment.awb_no}

                    </p>

                </div>


                <a
                    href={`http://localhost:5000/api/labels/${shipment.awb_no}`}

                    target="_blank"

                    rel="noreferrer"

                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Download Label
                </a>

            </div>


            {/* Shipment Card */}
            <div className="bg-white rounded shadow p-6 mb-6">

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <h2 className="font-bold text-lg mb-4">

                            Sender

                        </h2>

                        <p>{shipment.sender_name}</p>

                        <p>{shipment.sender_mobile}</p>

                        <p>{shipment.sender_address}</p>

                    </div>


                    <div>

                        <h2 className="font-bold text-lg mb-4">

                            Receiver

                        </h2>

                        <p>{shipment.receiver_name}</p>

                        <p>{shipment.receiver_mobile}</p>

                        <p>{shipment.receiver_address}</p>

                    </div>

                </div>


                <div className="mt-6">

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                        {shipment.status_name}

                    </span>

                </div>

            </div>


            {/* Tracking Timeline */}
            <div className="bg-white rounded shadow p-6 mb-6">

                <h2 className="text-2xl font-bold mb-6">

                    Tracking Timeline

                </h2>


                <div className="space-y-6">

                    {tracking.map((item) => (

                        <div
                            key={item.tracking_id}

                            className="border-l-4 border-blue-600 pl-4"
                        >

                            <h3 className="font-bold">

                                {item.status_name}

                            </h3>

                            <p className="text-gray-600">

                                {item.tracking_remarks}

                            </p>

                            <p className="text-sm text-gray-500">

                                {item.location}

                            </p>

                            <p className="text-xs text-gray-400 mt-1">

                                {
                                    new Date(
                                        item.event_time
                                    ).toLocaleString()
                                }

                            </p>

                        </div>
                    ))}

                </div>

            </div>


            {/* POD */}
            {pod && (

                <div className="bg-white rounded shadow p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        Proof Of Delivery

                    </h2>


                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <h3 className="font-semibold mb-2">

                                Delivery Photo

                            </h3>

                            <img
                                src={`http://localhost:5000/${pod.delivery_photo}`}

                                alt="POD"

                                className="rounded border"
                            />

                        </div>


                        <div>

                            <h3 className="font-semibold mb-2">

                                Receiver Signature

                            </h3>

                            <img
                                src={`http://localhost:5000/${pod.receiver_signature}`}

                                alt="Signature"

                                className="rounded border"
                            />

                        </div>

                    </div>


                    <div className="mt-6">

                        <p>

                            <strong>
                                Receiver:
                            </strong>

                            {pod.receiver_name}

                        </p>

                        <p>

                            <strong>
                                Remarks:
                            </strong>

                            {pod.remarks}

                        </p>

                    </div>

                </div>
            )}

        </AdminLayout>
    );
};

export default ShipmentDetails;