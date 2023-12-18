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
import {findByContent, findQuestionsByCategory} from "../../redux/service/QuestionService";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import QuestionDetail from "./QuestionDetail";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {alpha, FormControl, InputBase, InputLabel, Select, TextField} from "@mui/material";
import {createQuiz} from "../../redux/service/QuizService";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import {showAllCateQuestion} from "../../redux/service/CateQuestionService";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const drawerWidth = 360;

export default function CreateNewQuiz() {
    const questions = useSelector((store) => {
        return store.questionStore.questions
    })
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    const categoryQuestions = useSelector((store) => {
        return store.cateQuestions.cateQuestions
    })
    const [open, setOpen] = React.useState(false);
    const searchTermRef = React.useRef('');
    const [selectedField, setSelectedField] = React.useState(1);
    const [selectedQuestionContent, setSelectedQuestionContent] = React.useState([]);
    const dispatch = useDispatch();
    const [filteredQuestions, setFilteredQuestions] = React.useState([]);

    useEffect(() => {
        dispatch(showAllCateQuestion());
    }, []);
    useEffect(() => {
        if (selectedField === 0) {
            setFilteredQuestions(questions); // Nếu selectedField là 0, hiển thị tất cả câu hỏi
        } else {
            dispatch(findQuestionsByCategory({id: selectedField}))
            console.log(questions)
            const filtered = questions.filter(question => question.categoryQuestion.id === selectedField); // Lọc câu hỏi theo selectedField
            setFilteredQuestions(filtered);

        }
    }, [selectedField]);
    const handleAddQuestion = (question) => {
        setSelectedQuestionContent((prevContent) => [...prevContent, question]);
    };
    React.useEffect(() => {
        const questionIds = selectedQuestionContent.map((q) => ({id: q.id}));
        formik.setFieldValue('questions', questionIds);
    }, [selectedQuestionContent]);


    const formik = useFormik({
        initialValues: {
            title: "",
            time: "",
            timeCreate: new Date(),
            description: "",
            passScore: "",
            status: 1,
            categoryQuiz: {
                id: 2
            },
            levelQuiz: {
                id: 1
            },
            user: {
                id: currentUser.id
            },
            questions: [selectedQuestionContent],
        },
        onSubmit: async (values) => {

            await dispatch(createQuiz(values))
            await formik.resetForm()
        },
    });
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
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: "1000px",
                minHeight: '100vh',
                maxHeight: '100vh', // Thêm thuộc tính này
                flexDirection: 'column',
                overflow: 'scroll', // Thay đổi giá trị này
                padding: '0 16px',
            }}
        >
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

            <form onSubmit={formik.handleSubmit} className={"flex flex-col "}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                >

                    <TextField
                        id="standard-basic"
                        label="Tên bài thi"
                        variant="standard"
                        name={"title"}
                        value={formik.values.title}
                        onChange={(e) => formik.setFieldValue('title', e.target.value)} // Thêm dòng này
                    />
                    <TextField
                        name={"time"}
                        hidden={true}
                        value={formik.values.time}
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="standard-basic"
                        label="Điểm bài thi"
                        variant="standard"
                        name={"passScore"}
                        value={formik.values.passScore}
                        onChange={(e) => formik.setFieldValue('passScore', e.target.value)} // Thêm dòng này
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        name={"description"}
                        id="standard-basic" label="Mô tả" variant="standard"
                        value={formik.values.description}
                        onChange={(e) => formik.setFieldValue('description', e.target.value)}
                    />
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 3,
                        overflow: 'auto', // thêm dòng này
                    }}
                >

                    <Toolbar/>
                    {selectedQuestionContent.map((question, index) => (
                        <Box sx={{width: "100%"}}>
                            <Grid container
                                  direction="row"
                                  justifyContent="space-around"
                                  alignItems="stretch"
                                  spacing={8}
                                  rowSpacing={3}
                                  columnSpacing={{xs: 1, sm: 2, md: 3}
                                  }>
                                <Grid item xs={12}>
                                    <Item style={{border:"solid 1px blue", background:"yellow"}}
                                          dangerouslySetInnerHTML={{__html: question.content}}></Item>
                                </Grid>
                                {question.answers.map((answer, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={6}>
                                            <Item
                                                style={{backgroundColor: answer.status === 1 ? 'green' : 'inherit'}}>{`Đáp án ${index + 1}`}</Item>
                                        </Grid>
                                        {/* Kiểm tra nếu index là số chẵn (2n) thì tạo một hàng mới */}
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
                </Box>
                <Button type="submit"
                        className={"h-10 w-40 bg-gray-50 mt-2 border-2 rounded-full hover:text-white hover:bg-slate-900"}>
                    Tạo bài thi
                </Button>
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
                                    onChange={(e) => formik.setFieldValue('questions', e.target.value)}
                            >Thêm</Button>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
