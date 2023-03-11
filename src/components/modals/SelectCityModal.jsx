import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalActions } from "../../redux/slice/modal";
import { get_order_details } from "../../routes/api";
import { ToastContainer, toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import cities from "../../assets/cities.json";

import "../../App.css";

const SearchTeamModal = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.modal.cityShow);

    const [search, setSearch] = useState("");
    const [data, setData] = useState(cities);

    const closeModalClickHandler = () => {
        dispatch(ModalActions.toggleCityHandler());
    };

    const addCityClickHandler = (select) => {
        dispatch(ModalActions.setCity(select));
        setSearch("");
        closeModalClickHandler();
    };

    return (
        <Modal size="lg" show={show} onHide={closeModalClickHandler}>
            <Modal.Header>
                <Modal.Title>انتخاب شهر</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
                <div className="col-xs-12 col-sm-12 col-md-12 w-100 col-lg-8 mt-2">
                    <Form.Control
                        className="p-3"
                        placeholder="جست و جوی شهر"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div
                    className="col-xs-12 col-sm-12 col-md-12 w-100 col-lg-8 mt-2"
                    style={{ height: "400px", overflowY: "scroll" }}
                >
                    <ListGroup className="city-hover">
                        {data
                            .filter((value) => {
                                if (search == "") {
                                    return value;
                                } else if (value.name.includes(search)) {
                                    return value;
                                }
                            })
                            .map((value, key) => {
                                return (
                                    <ListGroup.Item
                                        key={key}
                                        onClick={() => {
                                            addCityClickHandler(value.name);
                                        }}
                                    >
                                        {value.name}
                                    </ListGroup.Item>
                                );
                            })}
                    </ListGroup>
                </div>
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
