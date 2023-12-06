import './App.css';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import {Route, Routes} from "react-router-dom";
import ShowListStudent from "./page/user/ShowListStudent";
import Login from "./page/Login";
import Home from "./page/Home";
import MenuLogin from "./page/MenuLogin";
import LoginWithGmailForm from "./page/LoginWithGmailForm";
import UserDetail from "./page/user/UserDetail";

function App() {
    return (
        <div>
            <ToastContainer/>
            <Routes>
                <Route path={'/'} element={<Login/>}>
                    <Route path={'/'} element={<MenuLogin/>}></Route>
                    <Route path={'/loginWithEmail'} element={<LoginWithGmailForm/>}></Route>
                </Route>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/showListStudent'} element={<ShowListStudent/>}></Route>
                    <Route path={'/home/userDetail/:id'} element={<UserDetail/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
