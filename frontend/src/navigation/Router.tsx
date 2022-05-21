import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "../navigation/navigation";
import ErroPage from "../components/ErrorScreen";
import { Home } from "../components/HomeScreen";
import { Create } from "../components/CreateScreen";
import {Pastes} from "../components/PastesScreen";
import { About } from "../components/AboutScreen";
import { UserScreen } from "../components/user/UserScreen";
import {PasteScreen} from "../components/PasteBin/PasteScreen";

export const Routerr = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="" element={<Home />} />
        <Route path="/pastes" element={<Pastes />} />
        <Route path='/pastes/:pk' element={<PasteScreen />} />
        <Route path="/pastes/?*" element={<Pastes />} />
        {/*<Route path="/current" element={<Current />} />*/}
        {/*<Route path="/popular" element={<Popular />} />*/}
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErroPage />} />
        <Route path="/user" element={<UserScreen />} />
      </Routes>
    </Router>
  );
};
