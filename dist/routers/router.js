"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const errorPage_1 = __importDefault(require("../components/errorPage"));
const getUpcomingEvents_1 = __importDefault(require("../components/events/getUpcomingEvents"));
const addNewEvent_1 = __importDefault(require("../components/events/addNewEvent"));
const editEvent_1 = __importDefault(require("../components/events/editEvent"));
const login_1 = __importDefault(require("../components/common/login"));
const router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/",
        element: <getUpcomingEvents_1.default />,
        errorElement: <errorPage_1.default />,
    },
    {
        path: "/login",
        element: <login_1.default />,
        errorElement: <errorPage_1.default />,
    },
    {
        path: "/addNewEvent",
        element: <addNewEvent_1.default />,
        errorElement: <errorPage_1.default />,
    },
    {
        path: "/editEvent/:eventId",
        element: <editEvent_1.default />,
        errorElement: <errorPage_1.default />,
    }
]);
exports.default = router;
