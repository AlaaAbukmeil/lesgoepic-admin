import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/navbar";
import { postRequestOptions } from "../common/cookie";
function AddNewPost() {
    let navigate = useNavigate();
    let actionUrl = "https://api.lesgoepic.com/api/admin/addNewPost"
    async function handleSubmit(event: any) {
      event.preventDefault()
      const form: any = document.getElementById("addNewPost");
      let formData = new FormData(form);
      await axios
        .post(actionUrl, formData, postRequestOptions)
        .then((res) => navigate("/posts"))
    }
    function handleChange(event: any){
        const files = event.target.files;
        // Check files count
        if (files.length !== 3) {
            alert(`Only 3 images are allowed to upload.`);
            event.target.value = '';
            return;
        }
    }
  return (
    <div>
        <NavBar />
      <div className="title">
        <h1>Add New Post</h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form
            name="addNewEvent"
            id="addNewPost"
            className="addNewEvent"
            method="post"
            encType="multipart/form-data"
          >
        <div className="card">
          <div className="card-body">
  
            <h4 className="name"><b>Name:</b></h4>
            <input type="text" name="name" className="formTextInput"  placeholder="Enter Name" required />
  
            <h4 className="date"><b>Date:</b> </h4>
            <input type="text" name="date" className="formTextInput" placeholder="Enter Date" required />
  
            <h4 className="date"><b>Caption:</b> </h4>
            <input type="text" name="caption" className="formTextInput" placeholder="Enter Caption" required />

            <h4 className="name"><b>Cover Image: </b> </h4>
            <input title="coverImage"type="file" name="coverImage" className="formTextInput"  accept="image/*"  required />
  

            <h4 className="name"><b>Images: </b> (Upload three photos) </h4>
            <input title="images"type="file" name="images" id="postImg" className="formTextInput" onChange={(event) => handleChange(event)}  accept="image/*" multiple required />
  
            <h4 className="name"><b>Order:</b> </h4>
            <input type="text" name="order" className="formTextInput"  placeholder="Enter the order number of the event" required />
  
            <button type="button" onClick={(event) => handleSubmit(event)} className="btn addNewEventButton">Add New Post</button>
  
          </div>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddNewPost;
