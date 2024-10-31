import React, { useEffect } from 'react'
import { Header, Footer } from '../../components';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Main = () => {

    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)

    return (
        <div className="flex flex-col">
            <Header />
            <div className="h-[67px]"></div>
            <Outlet /> 
            <Footer />
        </div>
    )
}

export default Main
