import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Pagination({
  quantity,
  start,
  setStart,
  currentPage,
  setCurrentPage,
}) {
  const [pageButtons, setPageButtons] = useState([]);
  const phones = useSelector((state) => state.PhonesCopy);

  const total = Math.ceil(phones.length / quantity);
  const pages = [];

  for (let index = 1; index <= total; index++) {
    pages.push(index);
  }

  const handlePrev = () => {
    start && setCurrentPage(currentPage - 1);
    start && setStart(start - quantity);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    currentPage < pages.at(-1) && setCurrentPage(currentPage + 1);
    currentPage < pages.at(-1) && setStart(start + quantity);
    window.scrollTo(0, 0);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    const current = page - 1;
    setStart(quantity * current);
    window.scrollTo(0, 0);    
  };

  useEffect(() => {
    let numberOfPages = [...pages];

    const dotsRight = " ...";
    const dotsLeft = "... ";

    if (pages.length <= 5) {
      numberOfPages = [...pages];
    } else if (pages.length > 5) {
      if (currentPage < 3) {
        numberOfPages = [1, 2, 3, dotsRight, pages.at(-1)];
      } else if (currentPage === 3) {
        pages.at(-2) - currentPage > 2
          ? (numberOfPages = [1, 2, 3, 4, dotsRight, pages.at(-1)])
          : (numberOfPages = [...pages]);
      } else if (currentPage === 4) {
        pages.at(-2) - currentPage > 2
          ? (numberOfPages = [1, 2, 3, 4, 5, dotsRight, pages.at(-1)])
          : (numberOfPages = [...pages]);
      } else if (currentPage > 4 && currentPage < pages.at(-4)) {
        numberOfPages = [
          1,
          dotsLeft,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          dotsRight,
          pages.at(-1),
        ];
      } else if (currentPage === pages.at(-3)) {
        numberOfPages = [
          1,
          dotsLeft,
          pages.at(-4),
          pages.at(-3),
          pages.at(-2),
          pages.at(-1),
        ];
      } else if (currentPage > pages.at(-3)) {
        numberOfPages = [1, dotsLeft, pages.at(-3), pages.at(-2), pages.at(-1)];
      } else if (currentPage === pages.at(-4)) {
        numberOfPages = [
          1,
          dotsLeft,
          pages.at(-5),
          pages.at(-4),
          pages.at(-3),
          pages.at(-2),
          pages.at(-1),
        ];
      } else if (currentPage === dotsRight) {
        const page = pageButtons.at(-3) + 1;
        setCurrentPage(page);
        setStart(quantity * (page - 1));
      } else if (currentPage === dotsLeft) {
        const page = pageButtons.at(2) - 1;
        setCurrentPage(page);
        setStart(quantity * (page - 1));
      }
    }
    setPageButtons(numberOfPages);
  }, [currentPage, total]);
 
  
  return(

    <div className="flex justify-center space-x-2 dark:text-gray-100 mb-5 ">
	    <button onClick={handlePrev} title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">
		    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
			    <polyline points="15 18 9 12 15 6"></polyline>
		    </svg>
      </button>

      {
        pageButtons.map((page, i) => {
          return(
            <div>
              <button 
                key={i}
                type="button"
                onClick={() => handleChangePage(page)}
                title="Page 1"
                className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded shadow-md
                 dark:bg-gray-900 dark:text-slate-200 ${page === currentPage && "bg-blue-500 dark:bg-blue-500"}`} >{page}
                </button>
            </div>
          )
        })
      }
	    
      <button onClick={handleNext} title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">
        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
			    <polyline points="9 18 15 12 9 6"></polyline>
		    </svg>
	    </button>
    </div>
  );
}



export default Pagination;
