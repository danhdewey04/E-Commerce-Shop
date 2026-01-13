import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Search from "../pages/Search";
import Success from "../pages/Success";

export default [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/Category-:id",
        element: Category,
    },
    {
        path: "/Search",
        element: Search,
    },
    {
        path: "/ProductDetails-:id",
        element: ProductDetail,
    },
    {
        path: "/Cart",
        element: Cart,
    },
    {
        path: "/Success",
        element: Success,
    },
    {
        path: "*",
        element: NotFound,
    },
    {
        path: "/Register",
        element: Register,
    },
    {
        path: "/Login",
        element: Login,
    },
];