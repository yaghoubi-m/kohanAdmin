// ProjectForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";

const Projects = () => {
    const [formData, setFormData] = useState({
        title: '',
        employerTitle: '',
        materialDescription: '',
        meterage: '',
        operationPlace: '',
        operationDate: '',
        exhibition: '',
        PicturesUrls: [],
        thumbnailPictures: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const t  = (e) => {
        const file = e.target.files[0];

        setFormData((prevData) => ({
            ...prevData,
            thumbnailPictures: file,
        }));
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        setFormData((prevData) => ({
            ...prevData,
            PicturesUrls: [...prevData.PicturesUrls, ...files],
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData((prevData) => {
            const updatedImages = [...prevData.PicturesUrls];
            updatedImages.splice(index, 1);
            return {
                ...prevData,
                PicturesUrls: updatedImages,
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        const formDataToSend = new FormData();

        for (const key in formData) {
            // console.log(formData[key] , key)
            if (key === 'thumbnailPictures') {
                console.log('sss',formData[key] , key)
                formDataToSend.append('ThumbnailPicture', formData[key]);
            } else if (key === 'PicturesUrls' && Array.isArray(formData[key])) {
                formData[key].forEach((image, index) => {
                    formDataToSend.append(`ProjectDetail.PicturesUrls`, image);
                });
            }else if(key === 'exhibition'){
                formDataToSend.append('ProjectDetail.Exhibition', parseInt(formData[key]))
            }
            else if (key === 'title') {
                formDataToSend.append(key, formData[key]);
            }
            else if (key === 'employerTitle') {
                formDataToSend.append('Employer.Title', formData[key]);
            } else if (key === 'materialDescription') {
                formDataToSend.append('ProjectDetail.MaterialDescription', formData[key]);
            }else if (key === 'meterage') {
                formDataToSend.append('ProjectDetail.Meterage', formData[key]);
            }else if (key === 'operationPlace') {
                formDataToSend.append('ProjectDetail.OperationPlace', formData[key]);
            }else if (key === 'operationDate') {
                formDataToSend.append('ProjectDetail.OperationDate', formData[key]);
            }

        }

        try {
            const axiosConfig = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://www.dev.kohanco.com/api/Admin/CreateProject`,
                headers: {
                    'Username': 'KohanAdminUser',
                    'Password': 'tyYUNM@8@#12az',
                    // "Content-Type": "multipart/form-data",
                },
                data: formDataToSend
            };
            const response = await axios(axiosConfig)
            console.log('Data submitted successfully:', response.data);
            toast.success("success")
            // Add any additional logic or UI updates here
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error("error")
            // Handle error and display appropriate message
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5 mb-5">
                <Col md={6}>
                    <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="employerTitle">
                            <Form.Label>Employer Title</Form.Label>
                            <Form.Control type="text" name="employerTitle" value={formData.employerTitle} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="materialDescription">
                            <Form.Label>Material Description</Form.Label>
                            <Form.Control type="text" name="materialDescription" value={formData.materialDescription} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="meterage">
                            <Form.Label>Meterage</Form.Label>
                            <Form.Control type="text" name="meterage" value={formData.meterage} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="operationPlace">
                            <Form.Label>Operation Place</Form.Label>
                            <Form.Control type="text" name="operationPlace" value={formData.operationPlace} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="operationDate">
                            <Form.Label>Operation Date</Form.Label>
                            <Form.Control type="date" name="operationDate" value={formData.operationDate} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="exhibition">
                            <Form.Label>Exhibition</Form.Label>
                            <Form.Control as="select" name="exhibition" value={formData.exhibition} onChange={handleChange} required>
                                <option value="" disabled>Select Exhibition Type</option>
                                <option value={0}>Indoor</option>
                                <option value={1}>Outdoor</option>
                                <option value={2}>Company</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="PicturesUrls">
                            <Form.Label>Images</Form.Label>

                            {formData.PicturesUrls.map((image, index) => (
                                <div key={index} className="mb-2">
                                    <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: '50px', marginRight: '10px' }} />
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}

                            <Form.Control type="file" name="PicturesUrls" accept="image/*" onChange={handleFileChange} multiple />
                            <Form.Text className="text-muted">Select one or more images (if applicable).</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="thumbnailPicture">
                            <Form.Label>Thumbnail Picture</Form.Label>

                            {formData.thumbnailPictures && (
                                <div className="mb-2">
                                    <img
                                        src={URL.createObjectURL(formData.thumbnailPictures)}
                                        alt="Thumbnail"
                                        style={{ width: '50px', marginRight: '10px' }}
                                    />
                                    <Button variant="danger" size="sm" onClick={handleRemoveImage}>
                                        Remove
                                    </Button>
                                </div>
                            )}

                            <Form.Control type="file" name="thumbnailPicture" accept="image/*" onChange={(e) => t(e, 'thumbnailPicture')} />

                            <Form.Text className="text-muted">Select a thumbnail picture (if applicable).</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Projects;
