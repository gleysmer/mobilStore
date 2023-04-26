import React,{useState,useEffect} from "react";
import SideBar from "../SideBar/SideBar";
import { useDispatch,useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/actions";
import CardOrders from "./CardOrders/CardOrders";
import SearchBarOrders from "./SearchBarOrders/SearchBarOrders";

export default function Orders(){
    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(getAllOrders())
    }, [])


    return(

        <div class='grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100'>
            <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>  

            <div class='col-span-5 items-center relative'>

                 <div class='mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center'>
                    <h1 class='font-bold ml-[10px] text-[25px]'>Orders</h1> 

                    <div className="flex items-center justify-center m-4 px-20 w-2/5 mx-80"> <SearchBarOrders/> </div>  
                </div>

                <div class='flex text-center bg-white items-center justify-center mx-20  w-[1200px]   h-full px-40'>
                <CardOrders/>
              </div>  
            </div>
        </div>
    )

}