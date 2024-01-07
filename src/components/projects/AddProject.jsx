import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import Spinner from "../Spinner";

export default function AddProject({
                                     handleSubmit,
                                     formData,
                                     handleChange,
                                     handleRemoveImage,
                                     t,
                                     handleFileChange,
                                     loading
                                   }) {
  return (
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
            <div className="d-flex justify-content-between">
              <Button className="w-75" variant="primary" type="submit">
                Submit
              </Button>
              <Spinner loading={loading} />
            </div>
          </Form>
        </Col>
      </Row>
  )
}
