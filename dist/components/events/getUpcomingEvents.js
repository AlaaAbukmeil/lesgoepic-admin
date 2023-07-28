"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = __importDefault(require("../common/variables"));
const react_1 = require("react");
const getActiveEvents_1 = __importDefault(require("./getActiveEvents"));
const getPassedEvents_1 = __importDefault(require("./getPassedEvents"));
const loader_1 = __importDefault(require("../common/loader"));
const navbar_1 = __importDefault(require("../common/navbar"));
const cookie_1 = __importDefault(require("../common/cookie"));
const cookie_2 = require("../common/cookie");
function GetUpcomingEvents() {
    let [events, setEvents] = (0, react_1.useState)();
    let url = variables_1.default + "/admin-events";
    (0, react_1.useEffect)(() => {
        fetch(url, cookie_1.default)
            .then((res) => {
            console.log(res.status);
            (0, cookie_2.handleAuth)(res.status);
            return res.json();
        })
            .then((data) => {
            setEvents(data);
        });
    }, []);
    if (!events) {
        return (<div>
        <navbar_1.default />
        <loader_1.default />
      </div>);
    }
    return (<div>
      <navbar_1.default />
      <div className="title">
        <h1>Upcoming Events</h1>
      </div>
      <div className="events row">
        <form className="" action="/addNewEvent" method="get">
          <button type="submit" className="btn addNewEventButton">
            Add new event!
          </button>
        </form>

        <h2 className="sub-title">Active Events</h2>
        <getActiveEvents_1.default {...events}/>
        <h2 className="sub-title">Passed Events</h2>
        <getPassedEvents_1.default {...events}/>
      </div>
    </div>);
}
exports.default = GetUpcomingEvents;
