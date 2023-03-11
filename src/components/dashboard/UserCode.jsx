import React, { useEffect, useState } from "react";
import { refer_friends } from "../../routes/api";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { FilePerson, Whatsapp, ShareFill } from "react-bootstrap-icons";

const UserCode = () => {
    const refs = localStorage.getItem("refs");;
    const shareClickHandler = () => {
        const shareData = {
            title: "ایرانکت",
            text: `${refs} کد معرف شما در ایرانکت`,
            url: "lcaolhost",
        };
        
        Navigator.share(shareData);
    };

    const whatsAppShareButtonClickHandler = () => {
        window.open(
            `https://web.whatsapp.com/send?text=کد معرف من در ایرانکت ${refs}`
        );
    };

    return (
        <div className="bg-light p-3">
            <div className="d-flex justify-content-center align-items-center text-secondary mt-2">
                <FilePerson size="50" />
            </div>
            <div className="text-center mt-4">
                <p className="text-secondary h5">
                    به یک دوست تا 50 درصد تخفیف بدهید و بعد از اولین خرید، برای
                    سفارش بعدی خود 50 درصد تخفیف دریافت کنید!
                </p>
            </div>
            <div className="d-flex justify-content-center p-3">
                <p className="text-info h1">{refs}</p>
            </div>
            <div className="mt-3 col-lg-12">
                <Button
                    onClick={whatsAppShareButtonClickHandler}
                    className="w-100 p-3"
                    variant="success"
                >
                    <Whatsapp className="mx-2" size="20" />
                    دعوت با واتس اپ
                </Button>
            </div>
            <div className="mt-1 col-lg-12">
                <Button
                    onClick={shareClickHandler}
                    className="w-100 p-3"
                    variant="secondary"
                >
                    <ShareFill className="mx-2" size="20" />
                    سایر
                </Button>
            </div>
        </div>
    );
};

export default UserCode;
