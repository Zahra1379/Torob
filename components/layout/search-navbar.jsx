import {Navbar} from "react-bootstrap";
import Image from "next/image";
import logo from '../../public/images/logo_original.png'

export default function SearchNavbar() {
    return <Navbar>
        <Navbar.Brand className="d-flex flex-row align-items-center">
            <Image src={logo} width={40} height={40} alt="logo"/>
            <h4 className="my-0 mx-2 text-red">ترب</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Text className="text-right">
                hello
            </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
}