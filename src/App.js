import './App.css';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import {Navigate, Route, Routes} from "react-router-dom";
import ShowListStudent from "./page/user/student/ShowListStudent";
import UserDetail from "./page/user/UserDetail";
import UserProfile from "./page/user/UserProfile";
import ShowListTeacherPending from "./page/user/teacher/ShowListTeacherPending";
import DetailTeacherPending from "./page/user/teacher/DetailTeacherPending";
import ShowListTeacher from "./page/user/teacher/ShowListTeacher";
import TeacherDetail from "./page/user/teacher/TeacherDetail";
import CreateCateQuiz from "./page/catequiz/CreateCateQuiz";
import LayoutManagerQuestion from "./page/question/LayoutManagerQuestion";

import ListQuestion from "./page/question/ListQuestion";
import ShowListCategoryQuiz from "./page/catequiz/ShowListCategoryQuiz";
import CreateCateQuestion from "./page/catequestion/CreateCateQuestion";
import UpdateCateQuiz from "./page/catequiz/UpdateCateQuiz";
import EditQuestion from "./page/question/EditQuestion";
import ShowListCateQuestion from "./page/catequestion/ShowListCateQuestion";
import UpdateCateQuestion from "./page/catequestion/UpdateCateQuestion";
import {useSelector} from "react-redux";
import ChangePassword from "./page/user/UserPassword";
import CreateQuestionOneAnswer from "./page/question/CreateQuestionOneAnswer";
import CreateQuestionTrueFalse from "./page/question/CreateQuestionTrueFalse";
import TotalQuestion from "./page/question/TotalQuestion";
import MenuLogin from "./page/login/MenuLogin";
import LoginWithGmailForm from "./page/login/LoginWithGmailForm";
import RegisterForm from "./page/login/RegisterForm";
import ForgotForm from "./page/login/ForgotForm";
import Home from "./component/Home";
import Login from "./page/login/Login";
import CreateNewQuiz from "./page/quizz/CreateNewQuiz";


function App() {
    const user = useSelector(state => {
        return state.users.currentUser;
    })
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
                {Object.keys(user).length === 0 ?
                    <Route path={'*'} element={<Navigate to="/"/>}>

                    </Route>
                : user && (
                    <Route path={'/home'} element={<Home/>}>
                        <Route path={'createCateQuiz'} element={<CreateCateQuiz/>}></Route>
                        <Route path={'createQuiz'} element={<CreateNewQuiz/>}></Route>
                        <Route path={'totalQuestion'} element={<TotalQuestion/>}></Route>
                        <Route path={'createCateQuestion'} element={<CreateCateQuestion/>}></Route>
                        <Route path={'showListStudent'} element={<ShowListStudent/>}></Route>
                        <Route path={'showListTeacher'} element={<ShowListTeacher/>}></Route>
                        <Route path={'userDetail/:id'} element={<UserDetail/>}></Route>
                        <Route path={'teacherDetail/:id'} element={<TeacherDetail/>}></Route>
                        <Route path={'findUserById/:id'} element={<UserProfile/>}></Route>
                        <Route path={'changeUserPasswordById/:id'} element={<ChangePassword/>}></Route>
                        <Route path={'showTeacherPending'} element={<ShowListTeacherPending/>}></Route>
                        <Route path={'detailTeacherPending/:id'} element={<DetailTeacherPending/>}></Route>
                        <Route path={'layoutManagerQuestion'} element={<LayoutManagerQuestion/>}></Route>
                        <Route path={'editQuestion'} element={<EditQuestion/>}></Route>
                        <Route path={'showListCateQuiz'} element={<ShowListCategoryQuiz/>}></Route>
                        <Route path={'updateCateQuiz/:id'} element={<UpdateCateQuiz/>}></Route>
                        <Route path={'showListCateQuestion'} element={<ShowListCateQuestion/>}></Route>
                        <Route path={'updateCateQuestion/:id'} element={<UpdateCateQuestion/>}></Route>
                    </Route>
                )
                }
            </Routes>
        </div>
    );
}

export default App;
