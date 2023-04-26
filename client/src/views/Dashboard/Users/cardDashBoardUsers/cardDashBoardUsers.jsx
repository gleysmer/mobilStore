import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {GetUsers , PutUserAdminDashBoard, PutUserBanDashBoard} from "../../../../redux/actions/index"
import PaginationUsers from "../PaginationUser/PaginationUser";
import admin from "../../../../assets/icons-user-dashboard/admin.png"
import ban from "../../../../assets/icons-user-dashboard/ban.png"
import Swal from "sweetalert2";

export default function CardDashBoard(){

    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.Users);

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const quantity = 9;
    const usersDisplayed = allUsers.slice(start, start + quantity );

    useEffect(() => {
        dispatch(GetUsers());
      }, [dispatch]); 

      const AdminUser = (id) =>{

        dispatch(PutUserAdminDashBoard( id)).then((resp) => {
            Swal.fire({
                icon: 'sucess',
                title: resp.data.message,
                text: 'User role changed successfully!',
        })
        }).then(() => {
            dispatch(GetUsers());
        })
     
    }

    const BanUser = (id) =>{

        dispatch(PutUserBanDashBoard( id)).then((resp) => {
            Swal.fire({
                icon: 'sucess',
                title: resp.data.message,
                text: 'User enablement changed successfully!',
        })
        }).then(() => {
            dispatch(GetUsers());
        })

    }

    return(
        <div className="min-h-full flex flex-col ">

                    <div class=' justify-center item-center'>
    
                            <div class='flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-[1000px] '>

                            <div class='w-[200px] bg-white items-center justify-center m-2'>
                            <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'>Name</h5>
                            </div>
                            
                            <div class='w-[200px] bg-white justify-center items-center m-2'>
                            <h5 class='mr-[100px] text-[15px] w-[200px] text-black font-bold'>Email</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center m-2'>
                            <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'>Rol</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center m-2'>
                            <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'> Qualification</h5>
                            </div>

                            <div class='w-[80px] bg-white justify-center items-center m-2'>
                            <h5 class='mr-[80px] text-[15px] w-[20px]  font-bold'> Assign Role</h5>
                            </div>

                            <div class='w-[80px] bg-white justify-center items-center px-0 m-2'>
                            <h5 class='mr-[80px] text-[15px] w-[20px] font-bold'> assign enablement</h5>
                            </div>


                             </div>
                 

                    </div> 

                    <div class=' justify-center item-center py-[10px] pt-[10px] w-[1000px]'>
                     {usersDisplayed?.map((e) => {
                            return(
                            <div class='flex text-center bg-white items-center justify-around '>
                            <div class='w-[200px] bg-white justify-center items-center m-2'>
                            <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'>{e.name}</h5>
                            <h5 class='text-[12px] font-bold'>{e.surname}</h5>
                            </div>
                            
                            <div class='w-[200px] bg-white justify-center items-center m-2'>
                            <h5 class='mr-[100px] text-[15px] w-[200px] text-black font-bold'>{e.email}</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center m-2'>
                            <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'>{e.rol}</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center m-2'>
                            {e.enabled === true ? <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'>enabled</h5> : <h5 class='mr-[100px] text-[15px] w-[150px] font-bold text-red-600'> disabled</h5>}
                            </div>

                            <button className="item-center justify-center items-center flex m-2 " onClick={() => AdminUser(e.id)} >
                            <img  class= " z-9  my-auto h-8 m-7 text-center item-center justify-center"src = {admin}/>
                            </button>

                            <button className="justify-center items-center flex m-2" onClick={() => BanUser(e.id)} >
                            <img  class= " z-9  my-auto h-8 m-7 text-center item-center justify-center"src = {ban}/>
                            </button>


                             </div>
                        )
                        })} 

                    </div> 



                    <div className="">
                    <PaginationUsers
                        quantity={quantity}
                        start={start}
                        setStart={setStart}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    </div>


        </div>
    )
}