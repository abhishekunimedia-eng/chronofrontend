import React, {

    useEffect,
    useState

} from 'react';

import CourierLayout
from '../../layouts/CourierLayout';

import api from '../../api/api';


const CourierLiveTracking = () => {

    const [locations, setLocations] =
        useState([]);


    // ======================================
    // FETCH LIVE LOCATIONS
    // ======================================

    const fetchLocations =
    async () => {

        try {

            const response =
                await api.get(
                    '/couriers/live-locations'
                );

            console.log(response.data);

            setLocations(
                response.data.data
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchLocations();

    }, []);


    return (

        <CourierLayout>

            {/* Header */}
            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Live Courier Tracking

                </h1>

                <p className="text-gray-500 mt-2">

                    Real-time courier locations
                </p>

            </div>


            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Courier
                            </th>

                            <th className="p-4 text-left">
                                Latitude
                            </th>

                            <th className="p-4 text-left">
                                Longitude
                            </th>

                            

                        </tr>

                    </thead>


                    <tbody>

                        {
                            locations?.map(
                                (item) => (

                                    <tr
                                        key={
    item.courier_id
}

                                        className="border-t"
                                    >

                                        <td className="p-4">

                                            {
                                                item.courier_name
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                item.current_latitude
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                item.current_longitude
                                            }

                                        </td>

                                        

                                    </tr>
                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </CourierLayout>
    );
};

export default CourierLiveTracking;