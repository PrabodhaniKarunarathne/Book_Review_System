import React, { useState } from "react";
import { 
  FaChevronLeft, FaChevronRight, FaPlusCircle, 
 FaFileContract,  FaUserTie, 
} from 'react-icons/fa';
import { useSelector } from "react-redux";



const SideBar = ({toggleSubMenu, expandedSubMenu ,isExpanded, toggleExpandCollapse, handleItemClick, handleSubItemClick, selectedItem, titlesVisible }) => {
    const {user} = useSelector((state) => state.auth);

    return (
        <div className="flex">
            <nav 
                className={`bg-bluedark h-full fixed top-0 left-0 
                    ${isExpanded ? 'w-[260px]' : 'w-[100px]'} 
                    py-6 px-4 font-[sans-serif] flex flex-col overflow-hidden transition-all duration-500 ease-in-out`} 
            >   
                <div className="flex items-center">
                   
                    <div 
                        className={`bg-lightblue1 rounded-full p-1 flex flex-wrap items-center cursor-pointer ${isExpanded ? 'w-[90%]' : 'w-[85%]'}`}
                    >
                        <div className="bg-bluelight w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xl">
                        <span>{user?.userName ? user.userName.charAt(0) : 'U'}</span>
                        </div>
                        <div 
                            className={`ml-2 transition-all duration-500 ${
                                isExpanded && titlesVisible ? 'opacity-100' : 'opacity-0 hidden'
                            }`} 
                        >
                                 <p className="text-base text-bluedark font-bold">{user?.name}</p> {/* Correct property name */}
                            
                        </div>
                    </div>
                    <div className={`py-1 ${isExpanded ? 'ml-2' : 'ml-0'}`}>
                        <button 
                            onClick={toggleExpandCollapse} 
                            className="flex items-center justify-center w-8 h-8 rounded-full mt-2 mb-2 transition-all duration-300"
                        >
                            {isExpanded ? (
                                <FaChevronLeft className="text-lightblue2" />
                            ) : (
                                <FaChevronRight className="text-lightblue2" />
                            )}
                        </button>
                    </div>
                </div>

                <ul className="space-y-3 mt-8">
                    {[
                        { icon: <FaFileContract />, title: "Home", id: "ViewReviews" },
                        { icon: <FaPlusCircle />, title: "Add Review", id: "BookReview" },
                        { icon: <FaUserTie />, title: "My Reviews", id: "MyReviews" },
                        
                    ].map((item, index) => (
                    <li key={index}>
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                    item.subMenu ? toggleSubMenu(item.id) : handleItemClick(item.id);
                                    }}
                                    className={`text-lightblue1 font-bold hover:text-white text-md flex items-center 
                                    hover:bg-bluelight rounded-full ${isExpanded ? 'px-4' : 'px-6'} py-1 transition-all duration-500 ease-in-out 
                                    ${selectedItem === item.id ? 'bg-blue-700' : ''}`}
                                >
                                    <span className={`text-md py-2 ${isExpanded ? 'mr-4' : 'w-[100%] mr-0'}`}>{item.icon}</span>
                                    <span
                                    className={`transition-all duration-500 ${
                                        isExpanded && titlesVisible ? 'opacity-100 ml-4' : 'opacity-0 ml-0 hidden'
                                    }`}
                                    >
                                    {item.title}
                                    </span>
                                </a>
                            {item.subMenu && (
                                <ul
                                    className={`ml-4 mt-0 transition-all duration-500 ease-in-out overflow-hidden ${
                                    expandedSubMenu === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                    style={{
                                    transition: 'max-height 0.5s ease, opacity 0.5s ease',
                                    }}
                                >
                                    {item.subMenu.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                        <a
                                        href="javascript:void(0)"
                                        onClick={() => handleItemClick(subItem.id)}
                                        className={`text-lightblue1 font-bold hover:text-white text-sm flex mt-1 items-center 
                                            hover:bg-bluelight rounded-full ${isExpanded ? 'px-4' : 'px-6'} py-1 transition-all duration-500 ease-in-out 
                                            ${selectedItem === subItem.id ? 'bg-blue-700' : ''}`}
                                        >
                                        <span className={`text-sm py-1 ${isExpanded ? 'mr-1' : 'mr-0'}`}>{subItem.icon}</span>
                                        <span
                                            className={`transition-all duration-500 ${
                                            isExpanded && titlesVisible ? 'opacity-100 ml-2' : 'opacity-0 ml-0 hidden'
                                            }`}
                                        >
                                            {subItem.title}
                                        </span>
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                                )}

                            
                        </li>
                    ))}
                </ul>

                
                
            </nav>
            
        </div>
    );
};

export default SideBar;
