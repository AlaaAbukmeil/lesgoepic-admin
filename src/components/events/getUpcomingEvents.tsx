import proxyUrl from "../common/variables";
import { useState, useEffect } from "react";
import GetActiveEvents from "./getActiveEvents";
import GetPassedEvents from "./getPassedEvents";
import Loader from "../common/loader";
import { activePassedEvents } from "../../models/activePassedEvents";
import NavBar from "../common/navbar";
import requestOptions from "../common/cookie";
import { handleAuth } from "../common/cookie";


function GetUpcomingEvents() {

  let [events, setEvents] = useState<activePassedEvents>();
  let url = proxyUrl + "/admin-events";
  
  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => {
        console.log(res.status)
        handleAuth(res.status)
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        
      });
  }, []);

  if (!events) {
    return (
      <div>
        <NavBar />
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
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
        <GetActiveEvents {...events} />
        <h2 className="sub-title">Passed Events</h2>
        <GetPassedEvents {...events} />
      </div>
    </div>
  );
}

export default GetUpcomingEvents;
