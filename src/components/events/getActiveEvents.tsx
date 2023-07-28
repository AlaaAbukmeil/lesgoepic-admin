import { activePassedEvents } from "../../models/activePassedEvents";
import proxyUrl from "../common/variables";
import { Link } from "react-router-dom";
import { getRequestOptions } from "../common/cookie";

function GetActiveEvents(events: activePassedEvents) {
  let activeEvents = events.activeEvents;
  async function confirmDeleteEvent(eventName: any, formaction: string) {
    let result = window.confirm(
      "Are you sure you want to delete " + eventName + "?"
    );
    let deleteUrl = proxyUrl + formaction;
    
    if (result) {
      await fetch(deleteUrl, getRequestOptions)
        .then((res) => window.location.reload())
      
    }
  }
  if (!events) {
    return <div></div>;
  }

  return (
    <div className="row">
      {activeEvents.map((activeEvent: any, index: any) => (
        <div key={index} className="col-lg-4 col-md-6 col-10 eventCard">
          <form name={activeEvent.name}>
            <div className="card">
              <img src={activeEvent.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4 className="date">📅 {activeEvent.date}</h4>
                <h4 className="name">📍 {activeEvent.name}</h4>
                <h4 className="name">💸 {activeEvent.cost}</h4>
                <h4 className="name">Order: {activeEvent.order}</h4>
                <div className="buttons">
                  <button
                    type="button"
                    onClick={(event) =>
                      confirmDeleteEvent(
                        activeEvent.name,
                        "/deleteEvent/" + activeEvent["_id"]
                      )
                    }
                    className="btn btn-danger deleteButton"
                  >
                    DELETE
                  </button>
                  <Link
                    to={"/editEvent/" + activeEvent["_id"]}
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

export default GetActiveEvents;
