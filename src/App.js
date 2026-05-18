import React from 'react';

import {

    BrowserRouter,
    Routes,
    Route

} from 'react-router-dom';

import Login from './pages/auth/Login';

import Dashboard from './pages/dashboard/Dashboard';

import ProtectedRoute from './routes/ProtectedRoute';

import Shipments from './pages/shipments/Shipments';

import ShipmentForm from './pages/shipments/ShipmentForm';

import ShipmentDetails from './pages/shipments/ShipmentDetails';

import LiveTrackingMap from './pages/tracking/LiveTrackingMap';

import RoleProtectedRoute from './routes/RoleProtectedRoute';

import CustomerDashboard from './pages/customer/CustomerDashboard';

import CustomerTracking from './pages/customer/CustomerTracking';

import CustomerShipments from './pages/customer/CustomerShipments';

import CourierDashboard from './pages/courier/CourierDashboard';

import CourierShipments from './pages/courier/CourierShipments';

import PublicTracking from './pages/public/PublicTracking';

import InvoiceManagement from './pages/admin/InvoiceManagement';

import ShipmentAssignment from './pages/admin/ShipmentAssignment';

import CourierLiveTracking from './pages/courier/CourierLiveTracking';

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />


                {/* Dashboard */}
                <Route
                    path="/dashboard"

                    element={

                        <RoleProtectedRoute
    allowedRoles={['ADMIN']}
>

    <Dashboard />

</RoleProtectedRoute>
                    }
                />
<Route
    path="/shipments"

    element={

        <ProtectedRoute>

            <Shipments />

        </ProtectedRoute>
    }
/>

<Route
    path="/shipments/new"

    element={

        <ProtectedRoute>

            <ShipmentForm />

        </ProtectedRoute>
    }
/>

<Route
    path="/shipments/:awb_no"

    element={

        <ProtectedRoute>

            <ShipmentDetails />

        </ProtectedRoute>
    }
/>

<Route
    path="/live-tracking"

    element={

        <ProtectedRoute>

            <LiveTrackingMap />

        </ProtectedRoute>
    }
/>

<Route
    path="/customer-dashboard"

    element={

        <RoleProtectedRoute
            allowedRoles={['CUSTOMER']}
        >

            <CustomerDashboard />

        </RoleProtectedRoute>
    }
/>

<Route
    path="/customer-tracking"

    element={

        <RoleProtectedRoute
            allowedRoles={['CUSTOMER']}
        >

            <CustomerTracking />

        </RoleProtectedRoute>
    }
/>

<Route
    path="/customer-shipments"

    element={

        <RoleProtectedRoute
            allowedRoles={['CUSTOMER']}
        >

            <CustomerShipments />

        </RoleProtectedRoute>
    }
/>

<Route
    path="/courier-dashboard"

    element={

        <RoleProtectedRoute
            allowedRoles={['COURIER']}
        >

            <CourierDashboard />

        </RoleProtectedRoute>
    }
/>

<Route
    path="/courier-shipments"

    element={

        <RoleProtectedRoute
            allowedRoles={['COURIER']}
        >

            <CourierShipments />

        </RoleProtectedRoute>
    }
/>

<Route
    path="/track"

    element={<PublicTracking />}
/>

<Route
    path="/invoice-management"

    element={

        <RoleProtectedRoute
            allowedRoles={['ADMIN']}
        >

            <InvoiceManagement />

        </RoleProtectedRoute>
    }
/>

<Route
    path="/shipment-assignment"

    element={

        <RoleProtectedRoute
            allowedRoles={['ADMIN']}
        >

            <ShipmentAssignment />

        </RoleProtectedRoute>
    }
/>

<Route
    path="/courier-live-tracking"

    element={

        <RoleProtectedRoute
            allowedRoles={['COURIER']}
        >

            <CourierLiveTracking />

        </RoleProtectedRoute>
    }
/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;