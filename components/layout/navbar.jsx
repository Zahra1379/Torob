import Link from "next/link";
import {Fragment, useState} from "react";
import Image from "next/image";
import logo from "../../public/images/logo_original.png";
import {Button, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import useSWR from "swr";
import axios from "axios";
import AuthTabs from "../auth/tabs";
import {useUser} from "../../hooks/auth";
import {signOut} from "next-auth/react";
import styled from "@emotion/styled";

const CategoryBadge = styled.a`
  text-decoration: none;
  margin: .2rem;
  cursor: pointer;
`

export function MainNavbar() {

    const user = useUser();
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
                        <Nav.Link key={category.title} onClick={() => {
                            let show = true;
                            if (showCategories && selectedCategory.title === category.title)
                                show = false;
                            setSelectedCategory(category);
                            setShowCategories(show);
                        }}>
                            {category.title}
                        </Nav.Link>))}
                </Nav>}
                <Nav className="me-auto">
                    {user ? <Button className="m-1" variant="outline-secondary"
                                    onClick={() => signOut({redirect: false})}>خروج</Button> :
                        <Button className="m-1" variant="outline-secondary" onClick={() => setShowLoginModal(true)}>ورود
                            /
                            ثبت
                            نام</Button>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        {showCategories && <div className="position-fixed bg-white d-flex w-100 flex-row">
            {selectedCategory.children.map(child => (
                <div key={child.title} className="flex-column d-flex m-2">
                    <h6 className="m-1">{child.title}</h6>
                    {child.children.map(subChild => (
                        <Link key={subChild} href={`/categories/${subChild}`}><CategoryBadge>{subChild}</CategoryBadge></Link>
                    ))}
                </div>
            ))}
        </div>}
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