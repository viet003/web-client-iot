import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { path } from "../ultils/containts";
import { IoCardSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { BsPaypal } from "react-icons/bs";

const SideBar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState(""); // Trạng thái của mục đang được chọn

    const getContent = props.getContent;
    const toggle = props.toggle;

    const handleNavigation = (label, path) => {
        getContent(label);
        setActiveItem(path);
        navigate(path);
        handleStateUpdate({active: path, content: label});
    };

    const { active } = useSelector(state => state.state);

    const handleStateUpdate = (page) => {
        dispatch(actions.state(page));
    };

    useEffect(() => {
       setActiveItem(active);
    }, [active]);

    return (
        <div className={`${toggle ? "" : ""} flex flex-col justify-between h-[90%]`}>
            <div className="">
                <div
                    onClick={() => handleNavigation("Home", path.HOME)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === path.HOME ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><RxDashboard /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Trang chủ</div>
                </div>
                <div
                    onClick={() => handleNavigation("Thông tin cá nhân", path.PROFILE)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === path.PROFILE ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><ImProfile /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Thông tin</div>
                </div>
                <div
                    onClick={() => handleNavigation("Quản lý tài khoản", path.ACCOUNT)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === path.ACCOUNT ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><RiAccountPinBoxFill /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Tài khoản</div>
                </div>
                <div
                    onClick={() => handleNavigation("Quản lý thẻ xe", path.CARD)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === path.CARD ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><IoCardSharp /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Thẻ xe</div>
                </div>
                <div
                    onClick={() => handleNavigation("Quản lý dư nợ", path.BILL)}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === path.BILL ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><BsPaypal /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Dư nợ</div>
                </div>
            </div>

            <div>
                <div
                    onClick={() => {
                        dispatch(actions.logout());
                        dispatch(actions.state({ active: null, content: null}))
                        navigate(path.MAIN)
                    }}
                    className={`${toggle ? "w-[3.5rem]" : "w-[12rem]"} sideData ${activeItem === path.LOGIN ? "text-black bg-white" : ""}`}
                >
                    <div className="mr-8 text-[1.7rem]"><IoIosLogOut /></div>
                    <div className={`${toggle ? "opacity-0 " : "transition-opacity "} text-[14px] whitespace-pre`}>Đăng xuất</div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;