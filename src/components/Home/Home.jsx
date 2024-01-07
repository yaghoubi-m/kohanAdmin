import {Nav, Row} from "react-bootstrap";
import React from "react";

export default function Home() {
  return (<div className="mt-5  w-75 mx-auto">
    <Row className="px-2">
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey="/"
          href="/">
        Home
      </Nav.Link>
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey="/headerImg"
          href="/headerImg">
        banners
      </Nav.Link>
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey={'/customers'}
          href="/customers">
        customers
      </Nav.Link>
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey={'/projects'}
          href="/projects">
        projects
      </Nav.Link>
    </Row>
    <Row className="px-2">
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey={'/sampleProjects'}
                href="/sampleProjects">
        home gallery
      </Nav.Link>
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey={'/360'}
                href="/360">
        360
      </Nav.Link>
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey={'/showOff'}
          href="/showOff">
        show off
      </Nav.Link>
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey={'/blog'}
                href="/blog">
        blog
      </Nav.Link>
      <Nav.Link
          className="my-2 bg-dark py-2 text-center text-white"
          eventKey={'/catalog'}
          href="/catalog">
        catalog
      </Nav.Link>
    </Row>
  </div>)
}
