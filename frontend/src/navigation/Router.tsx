import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "../navigation/navigation";
import ErroPage from "../components/ErrorScreen";
import { Home } from "../components/HomeScreen";
import { Create } from "../components/CreateScreen";
import { Current } from "../components/CurrentScreen";
import { Popular } from "../components/PopularScreen";
import { About } from "../components/AboutScreen";
import { UserScreen } from "../components/user/UserScreen";
import {VerificationScreen} from "../components/user/VerificationScreen";

export const Routerr = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="" element={<Create />} />
        <Route path="/home" element={<Home />} />
        <Route path="/current" element={<Current />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify" element={<VerificationScreen />} />
        <Route path="*" element={<ErroPage />} />
        <Route path="/user" element={<UserScreen />} />
      </Routes>
    </Router>
  );
};
