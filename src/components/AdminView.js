import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts, DeleteProductSlice } from "../store/slice/ProductSlice";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

function AdminView() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [ErrorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (products.length === 0) {
      getAll();
    }
  });
  function getAll() {
    dispatch(getAllProducts())
      .unwrap()
      .then((originalPromiseResult) => {
        if (originalPromiseResult.isSuccess) {
          setProducts(originalPromiseResult.productslist);
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
  }

  function updateStatusFun(e, product) {
    e.preventDefault();
    localStorage.setItem("Product", product);
    navigate("/UpdatePRoductStatus", { state: { ProductDetails: product } });
  }

  function DeleteRecordFun(e, product){
    e.preventDefault();
    dispatch(DeleteProductSlice({id:product._Id}))
    .unwrap()
    .then((originalPromiseResult) => {
      if (originalPromiseResult.isSuccess) {
        window.location.reload(true);
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
  }
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className=" m-3 py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-12">
            <div className="card rounded-3">
              <div className="card-body p-4 p-md-5">
                <h3>Admin Dashboard</h3>
                <div>
                {hasError && (
                  <div className="alert alert-danger" role="alert">
                    {ErrorMessage}, Please verify
                  </div>
                )}
                  <button
                    className="btn btn-dark mt-4"
                    onClick={() => {
                      navigate("/AddNewProductsView");
                    }}
                  >
                    Add Product
                  </button>
                </div>
                <Table className="table mt-5 stripped rounded">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Description </th>
                      <th>Features</th>
                      <th>Price(£)</th>
                      <th>Available Quantity</th>
                      <th>Product Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 &&
                      products.map((product, key) => (
                        <tr key={key} style={{ overflow: "wrap" }}>
                          <td className="tablestyle">{product.productName}</td>
                          <td className="tablestyle">
                            {product.productDescription}
                          </td>
                          <td className="tablestyle">{product.features}</td>
                          <td className="tablestyle">{product.price}</td>
                          <td className="tablestyle">
                            {product.availableQuantity}
                          </td>
                          <td className="tablestyle">
                            {product.productStatus}
                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={(e) => updateStatusFun(e, product)}
                            >
                              Update status
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger"  onClick={(e) => DeleteRecordFun(e, product)}>Delete</button>
                          </td>

                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminView;
