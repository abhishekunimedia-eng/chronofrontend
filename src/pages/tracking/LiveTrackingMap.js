import React, {

    useEffect,
    useState

} from 'react';

import {

    GoogleMap,
    Marker,
    useLoadScript

} from '@react-google-maps/api';

import AdminLayout from '../../layouts/AdminLayout';

import api from '../../api/api';

import socket from '../../socket/socket';


const mapContainerStyle = {

    width: '100%',

    height: '80vh'
};


const center = {

    lat: 26.2389,

    lng: 73.0243
};


const LiveTrackingMap = () => {

    const [couriers, setCouriers] =
        useState([]);


    // ======================================
    // LOAD MAP
    // ======================================

    const { isLoaded } = useLoadScript({

        googleMapsApiKey:
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });


    // ======================================
    // FETCH COURIERS
    // ======================================

    const fetchCourierLocations = async () => {

        try {

            const response =
                await api.get(
                    '/couriers/live-locations'
                );

            setCouriers(
                response.data.data
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchCourierLocations();

    }, []);


    // ======================================
    // SOCKET LIVE UPDATES
    // ======================================

    useEffect(() => {

        socket.on(
            'courierLocationUpdated',

            (data) => {

                setCouriers((prev) => {

                    const filtered =
                        prev.filter(
                            (courier) =>

                                courier.courier_id !==
                                data.courier_id
                        );

                    return [
                        ...filtered,
                        data
                    ];
                });
            }
        );


        return () => {

            socket.off(
                'courierLocationUpdated'
            );
        };

    }, []);


    if (!isLoaded) {

        return (

            <AdminLayout>

                <div>
                    Loading Map...
                </div>

            </AdminLayout>
        );
    }


    return (

        <AdminLayout>

            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Live Courier Tracking

                </h1>

                <p className="text-gray-500 mt-2">

                    Real-time courier monitoring
                </p>

            </div>


            <GoogleMap

                mapContainerStyle={
                    mapContainerStyle
                }

                zoom={6}

                center={center}
            >

                {
                    couriers.map((courier) => (

                        <Marker
                            key={courier.courier_id}

                            position={{
                                lat: parseFloat(
                                    courier.current_latitude ||
                                    courier.latitude
                                ),

                                lng: parseFloat(
                                    courier.current_longitude ||
                                    courier.longitude
                                )
                            }}

                            title={
                                courier.courier_name
                            }
                        />
                    ))
                }

            </GoogleMap>

        </AdminLayout>
    );
};

export default LiveTrackingMap;