import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/header/Header";
import { Footer } from "./Components/footer/Footer";
import Main from "./Components/Main/Main";
import SignIn from "./Components/Main/Sign In(Up)/SignIn";
import Like from "./Components/Main/Like/Like";
import Card from "./Components/Main/Cart/Cart";
import SignUp from "./Components/Main/Sign In(Up)/SignUp";
import Categories from "./Components/Categories/Categories";
import SingleProduct from "./Components/Product/SingleProduct";
import ProtectedRoute from "./Components/Main/Sign In(Up)/ProtectedRoute";
import User from "./Components/User/User";
import EditUser from "./Components/User/EditUser";
import "./Components/Main/Main.css";

function App() {
  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories/:data" element={<Categories />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/Like" element={<Like />} />
        <Route
          path="/SignIn"
          element={
            <ProtectedRoute>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/User" element={<User />} />
        <Route path="/EditUser" element={<EditUser />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
