import { createBrowserRouter } from "react-router-dom";
import { Transactions } from "./pages/Transactions";
import { Auth } from "./pages/Auth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Transactions />
    },
    {
        path: '/login',
        element: <Auth />
    }
])