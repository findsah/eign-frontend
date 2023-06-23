import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/about/About";
import Blog from "../pages/blog/Blog";
import Experience from "../pages/experience/Experience";
import Feature from "../pages/feature/Feature";
import Footer from "../pages/footer/Footer";
import Header from "../pages/header/Header";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Sell from "../pages/sell/Sell";
import SubmitProperty from "../pages/submitproperty/Submitproperty";
import SubmitOffer from "../pages/submitoffer/SubmitOffer";


const MainRoutes = () => {

  return (
  <>
    <Header />
    <Routes>
      {/* main App routing */}
        <Route index path="/" element={<Home />} />
        <Route  path="/feature/:id" element={<Feature />} />
        <Route  path="/experience" element={<Experience />} />
        <Route  path="/blog" element={<Blog />} />
        <Route  path="/sell" element={<Sell />} />
        <Route  path="/submit-property" element={<SubmitProperty />} />
        <Route  path="/submit-offer/:id" element={<SubmitOffer />} />
        <Route  path="/search" element={<Search />} />
        <Route  path="/about" element={<About />} />
 
      {/* layout for Dashboard */}
      {/* public routing */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<>Page not found</>} /> */}
    </Routes>
    <Footer />
  </>
  );
};

export default MainRoutes;
