import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { refer_friends } from "../../routes/api.js";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { PersonCircle } from "react-bootstrap-icons";

const Profile = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigateToProfileClickHandler = () => {
        navigate("/profile");
    };

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch(
                refer_friends,
                requestOptions
            );
            const data = await response.json();
            setFetchData(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="bg-light p-3">
            <div className="d-flex justify-content-center align-items-center">
                <PersonCircle size="40" className="text-secondary" />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <p>
                    {loading ? (
                        <Spinner animation="border" variant="info" />
                    ) : (
                        ` خوش اومدی ${fetchData?.user?.firstname ?? ""}`
                    )}
                </p>
            </div>
            <div
                className={`mt-5 col-lg-12 ${
                    pathname === "/profile" ? "d-none" : ""
                }`}
            >
                <Button
                    onClick={navigateToProfileClickHandler}
                    variant="warning"
                    className="w-100 p-3"
                >
                    {loading ? (
                        <Spinner
                            animation="border"
                            variant="default"
                            size="sm"
                        />
                    ) : (
                        "ویرایش پروفایل"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Profile;
