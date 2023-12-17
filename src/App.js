import './App.css';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import {Route, Routes} from "react-router-dom";
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
import CreateQuiz from "./page/quizz/CreateQuiz";
import Login from "./page/login/Login";
import SidebarQuiz from "./page/quizz/SidebarQuiz";
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
                {/*{user != null ?*/}
                    <Route path={'/home'} element={<Home/>}>
                        <Route path={'/home/createCateQuiz'} element={<CreateCateQuiz/>}></Route>
                        <Route path={'/home/createQuiz'} element={<CreateNewQuiz/>}></Route>
                        <Route path={'/home/totalQuestion'} element={<TotalQuestion/>}></Route>
                        <Route path={'/home/createCateQuestion'} element={<CreateCateQuestion/>}></Route>
                        <Route path={'/home/showListStudent'} element={<ShowListStudent/>}></Route>
                        <Route path={'/home/showListTeacher'} element={<ShowListTeacher/>}></Route>
                        <Route path={'/home/userDetail/:id'} element={<UserDetail/>}></Route>
                        <Route path={'/home/teacherDetail/:id'} element={<TeacherDetail/>}></Route>
                        <Route path={'/home/findUserById/:id'} element={<UserProfile/>}></Route>
                        <Route path={'/home/changeUserPasswordById/:id'} element={<ChangePassword/>}></Route>
                        <Route path={'/home/showTeacherPending'} element={<ShowListTeacherPending/>}></Route>
                        <Route path={'/home/detailTeacherPending/:id'} element={<DetailTeacherPending/>}></Route>
                        <Route path={'/home/layoutManagerQuestion'} element={<LayoutManagerQuestion/>}>
                            <Route path={'listQuestion'} element={<ListQuestion/>}></Route>
                            <Route path={'OneAnswer'} element={<CreateQuestionOneAnswer/>}/>
                            <Route path={'TrueFalse'} element={<CreateQuestionTrueFalse/>}/>
                            <Route path={'editQuestion/:id'} element={<EditQuestion/>}></Route>
                        </Route>
                        <Route path={'/home/showListCateQuiz'} element={<ShowListCategoryQuiz/>}></Route>
                        <Route path={'/home/updateCateQuiz/:id'} element={<UpdateCateQuiz/>}></Route>
                        <Route path={'/home/showListCateQuestion'} element={<ShowListCateQuestion/>}></Route>
                        <Route path={'/home/updateCateQuestion/:id'} element={<UpdateCateQuestion/>}></Route>
                    </Route>
                    {/*:*/}
                    {/*<Route path={'*'} element={<home/>}>*/}
                    {/*    <Route path={'*'} element={<MenuLogin/>}></Route>*/}
                    {/*</Route>*/}
                {/*}*/}
            </Routes>
        </div>
    );
}

export default App;
