import { useState, useEffect } from "react";
import GetActiveForms from "./getActiveForms";
import GetPassedForms from "./getPassedForms";
import Loader from "../common/loader";
import { formsData } from "../../models/formsData";
import NavBar from "../common/navbar";
import { getRequestOptions } from "../common/cookie";
import { handleAuth } from "../common/cookie";

function GetForms() {
  let [formsData, setForms] = useState<formsData>();
  let url = "https://api.lesgoepic.com/api/admin/forms";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setForms(data);
      });
  }, []);

  if (!formsData) {
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
        <h1>Forms</h1>
      </div>
      <div className="events row">

        <h2 className="sub-title">Active Forms</h2>
        <GetActiveForms {...formsData} />
        <h2 className="sub-title">Passed Forms</h2>
        <GetPassedForms {...formsData} />
      </div>
    </div>
  );
}

export default GetForms;
