// ProjectForm.js
import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Col, Row, Accordion} from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import ProjectsUi from "./ProjectsUi";
import ModalProjects from "./ModalProjects";
import AddProject from "./AddProject";

const Projects = () => {
  const [refresh, setRefresh] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  console.log(loading)
  // Modal
  const handleToggleModal = () => {
    setShowModal(p => !p);
  };
  //

  // ==> get project
  const [projects, setProjects] = useState()

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Project/CompleteProjectsList`)
      setProjects(response.data)
      console.log(response.data)
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
    setLoading(true)
    // console.log(formData)
    const formDataToSend = new FormData();

    for (const key in formData) {
      // console.log(formData[key] , key)
      if (key === 'thumbnailPictures') {
        // console.log('sss', formData[key], key)
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
    } finally {
      setLoading(false)
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
    // console.log('id', id)
    setLoading(true)
    // console.log('Edit', formDataEdit)
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
    console.log('Edit sent', formDataToSend)

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
      setRefresh(p=> !p)

      // Add any additional logic or UI updates here
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error("error")
      // Handle error and display appropriate message
    } finally {
      setLoading(false)
    }
  };
  //

  // ==> Confirm Review
  const confirmReview = async (id, review) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Admin/ChangeReviewStateToConfirm?stateId=
      ${review}&reviewId=${id}`)
      toast.success('success')
      setRefresh(p => !p)
    } catch (e) {
      toast.error('err')
      console.log(e)
    }
  }
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
                    onConfirm={confirmReview}
                    projects={projects}/>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={2}>
            <Accordion.Header>Create new project</Accordion.Header>
            <Accordion.Body>
              <AddProject
                  formData={formData}
                  t={t}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handleRemoveImage={handleRemoveImage}
                  handleFileChange={handleFileChange}
                  loading={loading}
              />
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
            loading={loading}
        />
        <ToastContainer/>
      </Container>
  );
};

export default Projects;
