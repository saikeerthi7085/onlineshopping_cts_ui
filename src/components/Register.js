import { RegisterUser } from "../store/slice/UserSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../store/models/Users";
const users = new Users();
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();

  const [role, setRole] = useState();

  const [hasError, setHasError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (password === confirmPassword) {
      dispatch(RegisterUser({ User: users }))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult.isSuccess) {
            navigate("/Login");
          } else {
            setHasError(true);
            setErrorMessage(originalPromiseResult.message);
            return;
          }
        })
        .catch((rejectedValueOrSerializedError) => {
          setHasError(true);
          setErrorMessage(rejectedValueOrSerializedError.ErrorMessage);
          return;
        });
    } else {
      setHasError(true);
      setErrorMessage("Both Passwords has to be same");
      return;
    }
  }

  function handleInputChange(e) {

    e.stopPropagation()
        switch (e.target.id) {
      case "FirstName":
        users.firstName = e.target.value;
        setHasError(false);
        break;

      case "LastName":
        users.lastName = e.target.value;
        setHasError(false);
        break;
      case "Email":
        users.email = e.target.value;

        setHasError(false);
        break;
      case "LoginId":
        users.loginId = e.target.value;

        setHasError(false);
        break;
      case "Password":
        users.password = e.target.value;
        setPassword(e.target.value);
        setHasError(false);
        break;
      case "ConfirmPassword":
        setconfirmPassword(e.target.value);
        setHasError(false);
        break;
      case "ContactNumber":
        users.contactNumber = e.target.value;
        setHasError(false);
        break;
      case "AdminRole":
        users.isAdmin = true;
        setRole("Admin");
        setHasError(false);
        break;

      case "CustomerRole":
        users.isAdmin = false;
        setRole("Customer");
        setHasError(false);
        break;
      default:
        break;
    }
  }
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Register</h3>
                {hasError && (
                  <div className="alert alert-danger" role="alert">
                    {ErrorMessage}, Please verify
                  </div>
                )}
                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="radio"
                      value="Admin"
                      name="Role"
                      id="AdminRole"
                      className="m-2"
                      aria-label="Admin"
                      onChange={(e) => handleInputChange(e)}
                      checked={role === "Admin"}
                    />
                    Admin
                    <input
                      type="radio"
                      value="Customer"
                      name="Role"
                      id="CustomerRole"
                      className=" m-2"
                      aria-label="Customer"
                      required
                      checked={role === "Customer"}
                      onChange={(e) => handleInputChange(e)}
                    />
                    Customer
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="FirstName"
                      placeholder="First Name*"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="LastName"
                      placeholder="Last Name*"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder="Email*"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="LoginId"
                      placeholder="LoginId*"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password*"
                      id="Password"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password*"
                      id="ConfirmPassword"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Contact Numer*"
                      id="ContactNumber"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-dark btn-lg mb-1">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
