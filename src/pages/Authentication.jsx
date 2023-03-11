import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../redux/slice/auth";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CheckForm from "../components/authentication/CheckForm";
import RegisterForm from "../components/authentication/RegisterForm";
import OtpForm from "../components/authentication/OtpForm";

const Authentication = () => {
    const check = useSelector((state) => state.auth.check);
    const otp = useSelector((state) => state.auth.otp);
    const register = useSelector((state) => state.auth.register);

    return (
        <>
            <Row>
                <div className={`${check ? "d-flex" : "d-none"} position-absolute top-0 bottom-0 mx-3 justify-content-center align-items-center`}>
                    <CheckForm />
                </div>
                <div className={`${otp ? "d-flex" : "d-none"} position-absolute top-0 bottom-0 mx-3 justify-content-center align-items-center`}>
                    <OtpForm />
                </div>
                <div className={`${register ? "d-flex" : "d-none"} position-absolute top-0 bottom-0 mx-3 justify-content-center align-items-center`}>
                    <RegisterForm />
                </div>
            </Row>
        </>
    );
};

export default Authentication;
