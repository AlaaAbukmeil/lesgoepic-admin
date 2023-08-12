import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/errorPage";
import GetUpcomingEvents from "../components/events/getUpcomingEvents";
import AddNewEvent from "../components/events/addNewEvent";
import EditEvent from "../components/events/editEvent";
import Login from "../components/common/login";
import GetSchedule from "../components/schedule/getSchedule";
import GetAlbums from "../components/albums/getAlbums";
import EditAlbum from "../components/albums/editAlbum";
import AddNewAlbum from "../components/albums/addAlbum";
import GetPosts from "../components/blog/getPosts";
import EditPost from "../components/blog/editPost";
import AddNewPost from "../components/blog/addPost";
import GetForms from "../components/forms/getForms";
import ViewResponses from "../components/forms/viewResponses";
import SignUp from "../components/common/signUp";
import CustomersInfo from "../components/customers/customersInfo";
import Feedback from "../components/common/feedback";
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
    path: "/signUp",
    element: <SignUp />,
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
  },
  {
    path: "/monthlySchedule",
    element: <GetSchedule />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/albums",
    element: <GetAlbums />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editAlbum/:albumId",
    element: <EditAlbum />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addNewAlbum",
    element: <AddNewAlbum />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/posts",
    element: <GetPosts />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editPost/:postId",
    element: <EditPost />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addNewPost",
    element: <AddNewPost />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forms",
    element: <GetForms />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/form/:formId",
    element: <ViewResponses />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/customers",
    element: <CustomersInfo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
    errorElement: <ErrorPage />,
  }
]);

export default router;
