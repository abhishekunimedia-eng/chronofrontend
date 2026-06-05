import React, {
    useEffect,
    useState
} from 'react';

import api from '../../api/api';

import AdminLayout
from '../../layouts/AdminLayout';

const ManifestManagement = () => {

    const [manifests, setManifests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState('');

    const [showFormModal, setShowFormModal] =
        useState(false);

    const [formData, setFormData] =
useState({

    source_hub_id: '',

    destination_hub_id: '',

    vehicle_no: '',

    driver_name: '',

    driver_mobile: ''
});

    // =====================================
    // FETCH MANIFESTS
    // =====================================

    const fetchManifests = async () => {

        try {

            const response =
                await api.get(
                    '/manifests'
                );

            setManifests(
                response.data.data || []
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchManifests();

    }, []);

    // =====================================
    // HANDLE CHANGE
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    // =====================================
    // CREATE MANIFEST
    // =====================================

const saveManifest = async () => {

    try {

        if (

            !formData.source_hub_id ||

            !formData.destination_hub_id ||

            !formData.vehicle_no ||

            !formData.driver_name ||

            !formData.driver_mobile

        ) {

            alert('Please fill all fields');

            return;
        }

        await api.post(
            '/manifests',
            formData
        );

        alert(
            'Manifest Created Successfully'
        );

        setShowFormModal(false);

        setFormData({

            source_hub_id: '',
            destination_hub_id: '',
            vehicle_no: '',
            driver_name: '',
            driver_mobile: ''

        });

        fetchManifests();

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message ||
            'Failed to create manifest'
        );
    }
};
    // =====================================
    // DELETE
    // =====================================

    const deleteManifest =
    async (id) => {

        if (
            !window.confirm(
                'Delete this manifest?'
            )
        ) return;

        try {

            await api.delete(
                `/manifests/${id}`
            );

            fetchManifests();

        } catch (error) {

            console.error(error);
        }
    };

    const filteredManifests =
        manifests.filter((item) =>

            item.manifest_no
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <AdminLayout>

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-4xl font-bold">

                        Manifest Management

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage Shipment Manifests

                    </p>

                </div>

                <button

                    onClick={() =>
                        setShowFormModal(true)
                    }

                    className="bg-blue-600 text-white px-5 py-3 rounded-lg"
                >

                    + Create Manifest

                </button>

            </div>

            {/* Cards */}

            <div className="grid md:grid-cols-3 gap-6 mb-6">

                <div className="bg-white p-6 rounded shadow">

                    <p>Total Manifests</p>

                    <h2 className="text-4xl font-bold">

                        {manifests.length}

                    </h2>

                </div>

                <div className="bg-white p-6 rounded shadow">

                    <p>Vehicle Trips</p>

                    <h2 className="text-4xl font-bold text-blue-600">

                        {manifests.length}

                    </h2>

                </div>

                <div className="bg-white p-6 rounded shadow">

                    <p>Active Manifests</p>

                    <h2 className="text-4xl font-bold text-green-600">

                        {manifests.length}

                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="bg-white p-4 rounded shadow mb-6">

                <input

                    type="text"

                    placeholder="Search Manifest"

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="w-full border p-3 rounded"
                />

            </div>

            {/* Table */}

            <div className="bg-white rounded shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Manifest No
                            </th>

                            <th className="p-4 text-left">
                                Vehicle
                            </th>

                            <th className="p-4 text-left">
                                Driver
                            </th>

                            <th className="p-4 text-left">
                                Mobile
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            loading ?

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="p-4 text-center"
                                    >

                                        Loading...

                                    </td>

                                </tr>

                                :

                                filteredManifests.map(
                                    (manifest) => (

                                        <tr
                                            key={
                                                manifest.manifest_id
                                            }
                                            className="border-t"
                                        >

                                            <td className="p-4">

                                                {
                                                    manifest.manifest_no
                                                }

                                            </td>

                                            <td className="p-4">

                                                {
                                                    manifest.vehicle_no
                                                }

                                            </td>

                                            <td className="p-4">

                                                {
                                                    manifest.driver_name
                                                }

                                            </td>

                                            <td className="p-4">

                                                {
                                                    manifest.driver_mobile
                                                }

                                            </td>

                                            <td className="p-4">

                                                <div className="flex gap-2 justify-center">

                                                    <button
                                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Add Shipment
                                                    </button>

                                                    <button

                                                        onClick={() =>
                                                            deleteManifest(
                                                                manifest.manifest_id
                                                            )
                                                        }

                                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )
                        }

                    </tbody>

                </table>

            </div>
{
    showFormModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        Create Manifest

                    </h2>

                    <button

                        onClick={() =>
                            setShowFormModal(false)
                        }

                        className="text-xl"
                    >

                        ✕

                    </button>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="source_hub_id"
                        placeholder="Source Hub"
                        value={formData.source_hub_id}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="destination_hub_id"
                        placeholder="Destination Hub"
                        value={formData.destination_hub_id}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="vehicle_no"
                        placeholder="Vehicle Number"
                        value={formData.vehicle_no}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="driver_name"
                        placeholder="Driver Name"
                        value={formData.driver_name}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="driver_mobile"
                        placeholder="Driver Mobile"
                        value={formData.driver_mobile}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button

                        onClick={() =>
                            setShowFormModal(false)
                        }

                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >

                        Cancel

                    </button>

                    <button

                        onClick={saveManifest}

                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >

                        Save Manifest

                    </button>

                </div>

            </div>

        </div>
    )
}
        </AdminLayout>
    );
};

export default ManifestManagement;