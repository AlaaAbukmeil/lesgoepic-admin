import proxyUrl from "../common/variables";
import { useEffect, useState } from "react";
import { scheduleInfo } from "../../models/scheduleInfo";
import NavBar from "../common/navbar";
import Loader from "../common/loader";
import { handleAuth } from "../common/cookie";
import {getRequestOptions} from "../common/cookie";
import {postRequestOptions} from "../common/cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetSchedule() {
  let actionUrl = proxyUrl + "/editSchedule/:6474717f3ca184eb978e3e61";
  let getScheduleInfoUrl = proxyUrl + "/monthlySchedule";
  let navigate = useNavigate();
  let [scheduleInfo, setSchedule] = useState<scheduleInfo>();
  let [scheduleInfoTime, setScheduleInfoTime] = useState(
    scheduleInfo?.scheduleTime
  );
  function scheduleInfoInputOnChange(event: any) {
    setScheduleInfoTime(event.target.value);
  }
  useEffect(() => {
    fetch(getScheduleInfoUrl, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setSchedule(data.scheduleInfo);
        setScheduleInfoTime(data.scheduleInfo.scheduleTime);
      });
  }, []);
  async function handleSubmit(action: string, event: any) {
    try {
      event.preventDefault();
      const form: any = document.getElementById("editSchedule");
      let formData = new FormData(form);
      try {
        await axios.post(action, formData, postRequestOptions)
        navigate("/");
      } catch (error) {
        
      }
    } catch (error) {
      
    }
  }

  if (!scheduleInfo) {
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
        <h1> Schedule </h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form
            name="editSchedule"
            id="editSchedule"
            method="post"
            encType="multipart/form-data"
          >
            <div className="card">
              <img
                src={scheduleInfo.image}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h4 className="name">
                  <b>Preview Schedule Time:</b>{" "}
                </h4>
                <input
                  title="scheduleTime"
                  type="text"
                  name="scheduleTime"
                  className="formTextInput"
                  onChange={scheduleInfoInputOnChange}
                  value={scheduleInfoTime}
                  required
                />
                <h4 className="name">
                  <b>Image:</b>{" "}
                </h4>
                <input
                  title="schedulePoster"
                  type="file"
                  name="coverImage"
                  className="formTextInput"
                  accept="image/*"
                />

                <button type="button" onClick={(event) =>
                    handleSubmit(
                      actionUrl,
                      event
                    )
                  }className="btn editButton">
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

export default GetSchedule;
