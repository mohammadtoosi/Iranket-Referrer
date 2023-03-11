import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../routes/api";
import { ToastContainer, toast } from "react-toastify";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import SelectCityModal from "../modals/SelectCityModal";

import logo from "../../assets/logo/ket.jpg";

import cities from "../../assets/cities.json";
import { ModalActions } from "../../redux/slice/modal";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mobile = useSelector((state) => state.auth.mobile);
    const city = useSelector((state) => state.modal.city);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);

    const requestClickHandler = async () => {
        setLoading(true);
        try {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    mobile: mobile,
                    city: city,
                }),
                credentials: "include",
            };
            const response = await fetch(auth.register, requestOptions);
            const data = await response.json();
            if (data?.psdata?.code === 200) {
                navigate("/dashboard");
                sessionStorage.setItem("auth", true);
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
        }
        setLoading(false);
    };

    return (
        <>
            <SelectCityModal />
            <ToastContainer rtl />
            <div
                className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-4 p-5 shadow position-relative"
                style={{ background: "#FFFFFF" }}
            >
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <img src={logo} height="150" alt="iranket" />
                    <p className="h5">لطفا فرم ثبت نام زیر را کامل کنید.</p>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column justify-content-center align-items-center mb-5">
                        <div className="col-lg-12">
                            <Form.Label>موبایل</Form.Label>
                            <Form.Control
                                value={mobile}
                                disabled
                                className="p-3"
                            />
                        </div>
                        <div className="col-lg-12 mt-3">
                            <Form.Label>نام</Form.Label>
                            <Form.Control
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="p-3"
                            />
                        </div>
                        <div className="col-lg-12 mt-3">
                            <Form.Label>نام خانوادگی</Form.Label>
                            <Form.Control
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="p-3"
                            />
                        </div>
                        <div className="col-lg-12 mt-3 w-100">
                            <Form.Label>جنسیت</Form.Label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-control p-3"
                            >
                                <option value={1}>مرد</option>
                                <option value={0}>زن</option>
                            </select>
                        </div>
                        <div className="col-lg-12 mt-3">
                            <Form.Label>شهر</Form.Label>
                            <Form.Control
                                value={city}
                                className="p-3"
                                onClick={() => {
                                    dispatch(ModalActions.toggleCityHandler());
                                }}
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

export default RegisterForm;
