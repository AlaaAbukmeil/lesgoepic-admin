import { useState, useEffect } from "react";
import NavBar from "../common/navbar";
import { getRequestOptions, postRequestOptions } from "../common/cookie";
import { handleAuth } from "../common/cookie";
import Loader from "../common/loader";

function Feedback() {
  let [feedback, setFeedback] = useState<any>([]);
  let tableTitles: any = ["timestamp", "responses"];
  let url: any = "https://api.lesgoepic.com/api/admin/feedback";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setFeedback(data);
      });
  }, []);

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
    link.setAttribute("download", "feedback.csv");

    // Trigger the download by clicking the link
    link.click();
  }

  if (!feedback) {
    return <Loader />;
  }
  return (
    <div>
      <NavBar />

      <div className="title">
        <h1>Feedback</h1>
      </div>

      <table id="table-id">
        <tbody>
          <tr>
            {tableTitles.map((title: string, index: number) => (
              <th key={index}>{title}</th>
            ))}
          </tr>

          {feedback.map((response: any, index: number) => (
            <tr key={index}>
              {tableTitles.map((title: string, index: number) => (
                <td key={index}>
                  {title == "responses"
                    ? response[title].map((answer: string, index: number) => (
                        <p key={index}>{answer}</p>
                      ))
                    : response[title]}
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
export default Feedback;
