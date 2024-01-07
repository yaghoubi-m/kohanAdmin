import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Accordion} from 'react-bootstrap';
import axios from 'axios';
import AddBlog from "./AddBlog";
import BlogUi from "./BlogUi";
import {toast, ToastContainer} from "react-toastify";
import ModalBlog from "./ModalBlog";

const PostDataPage = () => {
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);


  // ==> Modal
  const handleToggleModal = () => {
    setShowModal(p => !p);
  };
  //

  // ==> Create
  const [formData, setFormData] = useState({
    Title: '',
    Body: '',
    Tags: '',
    Headers: [],
    Picture: null,
    ThumbPicture: null,
  });

  const handleChange = (e, headerIndex) => {
    const {name, value, files} = e.target;

    if (name.includes('Headers')) {
      const updatedHeaders = [...formData.Headers];
      const [_, index, property] = name.split('.');

      if (property === 'Title') {
        updatedHeaders[headerIndex].Title = value;
      } else if (property === 'Content') {
        updatedHeaders[headerIndex].Content = value;
      }

      setFormData((prevData) => ({
        ...prevData,
        Headers: updatedHeaders,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'Picture' || name === 'ThumbPicture' ? files[0] : value,
      }));
    }
    console.log(formData)
  };

  const addHeader = () => {
    setFormData((prevData) => ({
      ...prevData,
      Headers: [...prevData.Headers, {Title: '', Content: ''}]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === 'Headers') {
        formData[key].forEach((item, index) => {
          formDataToSend.append(`Headers[${index}].Title`, item.Title);
          formDataToSend.append(`Headers[${index}].Content`, item.Content);
        })
      }  else if (key === 'Picture'){
        console.log("Picture ==",key, formData[key])
        const format = formData[key].name.split('.').pop()
        formDataToSend.append(key, formData[key], `pic.${format}`)
      }else if (key === 'ThumbPicture'){
        console.log("ThumbPicture ==",key, formData[key])
        const format = formData[key].name.split('.').pop()
        formDataToSend.append(key, formData[key], `tPic.${format}`)
      }else {
        formDataToSend.append(key, formData[key]);
      }

    }

    // }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Admin/CreateBlog`, formDataToSend);

      console.log('Post request successful:', response.data);
      setRefresh(p => !p)
      toast.success('success')
    } catch (error) {
      toast.error('err')
      console.error('Error making post request:', error);
    } finally {
      setLoading(false)
    }
  };
  //

  // ==> Get Posts
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Blog/GetAll`);

      setApiData(response.data);

      console.log('Data fetched from the API:', response.data);
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };
  //

  // ==> Delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Admin/DeleteBlog?id=${id}`);

      console.log('Delete request successful:', response.data);
      // setApiData(apiData.filter((item) => item.id !== id));
      setRefresh(p => !p)
      toast.success('success')

    } catch (error) {
      toast.error('err')
      console.error('Error making delete request:', error);
    }
  };
  //

  // ==> Edit
  const [formDataEdit, setFormDataEdit] = useState({
    Title: '',
    Body: '',
    Tags: '',
    Headers: [],
    Picture: null,
    ThumbPicture: null,
  });
  const [id, setId] = useState()

  const onEdit = (data) => {
    // console.log("data onEdit",data)
    let newData = data.Headers.map((i, inx) => ({Title: i.Title, Content: i.Content}))
    console.log('new data', newData)
    setFormDataEdit({
      Id: data.Id,
      Title: data.Title,
      Body: data.Body,
      Tags: data.Tags,
      Headers: data.Headers,
      Picture: data.Picture,
      ThumbPicture: data.ThumbPicture
    })
    setId(data.Id)

    console.log(data.Id, "data:", data, 'formDataEdit', formDataEdit)
  }

  const handleChangeEdit = (e, headerIndex) => {
    // const {name, value, files} = e.target;
    // // console.log(name)
    // setFormDataEdit((prevData) => ({
    //   ...prevData,
    //   [name]: name === 'Picture' || name === 'ThumbPicture' ? files[0] : value,
    // }));

    const {name, value, files} = e.target;

    if (name.includes('Headers')) {
      const updatedHeaders = [...formDataEdit.Headers];
      const [_, index, property] = name.split('.');

      if (property === 'Title') {
        updatedHeaders[headerIndex].Title = value;
      } else if (property === 'Content') {
        updatedHeaders[headerIndex].Content = value;
      }

      setFormDataEdit((prevData) => ({
        ...prevData,
        Headers: updatedHeaders,
      }));
    } else {
      setFormDataEdit((prevData) => ({
        ...prevData,
        [name]: name === 'Picture' || name === 'ThumbPicture' ? files[0] : value,
      }));
    }
    console.log(formDataEdit)

  };

  const handleSubmitEdit = async (e, id) => {
    e.preventDefault();
    setLoading(true)
    setRefresh(p=> !p)
    setShowModal(p=>!p)
    const formDataToSend = new FormData();
    for (let key in formDataEdit) {
      console.log(key, formDataEdit[key])
      if (key === 'Headers') {
        formDataEdit[key].forEach((item, index) => {
          formDataToSend.append(`Headers[${index}].Title`, item.Title);
          formDataToSend.append(`Headers[${index}].Content`, item.Content);
          formDataToSend.append(`Headers[${index}].Id`, item.Id);
          formDataToSend.append(`Headers[${index}].BlogId`, item.BlogId);
        })
      } else if (key === 'Picture' && typeof formDataEdit[key] !== 'string' ){
        console.log("ssss")
          const format = formDataEdit[key].name?.split('.').pop()
          formDataToSend.append(key, formDataEdit[key], `pic.${format}`)
      }else if (key === 'ThumbPicture' && typeof formDataEdit[key] !== 'string'){
        console.log("vvvv")

        const format = formDataEdit[key].name?.split('.').pop()
        formDataToSend.append(key, formDataEdit[key], `tPic.${format}`)
      }else {
        formDataToSend.append(key, formDataEdit[key]);
      }
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/Admin/UpdateBlog`, formDataToSend);

      console.log('Post request successful:', response.data);
      toast.success('success')

      setRefresh(p => !p)


    } catch (error) {
      console.error('Error making post request:', error);
      toast.error('error')

    } finally {
      setLoading(false)
    }
  };
  //

  useEffect(() => {
    fetchData();
  }, [refresh]);
  //

  return (
      <Container className="mt-5">
        <Accordion className="mt-5">
          <Accordion.Item eventKey={'1'}>
            <Accordion.Header>posts</Accordion.Header>
            <Accordion.Body>
              <BlogUi
                  handleToggleModal={handleToggleModal}
                  onEdit={onEdit}
                  handleDelete={handleDelete}
                  apiData={apiData}/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={'2'}>
            <Accordion.Header>Create posts</Accordion.Header>
            <Accordion.Body>
              <AddBlog addHeader={addHeader} loading={loading} handleChange={handleChange} formData={formData}
                       handleSubmit={handleSubmit}/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <ModalBlog
            id={id}
            show={showModal}
            handelShow={handleToggleModal}
            formData={formDataEdit}
            handleChange={handleChangeEdit}
            handleSubmit={handleSubmitEdit}
            loading={loading}
        />
        <ToastContainer/>
      </Container>
  );
};

export default PostDataPage;
