import { ResetPasswordAction } from "../store/slice/UserSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
   const dispatch = useDispatch();
    const [newPassword, setnewPassword] = useState();
    const [hasError, setHasError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState();
  
    function handleSubmit (evt)  {
      evt.preventDefault();
  const loginId= localStorage.getItem("LoginId");
      dispatch(ResetPasswordAction({ loginId: loginId, newPassword: newPassword }))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult.isSuccess) {
         
            localStorage.setItem("LoginId", loginId);
            navigate("/Products",{state:{userDetails:originalPromiseResult.user}});
        } else {
            setHasError(true);
            setErrorMessage(originalPromiseResult.message);
            return;
          }
        })
        .catch((rejectedValueOrSerializedError) => {
          setHasError(true);
          setErrorMessage(rejectedValueOrSerializedError);
          return;
        });
    };
  
   
    return (
      <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
  
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Reset Password</h3>
                  {hasError &&
                  <div className="alert alert-danger" role="alert">
                    {ErrorMessage}, Please verify
                </div>
                }
                  <form className="px-md-2" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="loginId"
                        placeholder="Login Id*"
                       value={localStorage.getItem("LoginId")}
                        readOnly
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password*"
                        id="password"
                        onChange={(e) =>( setnewPassword(e.target.value))}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg mb-1"
                     
                    >
                      Reset Password
                    </button>
                    <button type="submit" className="btn btn-success btn-lg m-2" onClick={()=>(navigate("/Products"))}>
                    Go Back
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
export default ResetPassword;