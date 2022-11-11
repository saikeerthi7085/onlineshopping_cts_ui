import { UpdateProductStatusSlice } from "../store/slice/ProductSlice";
import { useDispatch } from "react-redux";
import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function UpdateProductStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productStatus, setProductsStatus]= useState(0);
  const [product,setproduct]= useState({});
  const [hasError, setHasError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  var location= useLocation();
  useEffect(() => {

    setproduct(location.state.ProductDetails)
  },[location.state.ProductDetails]);

  function handleSubmit(evt) {

    evt.preventDefault();
    if(product.productStatus===null || product.productStatus=== undefined || product.productStatus==="" || productStatus===0){
      setHasError(true);
          setErrorMessage("Product Status is not selected");
    }
    else{
      dispatch(UpdateProductStatusSlice({ productStatus: product.productStatus,id:product._Id }))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult.isSuccess) {
            navigate("/Products");
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
      }
  }

  function handleInputChange(e) {
    e.stopPropagation();
    switch (e.target.id) {
      
      case "status":
        if(e.target.value==="0"){
          setHasError(true);
          setErrorMessage("Product Status is not selected")
        }
        else{
          if(e.target.value==="1"){
            product.productStatus = "OUT OF STOCK";
            product.availableQuantity=0;
            setProductsStatus(1)
          }
          else{
            product.productStatus = "HURRY UP TO PURCHASE";
            product.availableQuantity=10
            setProductsStatus(2)

          }
          setHasError(false);
        }
        
        
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
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Update Product Status
                </h3>
                {hasError && (
                  <div className="alert alert-danger" role="alert">
                    {ErrorMessage}, Please verify
                  </div>
                )}
                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="ProductName"
                      placeholder="Product Name*"
                      onChange={(e) => handleInputChange(e)}
                      value={product.productName}
                      readOnly
                    />
                  </div>
                  
                  <div className="form-outline mb-4">
                    <select className="form-control" id="status"  onChange={(e) => handleInputChange(e)}>
                    <option value="0" selected>---Select Product Status ---</option>

                      <option value="2">HURRY UP TO PURCHASE</option>
                      <option value="1">OUT OF STOCK</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-dark btn-lg mb-1">
                    Update Status
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

export default UpdateProductStatus;
