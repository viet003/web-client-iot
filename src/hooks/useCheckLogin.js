import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../ultils/containts';

const useCheckLogin = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const redirectToMain = useCallback(() => {
        navigate(path.MAIN);
    }, [navigate]);

    useEffect(() => {
        if (!isLoggedIn) {
            redirectToMain();
        }
    }, [isLoggedIn, redirectToMain]);
};

export default useCheckLogin;
