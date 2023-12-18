import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {deleteQuestions, findAll} from "../../redux/service/QuestionService";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Pagination, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import MyQuestionDetail from "./MyQuestionDetail";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";


export default function ListQuestion() {
    useEffect(() => {
        dispatch(findAll())
    }, [])
    const parser = new DOMParser();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const user = useSelector((store) => {
        return store.users.currentUser
    })
    const questions = useSelector((store) => {
        return store.questionStore.questions
    });

    const currentUserQuestions = questions
        ? Object.values(questions).filter(
            (question) => question.user?.id === user?.id
        )
        : [];


    const filteredQuestions = Array.from(searchTerm
        ? currentUserQuestions.filter((question, index) =>
            question.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : currentUserQuestions);

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const totalQuestions = filteredQuestions.length;

    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const getTotalQuestionCountBeforeCurrentPage = () => {
        if (currentPage === 1) {
            return 0;
        }
        return questionsPerPage * (currentPage - 1);
    };
    const getQuestionNumber = (index) => {
        return getTotalQuestionCountBeforeCurrentPage() + index + 1;
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            textAlign: 'center',
            margin: 'auto',
            backgroundColor: 'white',
            borderRadius: '30px',
            "& .MuiDataGrid-root": {
                border: 'none',
                color: 'black',
                fontSize: '16px',
                padding: '20px',
            },
            boxShadow: '30px 30px 30px 30px rgba(0, 0, 0, 0.2)'
        }}>
            <div className={"w-11/12 mt-0 justify-content-lg-end shadow-md from-blue-800"}
                 style={{marginTop: "0 !important"}}>
                {currentQuestions.map((question, index) => {
                    if (question.user?.id !== user?.id) {
                        return null; // Nếu user.id không khớp, bỏ qua câu hỏi này
                    }
                    let letterIndex = 0; // Reset index for each question
                    const questionNumber = getQuestionNumber(index);

                    return (
                        <Accordion className={"bg-emerald-300"} key={question?.id}>
                            <AccordionSummary
                                className={"bg-green-300"}
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls={`panel${question?.id}-content`}
                                id={`panel${question?.id}-header`}
                            >
                                <div className={"flex justify-content-lg-start rounded w-full h-full"}>
                                    <div>
                                        <Typography className={"font-sans font-bold hover:font-serif"}>
                                            <Typography>{"Câu " + questionNumber}
                                                <span dangerouslySetInnerHTML={{__html: question.content}}/>
                                            </Typography>
                                        </Typography>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className={"bg-neutral-200"}>
                                <Box sx={{ width: "100%"}}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        {question.answers.map((answer, index) => (
                                            <React.Fragment key={index} className={"flex justify-around"}>
                                                <Grid item xs={4} className={"m-auto"}
                                                >
                                                    <Item
                                                        style={{
                                                            backgroundColor: answer.status === 1 ? "green" : "inherit"
                                                        }}
                                                    >{`Đáp án ${index + 1}`}</Item>
                                                </Grid>
                                                {(index + 1) % 2 === 0 && (
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                )}
                                            </React.Fragment>
                                        ))}
                                        <Grid item xs={12}>
                                            <div className={"flex justify-center"}>
                                                <Typography className={"mr-0 h-1"}>
                                                    {question && (
                                                        <Button className={"btn btn-outline-warning bg-amber-100 h-10"}>
                                                            <MyQuestionDetail question={question} />
                                                        </Button>
                                                    )}
                                                </Typography>
                                                <Typography className={"mr-0"}>
                                                    {question && (
                                                        <Button
                                                            className={"btn btn-outline-warning bg-amber-100 h-10"}
                                                            onClick={() => {
                                                                dispatch(deleteQuestions(question.id));
                                                            }}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    )}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
                <Stack spacing={2} sx={{
                    '& .MuiPaginationItem-root': {
                        fontWeight: 'bold'
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: 'blue', // Màu nền khi trang được chọn
                        color: 'white', // Màu chữ khi trang được chọn
                    },
                    '& .MuiPaginationItem-root:hover': {
                        backgroundColor: 'lightblue', // Màu nền khi di chuột qua
                    }
                }}>
                    <Pagination
                        count={Math.ceil(totalQuestions / questionsPerPage)}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        page={currentPage}
                        onChange={(event, page) => paginate(page)}
                    />
                </Stack>
            </div>
        </Box>
    );
}