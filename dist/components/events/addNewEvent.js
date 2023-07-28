"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const variables_1 = __importDefault(require("../common/variables"));
function AddNewEvent() {
    let navigate = (0, react_router_dom_1.useNavigate)();
    async function handleSubmit(event) {
        event.preventDefault();
        const form = document.getElementById("addNewEventForm");
        let formData = new FormData(form);
        await axios_1.default
            .post(variables_1.default + "/addNewEvent", formData)
            .then((res) => navigate("/"))
            .catch((error) => console.log(error));
    }
    return (<div>
      <div className="title">
        <h1>Add New Event</h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form name="addNewEvent" className="addNewEvent" onSubmit={handleSubmit} encType="multipart/form-data" id="addNewEventForm">
            <div className="card">
              <div className="card-body">
                <h4 className="name">
                  <b>Name</b>:
                </h4>
                <input type="text" name="name" className="formTextInput" placeholder="Enter Name" required/>

                <h4 className="date">
                  <b>Date:</b>{" "}
                </h4>
                <input type="text" name="date" className="formTextInput" placeholder="Enter Date" required/>

                <h4 className="name">
                  <b>Location:</b>{" "}
                </h4>
                <input type="text" name="location" className="formTextInput" placeholder="Enter Location" required/>

                <h4 className="name">
                  <b>Cost:</b>{" "}
                </h4>
                <input type="text" name="cost" className="formTextInput" placeholder="Enter Cost" required/>

                <h4 className="name">
                  <b>Short Description:</b>{" "}
                </h4>
                <input type="text" name="shortDescription" className="formTextInput" placeholder="Enter Short Description" required/>

                <h4 className="name">
                  <b>Description:</b>{" "}
                </h4>
                <input type="text" name="description" className="formTextInput" placeholder="Enter Description" required/>

                <h4 className="name">
                  <b>Image:</b>{" "}
                </h4>
                <input title="poster" placeholder="Upload Poster" type="file" name="poster" className="formTextInput" accept="image/*" required/>

                <h4 className="name">
                  <b>Timeslots:</b>
                </h4>
                <input type="text" name="timeslots" className="formTextInput" placeholder="Enter Cash Time Slots, seprated by /" required/>

                <h4 className="name">
                  <b>Display:</b>{" "}
                </h4>
                <select title="display" name="display" className="formTextInput" placeholder="Enter Display" required>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>

                <h4 className="name">
                  <b>Questions:</b>{" "}
                </h4>
                <input type="text" name="questions" className="formTextInput" placeholder="Enter questions seperated by a /, if none, enter 0" required/>

                <h4 className="name">
                  <b>Notes:</b>{" "}
                </h4>
                <input type="text" name="notes" className="formTextInput" placeholder="Enter notes seperated by a /" required/>

                <h4 className="name">
                  <b>Credit/Debit Stripe Url:</b>{" "}
                </h4>
                <input type="text" name="stripe" className="formTextInput" placeholder="Enter Stripe URL payment link" required/>

                <h4 className="name">
                  <b>Google Maps Link:</b>{" "}
                </h4>
                <input type="text" name="googleMaps" className="formTextInput" placeholder="Enter Google Maps Link" required/>

                <h4 className="name">
                  <b>Order:</b>{" "}
                </h4>
                <input type="text" name="order" className="formTextInput" placeholder="Enter the order number of the event" required/>

                <button type="submit" className="btn addNewEventButton">
                  Add New Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);
}
exports.default = AddNewEvent;
