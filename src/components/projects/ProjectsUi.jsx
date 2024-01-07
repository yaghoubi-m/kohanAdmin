import {Accordion, Button, Card} from "react-bootstrap";
import DeleteProject from "./DeleteProject";
import React, {Fragment} from "react";
import EditProject from "./EditProject";
import Spinner from "../Spinner";

export default function ProjectsUi({projects, onDelete, handleToggleModal, onEdit, onConfirm}) {

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
                    <p><strong>Title:</strong> {data.Title}</p>
                    <p><strong>EmployerTitle:</strong> {data.ProjectDetail.EmployerTitle}</p>
                    <p><strong>Material Description:</strong> {data.ProjectDetail.MaterialDescription}</p>
                    <p><strong>Meterage:</strong> {data.ProjectDetail.Meterage}</p>
                    <p><strong>Operation Date:</strong> {data.ProjectDetail.OperationDate}</p>
                    <p><strong>Operation Place:</strong> {data.ProjectDetail.OperationPlace}</p>
                    <p>
                      <strong>Thumbnail : </strong>
                      <img style={{
                        width: '200px',
                        height: '100px',
                      }} src={data.ThumbnailPicture?.slice(1, -1)} alt={'thumbnail'}/>
                    </p>
                    <div>
                      <strong>Pictures :</strong>
                      <div className="d-flex flex-wrap">
                        {JSON.parse(data.ProjectDetail.PicturesBaseUrls)
                            ?.map((img, index) => (
                                <Fragment key={index}>
                                  <img
                                      className="m-1"
                                      style={{
                                    width: '200px',
                                    height: '100px',
                                  }} src={img} alt={'img'}/>
                                </Fragment>
                            ))}
                      </div>
                    </div>
                    <p><strong>Review:</strong></p>
                    {data.ProjectDetail.Review &&
                        data.ProjectDetail.Review.map((review) => (
                            <Accordion key={review.Id}>
                              <Accordion.Item className='mt-5' eventKey={review.Id}>
                                <Accordion.Header className="">
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
                                    <p>
                                      <strong>State: </strong>{review.State === 0 ? 'Confirmed' : 'pending'}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                      <Button onClick={()=> onConfirm(review.Id, 0)} variant="warning">Confirm</Button>
                                      <Button onClick={()=> onConfirm(review.Id, 1)} variant="warning">cancel</Button>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                        ))}
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
