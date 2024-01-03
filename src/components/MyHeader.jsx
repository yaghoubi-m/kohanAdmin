import {Container, Navbar, NavLink} from "react-bootstrap";
import React from "react";
import {Link, Outlet} from "react-router-dom";

export default function MyHeader({title}) {
    return (
        <Navbar className="position-fixed w-100 top-0 z-1" bg="dark" variant="dark">
            <Container>
                <div className="d-flex justify-content-center align-items-center gap-4">
                    <Link className="text-white text-decoration-none " to="/">Home</Link>
                    <Link className="text-white text-decoration-none " to="/headerImg">banners</Link>
                    <Link className="text-white text-decoration-none " to="/customers">customers</Link>
                    <Link className="text-white text-decoration-none " to="/projects">projects</Link>
                    <Link className="text-white text-decoration-none " to="/sampleProjects">home gallery</Link>
                    <Link className="text-white text-decoration-none " to="/360">360</Link>
                    <Link className="text-white text-decoration-none " to="/showOff">show off</Link>
                </div>
            </Container>
            <Outlet />
        </Navbar>
    )
}
