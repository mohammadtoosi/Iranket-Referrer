import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import logo from "../../assets/logo/iranket2.png";

const Nav = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const logoutClickHandler = () => {
        sessionStorage.removeItem("auth", false);
        window.location.reload();
    };

    return (
        <nav className="col-lg-12 position-sticky top-0 shadow-md p-3 bg-white">
            <header className="d-flex">
                <div>
                    <img src={logo} height="50" alt="iranket" />
                </div>
                <div className="position-absolute start-0 mx-3 mt-1">
                    <Button
                        variant="outline-danger"
                        onClick={logoutClickHandler}
                    >
                        {loading && (
                            <Spinner
                                animation="border"
                                size="sm"
                                variant="danger"
                            />
                        )}
                        {loading ? "" : "خروج از حساب کاربری"}
                    </Button>
                </div>
            </header>
        </nav>
    );
};

export default Nav;