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
        formData.append("file", postFile, `home.${format}`);
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
        if (response.status === 200) {
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
    setImgUrl(response.data.slice(1, -1))
    // console.log(imgUrl)
  }
  return(
      <div className='d-flex justify-content-center align-items-center gap-4 mt-5'>
        <DropZone title="home image" onDrop={handleImageUpload}/>
        <DisplayImage
            url='/api/Home/GetHomePageMainHeader'
            onLoadUrl={onLoadImgUrl}
            imgUrl={imgUrl}
            uploadedImage={uploadedImage}/>
        <SubmitBtn url='/api/Admin/CreateHomePageHeaderImage' handleImageSubmit={handleImageSubmit}/>
        <Spinner loading={loading}/>
        <ToastContainer />
      </div>
  )
}
