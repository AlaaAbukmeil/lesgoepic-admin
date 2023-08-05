import { useState, useEffect } from "react";
import NavBar from "../common/navbar";
import { getRequestOptions } from "../common/cookie";
import { handleAuth } from "../common/cookie";
import Loader from "../common/loader";
import { useParams } from "react-router-dom";

function ViewResponses() {
  let [formResponses, setFormResponses] = useState<any>();
  let [tableTitles, setTableTitles] = useState<any>();
  let [formName, setFormName] = useState();
  let params: any = useParams();

  let url: any = "https://api.lesgoepic.com/api/admin/form/:" + params.formId;
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setFormResponses(data?.responses);
        setFormName(data?.formName);
        if (data?.responses[0]) {
          setTableTitles(Object.keys(data?.responses[0]));
        }
      });
  }, []);

  if (formResponses == null) {
    return (
      <div>
        <NavBar />
        <Loader />
      </div>
    );
  } else if (formResponses.length == 0) {
    return (
      <div>
        <NavBar />
        <div className="title">
          <h4>No Responses</h4>
        </div>
      </div>
    );
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
    link.setAttribute("download", "table.csv");

    // Trigger the download by clicking the link
    link.click();
  }

  return (
    <div>
      <NavBar />
      <div className="title">
        <h1>{formName}</h1>
      </div>

      <table id="table-id">
        <tbody>
          <tr>
            {tableTitles.slice(5).map((title: string, index: number) => (
              <th key={index}>{title}</th>
            ))}
          </tr>

          {formResponses.map((response: string[], index: number) => (
            <tr>
              {tableTitles.slice(5).map((title: string, index: number) => (
                <td key={index}>
                  {response[tableTitles[index + 5]]?.slice(0, 50)}
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
export default ViewResponses;
