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
import UpdateUser from "./page/user/UpdateUser";
import ShowListTeacherPending from "./page/user/ShowListTeacherPending";
import DetailTeacherPending from "./page/user/DetailTeacherPending";
import ShowListStudentFindByName from "./page/user/ShowListStudentFindByName";
import ShowListStudentFindByMail from "./page/user/ShowListStudentFindByMail";
import AdminFindStudent from "./page/find/AdminFindStudent";
import ShowListTeacher from "./page/user/ShowListTeacher";
import TeacherDetail from "./page/user/TeacherDetail";
import ShowListTeacherFindByName from "./page/user/ShowListTeacherFindByName";
import ShowListTeacherFindByMail from "./page/user/ShowListTeacherFindByMail";
import RegisterForm from "./page/RegisterForm";
import ForgotForm from "./page/ForgotForm";
import CreateCateQuiz from "./page/catequiz/CreateCateQuiz";
import LayoutManagerQuestion from "./page/question/LayoutManagerQuestion";
import CreateQuestion from "./page/question/CreateQuestion";

import ListQuestion from "./page/question/ListQuestion";
import ShowListCategoryQuiz from "./page/catequiz/ShowListCategoryQuiz";
import CreateCateQuestion from "./page/catequestion/CreateCateQuestion";
import AutoHeightOverlayNoSnap from "./page/question/ListQuestion1";
import UpdateCateQuiz from "./page/catequiz/UpdateCateQuiz";
import EditQuestion from "./page/question/EditQuestion";


function App() {
    return (
        <div>
            <ToastContainer/>
            <Routes>
                <Route path={'/'} element={<Login/>}>
                    <Route path={'/'} element={<MenuLogin/>}></Route>
                    <Route path={'/loginWithEmail'} element={<LoginWithGmailForm/>}></Route>
                    <Route path={'/register'} element={<RegisterForm/>}></Route>
                    <Route path={'/forgot'} element={<ForgotForm/>}></Route>
                </Route>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/createCateQuiz'} element={<CreateCateQuiz/>}></Route>
                    <Route path={'/home/createCateQuestion'} element={<CreateCateQuestion/>}></Route>
                    <Route path={'/home'} element={<AdminFindStudent/>}></Route>
                    <Route path={'/home/showListStudent'} element={<ShowListStudent/>}></Route>
                    <Route path={'/home/showListTeacher'} element={<ShowListTeacher/>}></Route>
                    <Route path={'/home/userDetail/:id'} element={<UserDetail/>}></Route>
                    <Route path={'/home/teacherDetail/:id'} element={<TeacherDetail/>}></Route>
                    <Route path={'/home/findUserById/:id'} element={<UpdateUser/>}></Route>
                    <Route path={'/home/showTeacherPending'} element={<ShowListTeacherPending/>}></Route>
                    <Route path={'/home/detailTeacherPending/:id'} element={<DetailTeacherPending/>}></Route>
                    <Route path={'/home/showListStudentFindByName'} element={<ShowListStudentFindByName/>}></Route>
                    <Route path={'/home/showListStudentFindByMail'} element={<ShowListStudentFindByMail/>}></Route>
                    <Route path={'/home/showListTeacherFindByName'} element={<ShowListTeacherFindByName/>}></Route>
                    <Route path={'/home/showListTeacherFindByMail'} element={<ShowListTeacherFindByMail/>}></Route>
                    <Route path={'/home/LayoutManagerQuestion'} element={<LayoutManagerQuestion/>}>
                        <Route path={'listQuestion'} element={<ListQuestion/>}></Route>
                        <Route path={'createQuestion'} element={<CreateQuestion/>}></Route>
                        <Route path={'editQuestion/:id'} element={<EditQuestion/>}></Route>
                    </Route>
                    <Route path={'/home/showListCateQuiz'} element={<ShowListCategoryQuiz/>}></Route>
                    <Route path={'/home/updateCateQuiz/:id'} element={<UpdateCateQuiz/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
