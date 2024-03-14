import React, { useContext } from "react";
import { IoNotifications } from "react-icons/io5";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { DataContext } from "../../context/Datacontext";
function Navbar({ setValue, handleSearch, value }) {
  const { isLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleNotLoggedInClick = (e) => {
    e.preventDefault()
    enqueueSnackbar("Please log in to access this feature.", {
      variant: "warning",
    });
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 navbar-section ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span
          className="self-center text-2xl font-bold whitespace-nowrap dark:text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          Weather App
        </span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-basic px-4 py-2 me-20 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-30"
                onClick={() => navigate("/logout")}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-basic px-4 py-2 me-20 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-30 "
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          )}

          {isLoggedIn ? (
            <Link to="/saved">
              <div className="save-items">
                <IoNotifications />
              </div>
            </Link>
          ) : (
            <div className="save-items" onClick={handleNotLoggedInClick}>
              <IoNotifications />
            </div>
          )}

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>

            <form className="flex items-center max-w-sm mx-auto">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative  input-search">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Search location..."
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
             {
              isLoggedIn?(
                <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-800 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleSearch(e)}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
              ):(
                <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-800 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleNotLoggedInClick}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
              )
             }
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
