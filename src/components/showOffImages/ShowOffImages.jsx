import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";

const ShowOffImages = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('files', formData.image);

    try {
      // Replace 'YOUR_POST_API_ENDPOINT' with your actual POST API endpoint
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Admin/CreateShowOffImages`, formDataToSend,{
        headers: {
          'Username': process.env.REACT_APP_API_USERNAME,
          'Password': process.env.REACT_APP_API_PASSWORD,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success('Post request successful')
      console.log('Post request successful:', response.data);
      // You can handle the response or perform additional actions here
    } catch (error) {
      toast.success('error')
      console.error('Error making post request:', error);
      // Handle error and display an appropriate message
    }
  };

  return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                />
              </Form.Group>

              <Button className='mt-5' variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
  );
};

export default ShowOffImages;
