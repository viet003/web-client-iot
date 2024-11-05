import { Routes, Route } from "react-router-dom";
import { UserProfile, Main, Home, ControlPanel, Admin, Account, Card } from "./containers/";
import { path } from "./ultils/containts";

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.ADMIN} element={<Admin />} >
          <Route path={path.HOME} index element={<Home />} />
          <Route path={path.PROFILE} element={<UserProfile />} />
          <Route path={path.ACCOUNT} element={<Account />} />
          <Route path={path.CARD} element={<Card />} />
        </Route>
        <Route path={path.MAIN} element={<Main />}>
          <Route path={path.HOME} index element={<Home />} />
          <Route path={path.CONTROLL} element={<ControlPanel />} />
          <Route path={path.PROFILE} element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;