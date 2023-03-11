import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import {
    HouseDoorFill,
    PeopleFill,
    CurrencyDollar,
    PersonFill,
    Power,
} from "react-bootstrap-icons";

import { auth } from "../../routes/api";

import Spinner from "react-bootstrap/Spinner";

import "../../App.css";

const SidebarMenu = () => {
    const { pathname } = useLocation();

    const [loading, setLoading] = useState(false);

    const logoutClickHandler = async () => {
        sessionStorage.removeItem("auth", false);
        window.location.reload();
        // setLoading(true);
        // try {
        //     const requestOptions = {
        //         method: "DELETE",
        //         credentials: "include",
        //     };
        //     const response = await fetch(auth.logout, requestOptions);
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     toast.error("مشکلی پیش اومده لطفا دوباره امتحان کنید.", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }
        // setLoading(false);

        //
    };

    return (
        <>
            <ToastContainer rtl />
            <div className="col-lg-12 bg-light p-2">
                <div className="d-flex flex-column mx-2">
                    <a className="text-decoration-none" href="/dashboard">
                        <div
                            className={`col-lg-12 p-3 d-flex menu-item ${
                                pathname === "/dashboard"
                                    ? ""
                                    : "text-secondary"
                            } ${
                                pathname === "/dashboard"
                                    ? "menu-item-active"
                                    : ""
                            }`}
                        >
                            <HouseDoorFill size="22" />
                            <p className="mx-3 h5">معرفی</p>
                        </div>
                    </a>
                    <a className="text-decoration-none" href="/my-team">
                        <div
                            className={`col-lg-12 p-3 d-flex menu-item ${
                                pathname === "/my-team" ? "" : "text-secondary"
                            } ${
                                pathname === "/my-team"
                                    ? "menu-item-active"
                                    : ""
                            }`}
                        >
                            <PeopleFill size="22" />
                            <p className="mx-3 h5">تیم من</p>
                        </div>
                    </a>
                    <a className="text-decoration-none d-none" href="/income">
                        <div
                            className={`col-lg-12 p-3 d-flex menu-item ${
                                pathname === "/income" ? "" : "text-secondary"
                            } ${
                                pathname === "/income" ? "menu-item-active" : ""
                            }`}
                        >
                            <CurrencyDollar size="22" />
                            <p className="mx-3 h5">درآمد من</p>
                        </div>
                    </a>
                    <a className="text-decoration-none" href="/profile">
                        <div
                            className={`col-lg-12 p-3 d-flex menu-item ${
                                pathname === "/profile" ? "" : "text-secondary"
                            } ${
                                pathname === "/profile"
                                    ? "menu-item-active"
                                    : ""
                            }`}
                        >
                            <PersonFill size="22" />
                            <p className="mx-3 h5">پروفایل</p>
                        </div>
                    </a>
                    <div className="mt-5">
                        <a
                            className="text-decoration-none"
                            onClick={logoutClickHandler}
                        >
                            <div className="col-lg-12 p-3 d-flex exit-profile text-secondary">
                                {loading === true ? (
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        variant="default"
                                    />
                                ) : (
                                    <>
                                        <Power size="22" />
                                        <p className="mx-3 h5">خروج</p>
                                    </>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;
