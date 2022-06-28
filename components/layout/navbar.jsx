import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import logo from "../../public/images/logo_original.png";
import {Button, Form, Modal, Nav, Navbar} from "react-bootstrap";

export function MainNavbar() {

    const [categories, setCategories] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        axios.get("/api/categories").then(res => {
            setCategories(res.data);
        })
    }, []);

    function handleHideLoginModal() {
        setShowLoginModal(false);
    }

    return <Navbar expand="sm" className="px-3 py-1 bg-white">
        <Navbar.Toggle className="me-auto" aria-controls="main-navbar-nav"/>
        <Navbar.Collapse id="main-navbar-nav">
            {categories && <Nav>
                {categories.map(category => (
                    <Link passHref href={`/categories/${category.title}`} key={category.id}>
                        <Nav.Link>
                            {category.title}
                        </Nav.Link>
                    </Link>
                ))}
            </Nav>}
            <Nav className="me-auto">
                <Button className="m-1" variant="outline-secondary" onClick={() => setShowLoginModal(true)}>ورود / ثبت نام</Button>
                <Modal show={showLoginModal} onHide={handleHideLoginModal}>
                    <Modal.Header closeButton />
                    <Modal.Body>
                    </Modal.Body>
                </Modal>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}

export function SearchNavbar() {
    return <Navbar className="bg-white">
        <Navbar.Brand className="d-flex flex-row align-items-center">
            <Image src={logo} width={40} height={40} alt="logo"/>
            <h4 className="my-0 mx-2 text-red">ترب</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
    </Navbar>
}