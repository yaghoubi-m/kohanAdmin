// SampleProject.js
import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import Spinner from "../Spinner";

const SampleProject = () => {
    const [formData, setFormData] = useState({
        files: [], // Array to hold multiple images
    });
    const [de,seDe] = useState(false)
    const [images, setImages] = useState([])
    const [loading,setLoading] = useState(false)
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            files: [...prevData.files, ...files],
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData((prevData) => {
            const updatedImages = [...prevData.files];
            updatedImages.splice(index, 1);
            return {
                ...prevData,
                files: updatedImages,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(p=> !p)
        const formDataToSend = new FormData();
        for (const key in formData) {
            formData[key].forEach((image, index) => {
                formDataToSend.append(`${key}`, image);
            });
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Admin/CreateSampleProjectImages`, formDataToSend,
                {
                    headers: {
                        'Username': process.env.REACT_APP_API_USERNAME,
                        'Password': process.env.REACT_APP_API_PASSWORD,
                        "Content-Type": "multipart/form-data",
                    }
                });
            console.log('Data submitted successfully:', response.data);
            toast.success('added success fully')

            // Add any additional logic or UI updates here
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('error')
            // Handle error and display an appropriate message
        } finally {
            setLoading(false)
        }
    };

    const getImages = async () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/Home/GetSampleProjectImg`).then(
            (res) => {
                setImages(JSON.parse(res.data))
            }
        )
        console.log("sss")
    }

    useEffect(() => {

        getImages()

    }, [de])

    const onDelete = async (url) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Admin/DeleteSampleProjects?fileNameUrl=${url}`,{
                headers: {
                    'Username': process.env.REACT_APP_API_USERNAME,
                    'Password': process.env.REACT_APP_API_PASSWORD,
                },
            })
            toast.success("deleted successfully")
            console.log("fileNameUrl",res)

        }catch (e) {
            toast.error("err")
            console.log("fileNameUrl",e)

        }finally {
            setLoading()
        }
    }
    return (
        <Container className="mt-5">
            <div style={{
                display: 'grid',
                gridTemplateColumns: "auto auto auto",
                gap: "20px",
            }} className="mt-5">
                {
                    images?.map((image, i) => {
                            return (
                                <div className="d-flex align-items-center justify-content-center gap-2"  style={{
                                    height: "100px",
                                }} key={i}>
                                    <div>
                                        <img style={{
                                            width: "200px",
                                            height: "100px",
                                            objectFit: "contain"
                                        }} src={image} alt="img"/>
                                    </div>
                                    <Button variant="danger" onClick={()=> onDelete(image)} >Delete</Button>
                                </div>
                            )
                        }
                    )
                }
            </div>

            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="images">
                            <Form.Label>Images</Form.Label>

                            {formData.files.map((image, index) => (
                                <div key={index} className="mb-2">
                                    <img src={URL.createObjectURL(image)} alt={`Image ${index}`}
                                         style={{width: '50px', marginRight: '10px'}}/>
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}

                            <Form.Control type="file" name="images" accept="image/*" onChange={handleFileChange}
                                          multiple/>

                            <Form.Text className="text-muted">Select one or more images (if applicable).</Form.Text>
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Button className="w-75" variant="primary" type="submit">
                                Submit
                            </Button>
                            <Spinner loading={loading} />
                        </div>
                    </Form>
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    );


};

export default SampleProject;
