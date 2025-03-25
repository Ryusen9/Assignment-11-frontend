import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../Layout/HomeLayout";
import ErrorPage from "../Components/ErrorPage";
import LogInPage from "../Components/LogInPage";
import Register from "../Components/Register";
import MoreMarathon from "../Components/MoreMarathon";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomeLayout/>
            },
            {
                path: "/logIn",
                element: <LogInPage/>
            },
            {
                path:"/register",
                element: <Register/>,
            }, 
            {
                path: "/moreEvents",
                element: <MoreMarathon/>,
                loader: () => fetch("http://localhost:5000/eventCount")
            }
        ]
    }
])

export default routers;