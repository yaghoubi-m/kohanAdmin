import {Button, Card, Col, Row} from "react-bootstrap";

export default function BlogUi({apiData, handleDelete, onEdit, handleToggleModal}) {
  // console.log(apiData)
  return (
      <Row>
        {apiData.map((data) => (
            <Col key={data.Id} md={4}>
              <Card className="mb-4">
                <Card.Img height={200} variant="top" src={data.ThumbPicture?.slice(1, -1)}/>
                <Card.Body>
                  <Card.Title>{data.Title}</Card.Title>
                  <Card.Text>{data.Body}</Card.Text>
                  {data.Headers.slice(0,1).map(item => (
                          <div key={item.Id}>
                            <div><strong>header 1:</strong> {item.Title}</div>
                            <div><strong>content 1:</strong> {item.Content}</div>
                          </div>
                      )
                  )}
                  <Card.Text>
                    <strong>Tags:</strong> {data.Tags}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button className="w-75" variant="warning" onClick={() => {
                      onEdit(data)
                      handleToggleModal()
                    }}>Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(data.Id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
        ))}
      </Row>
  );
}
