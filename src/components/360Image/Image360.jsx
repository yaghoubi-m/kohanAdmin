import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import DisplayImage from "../DisplayImage";
import SubmitBtn from "../SubmitBtn";
import Spinner from "../Spinner";
import DropZone from "../DropZone";

export default function Image360(){
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imgUrl, setImgUrl] = useState('')
  const [postFile, setPostFile] = useState()
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPostFile(file)
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageSubmit = async (endPoint) => {
    if (uploadedImage) {
      try {
        setLoading(true)
        const formData = new FormData()
        const format = postFile.name.split('.').pop()
        console.log(postFile)
        formData.append("files", postFile, `img360.${format}`);
        const axiosConfig = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_BASE_URL}/api/Admin/CreateHome360HeaderImg`,
          headers: {
            'Username': process.env.REACT_APP_API_USERNAME,
            'Password': process.env.REACT_APP_API_PASSWORD,
            "Content-Type": "multipart/form-data",
          },
          data: formData
        };
        const response = await axios(axiosConfig)
        console.log(response.statusCode || response.status)
        if (response.statusCode === 200 || response.status) {
          toast.success('Image uploaded successfully');
          console.log('Image uploaded successfully:', response.data);
        } else {
          toast.error("Error uploading image ")
          console.log(response.data)
        }

      } catch (error) {
        toast.error('Error uploading image');
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false)
      }
    }
  };
  const onLoadImgUrl = async (endPoint) => {
    console.log(`${process.env.REACT_APP_BASE_URL}${endPoint}`)
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${endPoint}`)
    setImgUrl(response.data)
    console.log(imgUrl)
  }
  return(
      <div className='d-flex justify-content-center align-items-center gap-4 mt-5'>
        <DropZone title="home image" onDrop={handleImageUpload}/>
        <DisplayImage
            url='/api/Home/GetHeader360'
            onLoadUrl={onLoadImgUrl}
            imgUrl={imgUrl[0]}
            uploadedImage={uploadedImage}/>
        <SubmitBtn url='/api/Home/GetHeader360' handleImageSubmit={handleImageSubmit}/>
        <Spinner loading={loading}/>
        <ToastContainer />
      </div>
  )
}
