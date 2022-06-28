import Link from "next/link";
import {Fragment, useState} from "react";
import Image from "next/image";
import logo from "../../public/images/logo_original.png";
import {Button, Modal, Nav, Navbar} from "react-bootstrap";
import useSWR from "swr";
import axios from "axios";
import AuthTabs from "../auth/tabs";

export function MainNavbar() {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const {data: categories} = useSWR("/api/categories", async url => (await axios.get(url)).data, {
        revalidateIfStale: false, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: false
    });

    function handleHideLoginModal() {
        setShowLoginModal(false);
    }

    return <Fragment>
        <Navbar expand="sm" className="px-3 py-1 bg-white">
            <Navbar.Toggle className="me-auto" aria-controls="main-navbar-nav"/>
            <Navbar.Collapse id="main-navbar-nav">
                {categories && <Nav>
                    {categories.map(category => (
                        <Link passHref href={`/categories/${category.title}`} key={category.title}>
                            <Nav.Link>
                                {category.title}
                            </Nav.Link>
                        </Link>))}
                </Nav>}
                <Nav className="me-auto">
                    <Button className="m-1" variant="outline-secondary" onClick={() => setShowLoginModal(true)}>ورود /
                        ثبت
                        نام</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Modal show={showLoginModal} onHide={handleHideLoginModal}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <AuthTabs onSuccess={handleHideLoginModal}/>
            </Modal.Body>
        </Modal>
    </Fragment>
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