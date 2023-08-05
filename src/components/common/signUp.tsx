import { authPostRequestOptions } from "./cookie";
import Loader from "./loader";
import { useState } from "react";
import axios from "axios";
import { auth } from "../../models/auth";
function SignUp() {
  let [requestStatus, setRequestStatus] = useState(false);
  let [authStatus, setAuthStatus] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [verficationCode, setVerficationCode] = useState("");
  async function handleSubmit(event: any) {
    event.preventDefault()
    setRequestStatus(true);
    let formData = {"username": username, "password": password, "verificationCode": verficationCode}
    try {
      let auth: auth = await axios.post("https://api.lesgoepic.com/api/admin/signUp", formData, authPostRequestOptions);
      console.log(auth)
      if(auth.data.status == 200){
        localStorage.setItem('token', auth.data.token);
        window.location.href = "/login";

      }
      else{
        console.log(auth.data.message)
        setAuthStatus(auth.data.message)
      }

    } catch (error) {
      console.log(error)
    }
    
    setRequestStatus(false);
  }
  function OnChangeUsername(event: any) {
    setUsername(event.target.value);
  }
  function onChangePassword(event: any) {
    setPassword(event.target.value);
  }
  function onChangeVerficationCode(event: any) {
    setVerficationCode(event.target.value);
  }

  if (requestStatus) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="container mt-5">
        <h1>LesGo Epic Admin Sign Up</h1>
      </div>

      <div className="row">
        <form className="col-10 login-card container mt-5" id="loginForm">
          <div>
            <h4>
              <b>Email</b>
            </h4>
            <input
              type="email"
              className="formTextInput"
              title="username"
              name="username"
              value={username}
              onChange={(event) => OnChangeUsername(event)}
            />
          </div>
          <div>
            <h4>
              <b>Password</b>
            </h4>
            <input
              type="password"
              className="formTextInput"
              title="password"
              name="password"
              value={password}
              onChange={(event) => onChangePassword(event)}
            />
          </div>
          <div>
            <h4>
              <b>Verfication Code</b>
            </h4>
            <input
              type="password"
              className="formTextInput"
              title="verificationCode"
              name="verificationCode"
              value={verficationCode}
              onChange={(event) => onChangeVerficationCode(event)}
            />
          </div>
          {authStatus && <h4 className="error">{authStatus}</h4>}
          <button
            type="button"
            onClick={(event) => handleSubmit(event)}
            className="btn addNewEventButton"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
