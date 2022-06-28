import {Tab, Tabs} from "react-bootstrap";
import {useState} from "react";
import {LoginForm, SignupForm} from "./form";

export default function AuthTabs({onSuccess}) {
    const [key, setKey] = useState("login");

    return (
        <Tabs
            id="controlled-tab-forms"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="login" title="ورود" tabClassName="text-red preserve-color">
                <LoginForm onSuccess={onSuccess}/>
            </Tab>
            <Tab eventKey="signup" title="ایجاد حساب" tabClassName="text-red preserve-color">
                <SignupForm onSuccess={onSuccess}/>
            </Tab>
            <Tab eventKey="phone" title="ورود با شماره" disabled/>
        </Tabs>
    )
}