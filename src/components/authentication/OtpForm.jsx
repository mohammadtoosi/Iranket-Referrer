import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../../redux/slice/auth";
import { auth } from "../../routes/api";
import { ToastContainer, toast } from "react-toastify";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OTPInput from "otp-input-react";
import Spinner from "react-bootstrap/Spinner";

import logo from "../../assets/logo/ket.jpg";

const OtpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mobile = useSelector((state) => state.auth.mobile);
    const counter = useSelector((state) => state.auth.counter);

    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const [sLoading, setSLoading] = useState(false);

    const setCounter = (counter) => {
        dispatch(AuthActions.setCounterHandler(counter));
    };

    const counterEnabled = () => {
        dispatch(AuthActions.setCounterHandler(59));
    }

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    const reSendCodeAsync = async () => {
        dispatch(AuthActions.setCounterHandler(60));
        setSLoading(true);
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch(auth.code + mobile, requestOptions);
            const data = await response.json();
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
        setSLoading(false);
    };

    const requestClickHandler = async () => {
        setLoading(true);
        try {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    mobile: mobile,
                    code: OTP,
                }),
                credentials: "include",
            };
            const response = await fetch(auth.verify, requestOptions);
            const data = await response.json();
            if (data?.psdata?.code === 303) {
                toast.error("کد وارد شده اشتباه است!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            if (data?.psdata?.is_registered === false) {
                dispatch(AuthActions.toggleOtpForm());
                dispatch(AuthActions.toggleRegisterForm());
            } else {
                if (data?.psdata?.code !== 303 && data?.psdata?.code === 200) {
                    navigate("/dashboard");
                    localStorage.setItem("refs", data?.psdata?.refs);
                    sessionStorage.setItem("auth", true);
                }
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
            <ToastContainer rtl />
            <div
                className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-4 p-5 shadow position-relative"
                style={{ background: "#FFFFFF" }}
            >
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <img src={logo} height="150" alt="iranket" />
                    <p className="h5">
                        لطفا کد تایید حساب کاربری خود را وارد کنید.
                    </p>
                </div>
                <div className="mt-3 d-flex">
                    <div className="mt-2 w-75">
                        <p className="text-secondary">
                            {counter !== 0
                                ? `${counter} ثانیه تا دریافت مجدد کد`
                                : "دریافت مجدد کد"}
                        </p>
                    </div>
                    <div className="">
                        <button
                            className="btn btn-warning"
                            onClick={reSendCodeAsync}
                            disabled={counter === 0 ? false : true}
                        >
                            {sLoading ? (
                                <Spinner
                                    animation="border"
                                    variant="default"
                                    size="sm"
                                />
                            ) : (
                                "ارسال کد"
                            )}
                        </button>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center mb-3">
                    <div
                        className="d-flex justify-content-center align-items-center mt-5 mb-5"
                        dir="ltr"
                    >
                        {/* <div className="col-lg-12">
                        <Form.Label>کد تایید</Form.Label>
                        <Form.Control className="p-3" />
                    </div> */}
                        <OTPInput
                            value={OTP}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                            inputStyles={{ width: "50px", height: "50px" }}
                        />
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

export default OtpForm;
