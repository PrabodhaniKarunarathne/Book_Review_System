import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import NavBar from "../components/Navbar/navbar.jsx";
import SideBar from "../components/Sidebar/sidebar.jsx";
import MyReviews from "./MyReviews/reviewdata.jsx";
import BookReview from "./AddReview/addreview.jsx";
import ViewReviews from "./HomePage/AllReviewsData.jsx";

const Page = () => {
  const { state } = useLocation(); 
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedItem, setSelectedItem] = useState("MyReviews");
  const [titlesVisible, setTitlesVisible] = useState(true);
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);

  useEffect(() => {
    if (state?.selectedItem) {
      setSelectedItem(state.selectedItem); 
    }
  }, [state]);
  
  const toggleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => setTitlesVisible(true), 500); 
    } else {
      setTitlesVisible(false);
    }
  };

  const toggleSubMenu = (id) => {
    setExpandedSubMenu(expandedSubMenu === id ? null : id);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    const contentClass = `{transition-all duration-300 ${
      isExpanded ? "ml-[260px]" : "ml-[100px]"}
    }`;

    switch (selectedItem) {
      case "CreateJob":
        return <div className={contentClass}><CreateJob /></div>;
      case "MyReviews":
        return <div className={contentClass}><MyReviews /></div>;
      case "ViewReviews":
        return <div className={contentClass}><ViewReviews /></div>;
      case "BookReview":
        return <div className={contentClass}><BookReview /></div>;
      default:
        return <div className={contentClass}>Select a menu item to view its content</div>;
    }
  };

  return (
    <div className="flex">
      <SideBar
        isExpanded={isExpanded}
        toggleExpandCollapse={toggleExpandCollapse}
        handleItemClick={handleItemClick}
        selectedItem={selectedItem}
        titlesVisible={titlesVisible}
        toggleSubMenu={toggleSubMenu}
        expandedSubMenu={expandedSubMenu}
        handleSubItemClick={selectedItem}
      />
      <div className="flex-1">
        <NavBar isSideBarExpanded={isExpanded} />
        <main className="p-6 pt-0 mt-2 shadow-none">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Page;


