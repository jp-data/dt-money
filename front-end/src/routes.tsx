import { createBrowserRouter } from "react-router-dom";
import { Transactions } from "./pages/Transactions";
import { Auth } from "./pages/Auth";
import { PrivateRoute } from "./contexts/PrivateRoute";
import { SignIn } from "./pages/Auth/SignIn/sign-in";
import { SignUp } from "./pages/Auth/SignUp/sign-up";
import { Summary } from "./Components/Summary";
import { SearchForm } from "./pages/Transactions/components/SearchForm";

export const router = createBrowserRouter([
    {
        path: '/transactions',
        element:
            <PrivateRoute>
                <Transactions />
            </PrivateRoute>,
        children: [
            { element: <Summary /> },
            { element: <SearchForm /> }
        ]

    },
    {
        path: '/auth',
        element: <Auth />,
        children: [
            { element: <SignIn /> },
            { element: <SignUp /> }
        ]
    }
])