// App.js
import React from 'react';
import HeaderImg from './components/Header/HeaderImg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router, Routes} from "react-router-dom";
import Header from "./components/Header";
import Customers from "./components/customers/Customers";
import Home from "./components/Home/Home";
import Projects from "./components/projects/Projects";
import SampleProject from "./components/sampleProjects/SampleProjects";


function App() {
    return (
        <>
            <Header  title="Home"/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="headerImg" element={<HeaderImg/>}/>
                <Route path="Customers" element={<Customers/>}/>
                <Route path="Projects" element={<Projects/>}/>
                <Route path="sampleProjects" element={<SampleProject />} />
            </Routes>
        </>

    );
}

export default App;
