import { createBrowserRouter } from "react-router-dom";
import { Transactions } from "./pages/Transactions";
import { Auth } from "./pages/Auth";
import { PrivateRoute } from "./contexts/PrivateRoute";
import { SignIn } from "./pages/Auth/SignIn/sign-in";
import { SignUp } from "./pages/Auth/SignUp/sign-up";

export const router = createBrowserRouter([
    {
        path: '/transactions',
        element:
            <PrivateRoute>
                <Transactions />
            </PrivateRoute>
    },
    {
        path: '/login',
        element: <Auth />,
        children: [
            { element: <SignIn /> },
            { element: <SignUp /> }
        ]
    }
])