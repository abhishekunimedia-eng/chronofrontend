import React, {
    useEffect,
    useState
} from 'react';

import api from '../../api/api';

import AdminLayout from '../../layouts/AdminLayout';

const Couriers = () => {

    const [couriers, setCouriers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const [selectedCourier, setSelectedCourier] =
        useState(null);

    const [showViewModal, setShowViewModal] =
        useState(false);

    const [showFormModal, setShowFormModal] =
        useState(false);

    const [isEditMode, setIsEditMode] =
        useState(false);

    const [editingCourierId, setEditingCourierId] =
        useState(null);

    const [formData, setFormData] =
        useState({

            courier_code: '',
            courier_name: '',
            mobile: '',
            email: '',
            vehicle_no: '',
            is_available: true

        });

    // ======================================
    // FETCH COURIERS
    // ======================================

    const fetchCouriers = async () => {

        try {

            const response =
                await api.get('/couriers');

            setCouriers(
                response.data.data || []
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchCouriers();

    }, []);

    // ======================================
    // HANDLE INPUT
    // ======================================

    const handleInputChange = (e) => {

        const {

            name,
            value,
            type,
            checked

        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        });
    };

    // ======================================
    // STATS
    // ======================================

    const availableCouriers =
        couriers.filter(
            c => c.is_available
        ).length;

    const busyCouriers =
        couriers.filter(
            c => !c.is_available
        ).length;

    const trackingEnabled =
        couriers.filter(
            c =>
                c.current_latitude &&
                c.current_longitude
        ).length;

    // ======================================
    // FILTER
    // ======================================

    const filteredCouriers =
        couriers.filter((courier) => {

            return (

                courier.courier_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                courier.mobile
                    ?.includes(search)

                ||

                courier.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                courier.vehicle_no
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        });

    // ======================================
    // SAVE
    // ======================================

    const saveCourier = async () => {

        try {

            if (isEditMode) {

                await api.put(

                    `/couriers/${editingCourierId}`,

                    formData
                );

                alert(
                    'Courier updated successfully'
                );

            } else {

                await api.post(

                    '/couriers',

                    formData
                );

                alert(
                    'Courier created successfully'
                );
            }

            setShowFormModal(false);

            fetchCouriers();

        } catch (error) {

            console.error(error);

            alert(
                error?.response?.data?.message
                ||
                'Operation Failed'
            );
        }
    };

    // ======================================
    // EDIT
    // ======================================

    const editCourier = (courier) => {

        setIsEditMode(true);

        setEditingCourierId(
            courier.courier_id
        );

        setFormData({

            courier_code:
                courier.courier_code || '',

            courier_name:
                courier.courier_name || '',

            mobile:
                courier.mobile || '',

            email:
                courier.email || '',

            vehicle_no:
                courier.vehicle_no || '',

            is_available:
                courier.is_available
        });

        setShowFormModal(true);
    };

    // ======================================
    // DELETE
    // ======================================

    const deleteCourier = async (id) => {

        if (
            !window.confirm(
                'Delete this courier?'
            )
        ) return;

        try {

            await api.delete(
                `/couriers/${id}`
            );

            fetchCouriers();

        } catch (error) {

            console.error(error);

            alert(
                'Delete Failed'
            );
        }
    };

    // ======================================
    // VIEW
    // ======================================

    const viewCourier = (courier) => {

        setSelectedCourier(
            courier
        );

        setShowViewModal(true);
    };

    return (

        <AdminLayout>

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-4xl font-bold">

                        Couriers

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Courier Management

                    </p>

                </div>

                <button

                    onClick={() => {

                        setIsEditMode(false);

                        setEditingCourierId(null);

                        setFormData({

                            courier_code: '',
                            courier_name: '',
                            mobile: '',
                            email: '',
                            vehicle_no: '',
                            is_available: true

                        });

                        setShowFormModal(true);
                    }}

                    className="bg-blue-600 text-white px-5 py-3 rounded-lg"
                >

                    + Add Courier

                </button>

            </div>

            {/* Cards */}

            <div className="grid md:grid-cols-4 gap-6 mb-6">

                <div className="bg-white rounded-lg shadow p-6">

                    <p>Total Couriers</p>

                    <h2 className="text-4xl font-bold">

                        {couriers.length}

                    </h2>

                </div>

                <div className="bg-white rounded-lg shadow p-6">

                    <p>Available</p>

                    <h2 className="text-4xl font-bold text-green-600">

                        {availableCouriers}

                    </h2>

                </div>

                <div className="bg-white rounded-lg shadow p-6">

                    <p>Busy</p>

                    <h2 className="text-4xl font-bold text-red-600">

                        {busyCouriers}

                    </h2>

                </div>

                <div className="bg-white rounded-lg shadow p-6">

                    <p>Tracking Enabled</p>

                    <h2 className="text-4xl font-bold text-blue-600">

                        {trackingEnabled}

                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="bg-white rounded-lg shadow p-4 mb-6">

                <input

                    type="text"

                    placeholder="Search Courier Name, Mobile, Email, Vehicle"

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="w-full border rounded p-3"
                />

            </div>

            {/* Table */}

            <div className="bg-white rounded-lg shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Code
                            </th>

                            <th className="p-4 text-left">
                                Courier
                            </th>

                            <th className="p-4 text-left">
                                Mobile
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Vehicle
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            loading ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="p-6 text-center"
                                    >

                                        Loading...

                                    </td>

                                </tr>

                            ) : (

                                filteredCouriers.map(
                                    (courier) => (

                                        <tr
                                            key={
                                                courier.courier_id
                                            }
                                            className="border-t"
                                        >

                                            <td className="p-4">
                                                {courier.courier_code}
                                            </td>

                                            <td className="p-4">
                                                {courier.courier_name}
                                            </td>

                                            <td className="p-4">
                                                {courier.mobile}
                                            </td>

                                            <td className="p-4">
                                                {courier.email}
                                            </td>

                                            <td className="p-4">
                                                {courier.vehicle_no}
                                            </td>

                                            <td className="p-4">

                                                {
                                                    courier.is_available ?

                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                                            Available
                                                        </span>

                                                        :

                                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                                                            Busy
                                                        </span>
                                                }

                                            </td>

                                            <td className="p-4">

                                                <div className="flex gap-2 justify-center">

                                                    <button
                                                        onClick={() =>
                                                            viewCourier(
                                                                courier
                                                            )
                                                        }
                                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            editCourier(
                                                                courier
                                                            )
                                                        }
                                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteCourier(
                                                                courier.courier_id
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
                            )
                        }

                    </tbody>

                </table>

            </div>
{showViewModal && selectedCourier && (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

        <div className="bg-white rounded-lg p-6 w-[500px]">

            <h2 className="text-2xl font-bold mb-4">
                Courier Details
            </h2>

            <div className="space-y-2">

                <p>
                    <strong>Code:</strong>
                    {selectedCourier.courier_code}
                </p>

                <p>
                    <strong>Name:</strong>
                    {selectedCourier.courier_name}
                </p>

                <p>
                    <strong>Mobile:</strong>
                    {selectedCourier.mobile}
                </p>

                <p>
                    <strong>Email:</strong>
                    {selectedCourier.email}
                </p>

                <p>
                    <strong>Vehicle:</strong>
                    {selectedCourier.vehicle_no}
                </p>

                <p>
                    <strong>Status:</strong>
                    {
                        selectedCourier.is_available
                            ? 'Available'
                            : 'Busy'
                    }
                </p>

                <p>
                    <strong>Latitude:</strong>
                    {
                        selectedCourier.current_latitude
                    }
                </p>

                <p>
                    <strong>Longitude:</strong>
                    {
                        selectedCourier.current_longitude
                    }
                </p>

            </div>

            <div className="flex justify-end mt-6">

                <button
                    onClick={() =>
                        setShowViewModal(false)
                    }
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                    Close
                </button>

            </div>

        </div>

    </div>

)}

{
    showFormModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        {
                            isEditMode
                                ? 'Edit Courier'
                                : 'Add Courier'
                        }

                    </h2>

                    <button
                        onClick={() =>
                            setShowFormModal(false)
                        }
                        className="text-gray-500 text-xl"
                    >
                        ✕
                    </button>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="courier_code"
                        placeholder="Courier Code"
                        value={formData.courier_code}
                        onChange={handleInputChange}
                        className="border rounded p-3"
                        disabled={isEditMode}
                    />

                    <input
                        type="text"
                        name="courier_name"
                        placeholder="Courier Name"
                        value={formData.courier_name}
                        onChange={handleInputChange}
                        className="border rounded p-3"
                    />

                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="border rounded p-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border rounded p-3"
                    />

                    <input
                        type="text"
                        name="vehicle_no"
                        placeholder="Vehicle Number"
                        value={formData.vehicle_no}
                        onChange={handleInputChange}
                        className="border rounded p-3"
                    />

                    {
                        isEditMode && (

                            <label className="flex items-center gap-2">

                                <input
                                    type="checkbox"
                                    name="is_available"
                                    checked={formData.is_available}
                                    onChange={handleInputChange}
                                />

                                Available

                            </label>
                        )
                    }

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

                        onClick={saveCourier}

                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >

                        {
                            isEditMode
                                ? 'Update Courier'
                                : 'Save Courier'
                        }

                    </button>

                </div>

            </div>

        </div>
    )
}
        </AdminLayout>
    );
};

export default Couriers;