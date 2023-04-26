import { useState } from "react";
import { useDispatch } from "react-redux";
import { PostOrdersDate } from "../../../../redux/actions/index";

export default function SearchBarOrders() {
  const dispatch = useDispatch();
  const [date, setdate] = useState("");

  const handleInputChange = (event) => {
    const date = event.target.value;
    setdate(date);
    dispatch(PostOrdersDate(date));

  };

  const handleClick = () => {
    dispatch(PostOrdersDate(""));
    setdate("");
  };

  return (
    <div class="relative">
      <input
        class="border-[.5px] border-gray-400 bg-white rounded-full w-full py-2 px-10 text-gray-800 focus:outline-none focus:border-blue-700
        dark:bg-slate-700 dark:text-gray-50 dark:border-slate-700 dark:focus:border-blue-700" 
        type="date"
        placeholder="Search..."
        value={date}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <div class="absolute right-0 inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            onClick={handleClick}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div class="absolute left-0 inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
