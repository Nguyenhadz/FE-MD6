import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useDispatch, useSelector} from "react-redux";
import {findByContent, findQuestionsByCategory} from "../../redux/service/QuestionService";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import QuestionDetail from "./QuestionDetail";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {alpha, FormControl, InputBase, InputLabel, Select, TextField} from "@mui/material";
import {createQuiz, findQuizById} from "../../redux/service/QuizService";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import {showAllCateQuestion} from "../../redux/service/CateQuestionService";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {toast} from "react-toastify";
import {showAllCategoryQuiz} from "../../redux/service/CateQuizService";
import {findAllLevelQuiz} from "../../redux/service/LevelQuizService";
import DetailQuiz from "./DetailQuiz";
import {findResultByQuiz} from "../../redux/service/ResultService";
import {store} from "../../redux/store/Store";

const drawerWidth = 360;

const EditQuiz = ({quizId}) => {
    const [quiz, setQuiz] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(findQuizById(quizId));
            setQuiz(store.getState().quizzes.quiz);
        };
        fetchData();
    }, [])

    const questions = useSelector((store) => {
        return store.questionStore.questions
    })
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    const categoryQuestions = useSelector((store) => {
        return store.cateQuestions.cateQuestions
    })
    const categoryQuizzes = useSelector((store) => {
        return store.cateQuiz.cateQuizzes
    })
    const levelQuizzes = useSelector((store) => {
        return store.levelQuizStore.levelQuiz
    })
    const [open, setOpen] = React.useState(false);
    const searchTermRef = React.useRef('');
    const [selectedField, setSelectedField] = React.useState(1);
    const [selectedQuestionContent, setSelectedQuestionContent] = React.useState([]);
    const dispatch = useDispatch();
    const [filteredQuestions, setFilteredQuestions] = React.useState([]);

    useEffect(() => {
        dispatch(showAllCateQuestion());
        dispatch(showAllCategoryQuiz());
        dispatch(findAllLevelQuiz());
    }, []);
    useEffect(() => {
        if (selectedField === 0) {
            setFilteredQuestions(questions); // Nếu selectedField là 0, hiển thị tất cả câu hỏi
        } else {
            dispatch(findQuestionsByCategory({id: selectedField}))
            const filtered = questions.filter(question => question.categoryQuestion.id === selectedField); // Lọc câu hỏi theo selectedField
            setFilteredQuestions(filtered);

        }
    }, [selectedField]);
    const handleAddQuestion = (question) => {
        const index = selectedQuestionContent.findIndex(q => q.id === question.id);
        if (index === -1) {
            setSelectedQuestionContent((prevContent) => [...prevContent, question]);
        } else {
            toast.error("Đã có câu này");
        }
    };
    const handleDeleteQuestion = (questionId) => {
        const index = selectedQuestionContent.findIndex((question) => question.id === questionId);
        if (index !== -1) {
            // Sử dụng `slice` để tạo mảng mới loại bỏ phần tử ở index
            const newContent = [...selectedQuestionContent.slice(0, index), ...selectedQuestionContent.slice(index + 1)];
            setSelectedQuestionContent(newContent);
        } else {
            toast.error("Câu hỏi không tồn tại");
        }
    };
    React.useEffect(() => {
        const questionIds = selectedQuestionContent.map((q) => ({id: q.id}));
        formik.setFieldValue('questions', questionIds);
    }, [selectedQuestionContent]);


    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '18ch'
            },
        },
    }));

    const handleSearch = async () => {
        await dispatch(findByContent(searchTermRef.current, filteredQuestions));

    };
    const handleChange = (event) => {
        setSelectedField(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const gradientColors = {
        primary: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        secondary: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        accent: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
        background: "linear-gradient(45deg, #9E9E9E 30%, #616161 90%)",
    };

    const theme = {
        palette: {
            primary: gradientColors.primary,
            secondary: gradientColors.secondary,
            accent: gradientColors.accent,
            background: gradientColors.background,
        },
    };

    const formik = useFormik({
        initialValues: {
            title: quiz?.title,
            time: quiz?.time,
            timeCreate: quiz?.time,
            description: quiz?.description,
            passScore: quiz?.passScore,
            status: quiz?.status,
            categoryQuiz: {
                id: quiz?.categoryQuiz.id
            },
            levelQuiz: {
                id: quiz?.levelQuiz.id
            },
            user: {
                id: quiz?.user.id
            },
            questions: quiz?.questions,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {

            await dispatch(createQuiz(values))
            await formik.resetForm()
        },
    });
    const handleUpdateQuiz = (data) => {
        console.log('123', data)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                flexDirection: 'column',
                overflow: 'scroll',
                padding: '0 16px',
            }}
        >
            <CssBaseline/>
            <Grid
                xs={10}>
                <form onSubmit={formik.handleSubmit}
                      sx={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: "full"
                      }}>
                    <Box
                        className='bg-fuchsia-100'
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(25ch, 1fr))",
                            gap: 1,
                            padding: 1,
                            overflow: "auto",
                            height: "100%",
                            // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            border: 'rounded'
                        }}
                    >
                        <Grid item xs={12} sx={{justifyContent: 'center'}}>
                            <Box>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth={true}
                                        id="standard-basic"
                                        label="Tên bài thi"
                                        variant="standard"
                                        name={"title"}
                                        value={formik.values.title}
                                        onChange={(e) => formik.setFieldValue('title', e.target.value)}
                                    />
                                </Grid>
                            </Box>
                            <Box>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth={true}
                                        id="standard-basic"
                                        label="Điểm đạt yêu cầu"
                                        variant="standard"
                                        name={"passScore"}
                                        value={formik.values.passScore}
                                        onChange={(e) => formik.setFieldValue('passScore', e.target.value)} // Thêm dòng này
                                    />
                                </Grid>
                            </Box>
                            <Box>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth={true}
                                        id="standard-basic"
                                        label="Thời gian thi"
                                        variant="standard"
                                        name={"description"}
                                        value={formik.values.time}
                                        onChange={(e) => formik.setFieldValue('time', e.target.value)} // Thêm dòng này
                                    />
                                </Grid>
                            </Box>
                            <Box>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth={true}
                                        id="standard-basic"
                                        label="Mô tả"
                                        variant="standard"
                                        name={"description"}
                                        value={formik.values.description}
                                        onChange={(e) => formik.setFieldValue('description', e.target.value)} // Thêm dòng này
                                    />
                                </Grid>
                            </Box>
                            <Box className='flex justify-center'>
                                <Grid item xs={4}>
                                    <FormControl sx={{m: 1, minWidth: 160}}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Thể loại</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            onChange={handleChange}
                                            autoWidth
                                            label="Thể loại"
                                        >
                                            {categoryQuizzes.map((cateQuiz, index) =>
                                                (
                                                    <MenuItem value={index}>{cateQuiz.name}</MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl sx={{m: 1, minWidth: 160}}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Mức độ</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            onChange={handleChange}
                                            autoWidth
                                            label="Mức độ"
                                        >
                                            {levelQuizzes.map((levelQuiz, index) =>
                                                (
                                                    <MenuItem value={index}>{levelQuiz.name}</MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Box>
                        </Grid>
                    </Box>

                    <Box
                        component="main"
                        className='bg-fuchsia-100'
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            overflow: 'auto',
                        }}
                    >

                        <Toolbar/>
                        {selectedQuestionContent.map((question, index) => (
                            <Box
                                className={"m-14"}>
                                <Grid
                                    bgcolor='linear-gradient(45deg, #9E9E9E 30%, #616161 90%)"'
                                    container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="stretch"
                                    border="solid 1px round 50%"
                                    spacing={8}
                                    rowSpacing={3}
                                    columnSpacing={{xs: 1, sm: 2, md: 3}

                                    }>
                                    <Grid className={"flex flex-col"} item xs={12}>
                                        <Grid item xs={10}>

                                            <Item
                                                style={{
                                                    border: "solid 1px " + gradientColors.primary,
                                                    textAlign: "left",
                                                    display: 'flex'
                                                }}>
                                                <span>Câu {index}: </span>
                                                <span dangerouslySetInnerHTML={{__html: question.content}}></span>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                style={{
                                                    border: "solid 1px " + gradientColors.primary,
                                                }}
                                                onClick={() => handleDeleteQuestion(question.id)}>
                                                X
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {question.answers.map((answer, index) => (
                                        <React.Fragment key={index}>
                                            <Grid item xs={6}>
                                                <Item
                                                    style={{backgroundColor: answer.status === 1 ? gradientColors.accent : gradientColors.background}}>{`Đáp án ${index + 1}`}</Item>
                                            </Grid>
                                            {(index + 1) % 2 === 0 && (
                                                <Grid item xs={12}>
                                                    <Divider/>
                                                </Grid>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Box>
                        ))}
                        <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={12}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: "solid 1px",
                                width: '15%',
                                height: '70%'
                            }}>
                                <Button
                                    type="submit"
                                    sx={{background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"}}
                                    className={"h-10 w-40 mt-2 border- rounded-full hover:text-white hover:bg- justify-center"}

                                onClick={handleUpdateQuiz(formik.values)}>
                                    Cập nhật
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </form>
            </Grid>
            <Grid xs={3}>
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
                    anchor="right">
                    <Toolbar/>
                    <Divider/>
                    <List>
                        <Box className={"flex flex-col justify-center"}>

                            <FormControl sx={{m: 1, minWidth: 180}}>
                                <InputLabel id="demo-controlled-open-select-label">Tìm câu hỏi theo</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={selectedField}
                                    label="Tìm câu hỏi theo"
                                    onChange={handleChange}
                                >
                                    <MenuItem key={0} value={0}>Tất cả</MenuItem>
                                    {categoryQuestions.map((category, index) => (
                                        <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box className={"flex"}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Nội dung tìm kiếm…"
                                        inputProps={{'aria-label': 'search'}}
                                        onChange={(event) => (searchTermRef.current = event.target.value)}

                                    />
                                </Search>
                                <Button onClick={handleSearch}>Tìm kiếm</Button>
                            </Box>

                        </Box>
                        {questions.map((question) => (
                            <ListItem key={question.id}>
                                <ListItemText>
                                    <QuestionDetail question={question} buttonLabel={
                                        <Typography className={"flex "}>
                                            Câu : {question.id}
                                            <span dangerouslySetInnerHTML={{__html: question.content}}/>
                                        </Typography>
                                    }/>

                                </ListItemText>
                                <Button onClick={() => handleAddQuestion(question)}
                                        onChange={(e) => formik.setFieldValue('questions', e.target.value)}>
                                    Thêm
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Grid>
        </Box>
    );
}
export default EditQuiz;
