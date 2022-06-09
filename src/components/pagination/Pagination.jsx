import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

const Pagination = ({ productsPerPage }) => {
  const dispatch = useDispatch();
  const { products, page } = useSelector((state) => state);

  const pageProducts = [];

  const changePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  for (let i = 1; i < Math.trunc(products.length / productsPerPage + 2); i++) {
    pageProducts.push(i);
  }

  const style =
    "relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 focus:shadow-none cursor-pointer";

  return (
    // <div className="flex flex-col items-center">
    //   {pageProducts.length > 0 && (
    //     <nav>
    //       <ul className="inline-flex -space-x-px">
    //         <li className="text-sm text-zinc-900 dark:text-gray-400" >
    //           <span>
    //             Page <span className="font-semibold text-gray-900 dark:text-slate-900">{page}</span> from {pageProducts.length}
    //           </span>
    //         </li>
    //         <li>
    //           <button className={style} onClick={() => changePage(1)} disabled={page === 1}>
    //             First
    //           </button>
    //         </li>
    //         <li >
    //           <button className={style}
    //             onClick={() => changePage(page - 1)}
    //             disabled={page === 1}
    //           >
    //             Prev
    //           </button>
    //         </li>
    //         <li >
    //           <button className={style}
    //             onClick={() => changePage(page + 1)}
    //             disabled={page >= pageProducts.length}
    //           >
    //             Next
    //           </button>
    //         </li>
    //         <li>
    //           <button className={style}
    //             onClick={() => changePage(pageProducts.length)}
    //             disabled={page >= pageProducts.length}
    //           >
    //             Last
    //           </button>
    //         </li>
    //       </ul>
    //     </nav>
    //   )}
    // </div>
    <div className="flex flex-col items-center mb-12">
      {pageProducts.length > 0 && (
        <>
          <span className="text-md text-zinc-900 dark:text-zinc-900">
            Page{" "}
            <span className="font-semibold text-gray-900 dark:text-zinc-900">
              {page}
            </span>{" "}
            from{" "}
            <span className="font-semibold text-gray-900 dark:text-zinc-900">
              {pageProducts.length}
            </span>{" "}
          </span>

          <div className="inline-flex mt-2 xs:mt-0">
            <button onClick={() => changePage(1)} disabled={page === 1} className="py-2 px-4 text-md font-medium text-white bg-[#ee6c4d] rounded-l hover:bg-gray-900 dark:bg-[#ee6c4d] dark:border-gray-700 dark:text-white dark:hover:bg-[#3d5a80] dark:hover:text-white">
              First
            </button>
            <button onClick={() => changePage(page - 1)} disabled={page === 1}  className="py-2 px-4 text-md font-medium text-white bg-[#ee6c4d]  border-l hover:bg-gray-900 dark:bg-[#ee6c4d] dark:border-gray-700 dark:text-white dark:hover:bg-[#3d5a80] dark:hover:text-white">
              Prev
            </button>
            <button onClick={() => changePage(page + 1)} disabled={page >= pageProducts.length} className="py-2 px-4 text-md font-medium text-white bg-[#ee6c4d]  border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-[#ee6c4d] dark:border-gray-700 dark:text-white dark:hover:bg-[#3d5a80] dark:hover:text-white">
              Next
            </button>
            <button onClick={() => changePage(pageProducts.length)} disabled={page >= pageProducts.length} className="py-2 px-4 text-md font-medium text-white bg-[#ee6c4d] rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-[#ee6c4d] dark:border-gray-700 dark:text-white dark:hover:bg-[#3d5a80] dark:hover:text-white">
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
