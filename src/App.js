import { Routes, Route, Navigate } from "react-router-dom";
import { UserProfile, Main, Home, ControlPanel, Admin, Account, Card } from "./containers/";
import { path } from "./ultils/containts";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function App() {
  const { token } = useSelector(state => state.auth);
  const de_token = token ? jwtDecode(token)?.type : null;
  // console.log(de_token);

  return (
    <div>
      <Routes>
        <Route path={path.ADMIN} element={de_token === 2 ? <Admin /> : <Navigate to={path.MAIN} />} >
          <Route path={path.HOME} index element={<Home />} />
          <Route path={path.PROFILE} element={<UserProfile />} />
          <Route path={path.ACCOUNT} element={<Account />} />
          <Route path={path.CARD} element={<Card />} />
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
