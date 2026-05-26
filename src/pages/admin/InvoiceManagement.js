import React, {

    useEffect,
    useState

} from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import api from '../../api/api';


const InvoiceManagement = () => {

    const [invoices, setInvoices] =
        useState([]);


    // ======================================
    // FETCH INVOICES
    // ======================================

    const fetchInvoices = async () => {

        try {

            const response =
                await api.get(
                    '/invoices'
                );

            setInvoices(
                response.data.data
            );

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        fetchInvoices();

    }, []);


    return (

        <AdminLayout>

            {/* Header */}
            <div className="mb-6">

                <h1 className="text-3xl font-bold">

                    Invoice Management

                </h1>

                <p className="text-gray-500 mt-2">

                    Billing & Finance
                </p>

            </div>


            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Invoice No
                            </th>

                            <th className="p-4 text-left">
                                Customer
                            </th>

                            <th className="p-4 text-left">
                                AWB
                            </th>

                            <th className="p-4 text-left">
                                Amount
                            </th>

                            <th className="p-4 text-left">
                                GST
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

                        {invoices.map((invoice) => (

                            <tr
                                key={invoice.invoice_id}

                                className="border-t"
                            >

                                <td className="p-4 font-semibold">

                                    {
                                        invoice.invoice_no
                                    }

                                </td>


                                <td className="p-4">

                                    {
                                        invoice.customer_name
                                    }

                                </td>


                                <td className="p-4">

                                    {
                                        invoice.awb_no
                                    }

                                </td>


                                <td className="p-4">

                                    ₹ {
                                        invoice.total_amount
                                    }

                                </td>


                                <td className="p-4">

                                    ₹ {
                                        invoice.gst_amount
                                    }

                                </td>


                                <td className="p-4">

                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                                        {
                                            invoice.payment_status
                                        }

                                    </span>

                                </td>


                                {/* Actions */}
                                <td className="p-4">

                                    <a
                                        href={`https://dzchrono.onrender.com/invoices/pdf/${invoice.invoice_id}`}

                                        target="_blank"

                                        rel="noreferrer"

                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Download PDF
                                    </a>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
};

export default InvoiceManagement;