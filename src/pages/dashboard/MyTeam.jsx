import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalActions } from "../../redux/slice/modal";
import { refer_friends } from "../../routes/api";

import { ToastContainer, toast } from "react-toastify";
import Nav from "../../components/navbar/Nav";
import SidebarMenu from "../../components/menu/SidebarMenu";
import UserCode from "../../components/dashboard/UserCode";
import Profile from "../../components/dashboard/Profile";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import SearchTeamModal from "../../components/modals/SearchTeamModal";

import { Search } from "react-bootstrap-icons";

const Interduce = () => {
    const dispatch = useDispatch();
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDataAsync = async () => {
        setLoading(true);
        try {
            const response = await fetch(refer_friends, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            setFetchData(data?.psdata);
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

    const setIDClickHandler = (id) => {
        dispatch(ModalActions.setIDHandler(id));
        dispatch(ModalActions.toggleModalHandler());
        localStorage.setItem("c_u_i", id);
    };

    useEffect(() => {
        fetchDataAsync();
    }, []);

    return (
        <>
            <SearchTeamModal />
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
                            <p className="h3 text-secondary">تیم من</p>
                            <div className="d-flex justify-content-center align-items-center">
                                {loading ? (
                                    <Spinner
                                        animation="border"
                                        variant="info"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            {fetchData?.total_result === 0 ? (
                                <div
                                    className={`d-flex justify-content-center mt-3 ${
                                        fetchData.total_result !== 0
                                            ? "d-none"
                                            : ""
                                    }`}
                                >
                                    <p className="text-secondary">
                                        داده ای برای نمایش وجود ندارد.
                                    </p>
                                </div>
                            ) : (
                                <Table
                                    hover
                                    className={`mt-4 ${
                                        loading ? "d-none" : ""
                                    }`}
                                >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>نام</th>
                                            <th>ایمیل</th>
                                            <th>پرداخت</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fetchData?.result?.map(
                                            (person, index) => (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>
                                                        {person.firstname +
                                                            " " +
                                                            person.lastname}
                                                    </td>
                                                    <td>{person.email}</td>
                                                    <td>
                                                        {person.total_order}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            onClick={() =>
                                                                setIDClickHandler(
                                                                    person.id_customer
                                                                )
                                                            }
                                                            variant="primary"
                                                        >
                                                            <Search size="20" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            )}
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
