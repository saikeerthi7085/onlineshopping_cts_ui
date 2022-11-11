import React from 'react';

import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Layout  from "./Layout";
import Login from "./components/Login";
import Products from "./components/Products";
import Register from "./components/Register";
import ResetPassword from './components/ResetPassword';
import AddNewProductsView from "./components/AddNewProductsView"
import UpdateProductStatus from './components/UpdateProductStatus';
function App() {
  return (
    <div className="App">
      <Layout>
       <Routes>
          <Route path='/' exact element={<Login/>} />

          <Route path='/Login' exact element={<Login/>} />
          <Route path='/Products' exact element={<Products/>} />
          <Route path='/Register' exact element={<Register/>} />
          <Route path='/ResetPassword' exact element={<ResetPassword/>} />
          <Route path='/AddNewProductsView' exact element={<AddNewProductsView/>} />
          <Route path='/UpdateProductStatus' exact element={<UpdateProductStatus/>} />

          </Routes>


      </Layout>
    </div>
  );
}

export default App;
