import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RutePrivade() {

  const data = useSelector(state => state.User)
  const admin = data?.data_user?.rol;


  if (!admin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

