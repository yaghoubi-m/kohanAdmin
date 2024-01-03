import {Accordion, Button, Card} from "react-bootstrap";
import DeleteProject from "./DeleteProject";
import React from "react";
import EditProject from "./EditProject";

export default function ProjectsUi({projects, onDelete, handleToggleModal, onEdit}) {

  return (
      <>
        <Accordion defaultActiveKey="0">
          {projects && projects.map(data => (
              <Accordion.Item key={data.Id} eventKey={data.Id}>
                <Accordion.Header>
                  {data.Title}
                </Accordion.Header>
                <Accordion.Body>
                  <Card.Body>
                    <p><strong>Id:</strong> {data.Id}</p>
                    <p><strong>Title:</strong> {data.Title}</p>
                    <p><strong>Material Description:</strong> {data.ProjectDetail.MaterialDescription}</p>
                    <p><strong>Meterage:</strong> {data.ProjectDetail.Meterage}</p>
                    <p><strong>Operation Date:</strong> {data.ProjectDetail.OperationDate}</p>
                    <p><strong>Operation Place:</strong> {data.ProjectDetail.OperationPlace}</p>
                    <p><strong>Pictures Base URL:</strong> {data.ProjectDetail.PicturesBaseUrl}</p>
                    <p>
                      <strong>Thumbnail:</strong>
                      <img style={{
                        width: '200px',
                        height: '100px',
                      }} src={data.ThumbnailPicture.slice(1,-1)} alt={'thumbnail'}/>
                    </p>
                    <p><strong>Review:</strong></p>
                    <Accordion>
                      {data.ProjectDetail.Review &&
                          data.ProjectDetail.Review.map((review) => (
                              <Accordion.Item key={review.Id} eventKey={review.Id}>
                                <Accordion.Header className="bg-dark text-dark">
                                  <p className='mx-2'>{review.Id}</p>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="mx-5 border border-2 border-black py-2 px-4">
                                    <p>
                                      <strong>FullName: </strong>{review.FullName}
                                    </p>
                                    <p>
                                      <strong>EmailAddress: </strong>{review.EmailAddress}
                                    </p>
                                    <p>
                                      <strong>PhoneNumber: </strong>{review.PhoneNumber}
                                    </p>
                                    <p>
                                      <strong>Message: </strong>{review.Message}
                                    </p>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                          ))}
                    </Accordion>
                  </Card.Body>
                  <div className="d-flex justify-content-between">
                    <DeleteProject onDelete={onDelete} id={data.Id}/>
                    <EditProject data={data} onEdit={onEdit} handleToggleModal={handleToggleModal}/>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
          ))}
        </Accordion>
      </>
  )
}
