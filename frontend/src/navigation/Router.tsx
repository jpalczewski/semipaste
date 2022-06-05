import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "../navigation/navigation";
import ErroPage from "../components/ErrorScreen";
import { Home } from "../components/HomeScreen";
import { Create } from "../components/CreateScreen";
import {Pastes} from "../components/PastesScreen";
import { About } from "../components/AboutScreen";
import { UserScreen } from "../components/user/UserScreen";
import {VerificationScreen} from "../components/user/VerificationScreen";
import { UsersScreen } from "../components/user/UsersScreen";
import {VisibilityScreen} from "../components/PasteBin/VisibilityScreen";
import {UserScreen} from "../components/user/UserScreen";

export const Routerr = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="" element={<Create />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="" element={<Home />} />
        <Route path="/pastes" element={<Pastes />} />
        <Route path='/pastes/:id' element={<VisibilityScreen />} />
        <Route path="/pastes/?*" element={<Pastes />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify" element={<VerificationScreen />} />
        <Route path="*" element={<ErroPage />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/users/:id" element={<UserScreen />} />
      </Routes>
    </Router>
  );
};
