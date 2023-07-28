"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = __importDefault(require("../common/variables"));
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
function GetPassedEvents(events) {
    let passedEvents = events.passedEvents;
    async function confirmDeleteEvent(eventName, formaction) {
        let result = window.confirm("Are you sure you want to delete " + eventName + "?");
        let deleteUrl = variables_1.default + formaction;
        if (result) {
            await axios_1.default.post(deleteUrl).then((res) => window.location.reload()).catch((error) => console.log(error));
        }
    }
    if (!events) {
        return <div></div>;
    }
    return (<div className="row">
      {passedEvents.map((passedEvent, index) => (<div key={index} className="col-lg-4 col-md-6 col-10 eventCard">
          <form name={passedEvent.name}>
            <div className="card">
              <img src={passedEvent.image} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="date">📅 {passedEvent.date}</h4>
                <h4 className="name">📍 {passedEvent.name}</h4>
                <h4 className="name">💸 {passedEvent.cost}</h4>
                <h4 className="name">Order: {passedEvent.order}</h4>
                <div className="buttons">
                  <button type="button" onClick={(event) => confirmDeleteEvent(passedEvent.name, "/deleteEvent/:" + passedEvent["_id"])} className="btn btn-danger deleteButton">
                    DELETE
                  </button>
                  <react_router_dom_1.Link to={"/editEvent/:" + passedEvent["_id"]} className="btn signupButton">
                    Edit
                  </react_router_dom_1.Link>
                </div>
              </div>
            </div>
          </form>
        </div>))}
    </div>);
}
exports.default = GetPassedEvents;
