import { Routes, Route, Navigate } from "react-router-dom";
import { UserProfile, Main, Home, ControlPanel, Admin, Account, Card, Bill } from "./containers/";
import { path } from "./ultils/containts";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as apiService from "./services"
import * as actions from "./store/actions"
import { useEffect } from "react";

function App() {
  const { token } = useSelector(state => state.auth);
  const de_token = token ? jwtDecode(token)?.type : null;
  const dispatch = useDispatch()

  // console.log(de_token);
  const handleToken = async (token) => {
    if(!token) return
    try {
      const rs = await apiService.apicheckTokenExpired({ token });
      if (rs?.status === 200 && rs?.data?.err === 0) {
        if (rs?.data?.isExpired) dispatch(actions.logout());
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      dispatch(actions.logout());
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      await handleToken(token);
    };
    verifyToken();
  }, [token]);


  return (
    <div>
      <Routes>
        <Route path={path.ADMIN} element={de_token === 2 ? <Admin /> : <Navigate to={path.MAIN} />} >
          <Route path={path.HOME} index element={<Home />} />
          <Route path={path.PROFILE} element={<UserProfile />} />
          <Route path={path.ACCOUNT} element={<Account />} />
          <Route path={path.CARD} element={<Card />} />
          <Route path={path.BILL} element={<Bill />} />
          <Route path={path.STAR} element={<Home />} />
        </Route>

        <Route path={path.MAIN} element={<Main />} >
          <Route index element={<Home />} />
          <Route path={path.CONTROLL} element={<ControlPanel />} />
          <Route path={path.PROFILE} element={<UserProfile />} />
          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
