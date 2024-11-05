import React, { useEffect } from 'react'
import { Header, Footer } from '../../components';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { path } from '../../ultils/containts';

const Main = () => {

    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)
    
    useEffect(() => {
        if(!isLoggedIn) navigate(path.MAIN)
    }, [isLoggedIn])
    
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
