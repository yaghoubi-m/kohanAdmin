// HeaderImg.js
import React, {useEffect, useState, useRef} from 'react';
import {Navbar, Container, Form, Button, Image} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "bootstrap/js/src/util/config";
import html2canvas from 'html2canvas';
import {ClipLoader} from 'react-spinners';
import MyHeader from "../MyHeader";
import DropZone from "../DropZone";
import DisplayImage from "../DisplayImage";
import SubmitBtn from "../SubmitBtn";
import Spinner from "../Spinner";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Project from "./pages/Project";
import DetailProject from "./pages/DetailProject";
import ContactUs from "./pages/ContactUs";
import Catalog from "./pages/Catalog";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
// import 'react-spinners/css/spinners.css';

const HeaderImg = () => {


    return (
        <div className="position-relative">
            <Home />
            <AboutUs />
            <ContactUs />
            <Project/>
            <DetailProject />
            <Catalog />
            <Faq />
            <Blog />
            <ToastContainer/>
        </div>

    );
};

export default HeaderImg;
