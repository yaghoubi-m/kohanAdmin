import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Button, Col, Container, Form, Row} from "react-bootstrap";



const Customers = () => {
    const [formData, setFormData] = useState({
        files: [], // Array to hold multiple images
    });
    const [de,seDe] = useState(false)
    const [images, setImages] = useState([])

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

        const formDataToSend = new FormData();
        for (const key in formData) {
            formData[key].forEach((image, index) => {
                formDataToSend.append(`${key}`, image);
            });
        }

        try {
            const response = await axios.post('http://www.dev.kohanco.com/api/Admin/CreateEmployerLogosImages', formDataToSend,
                {
                    headers: {
                        'Username': 'KohanAdminUser',
                        'Password': 'tyYUNM@8@#12az',
                        "Content-Type": "multipart/form-data",
                    }
                });
            console.log('Data submitted successfully:', response.data);
            toast.success('added success fully')
            seDe(p=> !p)

            // Add any additional logic or UI updates here
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('error')
            // Handle error and display an appropriate message
        }
    };

    const getImages = async () => {
        axios.get('http://www.dev.kohanco.com/api/Home/GetEmployersLogo').then(
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
            const res = await axios.delete(`http://www.dev.kohanco.com/api/Admin/DeleteEmployersLogo?fileNameUrl=${url}`,{
                headers: {
                    'Username': 'KohanAdminUser',
                    'Password': 'tyYUNM@8@#12az',
                },
            })
            toast.success("deleted successfully")
            console.log("fileNameUrl",res)
            seDe( p => !p )

        }catch (e) {
            toast.error("err")
            console.log("fileNameUrl",e)

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
                                            height: "100px"
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

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    );


};

export default Customers;
