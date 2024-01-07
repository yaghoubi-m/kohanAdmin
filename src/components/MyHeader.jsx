import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import React, {useState} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";

export default function MyHeader() {
  const location = useLocation();
  const { hash, pathname, search } = location;

  return (
      <>
          <Nav variant="tabs" activeKey={pathname}  className="bg-dark d-flex top-0 px-2 pt-2">
            <Nav.Item className="px-2">
              <Nav.Link eventKey="/" href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey="/headerImg" href="/headerImg">banners</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey={'/customers'}  href="/customers">customers</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey={'/projects'}  href="/projects">projects</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey={'/sampleProjects'} href="/sampleProjects">home gallery</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey={'/360'}  href="/360">360</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey={'/showOff'} href="/showOff">show off</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey={'/blog'}  href="/blog">blog</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-2">
              <Nav.Link eventKey={'/catalog'}  href="/catalog">catalog</Nav.Link>
            </Nav.Item>
          </Nav>
        <Outlet/>
      </>
  )
}
