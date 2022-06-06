import {Route, BrowserRouter as Router, Routes, BrowserRouter} from "react-router-dom";
import Navigation from "../navigation/navigation";
import ErroPage from "../components/ErrorScreen";
import { Home } from "../components/HomeScreen";
import { Create } from "../components/CreateScreen";
import {Pastes} from "../components/PastesScreen";
import { About } from "../components/AboutScreen";
import { AdminScreen } from "../components/user/AdminScreen";
import { Settings } from "../components/user/Settings";
import { UserScreen } from "../components/user/UserScreen";
import { AuthorScreen } from "../components/user/AuthorScreen";
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
               // home - create
               <Route path="" element={<Create />} />
                <Route path="/home" element={<Home />} />
               // error screen
               <Route path="*" element={<ErroPage />} />
               // create
                <Route path="/create" element={<Create />} />
               // pastes
               <Route path="/pastes" element={<Pastes />} />
               // paste screen - visible
               <Route path='/pastes/:id' element={<VisibilityScreen />} />
               // pastes with queryset
               <Route path="/pastes/?*" element={<Pastes />} />
               // about
               <Route path="/about" element={<About />} />
               <Route path="/user/admin" element={<AdminScreen />} />
                <Route path="/user/user" element={<UserScreen />} />
                <Route path="/user/settings" element={<Settings />} />
               // verify
               <Route path="/verify" element={<VerificationScreen />} />
               // users
               <Route path="/users" element={<UsersScreen />} />
               // user
               <Route path="/users/:id" element={<AuthorScreen />} />
               // dashboard
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
