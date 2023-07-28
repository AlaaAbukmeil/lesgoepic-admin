"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const variables_1 = __importDefault(require("../common/variables"));
const loader_1 = __importDefault(require("../common/loader"));
const axios_1 = __importDefault(require("axios"));
const react_router_dom_2 = require("react-router-dom");
function EditEvent() {
    let params = (0, react_router_dom_1.useParams)();
    let navigate = (0, react_router_dom_2.useNavigate)();
    let url = variables_1.default + "/editEvent/" + params.eventId;
    let [eventInfo, setEventDetails] = (0, react_1.useState)();
    let [eventName, setEventName] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.name);
    let [eventLocation, setEventLocation] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.location);
    let [eventDate, setEventDate] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.date);
    let [eventCost, setEventCost] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.cost);
    let [eventDisplay, setEventDisplay] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.display);
    let [eventShortDescription, setEventShortDescription] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.shortDescription);
    let [eventDescription, setEventDescription] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.description);
    let [eventQuestions, setEventQuestions] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.questions);
    let [eventNotes, setEventNotes] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.notes);
    let [eventStripe, setEventStripe] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.stripe);
    let [eventTimeslots, setEventTimeslots] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.timeslots);
    let [eventGoogleMaps, setEventGoogleMaps] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.googleMaps);
    let [eventOrder, setEventOrder] = (0, react_1.useState)(eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.order);
    (0, react_1.useEffect)(() => {
        fetch(url)
            .then((res) => {
            return res.json();
        })
            .then((data) => {
            if (data.eventInfo) {
                setEventDetails(data.eventInfo);
                setEventName(data.eventInfo.name);
                setEventLocation(data.eventInfo.location);
                setEventDate(data.eventInfo.date);
                setEventCost(data.eventInfo.cost);
                setEventDisplay(data.eventInfo.display);
                setEventShortDescription(data.eventInfo.shortDescription);
                setEventDescription(data.eventInfo.description);
                setEventQuestions(data.eventInfo.questions);
                setEventNotes(data.eventInfo.notes);
                setEventStripe(data.eventInfo.stripe);
                setEventTimeslots(data.eventInfo.timeslots);
                setEventGoogleMaps(data.eventInfo.googleMaps);
                setEventOrder(data.eventInfo.order);
            }
            else {
                setEventDetails(data.status);
            }
        });
    }, []);
    async function handleSubmit(action, event) {
        try {
            event.preventDefault();
            const form = document.getElementById("editEventForm");
            let formData = new FormData(form);
            try {
                await axios_1.default
                    .post(action, formData)
                    .catch((error) => console.log(error));
                navigate("/");
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    function nameInputOnChange(event) {
        setEventName(event.target.value);
    }
    function locationInputOnChange(event) {
        setEventLocation(event.target.value);
    }
    function dateInputOnChange(event) {
        setEventDate(event.target.value);
    }
    function costInputOnChange(event) {
        setEventCost(event.target.value);
    }
    function displayInputOnChange(event) {
        setEventDisplay(event.target.value);
    }
    function shortDescriptionInputOnChange(event) {
        setEventShortDescription(event.target.value);
    }
    function descriptionInputOnChange(event) {
        setEventDescription(event.target.value);
    }
    function questionsInputOnChange(event) {
        setEventQuestions(event.target.value);
    }
    function notesInputOnChange(event) {
        setEventNotes(event.target.value);
    }
    function stripeInputOnChange(event) {
        setEventStripe(event.target.value);
    }
    function timeslotsInputOnChange(event) {
        setEventTimeslots(event.target.value);
    }
    function googleMapsInputOnChange(event) {
        setEventGoogleMaps(event.target.value);
    }
    function orderInputOnChange(event) {
        setEventOrder(event.target.value);
    }
    if (eventInfo == null) {
        return (<div>
        <loader_1.default />
      </div>);
    }
    let display;
    if (eventInfo.display == "true") {
        display = ["True", "False"];
    }
    else {
        display = ["False", "True"];
    }
    return (<div>
      <div className="title">
        <h1>{eventInfo["name"]}</h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form id="editEventForm" method="post" encType="multipart/form-data">
            <div className="card">
              <img src={eventInfo.image} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="name">
                  <b>Name:</b>
                </h4>
                <input type="text" name="name" className="formTextInput" value={eventName} onChange={nameInputOnChange} placeholder={eventInfo.name} required/>

                <h4 className="date">
                  <b>Date:</b>{" "}
                </h4>
                <input type="text" name="date" className="formTextInput" value={eventDate} onChange={dateInputOnChange} placeholder={eventInfo.date} required/>

                <h4 className="name">
                  <b>Location:</b>{" "}
                </h4>
                <input type="text" name="location" className="formTextInput" value={eventLocation} onChange={locationInputOnChange} placeholder={eventInfo.location} required/>

                <h4 className="name">
                  <b>Cost:</b>{" "}
                </h4>
                <input type="text" name="cost" className="formTextInput" value={eventCost} onChange={costInputOnChange} placeholder={eventInfo.cost} required/>

                <h4 className="name">
                  <b>Short Description:</b>{" "}
                </h4>
                <input type="text" name="shortDescription" className="formTextInput" value={eventShortDescription} onChange={shortDescriptionInputOnChange} placeholder={eventInfo.shortDescription} required/>

                <h4 className="name">
                  <b>Description:</b>{" "}
                </h4>
                <input type="text" name="description" className="formTextInput" value={eventDescription} onChange={descriptionInputOnChange} placeholder={eventInfo.description} required/>

                <h4 className="name">
                  <b>Image:</b>{" "}
                </h4>
                <input title="poster" type="file" name="poster" className="formTextInput" accept="image/*"/>

                <h4 className="name">
                  <b>Timeslots:</b>
                </h4>
                <input type="text" name="timeslots" className="formTextInput" value={eventTimeslots} onChange={timeslotsInputOnChange} placeholder={eventInfo.timeslots} required/>

                <h4 className="name">
                  <b>Display:</b>{" "}
                </h4>

                <select title="display" name="display" className="formTextInput" value={eventDisplay} onChange={displayInputOnChange} placeholder={eventInfo.display} required>
                  <option value="true">{display[0]}</option>
                  <option value="false">{display[1]}</option>
                </select>

                <h4 className="name">
                  <b>Questions:</b>{" "}
                </h4>
                <input type="text" name="questions" className="formTextInput" value={eventQuestions} onChange={questionsInputOnChange} placeholder={eventInfo.questions} required/>

                <h4 className="name">
                  <b>Notes:</b>{" "}
                </h4>
                <input type="text" name="notes" className="formTextInput" value={eventNotes} onChange={notesInputOnChange} placeholder={eventInfo.notes} required/>

                <h4 className="name">
                  <b>Credit/Debit Stripe Url:</b>{" "}
                </h4>
                <input type="text" name="stripe" className="formTextInput" value={eventStripe} onChange={stripeInputOnChange} placeholder={eventInfo.stripe} required/>

                <h4 className="name">
                  <b>Google Maps:</b>{" "}
                </h4>
                <input type="text" name="googleMaps" className="formTextInput" value={eventGoogleMaps} onChange={googleMapsInputOnChange} placeholder={eventInfo.googleMaps} required/>

                <h4 className="name">
                  <b>Order:</b>{" "}
                </h4>
                <input type="text" name="order" className="formTextInput" value={eventOrder} onChange={orderInputOnChange} placeholder={eventInfo.order} required/>

                <button type="button" onClick={(event) => handleSubmit(variables_1.default + "/editEvent/:" + (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo["_id"]), event)} className="btn editButton">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>);
}
exports.default = EditEvent;
