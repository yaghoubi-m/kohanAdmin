// App.js
import React from 'react';

import HeaderImg from './components/Header/HeaderImg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import MyHeader from "./components/MyHeader";
import Customers from "./components/customers/Customers";
import Home from "./components/Home/Home";
import Projects from "./components/projects/Projects";
import SampleProject from "./components/sampleProjects/SampleProjects";
import Image360 from "./components/360Image/Image360";
import ShowOffImages from "./components/showOffImages/ShowOffImages";
import Blogs from "./components/blog/Blogs";
import Catalog from "./components/catalog/Catalog";

function App() {

  return (
      <>
        <MyHeader title="Home"/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="headerImg" element={<HeaderImg/>} />
          <Route path="Customers" element={<Customers/>} />
          <Route path="Projects" element={<Projects/>} />
          <Route path="sampleProjects" element={<SampleProject/>} />
          <Route path="360" element={<Image360/>} />
          <Route path="showOff" element={<ShowOffImages/>} />
          <Route path="blog" element={<Blogs/>} />
          <Route path="catalog" element={<Catalog />} />
        </Routes>
      </>
  );
}

export default App;
