import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./components/LandingPage/landingpage";
import LoginPage from "./components/Loginpage/loginpage";
import UserRegistration from "./components/UserRegistration/useregistration";
import Page from "./components/Page";
import BookReview from "./components/AddReview/addreview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/userregistration" element={<UserRegistration />} />
      <Route path="/addreview" element={<BookReview />} />
      <Route path="/dashboard" element={<Page />} />
    </Routes>
  );
};

export default App;
