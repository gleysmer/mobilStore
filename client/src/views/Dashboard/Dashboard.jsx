import React from "react";
import SideBar from "./SideBar/SideBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalOrders, getUsersStatistics } from "../../redux/actions/index";
import { getTotalDesdeHasta } from "../../redux/actions/index";

export default function Dashboard() {
  const dispatch = useDispatch();
  const allStatisticsTotal = useSelector((state) => state.StatisticsTotal);
  const allStatisticsUsers = useSelector((state) => state.StatisticsUsers);
  const range = useSelector((state) => state.Range);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  
  console.log(range);

  useEffect(() => {
    dispatch(getTotalOrders());
    dispatch(getUsersStatistics());
  }, [dispatch]);

  const timeFrame = (event) => {
    if (event.target.name === "from") {
      const fromR = event.target.value;
      setFrom(fromR);
    } else if (event.target.name === "to") {
      const toR = event.target.value;
      setTo(toR);
    }
  };

  return (
    <div class="grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100">
      <div class="col-span-1 bg-slate-400 text-center w-full">
        <SideBar />
      </div>

      <div class="col-span-5 items-center relative">
        <div class="mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center">
          <h1 class="font-bold ml-[10px] text-[25px]">Overview</h1>
        </div>

        <div className="items-center justify-center px-40 ">
          <div class="flex text-center mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px  justify-center items-center  w-[1000px] h-[200px]  px-40">
            <div className="flex ">
              {allStatisticsTotal !== null ? (
                <h1 className="w-[400px] font-bold text-2xl px-10 py-4  border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-blue-100 pt-8">
                  {" "}
                  Last year sales{" "}
                  <h2 className="font-bold text-green-500 text-2xl ">
                    {allStatisticsTotal.count}
                  </h2>{" "}
                </h1>
              ) : (
                <h1>indefined count </h1>
              )}
              {allStatisticsTotal !== null ? (
                <h1 className=" w-[400px] font-bold text-2xl px-10 py-4 border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-blue-100 pt-8">
                  {" "}
                  Last year profits{" "}
                  <h2 className="font-bold text-green-500 text-2xl">
                    ${allStatisticsTotal.total}
                  </h2>{" "}
                </h1>
              ) : (
                <h1> indefined count total </h1>
              )}
            </div>
          </div>

          <div class="flex text-center mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px  justify-center items-center  w-[1000px] h-[200px]  px-40">
            <div className="flex">
              {allStatisticsUsers !== null ? (
                <h1 className=" w-[400px] font-bold text-2xl px-10 py-4  border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-green-100 pt-8">
                  {" "}
                  Active users{" "}
                  <h2 className="font-bold text-green-500 text-2xl ">
                    {allStatisticsUsers.enabled}
                  </h2>{" "}
                </h1>
              ) : (
                <h1>indefined users enabled</h1>
              )}
              {allStatisticsUsers !== null ? (
                <h1 className=" w-[400px] font-bold text-2xl px-10 py-4  border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-red-100 pt-8">
                  {" "}
                  Banned users{" "}
                  <h2 className="font-bold text-green-500 text-2xl">
                    {allStatisticsUsers.disabled}
                  </h2>{" "}
                </h1>
              ) : (
                <h1> indefined users disabled </h1>
              )}
            </div>
          </div>

          <div className="flex text-center mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px  justify-center items-center  w-[1000px] h-[200px]  px-40">
            <div className="w-full font-bold text-xl px-4 py-4  border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-yellow-100">
              <span className="mr-3">Sales from</span>
              <input
                name="from"
                type="date"
                value={from}
                onChange={timeFrame}
                className="w-fit text-base font-bold mr-3 bg-yellow-100"
              />
              <span className="mr-3">to</span>
              <input
                name="to"
                type="date"
                value={to}
                onChange={timeFrame}
                className="w-fit text-base font-bold mr-3 bg-yellow-100"
              />
              <button onClick={() => dispatch(getTotalDesdeHasta(from, to))} className="bg-yellow-200 w-32 rounded-md mt-2">
                Get total
              </button>
              <div className="flex justify-around"><span >Sales <p className="font-bold text-green-500 text-2xl">{range.count}</p></span>
              <span>Profits <p className="font-bold text-green-500 text-2xl">{range.total && '$' + range.total}</p></span></div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}