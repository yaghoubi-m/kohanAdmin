import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Col, Row, Toast, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";

const ShowOffImages = () => {
  const [refresh,setRefresh] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    files: null,
  });

  const [ImplementTeam, setImplementTeam] = useState('')
  const [DesignTeam, setDesignTeam] = useState('')
  const [SpecTool, setSpecTool] = useState('')
  const [ExhibitionCalendar, setExhibitionCalendar] = useState('')

  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    console.log(name, value, files)

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'files' ? files[0] : value,
    }));

    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] === 'ExhibitionCalendar'){

        console.log(key,formData[key])

        const format = formData['files'].name?.split('.').pop()

        formDataToSend.append('files', formData['files'],`ExhibitionCalendar.${format}`);
        formDataToSend.append(key, formData[key]);

      } else if (formData[key] === 'ImplementTeam'){
        console.log(key,formData['files'])
        const format = formData['files'].name?.split('.').pop()
        formDataToSend.append('files', formData['files'],`ImplementTeam.${format}`);
        formDataToSend.append(key, formData[key]);

      } else if (formData[key] === 'DesignTeam'){
        console.log(key,formData['files'])
        const format = formData['files'].name?.split('.').pop()
        formDataToSend.append('files', formData['files'],`DesignTeam.${format}`);
        formDataToSend.append(key, formData[key]);

      } else if (formData[key] === 'SpecTool'){
        console.log(key, formData[key],formData['files'])
        const format = formData['files'].name?.split('.').pop()
        formDataToSend.append('files', formData['files'],`SpecTool.${format}`);
        formDataToSend.append(key, formData[key]);
      }
    }
    for (const pair of formDataToSend.entries()) {
      console.log(`${pair[0]}, ${pair[1]}, ${typeof pair[1]}`);
    }

    try {
      // Replace 'YOUR_POST_API_ENDPOINT' with your actual POST API endpoint
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Admin/CreateShowOffImages`, formDataToSend);

      console.log('Post request successful:', response.data);
      setShowToast(true);
      setRefresh(prevState => !prevState)
    } catch (error) {
      console.error('Error making post request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGet = async () => {
    setLoading(true);

    try {
      // Replace 'YOUR_GET_API_ENDPOINT' with your actual GET API endpoint
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Home/GetShowOffImages`, {
        params: {title: 'ImplementTeam'},
      });
      setImplementTeam(response.data)
      const response2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Home/GetShowOffImages`, {
        params: {title: 'DesignTeam'},
      });
      setDesignTeam(response2.data)
      const response3 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Home/GetShowOffImages`, {
        params: {title: 'SpecTool'},
      });
      setSpecTool(response3.data)
      const response4 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Home/GetShowOffImages`, {
        params: {title: 'ExhibitionCalendar'},
      });

      console.log("xx", response3)

      setExhibitionCalendar(response4.data)
      console.log('Get request successful:', response.data);
      setShowToast(true);
    } catch (error) {
      console.error('Error making get request:', error);
    } finally {
      setLoading(false);
      console.log("ss",SpecTool)
    }
  };
  useEffect(() => {
    handleGet()
  }, [refresh])

  return (
      <Container className="mt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
                as="select"
                name="title"
                value={formData.Title}
                onChange={handleChange}
                required
            >
              <option value="">Select Title</option>
              <option value="ImplementTeam">Implement Team</option>
              <option value="DesignTeam">Design Team</option>
              <option value="SpecTool">Spec Tool</option>
              <option value="ExhibitionCalendar">Exhibition Calendar</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mt-3" controlId="files">
            <Form.Label>File</Form.Label>
            <Form.Control
                type="file"
                name="files"
                onChange={handleChange}
                required
            />
          </Form.Group>

          <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm"/> : 'Submit'}
          </Button>
        </Form>

        {/*<Button className="mt-3" variant="secondary" onClick={handleGet} disabled={loading}>*/}
        {/*  {loading ? <Spinner animation="border" size="sm"/> : 'Get Data'}*/}
        {/*</Button>*/}
        <div className="d-flex justify-content-center align-items-center gap-5">
          <div className="d-flex justify-content-center align-items-center gap-2" >
            <strong>ImplementTeam</strong>
            <img style={{
              width: '100px'
            }} src={ImplementTeam?.slice(1,-1)}  alt={'ImplementTeam'}/>
          </div>
          <div  className="d-flex justify-content-center align-items-center gap-2" >
            <strong>DesignTeam</strong>
            <img style={{
              width: '100px'
            }} src={DesignTeam?.slice(1,-1)}  alt={'DesignTeam'}/>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2" >
            <strong>SpecTool</strong>
            <img style={{
              width: '100px'
            }} src={SpecTool?.slice(1,-1)}  alt={'SpecTool'}/>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2" >
            <strong>ExhibitionCalendar</strong>
            <img style={{
              width: '100px'
            }} src={ExhibitionCalendar?.slice(1,-1)}  alt={'ExhibitionCalendar'}/>
          </div>
        </div>
        <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
        >
          <Toast.Header >
            <strong className="mr-auto">API Response</strong>
          </Toast.Header>
          <Toast.Body>Request successful!</Toast.Body>
        </Toast>
      </Container>
  );
};

export default ShowOffImages;
