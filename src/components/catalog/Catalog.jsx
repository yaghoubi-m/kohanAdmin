import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import Spinner from "../Spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const Catalog = () => {
  // State to store form data
  const [catalogs, setCatalogs] = useState([]);
  const [refresh,setRefresh] = useState(false)
  const [loading,setLoading] = useState(false)

  const [formData, setFormData] = useState({
    Title: '',
    IsVideoCatalog: false,
    CatalogFiles: null,
  });

  const fetchCatalogs = async () => {
    try {
      // Replace 'YOUR_CATALOG_API_ENDPOINT' with your actual API endpoint for catalog
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Catalog/CatalogList`);

      setCatalogs(response.data);
    } catch (error) {
      console.error('Error fetching catalogs:', error);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, [refresh]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      // Replace 'YOUR_CATALOG_API_ENDPOINT' with your actual API endpoint for catalog
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Admin/CreateCatalog`, formDataToSend);

      console.log('Catalog created successfully:', response.data);
      fetchCatalogs();
      setFormData({
        Title: '',
        IsVideoCatalog: false,
        CatalogFiles: null,
      });
      toast.success('success')
      setRefresh(p=>!p)

    } catch (error) {
      toast.error('err')

      console.error('Error creating catalog:', error);
    }finally {
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    try {
      // Replace 'YOUR_CATALOG_API_ENDPOINT' with your actual API endpoint for catalog
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Admin/DeleteCatalog?id=${id}`);

      console.log('Catalog deleted successfully:', response.data);
      toast.success('success')
      setRefresh(prevState => !prevState)
      fetchCatalogs();
    } catch (error) {
      toast.error('err')
      console.error('Error deleting catalog:', error);
    }
  };

  return (
      <Container className="mt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                required
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="IsVideoCatalog">
            <Form.Check
                type="checkbox"
                label="Is Video Catalog"
                name="IsVideoCatalog"
                checked={formData.IsVideoCatalog}
                onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="CatalogFiles">
            <Form.Label>Catalog File</Form.Label>
            <Form.Control
                type="file"
                name="CatalogFiles"
                accept="application/pdf, image/*, video/*"
                onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button className="mt-3" variant="primary" type="submit">
              Create Catalog
            </Button>
            <Spinner loading={loading} />
          </div>
        </Form>

        <Table className="mt-4" striped bordered hover>
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Is Video Catalog</th>
            <th>Catalog File</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {catalogs.map((catalog) => (
              <tr key={catalog.Id}>
                <td>{catalog.Id}</td>
                <td>{catalog.Title}</td>
                <td>{catalog.IsVideoCatalog ? 'Yes' : 'No'}</td>
                <td>
                  <a className="d-flex gap-2  justify-content-center align-items-center text-dark d-block text-decoration-none" href={`${process.env.REACT_APP_BASE_URL}/${catalog.PdfCatalogRoute}`}>
                    <p className="m-0">download</p>
                    <FontAwesomeIcon icon={faDownload} />
                  </a>

                </td>
                <td>
                  <Button
                      variant="danger"
                      onClick={() => handleDelete(catalog.Id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>
        <ToastContainer />
      </Container>
  );
};

export default Catalog;
