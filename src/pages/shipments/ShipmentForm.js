import React, {

    useEffect,
    useState

} from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import api from '../../api/api';

import { useNavigate } from 'react-router-dom';


const ShipmentForm = () => {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    const [services, setServices] = useState([]);

    const [shippingAmount, setShippingAmount] = useState(0);


    const [formData, setFormData] = useState({

        customer_id: '',

        sender_name: '',
        sender_mobile: '',
        sender_address: '',

        receiver_name: '',
        receiver_mobile: '',
        receiver_address: '',

        receiver_city: '',
        receiver_state: '',
        receiver_pincode: '',

        service_type_id: '',

        actual_weight: '',

        length: '',
        width: '',
        height: ''
    });


    // ======================================
    // FETCH DATA
    // ======================================

    useEffect(() => {

        fetchCustomers();

        fetchServices();

    }, []);


    const fetchCustomers = async () => {

        try {

            const response =
                await api.get('/customers');

            setCustomers(response.data.data);

        } catch (error) {

            console.error(error);
        }
    };


    const fetchServices = async () => {

        try {

            const response =
                await api.get('/shipments/service-types');

            setServices(response.data.data);

        } catch (error) {

            console.error(error);
        }
    };


    // ======================================
    // HANDLE CHANGE
    // ======================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };


    // ======================================
    // CALCULATE RATE
    // ======================================

    const calculateRate = async () => {

        try {

            const response =
                await api.post(
                    '/shipments/calculate-rate',
                    {

                        source_city: 'Jodhpur',
                        source_state: 'Rajasthan',

                        destination_city:
                            formData.receiver_city,

                        destination_state:
                            formData.receiver_state,

                        service_type_id:
                            formData.service_type_id,

                        actual_weight:
                            parseFloat(formData.actual_weight),

                        length:
                            parseFloat(formData.length),

                        width:
                            parseFloat(formData.width),

                        height:
                            parseFloat(formData.height)
                    }
                );

            setShippingAmount(
                response.data.shipping_amount
            );

        } catch (error) {

            console.error(error);

            alert(
        error.response?.data?.message ||
        'Rate calculation failed'
    );
        }
    };


    // ======================================
    // CREATE SHIPMENT
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {

                ...formData,

                actual_weight:
                    parseFloat(formData.actual_weight),

                shipping_amount:
                    shippingAmount
            };


            const response =
                await api.post(
                    '/shipments',
                    payload
                );

            alert(
                `Shipment Created\nAWB: ${response.data.data.awb_no}`
            );

            navigate('/shipments');

        } catch (error) {

            console.error(error);

            alert('Shipment creation failed');
        }
    };


    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">

                Book Shipment

            </h1>


            <form
                onSubmit={handleSubmit}

                className="bg-white p-6 rounded shadow"
            >

                <div className="grid grid-cols-2 gap-6">

                    {/* Customer */}
                    <div>

                        <label className="block mb-2">
                            Customer
                        </label>

                        <select
                            name="customer_id"

                            value={formData.customer_id}

                            onChange={handleChange}

                            className="w-full border p-3 rounded"
                        >

                            <option value="">
                                Select Customer
                            </option>

                            {customers.map((customer) => (

                                <option
                                    key={customer.customer_id}

                                    value={customer.customer_id}
                                >

                                    {customer.customer_name}

                                </option>
                            ))}

                        </select>

                    </div>


                    {/* Service */}
                    <div>

                        <label className="block mb-2">
                            Service Type
                        </label>

                        <select
                            name="service_type_id"

                            value={formData.service_type_id}

                            onChange={handleChange}

                            className="w-full border p-3 rounded"
                        >

                            <option value="">
                                Select Service
                            </option>

                            {services.map((service) => (

                                <option
                                    key={service.service_type_id}

                                    value={service.service_type_id}
                                >

                                    {service.service_name}

                                </option>
                            ))}

                        </select>

                    </div>


                    {/* Sender */}
                    <input
                        type="text"

                        name="sender_name"

                        placeholder="Sender Name"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <input
                        type="text"

                        name="sender_mobile"

                        placeholder="Sender Mobile"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <textarea
                        name="sender_address"

                        placeholder="Sender Address"

                        onChange={handleChange}

                        className="border p-3 rounded col-span-2"
                    />


                    {/* Receiver */}
                    <input
                        type="text"

                        name="receiver_name"

                        placeholder="Receiver Name"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <input
                        type="text"

                        name="receiver_mobile"

                        placeholder="Receiver Mobile"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <textarea
                        name="receiver_address"

                        placeholder="Receiver Address"

                        onChange={handleChange}

                        className="border p-3 rounded col-span-2"
                    />

                    <input
                        type="text"

                        name="receiver_city"

                        placeholder="Receiver City"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <input
                        type="text"

                        name="receiver_state"

                        placeholder="Receiver State"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <input
                        type="text"

                        name="receiver_pincode"

                        placeholder="Receiver Pincode"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />


                    {/* Weight */}
                    <input
                        type="number"

                        name="actual_weight"

                        placeholder="Actual Weight"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <input
                        type="number"

                        name="length"

                        placeholder="Length"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <input
                        type="number"

                        name="width"

                        placeholder="Width"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                    <input
                        type="number"

                        name="height"

                        placeholder="Height"

                        onChange={handleChange}

                        className="border p-3 rounded"
                    />

                </div>


                {/* Buttons */}
                <div className="flex gap-4 mt-6">

                    <button
                        type="button"

                        onClick={calculateRate}

                        className="bg-yellow-500 text-white px-6 py-3 rounded"
                    >
                        Calculate Rate
                    </button>


                    <button
                        type="submit"

                        className="bg-blue-600 text-white px-6 py-3 rounded"
                    >
                        Create Shipment
                    </button>

                </div>


                {/* Shipping Amount */}
                <div className="mt-6 text-2xl font-bold text-green-600">

                    Shipping Amount: ₹ {shippingAmount}

                </div>

            </form>

        </AdminLayout>
    );
};

export default ShipmentForm;