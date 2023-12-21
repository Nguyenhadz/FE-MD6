import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {deleteQuestions, findAll} from "../../redux/service/QuestionService";
import {Pagination, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import MyQuestionDetail from "./MyQuestionDetail";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2'
import {toast} from "react-toastify";


export default function ListQuestion() {
    useEffect(() => {
        dispatch(findAll())
    }, [])
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
    const Item = styled(Paper)(({theme}) => ({
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
            <div className={"w-100% mt-0 justify-content-lg-end shadow-md from-blue-800 border-none"}
                 style={{marginTop: "0 !important"}}>
                {currentQuestions.map((question, index) => {
                    if (question.user?.id !== user?.id) {
                        return null;
                    }
                    const questionNumber = getQuestionNumber(index);

                    return (
                        <Accordion
                            key={question?.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls={`panel${question?.id}-content`}
                                id={`panel${question?.id}-header`}
                            >
                                <div className={"flex justify-content-lg-start rounded w-full h-full"}>
                                    <div>
                                        <Typography
                                            className={"font-sans font-bold hover:font-serif flex items-center"}>
                                            <span style={{
                                                fontWeight: "bold"
                                            }}
                                                  className={'text-l'}>{"Câu " + questionNumber}:</span>
                                            <span
                                                className={'text-l ml-2'}
                                                dangerouslySetInnerHTML={{__html: question.content}}/>
                                        </Typography>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{width: "100%"}}>
                                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                        {question.answers.map((answer, index) => (
                                            <React.Fragment key={index} className={"flex justify-around"}>
                                                <Grid item xs={3} className={"m-auto"}
                                                >
                                                    <Item>
                                                        <h2
                                                            style={{
                                                                color: answer.status === 1 ? "blue" : "inherit",
                                                                fontWeight: answer.status === 1 ? "bolder" : "inherit"

                                                            }}
                                                            className={'text-l font-sans'}
                                                            dangerouslySetInnerHTML={{__html: answer.content}}></h2>
                                                    </Item>
                                                </Grid>
                                            </React.Fragment>
                                        ))}

                                    </Grid>
                                    <div className={"flex flex-auto justify-center"}>
                                        <Grid xs={0}>
                                            <Typography className={"mr-0"}>
                                                {question && (
                                                    <IconButton>
                                                        <MyQuestionDetail question={question}/>
                                                        <DeleteIcon onClick={() => {
                                                            Swal.fire({
                                                                title: 'Bạn chắc chắn muốn xóa chứ?',
                                                                text: "Bạn sẽ không thể lấy lại câu hỏi sau khi xóa!",
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Xóa!',
                                                                cancelButtonText: 'Quay lại'
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    dispatch(deleteQuestions(question.id)).then(
                                                                        toast.success("Xóa câu hỏi thành công!", {})
                                                                    )
                                                                        .catch((error) => {
                                                                            toast.error("Không thể xóa câu hỏi này!", {})
                                                                        });
                                                                }
                                                            });
                                                        }}
                                                        >
                                                        </DeleteIcon>
                                                    </IconButton>
                                                )}
                                            </Typography>
                                        </Grid>
                                    </div>
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