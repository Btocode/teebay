import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


export const protectedRoutes = [
    {
        path: "/",
        component: Home,
        exact: true,
    },
];

export const publicRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];