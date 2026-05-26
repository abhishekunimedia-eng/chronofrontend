import React, {

    useState

} from 'react';

import api from '../../api/api';


const PublicTracking = () => {

    const [awbNo, setAwbNo] =
        useState('');

    const [shipment, setShipment] =
        useState(null);

    const [tracking, setTracking] =
        useState([]);

    const [pod, setPod] =
        useState(null);

    const [loading, setLoading] =
        useState(false);


    // ======================================
    // TRACK SHIPMENT
    // ======================================

    const trackShipment = async () => {

        if (!awbNo) {

            return alert(
                'Enter AWB Number'
            );
        }

        try {

            setLoading(true);

            const response =
                await api.get(
                    `/shipments/public-track/${awbNo}`
                );

            setShipment(
                response.data.shipment
            );

            setTracking(
                response.data.tracking
            );

            setPod(
                response.data.pod
            );

        } catch (error) {

            console.error(error);

            alert(
                'Shipment not found'
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="min-h-screen bg-gray-100">

            {/* Hero */}
            <div className="bg-blue-700 text-white py-16">

                <div className="max-w-5xl mx-auto px-6">

                    <h1 className="text-5xl font-bold">

                        CHRONO DZ

                    </h1>

                    <p className="mt-4 text-xl">

                        Express Logistics & Shipment Tracking
                    </p>


                    {/* Search */}
                    <div className="mt-10 flex gap-4">

                        <input
                            type="text"

                            placeholder="Enter AWB Number"

                            value={awbNo}

                            onChange={(e) =>
                                setAwbNo(
                                    e.target.value
                                )
                            }

                            className="flex-1 p-4 rounded text-black"
                        />


                        <button
                            onClick={trackShipment}

                            className="bg-orange-500 px-8 rounded font-semibold"
                        >
                            Track
                        </button>

                    </div>

                </div>

            </div>


            {/* Loading */}
            {loading && (

                <div className="max-w-5xl mx-auto p-6">

                    Loading...

                </div>
            )}


            {/* Shipment */}
            {shipment && (

                <div className="max-w-5xl mx-auto p-6">

                    {/* Shipment Card */}
                    <div className="bg-white rounded shadow p-6 mb-6">

                        <div className="flex justify-between items-center">

                            <div>

                                <h2 className="text-3xl font-bold">

                                    {
                                        shipment.awb_no
                                    }

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    {
                                        shipment.receiver_name
                                    }
                                </p>

                            </div>


                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                                {
                                    shipment.status_name
                                }

                            </span>

                        </div>


                        <div className="grid grid-cols-2 gap-6 mt-8">

                            <div>

                                <h3 className="font-bold mb-2">

                                    Sender

                                </h3>

                                <p>

                                    {
                                        shipment.sender_name
                                    }

                                </p>

                                <p>

                                    {
                                        shipment.sender_mobile
                                    }

                                </p>

                            </div>


                            <div>

                                <h3 className="font-bold mb-2">

                                    Receiver

                                </h3>

                                <p>

                                    {
                                        shipment.receiver_name
                                    }

                                </p>

                                <p>

                                    {
                                        shipment.receiver_mobile
                                    }

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Tracking */}
                    <div className="bg-white rounded shadow p-6 mb-6">

                        <h2 className="text-2xl font-bold mb-6">

                            Tracking Timeline

                        </h2>


                        <div className="space-y-6">

                            {tracking.map((item) => (

                                <div
                                    key={item.tracking_id}

                                    className="border-l-4 border-green-600 pl-4"
                                >

                                    <h3 className="font-bold">

                                        {
                                            item.status_name
                                        }

                                    </h3>

                                    <p className="text-gray-600">

                                        {
                                            item.tracking_remarks
                                        }

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {
                                            item.location
                                        }

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

                                {/* Photo */}
                                <div>

                                    <h3 className="font-semibold mb-2">

                                        Delivery Photo

                                    </h3>

                                    <img
                                        src={`https://chronodz.onrender.com/${pod.delivery_photo}`}

                                        alt="POD"

                                        className="rounded border"
                                    />

                                </div>


                                {/* Signature */}
                                <div>

                                    <h3 className="font-semibold mb-2">

                                        Receiver Signature

                                    </h3>

                                    <img
                                        src={`https://chronodz.onrender.com/${pod.receiver_signature}`}

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

                                    {
                                        pod.receiver_name
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Remarks:
                                    </strong>

                                    {
                                        pod.remarks
                                    }

                                </p>

                            </div>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
};

export default PublicTracking;