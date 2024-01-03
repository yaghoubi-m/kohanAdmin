// ProjectForm.js
import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Col, Row, Accordion} from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import ProjectsUi from "./ProjectsUi";
import ModalProjects from "./ModalProjects";

const Projects = () => {
  const [refresh, setRefresh] = useState(false)
  const [showModal, setShowModal] = useState(false);

  // Modal
  const handleToggleModal = () => {
    setShowModal(p=> !p);
  };
  //

  // ==> get project
  const [projects, setProjects] = useState()

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Project/CompleteProjectsList`)
      setProjects(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  //

  // ==> Create
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
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const t = (e) => {
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
        console.log('sss', formData[key], key)
        formDataToSend.append('ThumbnailPicture', formData[key]);
      } else if (key === 'PicturesUrls' && Array.isArray(formData[key])) {
        formData[key].forEach((image, index) => {
          formDataToSend.append(`ProjectDetail.PicturesUrls`, image);
        });
      } else if (key === 'exhibition') {
        formDataToSend.append('ProjectDetail.Exhibition', parseInt(formData[key]))
      } else if (key === 'title') {
        formDataToSend.append(key, formData[key]);
      } else if (key === 'employerTitle') {
        formDataToSend.append('Employer.Title', formData[key]);
      } else if (key === 'materialDescription') {
        formDataToSend.append('ProjectDetail.MaterialDescription', formData[key]);
      } else if (key === 'meterage') {
        formDataToSend.append('ProjectDetail.Meterage', formData[key]);
      } else if (key === 'operationPlace') {
        formDataToSend.append('ProjectDetail.OperationPlace', formData[key]);
      } else if (key === 'operationDate') {
        formDataToSend.append('ProjectDetail.OperationDate', formData[key]);
      }

    }

    try {
      const axiosConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/Admin/CreateProject`,
        headers: {
          'Username': process.env.REACT_APP_API_USERNAME,
          'Password': process.env.REACT_APP_API_PASSWORD,
          // "Content-Type": "multipart/form-data",
        },
        data: formDataToSend
      };
      const response = await axios(axiosConfig)
      console.log('Data submitted successfully:', response.data);
      toast.success("success")
      setRefresh(p => !p)
      // Add any additional logic or UI updates here
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error("error")
      // Handle error and display appropriate message
    }
  };
  //

  // ==> Delete
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Admin/DeleteProject?id=${id}`)
      toast.success('success')
      console.log(response.data)
      setRefresh(p => !p)
    } catch (e) {
      console.log(e)
      toast.error('err')
    }
  }
  //

  // ==> Edit
  const [formDataEdit, setFormDataEdit] = useState({
    title: '',
    employerTitle: '',
    materialDescription: '',
    meterage: '',
    operationPlace: '',
    ProjectDetailId: '',
    operationDate: '',
    exhibition: '',
    PicturesUrls: [],
    thumbnailPictures: null
  });
  const [id, setId] = useState()

  const onEdit = (data) => {
    setFormDataEdit({
      title: data.Title,
      employerTitle: data.ProjectDetail.EmployerTitle,
      materialDescription: data.ProjectDetail.MaterialDescription,
      meterage: data.ProjectDetail.Meterage,
      ProjectDetailId: data.ProjectDetail.Id,
      operationPlace: data.ProjectDetail.OperationPlace,
      operationDate: data.ProjectDetail.OperationDate,
      exhibition: data.ProjectDetail.Exhibition,
      PicturesUrls: [],
      thumbnailPictures: null
    })
    setId(data.Id)
    // console.log('projects',data)

  }
  const handleChangeEdit = (e) => {
    const {name, value} = e.target;
    setFormDataEdit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const tEdit = (e) => {
    const file = e.target.files[0];

    setFormDataEdit((prevData) => ({
      ...prevData,
      thumbnailPictures: file,
    }));
  }

  const handleFileChangeEdit = (e) => {
    const files = Array.from(e.target.files);

    setFormDataEdit((prevData) => ({
      ...prevData,
      PicturesUrls: [...prevData.PicturesUrls, ...files],
    }));
  };

  const handleRemoveImageEdit = (index) => {
    setFormDataEdit((prevData) => {
      const updatedImages = [...prevData.PicturesUrls];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        PicturesUrls: updatedImages,
      };
    });
  };

  const handleSubmitEdit = async (e, id) => {

    e.preventDefault();
    console.log('id',id)
    console.log('Edit', formDataEdit)
    const formDataToSend = new FormData();

    for (const key in formDataEdit) {
      // console.log(formData[key] , key)
      if (key === 'thumbnailPictures') {
        formDataToSend.append('ThumbnailPicture', formDataEdit[key]);
      } else if (key === 'PicturesUrls' && Array.isArray(formDataEdit[key])) {
        formDataEdit[key].forEach((image, index) => {
          formDataToSend.append(`ProjectDetail.PicturesUrls`, image);
        });
      } else if (key === 'exhibition') {
        formDataToSend.append('ProjectDetail.Exhibition', parseInt(formDataEdit[key]))
      } else if (key === 'title') {
        formDataToSend.append(key, formDataEdit[key]);
      } else if (key === 'ProjectDetailId') {
        formDataToSend.append('ProjectDetail.Id', formDataEdit[key]);
      } else if (key === 'employerTitle') {
        formDataToSend.append('Employer.Title', formDataEdit[key]);
      } else if (key === 'materialDescription') {
        formDataToSend.append('ProjectDetail.MaterialDescription', formDataEdit[key]);
      } else if (key === 'meterage') {
        formDataToSend.append('ProjectDetail.Meterage', formDataEdit[key]);
      } else if (key === 'operationPlace') {
        formDataToSend.append('ProjectDetail.OperationPlace', formDataEdit[key]);
      } else if (key === 'operationDate') {
        formDataToSend.append('ProjectDetail.OperationDate', formDataEdit[key]);
      }
    }
    console.log('Edit sent',formDataToSend)

    try {
      const axiosConfig = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/Admin/UpdateProject?Id=${id}`,
        headers: {
          'Username': process.env.REACT_APP_API_USERNAME,
          'Password': process.env.REACT_APP_API_PASSWORD,
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
  //


  useEffect(() => {
    fetchProjects()
  }, [refresh])

  return (
      <Container>
        <Accordion className="mt-5">
          <Accordion.Item eventKey={1}>
            <Accordion.Header>Projects</Accordion.Header>
            <Accordion.Body>
              <Row className=" w-75 mx-auto">
                <ProjectsUi
                    handleToggleModal={handleToggleModal}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    projects={projects}/>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={2}>
            <Accordion.Header>Create new project</Accordion.Header>
            <Accordion.Body>
              <Row className="justify-content-md-center mt-5 mb-5">
                <Col md={6}>
                  <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group controlId="employerTitle">
                      <Form.Label>Employer Title</Form.Label>
                      <Form.Control type="text" name="employerTitle" value={formData.employerTitle}
                                    onChange={handleChange}
                                    required/>
                    </Form.Group>

                    <Form.Group controlId="materialDescription">
                      <Form.Label>Material Description</Form.Label>
                      <Form.Control type="text" name="materialDescription" value={formData.materialDescription}
                                    onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group controlId="meterage">
                      <Form.Label>Meterage</Form.Label>
                      <Form.Control type="text" name="meterage" value={formData.meterage} onChange={handleChange}
                                    required/>
                    </Form.Group>

                    <Form.Group controlId="operationPlace">
                      <Form.Label>Operation Place</Form.Label>
                      <Form.Control type="text" name="operationPlace" value={formData.operationPlace}
                                    onChange={handleChange}
                                    required/>
                    </Form.Group>

                    <Form.Group controlId="operationDate">
                      <Form.Label>Operation Date</Form.Label>
                      <Form.Control type="date" name="operationDate" value={formData.operationDate}
                                    onChange={handleChange}
                                    required/>
                    </Form.Group>

                    <Form.Group controlId="exhibition">
                      <Form.Label>Exhibition</Form.Label>
                      <Form.Control as="select" name="exhibition" value={formData.exhibition} onChange={handleChange}
                                    required>
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
                            <img src={URL.createObjectURL(image)} alt={`Image ${index}`}
                                 style={{width: '50px', marginRight: '10px'}}/>
                            <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
                              Remove
                            </Button>
                          </div>
                      ))}

                      <Form.Control type="file" name="PicturesUrls" accept="image/*" onChange={handleFileChange}
                                    multiple/>
                      <Form.Text className="text-muted">Select one or more images (if applicable).</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="thumbnailPicture">
                      <Form.Label>Thumbnail Picture</Form.Label>

                      {formData.thumbnailPictures && (
                          <div className="mb-2">
                            <img
                                src={URL.createObjectURL(formData.thumbnailPictures)}
                                alt="Thumbnail"
                                style={{width: '50px', marginRight: '10px'}}
                            />
                            <Button variant="danger" size="sm" onClick={handleRemoveImage}>
                              Remove
                            </Button>
                          </div>
                      )}

                      <Form.Control type="file" name="thumbnailPicture" accept="image/*"
                                    onChange={(e) => t(e, 'thumbnailPicture')}/>

                      <Form.Text className="text-muted">Select a thumbnail picture (if applicable).</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <ModalProjects
            id={id}
            show={showModal}
            handelShow={handleToggleModal}
            formDataEdit={formDataEdit}
            tEdit={tEdit}
            handleSubmitEdit={handleSubmitEdit}
            handleChangeEdit={handleChangeEdit}
            handleFileChangeEdit={handleFileChangeEdit}
            handleRemoveImageEdit={handleRemoveImageEdit}
        />
        <ToastContainer/>
      </Container>
  );
};

export default Projects;
