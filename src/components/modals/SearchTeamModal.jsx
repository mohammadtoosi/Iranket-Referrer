import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalActions } from "../../redux/slice/modal";
import { get_order_details } from "../../routes/api";
import { ToastContainer, toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";

const SearchTeamModal = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.modal.isOpen);
    const id = useSelector((state) => state.modal.id);

    const [fetchData, setFetchData] = useState([]);
    const [fetchListOrderData, setFetchListOrderData] = useState();
    const [loading, setLoading] = useState(false);

    const closeModalClickHandler = () => {
        dispatch(ModalActions.toggleModalHandler());
    };

    const fetchDataAsync = async () => {
        setLoading(true);
        try {
            const response = await fetch(get_order_details + id, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            console.log(response);
            console.log(data);
            setFetchData(data?.psdata);
            setFetchListOrderData(data?.psdata?.list_orders);
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
        fetchDataAsync();
    }, [id]);

    return (
        <Modal size="lg" show={show} onHide={closeModalClickHandler}>
            <Modal.Header>
                <Modal.Title>
                    {loading ? (
                        <Spinner
                            className="mx-3"
                            animation="border"
                            variant="info"
                            size="sm"
                        />
                    ) : (
                        ""
                    )}
                    بیشتر
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="user"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="user" title="جزییات">
                        <Table
                            hover
                            className={`mt-4 ${loading ? "d-none" : ""}`}
                            responsive
                        >
                            <thead>
                                <tr>
                                    <th>شناسه مشتری</th>
                                    <th>نام</th>
                                    <th>نام خانوادگی</th>
                                    <th>موبایل</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{fetchData.id_customer}</td>
                                    <td>{fetchData.firstname}</td>
                                    <td>{fetchData.lastname}</td>
                                    <td>{fetchData.mobile}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="orders_lis=" title="لیست پرداخت">
                        <Table
                            hover
                            className={`mt-4 ${loading ? "d-none" : ""}`}
                            responsive
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>مرجع</th>
                                    <th>تاریخ ثبت سفارش</th>
                                    <th>مبلغ سفارش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchListOrderData?.map((pay, index) => (
                                    <tr key={index}>
                                        <td>{pay.id_order}</td>
                                        <td>{pay.reference}</td>
                                        <td>{pay.date_add}</td>
                                        <td>{pay.total_paid}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModalClickHandler}>
                    بستن
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchTeamModal;
