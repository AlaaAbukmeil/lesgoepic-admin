import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/errorPage";
import GetUpcomingEvents from "../components/events/getUpcomingEvents";
import AddNewEvent from "../components/events/addNewEvent";
import EditEvent from "../components/events/editEvent";
import Login from "../components/common/login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <GetUpcomingEvents />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addNewEvent",
    element: <AddNewEvent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editEvent/:eventId",
    element: <EditEvent />,
    errorElement: <ErrorPage />,
  }
]);

export default router;
