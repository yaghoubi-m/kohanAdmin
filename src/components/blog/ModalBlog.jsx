import {Button, Form} from "react-bootstrap";
import React from "react";
import MyModal from "../MyModal";
import Spinner from "../Spinner";

export default function ModalBlog({handleSubmit, handleChange, formData, loading, handelShow,id ,show}) {
  // console.log('formdata modal',formData)
  return (
      <MyModal handelShow={handelShow} show={show} header={'blogs'} width={'w-100'}>
        <Form onSubmit={(e)=>handleSubmit(e,id)}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                required
            />
          </Form.Group>

          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                name="Body"
                value={formData.Body}
                onChange={handleChange}
                required
            />
          </Form.Group>

          <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
                type="text"
                name="Tags"
                value={formData.Tags}
                onChange={handleChange}
                required
            />
          </Form.Group>

          <Form.Group controlId="Picture">
            <Form.Label>Picture</Form.Label>
            <Form.Control
                type="file"
                name="Picture"
                accept="image/*"
                onChange={handleChange}
                // required
            />
          </Form.Group>

          <Form.Group controlId="ThumbPicture">
            <Form.Label>ThumbPicture</Form.Label>
            <Form.Control
                type="file"
                name="ThumbPicture"
                accept="image/*"
                onChange={handleChange}
                // required
            />
          </Form.Group>
          {formData.Headers?.map((header, index) => (
              <div key={index} className="mb-3">
                <Form.Control
                    className="mt-2"
                    type="text"
                    placeholder="Title"
                    name={`Headers.${index}.Title`}
                    value={header.Title}
                    onChange={(e) => handleChange(e, index)}
                    // required
                />
                <Form.Control
                    className="mt-2"
                    type="text"
                    placeholder="Content"
                    name={`Headers.${index}.Content`}
                    value={header.Content}
                    onChange={(e) => handleChange(e, index)}
                    // required
                />
              </div>
          ))}
          <div className="d-flex justify-content-between">
            <Button className="mt-2 w-75" variant="primary" type="submit">
              Submit
            </Button>
            <Spinner loading={loading} />
          </div>
        </Form>
      </MyModal>

  )
}
