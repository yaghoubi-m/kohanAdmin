import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import MyModal from "../MyModal";

export default function ModalProjects({
                                        show,
                                        handelShow,
                                        handleSubmitEdit,
                                        handleChangeEdit,
                                        formDataEdit,
                                        handleRemoveImageEdit,
                                        handleFileChangeEdit,
                                        tEdit,
                                        id
                                      }) {
  // console.log(id)
  return (
      <MyModal handelShow={handelShow} show={show} header={'projects'} width={'w-100'} >
        <Row className="justify-content-md-center mt-5 mb-5">
          <Col md={6}>
            <Form className="d-flex flex-column gap-2" onSubmit={(e) => handleSubmitEdit(e, id)}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formDataEdit.title} onChange={handleChangeEdit} required/>
              </Form.Group>

              <Form.Group controlId="employerTitle">
                <Form.Label>Employer Title</Form.Label>
                <Form.Control type="text" name="employerTitle" value={formDataEdit.employerTitle}
                              onChange={handleChangeEdit} required/>
              </Form.Group>

              <Form.Group controlId="materialDescription">
                <Form.Label>Material Description</Form.Label>
                <Form.Control type="text" name="materialDescription" value={formDataEdit.materialDescription}
                              onChange={handleChangeEdit} required/>
              </Form.Group>

              <Form.Group controlId="meterage">
                <Form.Label>Meterage</Form.Label>
                <Form.Control type="text" name="meterage" value={formDataEdit.meterage} onChange={handleChangeEdit}
                              required/>
              </Form.Group>

              <Form.Group controlId="operationPlace">
                <Form.Label>Operation Place</Form.Label>
                <Form.Control type="text" name="operationPlace" value={formDataEdit.operationPlace}
                              onChange={handleChangeEdit} required/>
              </Form.Group>

              <Form.Group controlId="operationDate">
                <Form.Label>Operation Date</Form.Label>
                <Form.Control type="date" name="operationDate" value={formDataEdit.operationDate}
                              onChange={handleChangeEdit} required/>
              </Form.Group>

              <Form.Group controlId="exhibition">
                <Form.Label>Exhibition</Form.Label>
                <Form.Control as="select" name="exhibition" value={formDataEdit.exhibition} onChange={handleChangeEdit}
                              required>
                  <option value="" disabled>Select Exhibition Type</option>
                  <option value={0}>Indoor</option>
                  <option value={1}>Outdoor</option>
                  <option value={2}>Company</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="PicturesUrls">
                <Form.Label>Images</Form.Label>

                {formDataEdit.PicturesUrls.map((image, index) => (
                    <div key={index} className="mb-2">
                      <img src={URL.createObjectURL(image)} alt={`Image ${index}`}
                           style={{width: '50px', marginRight: '10px'}}/>
                      <Button variant="danger" size="sm" onClick={() => handleRemoveImageEdit(index)}>
                        Remove
                      </Button>
                    </div>
                ))}

                <Form.Control type="file" name="PicturesUrls" accept="image/*" onChange={handleFileChangeEdit}
                              multiple/>
                <Form.Text className="text-muted">Select one or more images (if applicable).</Form.Text>
              </Form.Group>
              <Form.Group controlId="thumbnailPicture">
                <Form.Label>Thumbnail Picture</Form.Label>

                {formDataEdit.thumbnailPictures && (
                    <div className="mb-2">
                      <img
                          src={URL.createObjectURL(formDataEdit.thumbnailPictures)}
                          alt="Thumbnail"
                          style={{width: '50px', marginRight: '10px'}}
                      />
                      <Button variant="danger" size="sm" onClick={handleRemoveImageEdit}>
                        Remove
                      </Button>
                    </div>
                )}

                <Form.Control type="file" name="thumbnailPicture" accept="image/*"
                              onChange={(e) => tEdit(e, 'thumbnailPicture')}/>

                <Form.Text className="text-muted">Select a thumbnail picture (if applicable).</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </MyModal>
  )
}
