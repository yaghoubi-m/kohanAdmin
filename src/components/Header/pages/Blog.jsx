import React, {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import DropZone from "../../DropZone";
import DisplayImage from "../../DisplayImage";
import SubmitBtn from "../../SubmitBtn";
import Spinner from "../../Spinner";

export default function Blog() {
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
                formData.append("file", postFile, `blog.${format}`);
                const axiosConfig = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `http://www.dev.kohanco.com${endPoint}`,
                    headers: {
                        'Username': 'KohanAdminUser',
                        'Password': 'tyYUNM@8@#12az',
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
        const response = await axios.get(`http://www.dev.kohanco.com${endPoint}`)
        setImgUrl(response.data.slice(1, -1))
        // console.log(response.data)
    }

    return (
        <div className='d-flex justify-content-center align-items-center gap-4 mt-5'>
            <DropZone title="Blog image" onDrop={handleImageUpload}/>
            <DisplayImage
                url='/api/Blog/GetBlogHeaderImg'
                onLoadUrl={onLoadImgUrl}
                imgUrl={imgUrl}
                uploadedImage={uploadedImage}/>
            <SubmitBtn url='/api/Admin/CreateBlogHeaderImages' handleImageSubmit={handleImageSubmit}/>
            <Spinner loading={loading}/>
        </div>
    )
}
