import React, {
    useEffect,
    useState
} from 'react';

import api from '../../api/api';
import AdminLayout from '../../layouts/AdminLayout';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
const [selectedCustomer, setSelectedCustomer] = useState(null);

const [showViewModal, setShowViewModal] = useState(false);

const viewCustomer = (customer) => {

    setSelectedCustomer(customer);

    setShowViewModal(true);
};

const deleteCustomer = async (id) => {

    const confirmed = window.confirm(
        'Are you sure you want to delete this customer?'
    );

    if (!confirmed) return;

    try {

        await api.delete(
            `/customers/${id}`
        );

        fetchCustomers();

        alert('Customer deleted successfully');

    } catch (error) {

        console.error(error);

        alert('Failed to delete customer');
    }
};
const [showFormModal, setShowFormModal] = useState(false);

const [isEditMode, setIsEditMode] = useState(false);

const [editingCustomerId, setEditingCustomerId] = useState(null);

const [formData, setFormData] = useState({

    customer_code: '',
    customer_name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gst_no: ''

});
const handleInputChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]:
            e.target.value
    });
};
const editCustomer = (customer) => {

    setIsEditMode(true);

    setEditingCustomerId(
        customer.customer_id
    );

    setFormData({

        customer_code:
            customer.customer_code || '',

        customer_name:
            customer.customer_name || '',

        mobile:
            customer.mobile || '',

        email:
            customer.email || '',

        address:
            customer.address || '',

        city:
            customer.city || '',

        state:
            customer.state || '',

        pincode:
            customer.pincode || '',

        gst_no:
            customer.gst_no || ''

    });

    setShowFormModal(true);
};

const saveCustomer = async () => {

    try {

        if (isEditMode) {

            await api.put(

                `/customers/${editingCustomerId}`,

                formData
            );

            alert(
                'Customer updated successfully'
            );

        } else {

            await api.post(

                '/customers',

                formData
            );

            alert(
                'Customer created successfully'
            );
        }

        setShowFormModal(false);

        fetchCustomers();

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
    // FETCH CUSTOMERS
    // ======================================

    const fetchCustomers = async () => {

        try {

            const response =
                await api.get('/customers');

            setCustomers(
                response.data.data || []
            );

        } catch (error) {

            console.error(
                'CUSTOMER FETCH ERROR',
                error
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchCustomers();

    }, []);

    // ======================================
    // FILTER
    // ======================================

    const filteredCustomers =
        customers.filter((customer) => {

            return (

                customer.customer_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                customer.mobile
                    ?.includes(search)

                ||

                customer.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                customer.city
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        });

    return (

        <AdminLayout>

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-4xl font-bold">

                        Customers

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Customer Management

                    </p>

                </div>

                <button

    onClick={() => {

        setIsEditMode(false);

        setEditingCustomerId(null);

        setFormData({

            customer_code: '',
            customer_name: '',
            mobile: '',
            email: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            gst_no: ''

        });

        setShowFormModal(true);
    }}

    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
>

    + Add Customer

</button>
            </div>


            {/* Statistics */}

            <div className="grid md:grid-cols-3 gap-6 mb-6">

                <div className="bg-white rounded-lg shadow p-6">

                    <p className="text-gray-500">

                        Total Customers

                    </p>

                    <h2 className="text-4xl font-bold mt-2">

                        {customers.length}

                    </h2>

                </div>

                <div className="bg-white rounded-lg shadow p-6">

                    <p className="text-gray-500">

                        Active Customers

                    </p>

                    <h2 className="text-4xl font-bold text-green-600 mt-2">

                        {customers.length}

                    </h2>

                </div>

                <div className="bg-white rounded-lg shadow p-6">

                    <p className="text-gray-500">

                        Cities Covered

                    </p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-2">

                        {
                            [...new Set(
                                customers.map(
                                    c => c.city
                                )
                            )].length
                        }

                    </h2>

                </div>

            </div>


            {/* Search */}

            <div className="bg-white rounded-lg shadow p-4 mb-6">

                <input
                    type="text"

                    placeholder="Search Customer Name, Mobile, Email or City"

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>


            {/* Customer Table */}

            <div className="bg-white rounded-lg shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Code
                            </th>

                            <th className="p-4 text-left">
                                Customer Name
                            </th>

                            <th className="p-4 text-left">
                                Mobile
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                City
                            </th>

                            <th className="p-4 text-left">
                                State
                            </th>

                            <th className="p-4 text-left">
                                GST No
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
                                        colSpan="9"
                                        className="p-6 text-center"
                                    >

                                        Loading Customers...

                                    </td>

                                </tr>

                            ) : filteredCustomers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="p-6 text-center"
                                    >

                                        No Customers Found

                                    </td>

                                </tr>

                            ) : (

                                filteredCustomers.map((customer) => (

                                    <tr
                                        key={
                                            customer.customer_id
                                        }

                                        className="border-t hover:bg-blue-50 transition"
                                    >

                                        <td className="p-4">

                                            {
                                                customer.customer_code
                                            }

                                        </td>

                                        <td className="p-4 font-medium">

                                            {
                                                customer.customer_name
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                customer.mobile
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                customer.email
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                customer.city
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                customer.state
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                customer.gst_no
                                            }

                                        </td>

                                        <td className="p-4">

                                            <span
                                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                                            >
                                                Active
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <div className="flex gap-2 justify-center">

                                                <button
    onClick={() => viewCustomer(customer)}
    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
>
    View
</button>

                                                <button

    onClick={() =>
        editCustomer(customer)
    }

    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
>

    Edit

</button>

                                                <button
    onClick={() =>
        deleteCustomer(
            customer.customer_id
        )
    }
    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
>
    Delete
</button>

                                            </div>

                                        </td>

                                    </tr>

                                ))
                            )
                        }

                    </tbody>

                </table>

            </div>
{
    showViewModal &&
    selectedCustomer && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">

                <div className="flex justify-between mb-4">

                    <h2 className="text-2xl font-bold">

                        Customer Details

                    </h2>

                    <button
                        onClick={() =>
                            setShowViewModal(false)
                        }
                    >
                        ✕
                    </button>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <strong>Code:</strong>
                        {' '}
                        {selectedCustomer.customer_code}
                    </div>

                    <div>
                        <strong>Name:</strong>
                        {' '}
                        {selectedCustomer.customer_name}
                    </div>

                    <div>
                        <strong>Mobile:</strong>
                        {' '}
                        {selectedCustomer.mobile}
                    </div>

                    <div>
                        <strong>Email:</strong>
                        {' '}
                        {selectedCustomer.email}
                    </div>

                    <div>
                        <strong>City:</strong>
                        {' '}
                        {selectedCustomer.city}
                    </div>

                    <div>
                        <strong>State:</strong>
                        {' '}
                        {selectedCustomer.state}
                    </div>

                    <div>
                        <strong>Pincode:</strong>
                        {' '}
                        {selectedCustomer.pincode}
                    </div>

                    <div>
                        <strong>GST:</strong>
                        {' '}
                        {selectedCustomer.gst_no}
                    </div>

                </div>

            </div>

        </div>
    )
}

{
    showFormModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg w-full max-w-3xl p-6">

                <div className="flex justify-between mb-6">

                    <h2 className="text-2xl font-bold">

                        {
                            isEditMode
                                ?
                                'Edit Customer'
                                :
                                'Add Customer'
                        }

                    </h2>

                    <button
                        onClick={() =>
                            setShowFormModal(false)
                        }
                    >
                        ✕
                    </button>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        name="customer_code"
                        placeholder="Customer Code"
                        value={formData.customer_code}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="customer_name"
                        placeholder="Customer Name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="mobile"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="gst_no"
                        placeholder="GST Number"
                        value={formData.gst_no}
                        onChange={handleInputChange}
                        className="border p-3 rounded"
                    />

                </div>

                <textarea

                    name="address"

                    placeholder="Address"

                    value={formData.address}

                    onChange={handleInputChange}

                    className="border p-3 rounded w-full mt-4"

                    rows="3"
                />

                <div className="flex justify-end mt-6 gap-3">

                    <button

                        onClick={() =>
                            setShowFormModal(false)
                        }

                        className="bg-gray-500 text-white px-5 py-2 rounded"
                    >

                        Cancel

                    </button>

                    <button

                        onClick={saveCustomer}

                        className="bg-blue-600 text-white px-5 py-2 rounded"
                    >

                        {
                            isEditMode
                                ?
                                'Update'
                                :
                                'Save'
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

export default Customers;