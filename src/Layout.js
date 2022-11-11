import React from "react";
import Header from "./Header";
function Layout(props)   {
  return (
    <div style={{ backgroundColor: "#8fc4b7" }}>
      <Header />
     
        <main>{props.children}
        </main>
       
    </div>
  );
}

export default Layout;
