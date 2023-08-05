import { useState, useEffect } from "react";
import NavBar from "../common/navbar";
import {getRequestOptions} from "../common/cookie";
import { handleAuth } from "../common/cookie";
import Loader from "../common/loader";
import { albumInfo } from "../../models/albumInfo";
import { Link } from "react-router-dom";

function GetAlbums() {
  let [albums, setAlbums] = useState<albumInfo[]>();
  let url = "https://api.lesgoepic.com/api/admin/albums";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setAlbums(data.albums);
      });
  }, []);
  async function confirmDeleteAlbum(albumName: any, formaction: string) {
    let result = window.confirm(
      "Are you sure you want to delete " + albumName + "?"
    );
    let deleteUrl = "https://api.lesgoepic.com/api/admin" + formaction;
    if (result) {
      await fetch
        (deleteUrl, getRequestOptions )
        .then((res) => window.location.reload())
      
    }
  }

  if (!albums) {
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
        <h1>Albums</h1>
      </div>
      <div className="events row">
        <form className="" action="/addNewAlbum" method="get">
          <button type="submit" className="btn addNewEventButton">
            Add new Album!
          </button>
        </form>

        {albums.map((album, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-10 eventCard">
            <form className="albums">
              <div className="card">
                <a href={album.driveLink} target="_blank">
                  <img
                    src={album.image}
                    className="card-img-top coverImage"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <h4 className="name">📍 {album.name}</h4>
                  <h4 className="date">📅 {album.date}</h4>
                  <h4 className="name">Order: {album.order}</h4>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={(event) =>
                        confirmDeleteAlbum(
                          album.name,
                          "/deleteAlbum/:" + album["_id"]
                        )
                      }
                      className="btn btn-danger deleteButton"
                    >
                      DELETE
                    </button>

                    <Link
                      to={"/editAlbum/" + album["_id"]}
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
    </div>
  );
}

export default GetAlbums;
