import React from 'react';
import AdminView from "./AdminView";
import CustomerView from "./CustomerView";

function Products(){
 

return(
    <div>
      {localStorage.getItem("isAdmin")==="true" ? <AdminView/> : <CustomerView/>}

       

    </div>
)
}

export default Products
