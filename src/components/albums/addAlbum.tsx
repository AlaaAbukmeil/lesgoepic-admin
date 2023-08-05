import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/navbar";
import { postRequestOptions } from "../common/cookie";
function AddNewAlbum() {
    let navigate = useNavigate();
    let actionUrl = "https://api.lesgoepic.com/api/admin/addNewAlbum"
    async function handleSubmit(event: any) {
      event.preventDefault()
      const form: any = document.getElementById("addNewAlbum");
      let formData = new FormData(form);
      await axios
        .post(actionUrl, formData, postRequestOptions)
        .then((res) => navigate("/albums"))
    }
  return (
    <div>
        <NavBar />
      <div className="title">
        <h1>Add New Album</h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form
            name="addNewEvent"
            id="addNewAlbum"
            className="addNewEvent"
            method="post"
            encType="multipart/form-data"
          >
            <div className="card">
              <div className="card-body">
                <div className="card-body">
                  <h4 className="name">
                    <b>Name</b>:
                  </h4>
                  <input
                    title="name"
                    type="text"
                    name="name"
                    className="formTextInput"
                    required
                  />

                  <h4 className="date">
                    <b>Date:</b>{" "}
                  </h4>
                  <input
                    title="date"
                    type="text"
                    name="date"
                    className="formTextInput"
                    required
                  />

                  <h4 className="date">
                    <b>Drive Link:</b>{" "}
                  </h4>
                  <input
                    title="drivelink"
                    type="text"
                    name="driveLink"
                    className="formTextInput"
                    required
                  />

                  <h4 className="name">
                    <b>Image:</b>{" "}
                  </h4>
                  <input
                    title="coverImage"
                    type="file"
                    name="coverImage"
                    className="formTextInput"
                    accept="image/*"
                    required
                  />

                  <h4 className="name">
                    <b>Order:</b>{" "}
                  </h4>
                  <input
                    title="order"
                    type="text"
                    name="order"
                    className="formTextInput"
                    required
                  />

                  <button type="button" onClick={(event) => handleSubmit(event)} className="btn addNewEventButton">
                    Add New Event
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddNewAlbum;
