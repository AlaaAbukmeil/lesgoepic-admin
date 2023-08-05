import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../common/loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getRequestOptions } from "../common/cookie";
import { handleAuth } from "../common/cookie";
import { postRequestOptions } from "../common/cookie";
import NavBar from "../common/navbar";
import { postInfo } from "../../models/postInfo";

function EditPost() {
  let params: any = useParams();
  let navigate = useNavigate();
  let url: any =
    "https://api.lesgoepic.com/api/admin/editPost/" + params.postId;
  let [postInfo, setPostInfo] = useState<postInfo>();
  let [postName, setPostName] = useState(postInfo?.name);
  let [postDate, setPostDate] = useState(postInfo?.date);
  let [postCaption, setPostCaption] = useState(postInfo?.caption);
  let [postOrder, setPostOrder] = useState(postInfo?.order);

  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        if (data.postInfo) {
          setPostInfo(data.postInfo);
          setPostName(data.postInfo.name);
          setPostDate(data.postInfo.date);
          setPostCaption(data.postInfo.caption);
          setPostOrder(data.postInfo.order);
        } else {
          setPostInfo(data.status);
        }
      });
  }, []);

  async function handleSubmit(action: string, event: any) {
    try {
      event.preventDefault();
      const form: any = document.getElementById("editPost");
      let formData = new FormData(form);
      try {
        await axios.post(action, formData, postRequestOptions);

        navigate("/posts");
      } catch (error) {}
    } catch (error) {}
  }

  function nameInputOnChange(event: any) {
    setPostName(event.target.value);
  }
  function dateInputOnChange(event: any) {
    setPostDate(event.target.value);
  }
  function captionInputOnChange(event: any) {
    setPostCaption(event.target.value);
  }
  function orderInputOnChange(event: any) {
    setPostOrder(event.target.value);
  }

  if (postInfo == null) {
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
        <h1>{postInfo["name"]}</h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form name="eventAlbum" id="editPost" encType="multipart/form-data">
            <div className="card">
              <img
                src={postInfo.coverImage}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h4 className="name">
                  <b>Name</b>:
                </h4>
                <input
                  type="text"
                  name="name"
                  className="formTextInput"
                  value={postName}
                  placeholder={postInfo.name}
                  onChange={nameInputOnChange}
                />

                <h4 className="date">
                  <b>Date:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="date"
                  className="formTextInput"
                  value={postDate}
                  placeholder={postInfo.date}
                  onChange={dateInputOnChange}
                />
                <h4 className="name">
                  <b>Cover Image: </b>{" "}
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
                  <b>Images:</b> (Upload three photos){" "}
                </h4>
                <input
                  title="coverImages"
                  type="file"
                  name="coverImages"
                  id="postImg"
                  className="formTextInput"
                  accept="image/*"
                  multiple
                  required
                />

                <h4 className="date">
                  <b>Caption:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="caption"
                  className="formTextInput"
                  value={postCaption}
                  placeholder={postInfo.caption}
                  onChange={captionInputOnChange}
                />

                <h4 className="name">
                  <b>Order:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="order"
                  className="formTextInput"
                  value={postOrder}
                  placeholder={postInfo.order}
                  onChange={orderInputOnChange}
                />

                <button
                  type="button"
                  onClick={(event) =>
                    handleSubmit(
                      "https://api.lesgoepic.com/api/admin/editPost/" +
                        params?.postId,
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

export default EditPost;
