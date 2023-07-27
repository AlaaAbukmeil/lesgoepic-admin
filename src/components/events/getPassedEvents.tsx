import { activePassedEvents } from "../../models/activePassedEvents";
import proxyUrl from "../common/variables";
import axios from "axios";
import { Link } from "react-router-dom";

function GetPassedEvents(events: activePassedEvents) {
  let passedEvents = events.passedEvents;
  async function confirmDeleteEvent(eventName: any, formaction: string) {
    let result = window.confirm(
      "Are you sure you want to delete " + eventName + "?"
    );
    let deleteUrl = proxyUrl + formaction
    if (result) {
      await axios.post(deleteUrl).then((res) => window.location.reload()).catch((error) => console.log(error))
    }
  }
  if (!events) {
    return <div></div>;
  }

  return (
    <div className="row">
      {passedEvents.map((passedEvent: any, index: any) => (
        <div key={index} className="col-lg-4 col-md-6 col-10 eventCard">
          <form name={passedEvent.name}>
            <div className="card">
              <img src={passedEvent.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4 className="date">📅 {passedEvent.date}</h4>
                <h4 className="name">📍 {passedEvent.name}</h4>
                <h4 className="name">💸 {passedEvent.cost}</h4>
                <h4 className="name">Order: {passedEvent.order}</h4>
                <div className="buttons">
                  <button
                    type="button"
                    onClick={(event) =>
                      confirmDeleteEvent(
                        passedEvent.name,
                        "/deleteEvent/:" + passedEvent["_id"]
                      )
                    }
                    className="btn btn-danger deleteButton"
                  >
                    DELETE
                  </button>
                  <Link
                    
                    to={"/editEvent/:" + passedEvent["_id"]}
                    
                    className="btn signupButton"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export default GetPassedEvents;
