import React, { useState, useEffect } from "react";
import { refer_friends, update_profile } from "../../routes/api";
import { ToastContainer, toast } from "react-toastify";

import Nav from "../../components/navbar/Nav";
import SidebarMenu from "../../components/menu/SidebarMenu";
import UserCode from "../../components/dashboard/UserCode";
import Profile from "../../components/dashboard/Profile";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Interduce = () => {
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sLoading, setSLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState();

    const updateProfileClickHandler = async () => {
        setSLoading(true);
        try {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                }),
                credentials: "include",
            };
            const response = await fetch(update_profile, requestOptions);
            const data = await response.json();
            console.log(data);
            if (data?.code === 200) {
                toast.success("پروفایل شما با موفقیت بروزرسانی شد.", {
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
        }
        setSLoading(false);
    };

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch(refer_friends, requestOptions);
            const data = await response.json();
            console.log(data);
            setFetchData(data);
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

    useEffect(() => {
        fetchUserData();
    }, []);
    
    return (
        <>
            <ToastContainer rtl />
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2 mt-5">
                        <Profile />
                        <div className="mt-3">
                            <SidebarMenu />
                        </div>
                        <div className="d-xs-block d-sm-block d-lg-none mt-3">
                            <UserCode />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-8 mt-5">
                        <div className="col-lg-12 bg-light p-3">
                            <p className="h3 mt-2">ویرایش پروفایل</p>
                            {loading ? (
                                <Spinner animation="border" variant="info" />
                            ) : (
                                ""
                            )}
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-5">
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-column justify-content-center align-items-center mb-5">
                                        <div className="col-lg-6 w-100">
                                            <Form.Label>نام</Form.Label>
                                            <Form.Control
                                                placeholder={
                                                    fetchData?.user?.firstname
                                                }
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                className="p-3"
                                            />
                                        </div>
                                        <div className="col-lg-6 mt-3 w-100">
                                            <Form.Label>
                                                نام خانوادگی
                                            </Form.Label>
                                            <Form.Control
                                                placeholder={
                                                    fetchData?.user?.lastname
                                                }
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                                className="p-3"
                                            />
                                        </div>
                                        <div className="col-lg-6 mt-3 w-100">
                                            <Form.Label>جنسیت</Form.Label>
                                            <select
                                                className="form-control p-3"
                                                value={gender}
                                                onChange={(e) =>
                                                    setGender(e.target.value)
                                                }
                                            >
                                                <option>مرد</option>
                                                <option>زن</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-6 mt-3 w-100 d-none">
                                            <Form.Label>موبایل</Form.Label>
                                            <Form.Control
                                                placeholder={
                                                    fetchData?.user?.email
                                                }
                                                className="p-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <Button
                                            className="col-lg-3 p-3"
                                            variant="success"
                                            onClick={updateProfileClickHandler}
                                        >
                                            {sLoading ? (
                                                <Spinner
                                                    animation="border"
                                                    variant="default"
                                                    size="sm"
                                                />
                                            ) : (
                                                "تایید"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 mt-5 d-none d-xs-none d-sm-none d-lg-block">
                        <UserCode />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Interduce;
