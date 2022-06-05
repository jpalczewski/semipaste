import {Route, BrowserRouter as Router, Routes, BrowserRouter} from "react-router-dom";
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
import {Dashboard} from "../components/dashboard/DashboardScreen";
import {DashboardPastesScreen} from "../components/dashboard/Pastes/PastesScreen";
import {DashboardHomeScreen} from "../components/dashboard/HomeScreen";
import React from "react";
import {DashboardUsersScreen} from "../components/dashboard/Users/UsersScreen";
import {DashboardUserEditScreen} from "../components/dashboard/Users/UserEditScreen";

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
               <Route path="dashboard" element={<Dashboard />}>
                   // home
                   <Route index element={<DashboardHomeScreen />} />
                   // pastes
                   <Route path="pastes" element={<DashboardPastesScreen />} />
                   <Route path="pastes/:id" element={<DashboardPastesScreen />} />
                   // users
                   <Route path="users" element={<DashboardUsersScreen />} />
                   <Route path="users/:id" element={<DashboardUserEditScreen />} />
               </Route>
           </Routes>
    </Router>
  );
};
