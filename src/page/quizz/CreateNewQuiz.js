import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useDispatch, useSelector} from "react-redux";
import {createQuestion, findAll} from "../../redux/service/QuestionService";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import QuestionDetail from "./QuestionDetail";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {TextField} from "@mui/material";
import {createQuiz} from "../../redux/service/QuizService";

const drawerWidth = 360;

export default function CreateNewQuiz() {
    const questions = useSelector((store) => {
        return store.questionStore.questions
    })
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findAll());

    }, [dispatch]);
    const [selectedQuestionContent, setSelectedQuestionContent] = React.useState([]);

    const handleAddQuestion = (question) => {
        setSelectedQuestionContent((prevContent) => [...prevContent, question]);
        const questionIds = selectedQuestionContent.map((q) => ({ id: q.id })); // Lấy danh sách các id
        formik.setFieldValue('questions', questionIds); // Cập nhật trường questions trong formik
    };
    const formik = useFormik({
        initialValues: {
            title: "abcdd123ádfqqưqweqđfa",
            time: 1000,
            timeCreate: "2023-12-17T18:20:48",
            description: "a",
            passScore: 50.0,
            status: 1,
            categoryQuiz: {
                id: 2
            },
            levelQuiz: {
                id: 1
            },
            user: {
                id: 1
            },
            questions: [],
        },
        onSubmit: async (values) => {
            console.log(values)
            await dispatch(createQuiz(values))
        },
    });
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawer
                    </Typography>
                </Toolbar>
            </AppBar>

            <form onSubmit={formik.handleSubmit}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField
                        name={"title"}
                        value={formik.values.title}
                    />
                    <TextField
                        name={"time"}
                        value={formik.values.time}
                    />
                    <TextField
                        name={"description"}
                        value={formik.values.description}
                    />
                    <TextField
                        name={"passScore"}
                        value={formik.values.passScore}
                    />
                </Box>
                <Button type="submit"
                        className={"h-10 w-40 bg-gray-50 mt-2 border-2 rounded-full hover:text-white hover:bg-slate-900"}>
                    Tạo bài thi
                </Button>

                <Box
                    component="main"
                    sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
                >
                    <Toolbar/>
                    {selectedQuestionContent.map((question, index) => (
                        <Typography key={index} paragraph>
                            <Typography className={"flex flex-wrap"}>
                                Câu {question.id}:<span dangerouslySetInnerHTML={{__html: question.content}}/>
                            </Typography>
                            {question.answers.map((answer, aIndex) => (
                                <Typography key={aIndex} paragraph className={"flex flex-wrap"}>
                                    {String.fromCharCode(65 + aIndex)}:
                                    <span dangerouslySetInnerHTML={{__html: answer.content}}/>
                                </Typography>
                            ))}
                        </Typography>
                    ))}
                </Box>
            </form>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="right"
            >
                <Toolbar/>
                <Divider/>

                <List>
                    {questions.map((question) => (
                        <ListItem key={question.id}>
                            <ListItemText>
                                <QuestionDetail question={question} handleAddQuestion={handleAddQuestion}/>
                                {/*<span dangerouslySetInnerHTML={{__html: question.content}} />*/}
                            </ListItemText>
                            <Button onClick={() => handleAddQuestion(question)}>thêm</Button>
                        </ListItem>

                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
