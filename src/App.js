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
import ShowListCategoryQuiz from "./page/catequiz/ShowListCategoryQuiz";
import CreateCateQuestion from "./page/catequestion/CreateCateQuestion";
import UpdateCateQuiz from "./page/catequiz/UpdateCateQuiz";
import EditQuestion from "./page/question/EditQuestion";
import ShowListCateQuestion from "./page/catequestion/ShowListCateQuestion";
import UpdateCateQuestion from "./page/catequestion/UpdateCateQuestion";
import LoginWithGoogle from "./component/LoginWithGoogle";
import UserWithGoogle from "./component/UserWithGoogle";
import ChangePassword from "./page/user/UserPassword";
import TotalQuestion from "./page/question/TotalQuestion";
import MenuLogin from "./page/login/MenuLogin";
import LoginWithGmailForm from "./page/login/LoginWithGmailForm";
import RegisterForm from "./page/login/RegisterForm";
import ForgotForm from "./page/login/ForgotForm";
import Home from "./component/Home";
import Login from "./page/login/Login";
import CreateNewQuiz from "./page/quizz/CreateNewQuiz";
import DoingQuiz from "./page/quizz/DoingQuiz";
import ResultAfterTest from "./page/result/ResultAfterTest";
import EditQuiz from "./page/quizz/EditQuiz";
import ShowAllQuiz from "./page/quizz/ShowAllQuiz";
import ListQuizCard from "./component/ListQuizCard";
import DoQuiz from "./page/quizz/StepList";
import TextMobileStepper from "./page/quizz/TextMobileStepper";
import ColorTabs from "./page/user/TabProfile";
import ShowListQuizByUser from "./page/quizz/ShowListQuizByUser";
import ListQuestion from "./page/question/ListQuestion";
import CreateQuestionOneAnswer from "./page/question/CreateQuestion";
import ShowAllResultByQuiz from "./page/result/ShowAllResultByQuiz";
import DetailResult from "./page/result/DetailResult";


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
                    <Route path={'/loginWithGoogle'} element={<LoginWithGoogle/>}></Route>
                    <Route path={'/userWithGoogle'} element={<UserWithGoogle/>}></Route>
                </Route>
                Object.keys(user).length === 0 ?
                <Route path={'*'} element={<Navigate to="/"/>}>
                    </Route>
                    : user && (
                    <Route path={'/home'} element={<Home/>}>
                        <Route path={'/home'} element={<ListQuizCard/>}></Route>
                        <Route path={'/home/createCateQuiz'} element={<CreateCateQuiz/>}></Route>
                        <Route path={'/home/createQuiz'} element={<CreateNewQuiz/>}></Route>
                        <Route path={'/home/totalQuestion'} element={<TotalQuestion/>}></Route>
                        <Route path={'/home/createCateQuestion'} element={<CreateCateQuestion/>}></Route>
                        <Route path={'/home/showListStudent'} element={<ShowListStudent/>}></Route>
                        <Route path={'/home/showListTeacher'} element={<ShowListTeacher/>}></Route>
                        <Route path={'/home/userDetail/:id'} element={<UserDetail/>}></Route>
                        <Route path={'/home/teacherDetail/:id'} element={<TeacherDetail/>}></Route>
                        <Route path={'/home/findUserById/:id'} element={<ColorTabs/>}></Route>
                        <Route path={'/home/changeUserPasswordById/:id'} element={<ChangePassword/>}></Route>
                        <Route path={'/home/showTeacherPending'} element={<ShowListTeacherPending/>}></Route>
                        <Route path={'/home/detailTeacherPending/:id'} element={<DetailTeacherPending/>}></Route>
                        <Route path={'/home/layoutManagerQuestion'} element={<LayoutManagerQuestion/>}>
                            <Route path={'/home/layoutManagerQuestion/editQuiz/:idQuiz'} element={<EditQuiz/>}></Route>
                            <Route path={'/home/layoutManagerQuestion'} element={<ShowListQuizByUser/>}></Route>
                            <Route path={'/home/layoutManagerQuestion/showListQuestion'} element={<ListQuestion/>}></Route>
                            <Route path={'/home/layoutManagerQuestion/createQuestion'} element={<CreateQuestionOneAnswer/>}></Route>
                            <Route path={'/home/layoutManagerQuestion/createQuestion'} element={<CreateQuestionOneAnswer/>}></Route>
                            <Route path={'/home/layoutManagerQuestion/createNewQuiz'} element={<CreateNewQuiz/>}></Route>
                            <Route path={'/home/layoutManagerQuestion/showAllResultByQuiz/:idQuiz'} element={<ShowAllResultByQuiz/>}></Route>
                            <Route path={'/home/layoutManagerQuestion/resultDetails/:idResult'} element={<DetailResult/>}></Route>
                        </Route>
                        <Route path={'/home/editQuestion'} element={<EditQuestion/>}></Route>
                        <Route path={'/home/showListCateQuiz'} element={<ShowListCategoryQuiz/>}></Route>
                        <Route path={'/home/updateCateQuiz/:id'} element={<UpdateCateQuiz/>}></Route>
                        <Route path={'/home/showListCateQuestion'} element={<ShowListCateQuestion/>}></Route>
                        <Route path={'/home/updateCateQuestion/:id'} element={<UpdateCateQuestion/>}></Route>
                        <Route path={'/home/doQuiz/:idQuiz'} element={<DoingQuiz/>}></Route>
                        <Route path={'/home/result'} element={<ResultAfterTest/>}></Route>
                        <Route path={'/home/showAllQuiz'} element={<ShowAllQuiz/>}></Route>
                        <Route path={'/home/doingQuiz/:idQuiz'} element={<TextMobileStepper/>}/>
                        <Route path={'/home/createQuiz'} element={<CreateNewQuiz/>}></Route>
                        <Route path={'/home/listQuiz'} element={<ListQuizCard/>}></Route>

                     </Route>
                 )
             </Routes>
        </div>
    );
}

export default App;
