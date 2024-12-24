import React, { useState } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";

const NavBar = ({ isSideBarExpanded }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(true); 
  const [searchVisible, setsearchVisible] = useState(true);

  const [Dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });



  const toggleSearchArea = () => {
    setIsSearchExpanded(!isSearchExpanded);

    if(!isSearchExpanded){
      setTimeout(() => setsearchVisible(true), 500); 
    }else{
      setsearchVisible(false);
    }
  };

  return (
    <header
      className={`bg-lightblue1 shadow-md h-auto flex flex-col px-4 py-2 mb-0 rounded-lg transition-all duration-500 ${
        isSideBarExpanded ? "ml-[260px]" : "ml-[100px]"
      }`}
    >
      

      

      <div
        className="flex items-center justify-between mt-4 cursor-pointer"
        onClick={toggleSearchArea}
      >
        <h3 className="text-xl font-bold text-bluedark">Browse Top Rated Books</h3>
        <button
          className="flex items-center justify-center w-4 h-4 rounded-full mt-2 mb-2 transition-all duration-300"
          aria-label="Toggle Search Section"
        >
          {isSearchExpanded ? (
            <FaChevronUp className="w-4 h-4 text-bluedark" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-bluedark" />
          )}
        </button>
      </div>

      <div
         className={`overflow-visible transition-all duration-500 ease-in-out ${
          isSearchExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div  className={`bg-lightblue2 p-4 mt-4 rounded-lg shadow-sm overflow-visible transition-all duration-500 ease-in-out${searchVisible ? "":"hidden"}`} 
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Book Name</h3>
              <input
                type="text"
                placeholder="Book Name"
                className="w-full px-3 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-bluelight"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Author Name</h3>
              <input
                type="text"
                placeholder="Author Name"
                className="w-full px-3 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-bluelight"
              />
            </div>
            

            <div className="relative">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Rate</h3>
              <select
                className="appearance-none w-full px-3 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-bluelight"
              >
                <option value="1">1</option>
                <option value="2 ">2 </option>
                <option value="3">3</option>
                <option value="4">4 </option>
                <option value="5">5 </option>
              </select>
              
              {/* Custom dropdown arrow */}
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                <FaChevronDown className="text-grey w-3 h-3 mt-7" />
              </div>
            </div>

          </div>
          <div className="flex justify-end mt-4">
            <button className="relative flex items-center bg-bluelight text-white px-5 py-2 rounded-full hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none">
              <span className="text-md font-semibold">Search</span>{" "}
              <FaSearch className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

