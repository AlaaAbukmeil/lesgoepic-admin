import proxyUrl from "../common/variables";
import { Link } from "react-router-dom";
import { getRequestOptions } from "../common/cookie";
import { useState, useEffect } from "react";
import NavBar from "../common/navbar";
import { handleAuth } from "../common/cookie";
import Loader from "../common/loader";
import { postInfo } from "../../models/postInfo";

function GetPosts() {
  let [posts, setPosts] = useState<postInfo[]>();
  let url = proxyUrl + "/blog";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
      });
  }, []);

  async function confirmDeletePost(albumName: any, formaction: string) {
    let result = window.confirm(
      "Are you sure you want to delete " + albumName + "?"
    );
    let deleteUrl = proxyUrl + formaction;
    if (result) {
      await fetch(deleteUrl, getRequestOptions).then((res) =>
        window.location.reload()
      );
    }
  }

  if (!posts) {
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
        <h1>Posts</h1>
      </div>
      <div className="events row">
        <form className="" action="/addNewPost" method="get">
          <button type="submit" className="btn addNewEventButton">
            Add new post!
          </button>
        </form>

        {posts.map((post, index) => (
          <div key={index}className="col-lg-4 col-md-6 col-10 eventCard">
            <form name="posts" key={index}>
              <div className="card">
                <img
                  src={post.coverImage}
                  className="card-img-top coverImage"
                  alt="..."
                />

                <div className="card-body">
                  <h4 className="name">📍 {post.name}</h4>
                  <h4 className="date">📅 {post.date}</h4>
                  <h4 className="date">📓 {post.caption.slice(0, 800)} ...</h4>
                  <h4 className="name">Order: {post.order}</h4>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={(event) =>
                        confirmDeletePost(
                          post.name,
                          "/deletePost/:" + post["_id"]
                        )
                      }
                      className="btn btn-danger deleteButton"
                    >
                      DELETE
                    </button>
                    <Link
                      to={"/editPost/:" + post["_id"]}
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

export default GetPosts;
