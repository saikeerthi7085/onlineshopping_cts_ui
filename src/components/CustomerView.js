import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts,SearchProducts } from "../store/slice/ProductSlice";

import Table from "react-bootstrap/Table";

function CustomerView() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [ErrorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);
    const[searchString,setSearchString]=useState();
  useEffect(() => {
    if (products.length === 0) {
      getAll();
    }
  });
  function getAll(){
    dispatch(getAllProducts())
    .unwrap()
    .then((originalPromiseResult) => {
      if (originalPromiseResult.isSuccess) {
        setProducts(originalPromiseResult.productslist);
      } else {
        setHasError(true);
        setProducts([]);

        setErrorMessage(originalPromiseResult.message);
        return;
      }
    })
    .catch((rejectedValueOrSerializedError) => {
      setHasError(true);
      setProducts([]);

      setErrorMessage(rejectedValueOrSerializedError);
      return;
    });
  }
 function handleSearch(e){
    e.preventDefault();
    setHasError(false);

    if(searchString===null|| searchString===undefined || searchString===""){

      getAll();

    }
    else{
      setHasError(false);

    dispatch(SearchProducts({ProductName:searchString}))
        .unwrap()
        .then((originalPromiseResult) => {
          if (originalPromiseResult.isSuccess) {
            setProducts(originalPromiseResult.productslist);
          } else {
            setHasError(true);
            setProducts([]);

            setErrorMessage(originalPromiseResult.message);
            return;
          }
        })
        .catch((rejectedValueOrSerializedError) => {
          setHasError(true);

          setErrorMessage(rejectedValueOrSerializedError);
          return;
        });
      }
  
 }
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-12">
            <div className="card rounded-3">
              <div className="card-body p-4 p-md-5">
                <h3>Available Products</h3>

                <form className="form-inline justify-content-center" onSubmit={(e)=>handleSearch(e)}>
                  <div className="form-group m-3">
                    <input
                      type="text"
                      className="form-control"
                      id="search"
                      placeholder="Search by Product Name"
                      name="search"
                      onChange={(e)=>(setSearchString(e.target.value))}
                      value={searchString}
                    />
                     <button type="submit" className="btn btn-dark m-2" >
                    Search
                  </button>
                  </div>
               
              
                  <button type="submit" className="btn btn-dark m-2 "  onClick={(e)=>(setSearchString(e.target.value))}>
                      View All Products
                  </button>
              
                  </form>

                <Table className="table mt-5">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Description </th>
                      <th>Features</th>
                      <th>Price(£)</th>
                      <th>Product Status</th>
                      <th>Available Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                 
                    
                    {(products.length > 0 && !hasError)&&
                      products.map((product, key) => (
                        <tr key={key} style={{ overflow: "wrap" }}>
                          <td
                            style={{ overflow: "wrap", wordBreak: "break-all" }}
                          >
                            {product.productName}
                          </td>
                          <td
                            style={{ overflow: "wrap", wordBreak: "break-all" }}
                          >
                            {product.productDescription}
                          </td>
                          <td
                            style={{ overflow: "wrap", wordBreak: "break-all" }}
                          >
                            {product.features}
                          </td>
                          <td
                            style={{ overflow: "wrap", wordBreak: "break-all" }}
                          >
                            {product.price}
                          </td>
                          <td
                            style={{ overflow: "wrap", wordBreak: "break-all" }}
                          >
                            {product.productStatus}
                          </td>
                          <td
                            style={{ overflow: "wrap", wordBreak: "break-all" }}
                          >
                            {product.availableQuantity}
                          </td>
                        
                        </tr>
                      ))}
                
                  </tbody>
                </Table>
                {hasError&&
                      <tr className=" row d-flex justify-content-center align-items-center h-100">
                    <td className="alert alert-danger" role="alert">{ErrorMessage}</td> 
                    </tr>
}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerView;
