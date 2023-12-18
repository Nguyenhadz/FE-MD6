import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findQuizById} from "../../redux/service/QuizService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {findResultByQuiz} from "../../redux/service/ResultService";
import {toast} from "react-toastify";
import {store} from "../../redux/store/Store";
import {useNavigate} from "react-router-dom";

const DetailQuizForUser = ({quizId}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [results, setResults] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(findQuizById(quizId));
            await dispatch(findResultByQuiz(quizId));
            setResults(store.getState().resultStore.results);
        };
        fetchData();
    }, [])
    const quiz = useSelector((store) => {
        return store.quizzes.quiz
    });
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const second = quiz.time % 60;
    const minute = Math.floor(quiz.time / 60);

    const handleEdit = () => {

        if (results?.length !== 0) {
            console.log(results)
            toast.success("Không thể sửa bài thi đã có người thi", {})
        } else {
            console.log("ok")
        }
    };

    return (
        <div className={"ml-8"}>
            <div className="flex items-center justify-between mb-3">
                <div>
                    <b>Tên bài thi: &nbsp;
                        <span dangerouslySetInnerHTML={{__html: quiz.title}}></span>
                    </b>
                </div>
                <div className="flex items-center">
                    <div className="ml-auto">
                        <button type="submit"
                                className={"h-6 w-40 bg-gray-50 mt-2 border-2 rounded-full hover:hover:bg-blue-50"}
                                onClick={ async () => {
                                    await dispatch(findQuizById(quiz.id))
                                    await navigate("/home/doQuiz/" + quiz.id)
                                }}
                        >
                            Làm bài thi
                        </button>
                    </div>
                </div>
            </div>
            <div className={"mb-3"}>Mô tả: &nbsp;<span dangerouslySetInnerHTML={{__html: quiz.description}}></span>
            </div>
            <div className={"mb-3"}>Người tạo: &nbsp; {quiz.user?.name}</div>
            <div className={"mb-3"}>Số lượng câu hỏi: &nbsp; {quiz.questions?.length}</div>
            <div className={"flex mb-3"}>Thể loại: &nbsp; <span
                dangerouslySetInnerHTML={{__html: quiz.categoryQuiz?.name}}></span></div>
            <div className={"mb-3"}>Mức độ: &nbsp; {quiz.levelQuiz?.name}</div>
            <div className={"mb-3"}>Điểm đạt: &nbsp; {quiz.passScore}</div>
            <div className={"mb-3"}>Thời gian thi: &nbsp; {minute} &nbsp;phút, {second} &nbsp;giây</div>
        </div>
    );
};
export default DetailQuizForUser;
