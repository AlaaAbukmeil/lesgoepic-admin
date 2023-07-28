import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import proxyUrl from "../common/variables";
import Loader from "../common/loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getRequestOptions} from "../common/cookie";
import { handleAuth } from "../common/cookie";
import { postRequestOptions } from "../common/cookie";
import NavBar from "../common/navbar";
import { albumInfo } from "../../models/albumInfo";

function EditAlbum() {
  let params: any = useParams();
  let navigate = useNavigate();
  let url: any = proxyUrl + "/editAlbum/" + params.albumId;
  let [albumInfo, setAlbumInfo] = useState<albumInfo>();
  let [albumName, setAlbumName] = useState(albumInfo?.name);
  let [albumDate, setAlbumDate] = useState(albumInfo?.date);
  let [albumDrivelink, setAlbumDrivelink] = useState(albumInfo?.driveLink);
  let [albumOrder, setAlbumOrder] = useState(albumInfo?.order);

  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        if (data.albumInfo) {
          setAlbumInfo(data.albumInfo);
          setAlbumName(data.albumInfo.name);
          setAlbumDate(data.albumInfo.date);
          setAlbumDrivelink(data.albumInfo.driveLink);
          setAlbumOrder(data.albumInfo.order);
        } else {
          setAlbumInfo(data.status);
        }
      });
  }, []);

  async function handleSubmit(action: string, event: any) {
    try {
      event.preventDefault();
      const form: any = document.getElementById("editAlbum");
      let formData = new FormData(form);
      try {
        await axios
          .post(action, formData, postRequestOptions)
          
        navigate("/albums");
      } catch (error) {
        
      }
    } catch (error) {
      
    }
  }

  function nameInputOnChange(event: any) {
    setAlbumName(event.target.value);
  }
  function dateInputOnChange(event: any) {
    setAlbumDate(event.target.value);
  }
  function driveLinkInputOnChange(event: any) {
    setAlbumDrivelink(event.target.value);
  }
  function orderInputOnChange(event: any) {
    setAlbumOrder(event.target.value);
  }

  if (albumInfo == null) {
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
        <h1>{albumInfo["name"]}</h1>
      </div>
      <div className="events row">
        <div className="col-lg-4 col-10 eventInfoCard">
          <form name="eventAlbum" id="editAlbum" encType="multipart/form-data">
            <div className="card">
              <img src={albumInfo.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4 className="name">
                  <b>Name</b>:
                </h4>
                <input
                  type="text"
                  name="name"
                  className="formTextInput"
                  value={albumName}
                  placeholder={albumInfo.name}
                  onChange={nameInputOnChange}
                />

                <h4 className="date">
                  <b>Date:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="date"
                  className="formTextInput"
                  value={albumDate}
                  placeholder={albumInfo.date}
                  onChange={dateInputOnChange}
                />

                <h4 className="date">
                  <b>Drive Link:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="driveLink"
                  className="formTextInput"
                  value={albumDrivelink}
                  placeholder={albumInfo.driveLink}
                  onChange={driveLinkInputOnChange}
                />

                <h4 className="name">
                  <b>Image:</b>{" "}
                </h4>
                <input
                  title="albumPhoto"
                  type="file"
                  name="coverImage"
                  className="formTextInput"
                  accept="image/*"
                />

                <h4 className="name">
                  <b>Order:</b>{" "}
                </h4>
                <input
                  type="text"
                  name="order"
                  className="formTextInput"
                  value={albumOrder}
                  placeholder={albumInfo.order}
                  onChange={orderInputOnChange}
                />

                <button
                  type="button"
                  onClick={(event) =>
                    handleSubmit(
                      proxyUrl + "/editAlbum/:" + albumInfo?.["_id"],
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

export default EditAlbum;
