import { eventInfo } from "../../models/eventInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import proxyUrl from "../common/variables";
import Loader from "../common/loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { act } from "@testing-library/react";

function EditEvent() {
  let params: any = useParams();
  let navigate = useNavigate();
  let url: any = proxyUrl + "/editEvent/" + params.eventId;
  let [eventInfo, setEventDetails] = useState<eventInfo>();
  let [eventName, setEventName] = useState(eventInfo?.name);
  let [eventLocation, setEventLocation] = useState(eventInfo?.location);
  let [eventDate, setEventDate] = useState(eventInfo?.date);
  let [eventCost, setEventCost] = useState(eventInfo?.cost);
  let [eventDisplay, setEventDisplay] = useState(eventInfo?.display);
  let [eventShortDescription, setEventShortDescription] = useState(
    eventInfo?.shortDescription
  );
  let [eventDescription, setEventDescription] = useState(
    eventInfo?.description
  );
  let [eventQuestions, setEventQuestions] = useState(eventInfo?.questions);
  let [eventNotes, setEventNotes] = useState(eventInfo?.notes);
  let [eventStripe, setEventStripe] = useState(eventInfo?.stripe);
  let [eventTimeslots, setEventTimeslots] = useState(eventInfo?.timeslots);
  let [eventGoogleMaps, setEventGoogleMaps] = useState(eventInfo?.googleMaps);
  let [eventOrder, setEventOrder] = useState(eventInfo?.order);

  useEffect(() => {
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
        } else {
          setEventDetails(data.status);
        }
      });
  }, []);
  async function handleSubmit(action: string, event: any) {
    try {
      event.preventDefault();
      const form: any = document.getElementById("editEventForm");
      let formData = new FormData(form);
      try {
        await axios
          .post(action, formData)
          .catch((error) => console.log(error));
          navigate("/")
        
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function nameInputOnChange(event: any) {
    setEventName(event.target.value);
  }
  function locationInputOnChange(event: any) {
    setEventLocation(event.target.value);
  }

  function dateInputOnChange(event: any) {
    setEventDate(event.target.value);
  }

  function costInputOnChange(event: any) {
    setEventCost(event.target.value);
  }

  function displayInputOnChange(event: any) {
    setEventDisplay(event.target.value);
  }

  function shortDescriptionInputOnChange(event: any) {
    setEventShortDescription(event.target.value);
  }

  function descriptionInputOnChange(event: any) {
    setEventDescription(event.target.value);
  }

  function questionsInputOnChange(event: any) {
    setEventQuestions(event.target.value);
  }

  function notesInputOnChange(event: any) {
    setEventNotes(event.target.value);
  }

  function stripeInputOnChange(event: any) {
    setEventStripe(event.target.value);
  }

  function timeslotsInputOnChange(event: any) {
    setEventTimeslots(event.target.value);
  }

  function googleMapsInputOnChange(event: any) {
    setEventGoogleMaps(event.target.value);
  }

  function orderInputOnChange(event: any) {
    setEventOrder(event.target.value);
  }

  if (eventInfo == null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  let display;
  if (eventInfo.display == "true") {
    display = ["True", "False"];
  } else {
    display = ["False", "True"];
  }
  return (
    <div>
      <div className="title">
        <h1>{eventInfo["name"]}</h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form id="editEventForm" method="post" encType="multipart/form-data">
            <div className="card">
              <img src={eventInfo.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4 className="name">
                  <b>Name:</b>
                </h4>
                <input
                  type="text"
                  name="name"
                  className="formTextInput"
                  value={eventName}
                  onChange={nameInputOnChange}
                  placeholder={eventInfo.name}
                  required
                />

                <h4 className="date">
                  <b>Date:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="date"
                  className="formTextInput"
                  value={eventDate}
                  onChange={dateInputOnChange}
                  placeholder={eventInfo.date}
                  required
                />

                <h4 className="name">
                  <b>Location:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="location"
                  className="formTextInput"
                  value={eventLocation}
                  onChange={locationInputOnChange}
                  placeholder={eventInfo.location}
                  required
                />

                <h4 className="name">
                  <b>Cost:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="cost"
                  className="formTextInput"
                  value={eventCost}
                  onChange={costInputOnChange}
                  placeholder={eventInfo.cost}
                  required
                />

                <h4 className="name">
                  <b>Short Description:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="shortDescription"
                  className="formTextInput"
                  value={eventShortDescription}
                  onChange={shortDescriptionInputOnChange}
                  placeholder={eventInfo.shortDescription}
                  required
                />

                <h4 className="name">
                  <b>Description:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="description"
                  className="formTextInput"
                  value={eventDescription}
                  onChange={descriptionInputOnChange}
                  placeholder={eventInfo.description}
                  required
                />

                <h4 className="name">
                  <b>Image:</b>{" "}
                </h4>
                <input
                  title="poster"
                  type="file"
                  name="poster"
                  className="formTextInput"
                  accept="image/*"
                />

                <h4 className="name">
                  <b>Timeslots:</b>
                </h4>
                <input
                  type="text"
                  name="timeslots"
                  className="formTextInput"
                  value={eventTimeslots}
                  onChange={timeslotsInputOnChange}
                  placeholder={eventInfo.timeslots}
                  required
                />

                <h4 className="name">
                  <b>Display:</b>{" "}
                </h4>

                <select
                  title="display"
                  name="display"
                  className="formTextInput"
                  value={eventDisplay}
                  onChange={displayInputOnChange}
                  placeholder={eventInfo.display}
                  required
                >
                  <option value="true">{display[0]}</option>
                  <option value="false">{display[1]}</option>
                </select>

                <h4 className="name">
                  <b>Questions:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="questions"
                  className="formTextInput"
                  value={eventQuestions}
                  onChange={questionsInputOnChange}
                  placeholder={eventInfo.questions}
                  required
                />

                <h4 className="name">
                  <b>Notes:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="notes"
                  className="formTextInput"
                  value={eventNotes}
                  onChange={notesInputOnChange}
                  placeholder={eventInfo.notes}
                  required
                />

                <h4 className="name">
                  <b>Credit/Debit Stripe Url:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="stripe"
                  className="formTextInput"
                  value={eventStripe}
                  onChange={stripeInputOnChange}
                  placeholder={eventInfo.stripe}
                  required
                />

                <h4 className="name">
                  <b>Google Maps:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="googleMaps"
                  className="formTextInput"
                  value={eventGoogleMaps}
                  onChange={googleMapsInputOnChange}
                  placeholder={eventInfo.googleMaps}
                  required
                />

                <h4 className="name">
                  <b>Order:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="order"
                  className="formTextInput"
                  value={eventOrder}
                  onChange={orderInputOnChange}
                  placeholder={eventInfo.order}
                  required
                />

                <button
                  type="button"
                  onClick={(event) =>
                    handleSubmit(
                      proxyUrl + "/editEvent/:" + eventInfo?.["_id"],
                      event
                    )
                  }
                  className="btn editButton"
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditEvent;
