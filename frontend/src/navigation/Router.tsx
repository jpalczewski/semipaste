import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "../navigation/navigation";
import ErroPage from "../components/ErrorScreen";
import { Home } from "../components/HomeScreen";
import { Create } from "../components/CreateScreen";
import {Pastes} from "../components/PastesScreen";
import { About } from "../components/AboutScreen";
import { UserScreen } from "../components/user/UserScreen";
import {VisibilityScreen} from "../components/PasteBin/VisibilityScreen";

export const Routerr = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="" element={<Home />} />
        <Route path="/pastes" element={<Pastes />} />
        <Route path='/pastes/:id' element={<VisibilityScreen />} />
        <Route path="/pastes/?*" element={<Pastes />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErroPage />} />
        <Route path="/user" element={<UserScreen />} />
      </Routes>
    </Router>
  );
};
