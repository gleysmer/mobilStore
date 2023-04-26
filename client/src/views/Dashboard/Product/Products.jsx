import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Pagination from "../../Pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { getPhones } from "../../../redux/actions";

function ProductDashBoard() {
  const [enablement, setEnablement] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPhones())
  }, [enablement])
  
  const phones = useSelector((state) => state.PhonesCopy);
  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const quantity = 9;
  const phonesDisplayed = phones.slice(start, start + quantity);

  // console.log(phones);

  const update = async (id, boolean) => {
    const enabled = { enabled: !boolean };
    await axios.put(`http://localhost:3001/product/enabled/${id}`, enabled);
    setEnablement(!enablement)
    console.log(phones.enabled);
  };

  return (
    <div class="grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100">
      <div class="col-span-1 bg-slate-400 text-center w-full">
        <SideBar />
      </div>

      <div class="col-span-5 items-center relative">
        <div class="mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center">
          <h1 class="font-bold ml-[10px] text-[25px]">Phones</h1>
          <div className="items-center justify-center m-2 px-80 w-full">
            <SearchBar />
          </div>
          <Link to="/form-product" className="text-center rounded-xl border-4 bg-blue-100 hover:bg-blue-300 hover:text-white font-bold">
            Create a new phone
          </Link>
        </div>
        
        <div class="flex text-center bg-white items-center justify-center mx-40 flex-wrap w-[1000px] px-40">
          <div class=" justify-center">
            <div class="flex bg-white justify-evenly py-[10px] pr-3 w-[1000px]">
              <div class="w-[200px] bg-white items-center justify-center ">
                <h5 class="text-[15px]  font-bold">
                  Model
                </h5>
              </div>

              <div class="w-[200px] bg-white justify-center items-center">
                <h5 class="mr-[100px] text-[15px] w-[200px] text-black font-bold">
                  Price
                </h5>
              </div>

              <div class="w-[130px] bg-white flex justify-center items-center">
                <h5 class="text-[15px] w-[150px] font-bold">
                  Capacity
                </h5>
              </div>

              <div class="w-[150px] mr-[30px] bg-white justify-center items-center ">
                <h5 class="text-[15px] w-[150px] font-bold">
                  Stock
                </h5>
              </div>

              <div class=" bg-white justify-center items-center ">
                <h5 class="mr-[90px] text-[15px] w-[20px]  font-bold">
                  Enablement
                </h5>
              </div>

              <div class="bg-white flex justify-end">
                <h5 class="text-[15px] w-[30px] font-bold">Update</h5>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-center">
            {phonesDisplayed.map((phone) => {
              return (
                <div
                  key={phone.id}
                  class="flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-[1000px]"
                >
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-16 p-2"
                  />
                  <span className="text-[15px] w-[200px] font-bold">
                    {phone.name}
                  </span>
                  <span className="text-[15px] w-[200px] font-bold">
                    ${phone.price}
                  </span>
                  <span className="text-[15px] w-[200px] font-bold">
                    {phone.storageCapacity.capacity}GB
                  </span>
                  <span className="text-[15px] w-[200px] font-bold">
                    {phone.stock}
                  </span>
                  <button
                    onClick={() => update(phone.id, phone.enabled)}
                    className="text-[15px] w-[200px] font-bold"
                  >
                    {phone.enabled ? "Enabled" : "Disabled"}
                  </button>

                  <Link to={`/update-product/${phone.id}`} className="p-2">
                    <GrUpdate />
                  </Link>
                </div>
              );
            })}
          </div>
          <Pagination
            quantity={quantity}
            start={start}
            setStart={setStart}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDashBoard;
