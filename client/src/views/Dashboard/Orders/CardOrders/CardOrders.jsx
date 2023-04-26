import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, sendOrder } from "../../../../redux/actions/index";
import Swal from "sweetalert2";
import PaginationOrders from "../PaginationOrders/PaginationOrders";
import enviado from "../../../../assets/icons-user-dashboard/enviado.png"

const CardOrders = () => {
  const orders = useSelector((state) => state.Orders);

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const quantity = 5;
  const ordersDisplayed = orders.slice(start, start + quantity );


  const dispatch = useDispatch();

  const send = (id) => {
    dispatch(sendOrder(id))
      .then((resp) => {
        Swal.fire({
          icon: "success",
          text: "Order send successfully!",
        });
      })
      .then(() => {
        dispatch(getAllOrders());
      });
  };

  return (
    <div className="min-h-full flex flex-col ">
      <div class=" justify-center item-center">
        <div class="flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-full ">

           <div class="w-[100px] bg-white items-center justify-center m-2 px-8">
            <h5 class=" text-[15px] w-[100px] font-bold">Nro:</h5>
          </div>

          <div class="w-[100px] bg-white items-center justify-center m-2 px-8">
                <h5 class="text-[15px] w-[100px] font-bold">
                  Name
                </h5>
          </div>

          <div class="w-[100px] bg-white items-center justify-center m-2 px-8">
                <h5 class="text-[15px] w-[100px] font-bold">
                  Email
                </h5>
          </div>

          <div class="w-[80px] bg-white justify-center items-center m-2 px-8">
            <h5 class=" text-[15px] w-[80px] text-black font-bold">
              Date
            </h5>
          </div>

          {/* <div class="w-[250px] bg-white justify-center items-center m-2 px-8">
            <h5 class=" text-[15px] w-[200px] font-bold ">
              Product Detail
            </h5>
          </div> */}

          <div class="w-[100px] bg-white justify-center items-center m-2 px-8">
            <h5 class="mr-[80px] text-[15px] w-[150px] font-bold"> Address</h5>
          </div>

          <div class="w-[80px] bg-white justify-center items-center m-2 px-8">
            <h5 class="mr-[5px] text-[15px] w-[80px]  font-bold"> Total</h5>
          </div>

          <div class="w-[80px] bg-white justify-center items-center m-2 px-8">
            <h5 class="mr-[5px] text-[15px] w-[80px]  font-bold"> Status</h5>
          </div>

          <div class="w-[100px] bg-white justify-center items-center m-2 px-8">
            <h5 class="mr-[100px] text-[15px] w-[10px]  font-bold"> </h5>
          </div>

        </div>
      </div>

      <div class=" justify-center item-center py-[10px] pt-[10px] w-full">
        {ordersDisplayed?.map((e) => {
          return (
            <div class="flex text-center bg-white items-center justify-around ">

               <div class='w-[150px] h-[120px] bg-white justify-center items-center m-4'>
              <h5 class='mr-[100px] text-[15px] w-[150px] '>{e.id}</h5> 
              </div>

              <div class="w-[100px] h-[120px] bg-white justify-center items-center m-2">
                <h5 class="mr-[20px] text-[15px] w-[100px] text-left">
                  {e.user.name}
                </h5>
              </div>

              <div class="w-[200px] h-[120px] bg-white justify-center items-center m-2">
                <h5 class="mr-[20px] text-[15px] w-[200px] text-left">
                  {e.user.email}
                </h5>
              </div>

              <div class="w-[80px] h-[120px] bg-white justify-center items-center m-4 ">
                <h5  class="mr-[20px] text-[15px] w-[80px] text-black ">
                  {e.date.slice(0, 10)}
                </h5>
              </div>

              {/* <div class="w-[300px] h-[120px] bg-white justify-center items-center m-2">
                <h5 class="mr-[50px] text-[15px] w-[300px] text-black  text-left">
                  {e.nameAndQuantity + " "}
                </h5>
              </div> */}

              <div class="w-[100px] h-[120px] bg-white justify-center items-center m-2">
                <h5 class="mr-[20px] text-[15px] w-[100px] text-left">
                  {e.address}
                </h5>
              </div>

              <div class="w-[80px] h-[120px] bg-white justify-center items-center m-2">
                <h5 class="mr-[20px] text-[15px] w-[80px] ">
                  {e.total}
                </h5>
              </div>

              <div class="w-[80px] h-[120px] bg-white justify-center items-center m-2">
                <h5 class="mr-[10px] text-[15px] w-[80px] ">
                  {e.orderStatus.status}
                </h5>
              </div>


              <div className="justify-center pb-16 items-center item-center text-center ">     
               {e.orderStatus.status == "sent" ? 
               <img class=" w-20  h-16 flex m-2  pb-2  text-white   px-14 py-2 rounded-xl  text-lg"
                src={enviado} /> :
                 <button
                className="w-[100px]  flex m-2  bg-blue-500 hover:bg-blue-300 text-white  border border-gray-300 px-8 py-2 rounded-xl  text-lg "
                onClick={() => send(e.id)}
              >
                Send
              </button>}
              </div>

            </div>
          );
        })}
      </div>

        <div>
           <PaginationOrders
                quantity={quantity}
                start={start}
                setStart={setStart}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
           />
        </div>
    </div>
  );
};

export default CardOrders;
