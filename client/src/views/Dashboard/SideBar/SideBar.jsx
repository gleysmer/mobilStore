import React from "react";
import { useDispatch, useSelector } from "react-redux";
import home from "../../../assets/icons-user-dashboard/home.png";
import phones from "../../../assets/icons-user-dashboard/phones.png";
import users from "../../../assets/icons-user-dashboard/users.png";
import userphoto from "../../../assets/icons-user-dashboard/user.png";
import statistics from "../../../assets/icons-user-dashboard/statistics.png";
import ordersIcon from "../../../assets/icons-user-dashboard/orders.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LogOut } from "../../../redux/actions";
import { RiLogoutCircleRFill } from 'react-icons/ri'

export default function SideBar() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.User);

  const handleLogOut = () => {

		Swal.fire({
			icon: 'warning',
			title: 'Do you want to log out?',
			confirmButtonText: 'Yes',
			showDenyButton: true,
		}).then((result) => {
			if(result.isConfirmed){

				dispatch(LogOut());
				navigate('/')

				Swal.fire({
					icon: 'success',
					title: 'The session has been closed'
				})
				
			}})
	  }

  return (
    <div className="bg-gray-900 h-full  fixed  lg:static w-[100%] top-0 left-0 ">
      {Object.keys(user).length === 0 ? (
        <div className="justify-center item-center  flex flex-col py-1 gap-2 h-[30vh] place-content-center px-20">
          <div className="px-2 justify-center item-center mx-0 ">
       
            <img
              src={userphoto}
              className="w-24 text-center  h-24 objet-cover m-2   rounded-full ring-2 ring-gray-300"
            />
          </div>
          <h1 className="text-white text-2xl font-bolt text-center m-2">
            Usuario
          </h1>
          <p className="text-white text-xl font-bolt bg-gray-200 py-1 px-3 rounded-full text-center m-2">
            Admin
          </p>
        </div>
      ) : (
        <div className="justify-center item-center  flex flex-col p-8 gap-2 h-[30vh] place-content-center px-20">
          <div className="px-2">

            <img
              src={user.data_user.image}
              className="w-24 text-center  h-24 objet-cover  rounded-full ring-2 ring-gray-300    justify-center item-center"
            />
          </div>
          <h1 className="text-white text-2xl font-bolt text-center ">
            {user.data_user.name}
          </h1>
          <p className="text-white text-xl font-bolt bg-gray-200 py-1  rounded-full text-center">
            Admin
          </p>
        </div>
      )}

      <div className="bg-gray-500 p-8 rounded-tr-[100px] h-full">
        <nav className="flex flex-col gap-4 h-full">
          <Link
           to='/dashboard'
           className="text-white text-xl font-bolt flex item-center justify-center gap-4 py-2 px-4 hover:bg-gray-600 rounded-xl">
            Overview
            <img
              class=" z-10 inset-y-0 my-auto h-10  hover:bg-gray-600  p-1"
              src={statistics}
            />
          </Link>

          <Link
            to="/ProductsDash"
            className="text-white text-xl font-bolt flex item-center justify-center gap-4 py-2 px-4 hover:bg-gray-600 rounded-xl"
          >
            Phones
            <img
              class=" z-10 inset-y-0 my-auto h-10  hover:bg-gray-600  p-1"
              src={phones}
            />
          </Link>

          <Link to = "/UsersDashBoard">
            <a className="text-white text-xl font-bolt flex item-center justify-center gap-4 py-2 px-4 hover:bg-gray-600 rounded-xl">

              Users
              <img
                class=" z-10 inset-y-0 my-auto h-10  hover:bg-gray-600  p-1"
                src={users}
              />
            </a>
          </Link>

          <Link to = "/Orders">
            <a className="text-white text-xl font-bolt flex item-center justify-center gap-4 py-2 px-4 hover:bg-gray-600 rounded-xl">

              Orders
              <img
                class=" z-10 inset-y-0 my-auto h-10  hover:bg-gray-600  p-1"
                src={ordersIcon}
              />
            </a>
          </Link>

          <Link
           to='/'
           className="text-white text-xl font-bolt flex item-center justify-center gap-4 py-2 px-4 hover:bg-gray-600 rounded-xl">

            Home
            <img
              class=" z-10 inset-y-0 my-auto h-10  hover:bg-gray-600  p-1"
              src={home}
            />
          </Link>

          <div className="text-white text-xl font-bolt flex item-center justify-center gap-4 py-2 px-4 hover:bg-gray-600 rounded-xl">

            LogOut
            < RiLogoutCircleRFill
                onClick={() => handleLogOut()}
                alt=""
                className="hover:transform hover:scale-110 w-7 h-7 rounded-full"
              />
          </div>


        </nav>
      </div>


    </div>
  );
}
