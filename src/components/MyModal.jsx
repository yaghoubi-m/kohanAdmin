import {Button, Col, Form, Row, Modal} from "react-bootstrap";
import React, {useState} from "react";

export default function MyModal({body, header, width, show, handelShow, children}) {
  return (
      <Modal className={`${width}`} fullscreen show={show} onHide={handelShow}>
        <Modal.Header className="w-100" closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="w-100">
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
