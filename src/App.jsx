import {createBrowserRouter, RouterProvider} from "react-router-dom";

import "./App.css"

// Import Components
import Error from "./pages/Error.jsx";
import Home from "@/pages/Home.jsx";
import PageNotFound from "@/pages/PageNotFound.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import SignupPage from "@/pages/SignupPage.jsx";
import TourDetailPage from "@/pages/TourDetailPage.jsx";
import AccountOverviewPage from "@/pages/AccountOverviewPage.jsx";
import AccountBookingsPage from "@/pages/AccountBookingsPage.jsx";
import AccountReviewsPage from "@/pages/AccountReviewsPage.jsx";
import AccountBillingPage from "@/pages/AccountBillingPage.jsx";
import AccountSettingsPage from "@/pages/AccountSettingsPage.jsx";
import {AuthProvider} from "@/context/AuthContext.jsx";
import Layout from "@/components/layouts/Layout.jsx"
import CheckoutPage from "#src/pages/CheckoutPage.jsx";
import ForgetPassword from "@/pages/ForgetPassword.jsx";
import ResetPassword from "@/pages/ResetPassword.jsx";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>,
                errorElement: <Error/>,
            },
            {
                path: "/login",
                element: <LoginPage/>,
                errorElement: <Error/>,
            },
            {
                path: "/signup",
                element: <SignupPage/>,
                errorElement: <Error/>,
            },
            {
                path: "/forgot-password",
                element: <ForgetPassword />,
                errorElement: <Error/>,
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />,
                errorElement: <Error/>,
            },
            {
                path: "/tours/:id",
                element: <TourDetailPage/>,
                errorElement: <Error/>,
            },
            {
                path: "checkout/:id",
                element: <CheckoutPage/>,
                errorElement: <Error/>,
            },
            {
                path: "/account",
                element: <AccountOverviewPage/>,
                errorElement: <Error/>,
            },
            {
                path: "/account/bookings",
                element: <AccountBookingsPage/>,
                errorElement: <Error/>,
            },
            {
                path: "/account/reviews",
                element: <AccountReviewsPage/>,
                errorElement: <Error/>,
            },
            {
                path: "/account/billing",
                element: <AccountBillingPage/>,
                errorElement: <Error/>,
            },
            {
                path: "/account/settings",
                element: <AccountSettingsPage/>,
                errorElement: <Error/>,
            },
            {
                path: "*",
                element: <PageNotFound/>,
            }
        ]
    }
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    );
}

export default App;

