import { formsData } from "../../models/formsData";
import { Link } from "react-router-dom";
function getPassedForms(formsData: formsData) {
  let passedForms = formsData.passedForms;
  let passedCountSignUp = formsData.passedCountSignUp;
  return (
    <div className="row">
      {passedForms.map((form, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-10 eventCard">
          <form>
            <div className="card">
              <img src={form.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4 className="name">
                  Number of sign ups: {passedCountSignUp[index]}
                </h4>
                <h4 className="name">Order: {form.order}</h4>
                <div className="buttons">
                  <Link
                    to={"/form/" + form["_id"]}
                    className="btn signupButton linkElement"
                  >
                    View Responses
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
export default getPassedForms;
