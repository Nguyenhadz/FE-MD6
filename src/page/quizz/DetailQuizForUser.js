import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteQuiz, findAllQuiz, findQuizById} from "../../redux/service/QuizService";
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
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    console.log(currentUser.roles[0])
    const [results, setResults] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(findQuizById(quizId));
            await dispatch(findResultByQuiz(quizId));
            setResults(store.getState().resultStore.results);
        };
        fetchData();
    }, [quizId, dispatch])
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

    const handleDelete = () => {

        if (results?.length !== 0) {
            console.log(results)
            toast("Không thể xoá bài thi đã có người thi")
        } else {
            dispatch(deleteQuiz(quizId))
            toast("Xoá thành công")
            navigate("/home/showAllQuiz")
        }
    };

    return (
        <div className={'text-xl mt-10 flex flex-col justify-center'}>
            <div className={"ml-7"}>
                <div className={'flex justify-between'}>
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <b>Tên bài thi: &nbsp;
                                    <span dangerouslySetInnerHTML={{__html: quiz.title}}></span>
                                </b>
                            </div>
                        </div>
                        <div className={"mb-3"}><span className={'font-bold'}> Mô tả: &nbsp;</span> <span dangerouslySetInnerHTML={{__html: quiz.description}}></span>
                        </div>
                        <div className={"mb-3"}><span className={'font-bold'}> Người tạo: &nbsp;</span> {quiz.user?.name}</div>
                        <div className={"mb-3"}><span className={'font-bold'}> Số lượng câu hỏi: &nbsp;</span> {quiz.questions?.length}</div>

                        <div className={"mb-3"}><span className={'font-bold'}> Mức độ: &nbsp;</span> {quiz.levelQuiz?.name}</div>
                        <div className={"mb-3"}><span className={'font-bold'}> Điểm đạt: &nbsp;</span> {quiz.passScore}</div>
                        <div className={"mb-3"}><span className={'font-bold'}> Thời gian thi: &nbsp;</span> {minute} &nbsp;phút, {second} &nbsp;giây</div>

                    </div>
                    <div className={'mr-10'}>
                        <img src={quiz.image} alt={"fault"} style={{ width: '400px', height: '300px' }}/>
                        <div className={"flex mt-3 border-solid border-2 rounded border-orange-200"}><span className={'font-bold ml-3'}> Thể loại: &nbsp;</span> <span
                            dangerouslySetInnerHTML={{__html: quiz.categoryQuiz?.name}}></span></div>
                    </div>
                </div>


                {((currentUser.roles[0].authority === "TEACHER") || (currentUser.roles[0].name === "TEACHER")) &&
                    (<div className={'mt-10'}>
                        {/*<div className={"mb-3"}>Câu hỏi:</div>*/}
                        {quiz.questions?.map((question, index) => (
                            <Accordion key={index}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls={`panel${index + 1}-content`}
                                    id={`panel${index + 1}-header`}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '18px',
                                            fontWeight: 'medium',
                                        }}
                                    >Câu hỏi {index + 1}: &nbsp;<span

                                        dangerouslySetInnerHTML={{__html: question.content}}></span></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <Box sx={{width: "100%"}}>
                                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                                {question.answers.map((answer, answerIndex) => (
                                                    <Grid item xs={6} key={answerIndex}
                                                    >
                                                        <Item
                                                        sx={{
                                                            height:'100%',
                                                            backgroundColor: answer.status === 1 ? '#99FFFF' : 'white',
                                                            fontWeight: answer.status === 1 ? 'bold' : '',
                                                            textAlign: 'left',
                                                            fontSize: '18px'
                                                        }}
                                                        >
                                                            <span dangerouslySetInnerHTML={{__html: answer.content}}
                                                                    ></span></Item>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>)}
            </div>
            <div className="ml-96 flex">
                <div className="font-bold text-xl ml-8">
                    <button type="submit"
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10  mx-auto "}
                            onClick={ async () => {
                                await dispatch(findQuizById(quiz.id))
                                await navigate("/home/doingQuiz/" + quiz.id)
                            }}
                    >
                        Làm bài thi
                    </button>
                </div>
                <div className="font-bold text-xl ml-8 mb-10">
                    <button type="submit"
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10  mx-auto"}
                            onClick={() => {
                                const toast1Id = toast.warning(
                                    <>
                                        <div>
                                            <p>Bạn có chắc chắn muốn xóa?</p>
                                            <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit"
                                                    style={{margin: '20px'}} onClick={() => {
                                                handleDelete();
                                                toast.dismiss(toast1Id);
                                            }}>Xác nhận
                                            </button>
                                            <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit"
                                                    style={{margin: '20px'}} onClick={() => toast.dismiss()}>Hủy bỏ
                                            </button>
                                        </div>
                                    </>,
                                    {
                                        position: 'top-center',
                                        autoClose: false,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        closeButton: false,
                                    }
                                );
                            }}
                    >
                        Xoá bài thi
                    </button>
                </div>
            </div>
        </div>

    );
};
export default DetailQuizForUser;
