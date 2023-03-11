import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../routes/api";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../redux/slice/auth";
import { ToastContainer, toast } from "react-toastify";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import logo from "../../assets/logo/ket.jpg";

import cities from "../../assets/cities.json";

const CheckForm = () => {
    const dispatch = useDispatch();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const requestClickHandler = async () => {
        setLoading(true);
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch(
                auth.code + phoneNumber,
                requestOptions
            );
            const data = await response.json();
            console.log(response);
            console.log(data);
            if (data?.psdata?.code === 200) {
                dispatch(AuthActions.toggleCheckForm());
                dispatch(AuthActions.toggleOtpForm());
                dispatch(AuthActions.setMobile(phoneNumber));
                dispatch(AuthActions.setCounterHandler(60));
            }
            if (data?.psdata?.code === 302) {
                toast.error("شماره وارد شده اشتباه است!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            toast.error("مشکلی پیش اومده لطفا دوباره امتحان کنید.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <>
            <ToastContainer rtl />
            <div
                className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-4 p-5 shadow position-relative"
                style={{ background: "#FFFFFF" }}
            >
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <img src={logo} height="150" alt="iranket" />
                    <p className="h5">لطفا شماره موبایل خود را وارد کنید.</p>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center align-items-center mb-5">
                        <div className="col-lg-12">
                            <Form.Label>موبایل</Form.Label>
                            <Form.Control
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="p-3"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center position-absolute w-100 start-0 bottom-0">
                        <Button
                            onClick={requestClickHandler}
                            className="col-lg-12 w-100 p-3"
                            variant="primary"
                        >
                            {loading ? (
                                <Spinner
                                    variant="light"
                                    animation="border"
                                    size="sm"
                                />
                            ) : (
                                "تایید"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckForm;
