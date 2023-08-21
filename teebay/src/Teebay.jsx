import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const protectedRoutes = [
  {
    path: "/",
    element: <Home />,
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
