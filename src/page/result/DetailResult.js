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
import {findResultById, findResultByQuiz} from "../../redux/service/ResultService";
import {toast} from "react-toastify";
import {store} from "../../redux/store/Store";
import {useNavigate, useParams} from "react-router-dom";

const DetailResult = () => {
    const {idResult} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(findResultById(idResult));

        };
        fetchData().then(r => {});
    }, [])
    const result = useSelector((store) => {
        return store.resultStore.currentResult

    });
    console.log("123", result)
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    function checkIdAnswer(id) {
        for (let i = 0; i < result.answers.length; i++) {
            if (result.answers[i].id === id) {
                return true;
            }
        }
        return false;
    }
    const dateEnd = new Date(result.endTime);

    const day = dateEnd.getDate();
    const month = dateEnd.getMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1
    const year = dateEnd.getFullYear();

    return (
        <div className={"ml-8 text-xl"}>
            <div className="flex items-center justify-between mb-3">
                    <b>Tên bài thi: &nbsp;
                        <span dangerouslySetInnerHTML={{__html: result.quiz?.title}}></span>
                    </b>
            </div>
            <div className={"mb-3"}><b>Tổng điểm:</b> &nbsp;<span dangerouslySetInnerHTML={{__html: result.totalScore}}></span>
            </div>
            <div className={"mb-3"}><b>Số câu đúng:</b> &nbsp; {result.numberTrue}</div>
            <div className={"mb-3"}><b>Ngày thi:</b> &nbsp; {day<10 ? `0${day}` : day} - {month<10 ? `0${month}` : month} - {year}</div>
            <div className={"mb-3"}><b>Người thi:</b> &nbsp;<span dangerouslySetInnerHTML={{__html: result.user?.name}}></span></div>
            {result.quiz?.questions.map((question, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                    >
                        <Typography sx={{fontSize: "20px"}}>Câu hỏi {index + 1}: &nbsp;<span
                            dangerouslySetInnerHTML={{__html: question.content}}></span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Box sx={{width: "100%"}}>
                                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                    {question.answers.map((answer, answerIndex) => (
                                        <Grid item xs={6} key={answerIndex} >
                                            <Item sx={{fontSize: "20px"}}> {checkIdAnswer(answer.id) && (answer.status !== 1) && <span>&#10007;</span>} {checkIdAnswer(answer.id) && (answer.status === 1) && <span>&#10003;</span>}&nbsp;<span dangerouslySetInnerHTML={{__html: answer.content}}
                                                        style={{color: answer.status === 1 ? 'blue' : 'black'}}></span></Item>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

        </div>
    );
};
export default DetailResult;
