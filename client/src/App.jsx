import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "./components/details/details";
import Home from "./views/Home/Home";

import {
  getPhones,
  getBrands,
  getCapacity,
  LoginSuccess,
} from "./redux/actions";

import { CreateProduct } from "./components/FormCreateProduct/CreateProduct";
import { UpdateProduct } from "./components/FormCreateProduct/UpdateProduct";
import Store from "./views/store/store";
import About from "./views/About/About";
import Cart from "./views/Cart/Cart";
import NotFount from "./views/notFount/NotFount";
import Login from "./views/Login/login";
import Wishlist from "./views/WishList/Wishlist";
import Register from "./views/Register/register";
import Dashboard from "./views/Dashboard/Dashboard";
import Support from "./views/Support/Support";
import UsersDashBoard from "./views/Dashboard/Users/User";
import PasswordReset from "./components/ActPassword/PasswordReset";
import Reset from "./components/ActPassword/Reset";
import { CreateReviews } from "./components/Reviews/CreateReviews";
import RutePrivade from "./components/rutePrivade/RutePrivade";
import ProductDashBoard from "./views/Dashboard/Product/Products";
import Profile from "./views/Profile/Profile";
import QA from './views/QA/QA'
import Contact from './views/Contact/Contact'
import Orders from "./views/Dashboard/Orders/Orders";
import axios from "axios";

export default function App(){

  const dispatch = useDispatch();
  const data = useSelector((state) => state.User);
  const admin = data?.data_user?.rol;

  useEffect(() => {
    if (window.localStorage.getItem("user-log")) {
      dispatch(
        LoginSuccess(JSON.parse(window.localStorage.getItem("user-log")))
      );
    }
  }, []);

  useEffect(() => {
    dispatch(getPhones());
    dispatch(getBrands());
    dispatch(getCapacity());
  }, []);

  useEffect(() => {
    if(Object.keys(data).length === 0){
        getUser();
    }
  }, [])

    const getUser = async () => {
      try {
        const url = `http://localhost:3001/auth/login/success`;
        const data = await axios.get(url, { withCredentials: true });
    
        console.log("DATA", data);
    
        const info = {
          data_user: {
            id: data.data.id,
            name: data.data.name,
            surname: data.data.surname,
            email: data.data.email,
            image: data.data.image,
          },
          token: null,
        }
    
        dispatch(LoginSuccess(info));
      } catch (err) {
        console.log("ERROR", err)
      }
    };



  return (
    <div className="App">
      <Routes>


        <Route exact path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/About" element={<About />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="*" element={<NotFount />} />
        <Route path="/review/:productId" element={<CreateReviews />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/QA" element={<QA />} />
        <Route path="/Contact" element={<Contact />} />
   


        <Route element={<RutePrivade />}>
          <Route path="/DashBoard" element={<Dashboard />} />
        
          <Route path="/UsersDashBoard" element={<UsersDashBoard />} />
          <Route path="/ProductsDash" element={<ProductDashBoard />} />
          <Route exact path="/form-product" element={<CreateProduct />} />
          <Route exact path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/Orders" element={<Orders />} />
        </Route>
       
      </Routes>
    </div>
  );
}