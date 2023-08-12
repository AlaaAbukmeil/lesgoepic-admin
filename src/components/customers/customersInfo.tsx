import { useState, useEffect } from "react";
import NavBar from "../common/navbar";
import { getRequestOptions, postRequestOptions } from "../common/cookie";
import { handleAuth } from "../common/cookie";
import Loader from "../common/loader";
import axios from "axios";

function CustomersInfo() {
  let [users, setUsers] = useState<any>([]);
  let tableTitles: any = ["username", "email", "Age Group", "credit", "Events"];
  let dbTitles: any = {
    username: "username",
    email: "email",
    "Age Group": "ageGroup",
    credit: "credit",
    Events: "eventNames",
  };
  let url: any = "https://api.lesgoepic.com/api/admin/customers";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  async function onChangeCredit(event: any) {
    let { name, value } = event.target;
    event.target.value = value;
    const credit = parseInt(value);
    if (credit) {
      let result = window.confirm(
        "Are you sure you want to change " +
          name +
          "'s credit to " +
          value +
          "?"
      );
      if (result) {
        let params = {
          email: name,
          credit: value,
        };
        let action = await axios.post(
          "https://api.lesgoepic.com/api/admin/changeUsersCredit",
          params,
          postRequestOptions
        );
        handleAuth(action.data.status);
        window.location.reload();
      }
    } else {
      window.alert("Credit value is not valid!");
    }
  }
  function downloadCSV() {
    // Get the HTML table element
    var table: any = document.getElementById("table-id");

    // Create an empty string for the CSV data
    var csv = "";

    // Loop through each row in the table
    for (var i = 0; i < table?.rows.length; i++) {
      // Loop through each cell in the row
      for (var j = 0; j < table?.rows[i].cells.length; j++) {
        // Add the cell value to the CSV data, surrounded by quotes
        csv += '"' + table?.rows[i].cells[j].textContent + '",';
      }
      // Add a newline character to the end of each row
      csv += "\n";
    }

    // Create a new Blob object with the CSV data
    var blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    // Create a new URL object for the Blob object
    var url = URL.createObjectURL(blob);

    // Create a new link element for the download
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "customersInfo.csv");

    // Trigger the download by clicking the link
    link.click();
  }

  if (!users) {
    return <Loader />;
  }
  return (
    <div>
      <NavBar />

      <div className="title">
        <h1>Customers</h1>
      </div>

      <table id="table-id">
        <tbody>
          <tr>
            {tableTitles.map((title: string, index: number) => (
              <th key={index}>{title}</th>
            ))}
          </tr>

          {users.map((user: any, index: number) => (
            <tr>
              {tableTitles.map((title: string, index: number) => (
                <td key={index}>
                  {dbTitles[title] == "credit" ? (
                    <input
                      title="credit"
                      name={user.email}
                      placeholder={user[dbTitles[title]]}
                      onChange={(event) => onChangeCredit(event)}
                    />
                  ) : dbTitles[title] == "eventsNames" ? 
                    user[dbTitles[title]].map(
                      (event: string, index: number) => (
                        <p key={index}> {event}</p>
                      )
                    )
                   : (
                    user[dbTitles[title]]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        id="download-btn"
        onClick={downloadCSV}
        className="btn addNewEventButton"
      >
        Download CSV
      </button>
    </div>
  );
}
export default CustomersInfo;
