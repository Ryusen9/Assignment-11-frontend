import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../Layout/HomeLayout";
import ErrorPage from "../Components/ErrorPage";
import LogInPage from "../Components/LogInPage";
import Register from "../Components/Register";
import MoreMarathon from "../Components/MoreMarathon";
import EventDetails from "../Components/EventDetails";
import AddMarathon from "../Components/AddMarathon";
import MyMarathon from "../Components/MyMarathon";
import MarathonApply from "../Components/MarathonApply";
import MarathonApplyList from "../Components/MarathonApplyList";
import PrivateRoute from "./PrivateRoute";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/logIn",
        element: <LogInPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/moreEvents",
        element: <MoreMarathon />,
        loader: () =>
          fetch("https://assignment-11-backend-three.vercel.app/eventCount"),
      },
      {
        path: "/event/:id",
        element: <EventDetails />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-11-backend-three.vercel.app/event/${params.id}`
          ),
      },
      {
        path: "/addMarathonEvent",
        element: <PrivateRoute><AddMarathon /></PrivateRoute>,
      },
      {
        path: "/myMarathon",
        element: <PrivateRoute><MyMarathon /></PrivateRoute>,
      },
      {
        path: "/marathonApply",
        element: <PrivateRoute><MarathonApply /></PrivateRoute>,
      },
      {
        path: "/myMarathonApplications",
        element: <PrivateRoute><MarathonApplyList /></PrivateRoute>,
      },
    ],
  },
]);

export default routers;
