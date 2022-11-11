import { AddNewProduct } from "../store/slice/ProductSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../store/models/Products";

const Product = new Products();
function AddNewProductsView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();

  function handleSubmit(evt) {

    evt.preventDefault();
    if(Product.productStatus===null || Product.productStatus=== undefined || Product.productStatus===""){
      setHasError(true);
          setErrorMessage("Product Status is not selected");
    }
    else{
      dispatch(AddNewProduct({ Product: Product }))
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
      case "ProductName":
        Product.productName = e.target.value;
        setHasError(false);
        break;

      case "Description":
        Product.productDescription = e.target.value;
        setHasError(false);
        break;
      case "Features":
        Product.features = e.target.value;

        setHasError(false);
        break;
      case "Price":
        Product.price = e.target.value;

        setHasError(false);
        break;
      case "status":
        if(e.target.value===0){
          setHasError(true);
          setErrorMessage("Product Status is not selected")
        }
        else{
          if(e.target.value===1){
            Product.productStatus = "OUT OF STOCK";
            Product.availableQuantity=0
          }
          else{
            Product.productStatus = "HURRY UP TO PURCHASE";
            Product.availableQuantity=10
           
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
                  Add New Product
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
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <textarea
                      type="textarea"
                      className="form-control"
                      id="Description"
                      placeholder="Description*"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="Features"
                      placeholder="Features*"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      className="form-control"
                      id="Price"
                      placeholder="Price*"
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <select className="form-control" id="status"  onChange={(e) => handleInputChange(e)}>
                    <option value="0">---Select Product Status ---</option>

                      <option value="2">HURRY UP TO PURCHASE</option>
                      <option value="1">OUT OF STOCK</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-dark btn-lg mb-1">
                    Add Product
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

export default AddNewProductsView;
