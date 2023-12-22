import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useDispatch, useSelector} from "react-redux";
import {findAll, findQuestionsByCategory} from "../../redux/service/QuestionService";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import QuestionDetail from "./QuestionDetail";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {
    alpha,
    Card,
    CardActionArea,
    CardMedia,
    FormControl,
    InputBase,
    InputLabel,
    Select, Stack, SwipeableDrawer,
    TextField
} from "@mui/material";
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
import {Add, Clear} from "@mui/icons-material";
import dayjs from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from "@mui/x-date-pickers";
import {useNavigate, useParams} from "react-router-dom";
import * as Yup from "yup";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/FireBase";
import {v4} from "uuid";

const drawerWidth = 320;

const EditQuiz = () => {
    const {idQuiz} = useParams();
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
    const quiz = useSelector((state) => {
        return state.quizzes.quiz;
    })
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const searchTermRef = useRef(""); // Initialize searchTermRef as a ref object
    const [selectedFieldSearch, setSelectedFieldSearch] = React.useState(0);
    const [selectedQuestionContent, setSelectedQuestionContent] = React.useState([]);
    const dispatch = useDispatch();
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [value, setValue] = React.useState(dayjs().set('hour', Math.floor(quiz.time/3600)).set('minute', Math.floor((quiz.time%3600)/60) ));
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const imageDefault = [
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2FMath.jpg?alt=media&token=125c1da6-8ab0-4489-8f72-f05cb8a5c9eb',
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2FMath.jpg?alt=media&token=125c1da6-8ab0-4489-8f72-f05cb8a5c9eb',
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2FL%C3%BD.jpg?alt=media&token=9f4edfc5-50cc-4ff5-84d5-0cdca1345db9',
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2FH%C3%B3a.jpg?alt=media&token=a90e24fc-03d4-4d3a-89a1-dae588ea65cb',
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2FSinh.jpg?alt=media&token=a475f9de-d34b-4ebe-bb44-dce48d58a7c0',
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2FV%C4%83n.jpg?alt=media&token=46462c3a-ace0-4ecc-b02e-08fbf5730c83',
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2FS%E1%BB%AD.jpg?alt=media&token=41a3ef25-0e01-4835-96e7-9bb10fe9206b',
        'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2F%C4%90%E1%BB%8Ba.png?alt=media&token=bb47d11e-63d4-422b-8f30-c3e951d92523'
    ]
    useEffect(() => {
        dispatch(showAllCateQuestion());
        dispatch(showAllCategoryQuiz())
        dispatch(findAllLevelQuiz())
        dispatch(findQuizById(idQuiz))
    }, [dispatch]);
    const handleChangeCategorySearch = (event) => {
        setSelectedFieldSearch(event.target.value);
        searchTermRef.current = ""; // Reset searchTermRef khi chọn danh mục mới
        dispatch(findQuestionsByCategory({id: event.target.value}));
    };
    useEffect(() => {
        if (selectedFieldSearch !== 0) {
            dispatch(findQuestionsByCategory({id: selectedFieldSearch}));
        } else {
            dispatch(findAll());
        }
    }, [selectedFieldSearch, dispatch]);
    useEffect(() => {
        const filterQuestions = (questions, searchTerm, selectedFieldSearch) => {
            if (!searchTerm && selectedFieldSearch !== 0) {
                // Nếu không có nội dung tìm kiếm nhưng có category được chọn
                const filteredByCategory = questions.filter(question => {
                    const category = question.categoryQuestion?.id || null;
                    return category === selectedFieldSearch;
                });
                setFilteredQuestions(filteredByCategory);
                return filteredByCategory;
            }

            if (!searchTerm) {
                // Nếu cả nội dung tìm kiếm và category đều rỗng
                setFilteredQuestions(questions);
                return questions;
            }

            const filtered = questions.filter((question) => {
                const content = question.content ? question.content.toLowerCase() : '';
                const term = searchTerm.toLowerCase();
                const category = question.categoryQuestion?.id || null;
                const field = selectedFieldSearch;
                return (field === 0 || category === field) && content.includes(term);
            });

            setFilteredQuestions(filtered);
            return filtered;
        };

        const updatedFilteredQuestions = filterQuestions(questions, searchTermRef.current, selectedFieldSearch);
        setFilteredQuestions(updatedFilteredQuestions);
    }, [questions, searchTermRef.current, selectedFieldSearch]);
    const handleSearch = () => {
        const filtered = questions.filter((question) => {
            const content = question.content ? question.content.toLowerCase() : '';
            const term = searchTermRef.current.toLowerCase();
            return content.includes(term);
        });
        setFilteredQuestions(filtered);
    };
    const handleAddQuestion = (question) => {
        const index = selectedQuestionContent.findIndex(q => q.id === question.id);
        if (index === -1) {
            setSelectedQuestionContent((prevContent) => [...prevContent, question]);
            toast.success("Thêm câu hỏi thành công")
        } else {
            toast.error("Đã có câu này");
        }
    };
    const uploadFile = async () => {
        if (image === null) return;
        const imageRef = ref(storage, `kien/${image.name + v4()}`);
        try {
            const snapshot = await uploadBytes(imageRef, image);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            toast.error("Upload ảnh bị lỗi");
        }
    };
    const handleDeleteQuestion = (questionId) => {
        const index = selectedQuestionContent.findIndex((question) => question.id === questionId);
        if (index !== -1) {
            const newContent = [...selectedQuestionContent.slice(0, index), ...selectedQuestionContent.slice(index + 1)];
            setSelectedQuestionContent(newContent);
        } else {
            toast.error("Câu hỏi không tồn tại");
        }
    };

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    function handleChangeImage(e) {
        if (e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            toast.error('FIle được chọn chưa đúng');
        }
    }

    const handleChangeLevelQuiz = (event) => {
        formik.setFieldValue(`levelQuiz.id`, event.target.value);
    };
    const handleSelectCateQuiz = (event) => {
        formik.setFieldValue(`categoryQuiz.id`, event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    const validationSchema = Yup.object({
        title: Yup.string().required('Tiêu đề bài thi không được để trống'),
        passScore: Yup.number().typeError('Điểm bài thi phải là số').min(1, 'Điểm bài thi phải lớn hơn 0').max(100, 'Điểm bài thi phải nhỏ hơn 100'),
    });
    const formik = useFormik({
        initialValues: {
            title: quiz.title,
            time: quiz.time,
            timeCreate: quiz.timeCreate,
            description: quiz.description,
            passScore: quiz.passScore,
            status: 1,
            image: quiz.image,
            categoryQuiz: {
                id: quiz.categoryQuiz?.id
            }, levelQuiz: {
                id: quiz.levelQuiz?.id
            }, user: {
                id: currentUser.id
            }, questions: [selectedQuestionContent],
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const url = await uploadFile();

            await dispatch(createQuiz({...values, image: url})).then(
                toast.success("Cập nhật thành công", {})
            )
            formik.resetForm()
            navigate("/home/showAllQuiz");
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
            marginLeft: theme.spacing(3), width: 'auto',
        },
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit', '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0), // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '18ch'
            },
        },
    }));


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', ...theme.typography.body2,
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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                flexDirection: 'column',
                overflow: 'scroll',
                padding: '0 16px',
                maxWidth: '100vw',
            }}>
            <CssBaseline/>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr'
            }}>
                <Grid xs={10}>
                    <form onSubmit={formik.handleSubmit}
                          sx={{
                              marginLeft: 'auto', marginRight: 'auto', width: "full"
                          }}>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(25ch, 1fr))",
                                gap: 1,
                                padding: 1,
                                overflow: "auto",
                                height: "100%",
                                border: 'rounded'
                            }}
                        >
                            <Grid item xs={12} sx={{justifyContent: 'center'}}>
                                <Grid container xs={12}>
                                    <Box width={'60%'}>
                                        <Box>
                                            <Grid xs={8}>
                                                <TextField
                                                    fullWidth={true}
                                                    id="standard-basic"
                                                    label="Tiêu đề bài thi"
                                                    variant="standard"
                                                    name={"title"}
                                                    value={formik.values.title || ''}
                                                    onChange={(e) => formik.setFieldValue('title', e.target.value)}
                                                    error={formik.touched.title && formik.errors.title}
                                                    helperText={formik.touched.title && formik.errors.title}
                                                />
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Grid item xs={8}>
                                                <TextField
                                                    name={"time"}
                                                    hidden={true}
                                                    value={formik.values.time || ''}
                                                />
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Grid item xs={8}>
                                                <TextField
                                                    fullWidth={true}
                                                    id="standard-basic"
                                                    label="Điểm bài thi"
                                                    variant="standard"
                                                    name={"passScore"}
                                                    type="number"
                                                    value={formik.values.passScore || ''}
                                                    onChange={(e) => formik.setFieldValue('passScore', e.target.value)}
                                                />
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Grid item xs={8}>
                                                <TextField
                                                    fullWidth={true}
                                                    id="standard-basic"
                                                    label="Mô tả"
                                                    variant="standard"
                                                    name={"description"}
                                                    value={formik.values.description || ''}
                                                    onChange={(e) => formik.setFieldValue('description', e.target.value)} // Thêm dòng này
                                                />
                                            </Grid>
                                        </Box>
                                    </Box>
                                    <Grid xs={4} className={'flex flex-wrap justify-center'}>
                                        <Card sx={{width: 320, height: 240}}>
                                            <CardActionArea className={'flex flex-col justify-center'}
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
                                                                objectFit: "fill"
                                                            }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={file ? file : imageDefault[(formik.values.categoryQuiz.id) || 1]}
                                                    alt="green iguana"
                                                    style={{
                                                        objectFit: "fill",
                                                        height: "100%",
                                                        width: "100%"
                                                    }}
                                                />
                                            </CardActionArea>
                                        </Card>
                                        <Button component="label"
                                                variant="contained"
                                                className={'justify-center'}
                                                onChange={handleChangeImage}
                                                startIcon={<CloudUploadIcon/>}>
                                            Chọn ảnh
                                            <VisuallyHiddenInput type="file"/>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid xs={12}>
                                    <Box className='flex justify-around mt-10 w-full'>
                                        <Grid item xs={4}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['TimeField']}>
                                                    <TimePicker
                                                        label="Thời gian bài thi(Giờ)"
                                                        value={value}
                                                        onChange={(newValue) => {
                                                            setValue(newValue)
                                                            if (dayjs.isDayjs(newValue)) { // Kiểm tra xem newValue có phải là một đối tượng dayjs không
                                                                const hours = newValue.hour(); // Lấy giờ
                                                                const minutes = newValue.minute(); // Lấy phút
                                                                const seconds = parseInt(hours * 3600 + minutes * 60)
                                                                formik.setFieldValue('time', seconds);
                                                            } else {
                                                                console.error('Invalid value type:', typeof newValue);
                                                            }
                                                        }} ampm={false}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl required
                                                         sx={{m: 1, minWidth: 160, justifyItems: 'center'}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Thể
                                                    loại</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-autowidth-label"
                                                    id="demo-simple-select-autowidth"
                                                    onChange={handleSelectCateQuiz}
                                                    value={formik.values.categoryQuiz.id}
                                                    autoWidth
                                                    label="Thể loại  *"
                                                >
                                                    {categoryQuizzes.map((cateQuiz) => (
                                                        <MenuItem value={cateQuiz.id}><span
                                                            dangerouslySetInnerHTML={{__html: cateQuiz.name}}></span></MenuItem>))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl required sx={{m: 1, minWidth: 160}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Mức
                                                    độ</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-autowidth-label"
                                                    id="demo-simple-select-autowidth"
                                                    onChange={handleChangeLevelQuiz}
                                                    value={formik.values.levelQuiz.id}
                                                    autoWidth
                                                    label="Mức độ  *"
                                                >
                                                    {levelQuizzes.map((levelQuiz) => (
                                                        <MenuItem
                                                            value={levelQuiz.id}>{levelQuiz.name}</MenuItem>))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Box>
                                    <Box className={'flex justify-around p-4'}>
                                        <Stack direction="row" spacing={2}>
                                            <Button onClick={toggleDrawer('right', true)} variant="outlined"
                                                    startIcon={<Add/>}>
                                                Thêm câu hỏi từ thư viện
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1, p: 3, overflow: 'auto',
                            }}
                        >
                            {selectedQuestionContent.map((question, index) => (
                                <Box>
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
                                                    <Clear/>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        {question.answers.map((answer, index) => (<React.Fragment key={index}>
                                            <Grid item xs={6}>
                                                <Item
                                                    style={{backgroundColor: answer.status === 1 ? 'lightblue' : gradientColors.background}}>
                                                    <span dangerouslySetInnerHTML={{__html: answer.content}}/>

                                                </Item>
                                            </Grid>
                                            {(index + 1) % 2 === 0 && (<Grid item xs={10}>
                                                <Divider/>
                                            </Grid>)}
                                        </React.Fragment>))}
                                    </Grid>
                                </Box>))}
                            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={12}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'around',
                                    alignItems: 'center',
                                    border: "none",
                                    width: '15%',
                                    height: '60%'
                                }}>
                                    <Button
                                        type="submit"
                                        sx={{background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"}}
                                        className={"h-10 w-40 mt-2 border- border-none rounded-full hover:text-white hover:bg- justify-center ml-96"}>
                                        Tạo bài thi
                                    </Button>
                                </Box>
                            </Grid>
                        </Box>
                    </form>
                </Grid>

                <Grid xs={3}>
                    <div>
                        {['right'].map((anchor) => ( // You can use 'right' or other anchors based on your preference
                            <React.Fragment key={anchor}>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    <Box
                                        sx={{
                                            width: drawerWidth, // You might need to adjust this width based on your design
                                            padding: '16px', // Adjust padding as needed
                                            marginTop: '74px'
                                        }}
                                        role="presentation"
                                        // onClick={toggleDrawer(anchor, false)}
                                        // onKeyDown={toggleDrawer(anchor, false)}
                                    >
                                        <List>
                                            <Box className={"flex flex-col justify-center"}>

                                                <FormControl sx={{m: 1, minWidth: 180}}>
                                                    <InputLabel id="demo-controlled-open-select-label">
                                                        Tìm câu hỏi theo</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        open={open}
                                                        onClose={handleClose}
                                                        onOpen={handleOpen}
                                                        value={selectedFieldSearch}
                                                        label="Tìm câu hỏi theo"
                                                        onChange={handleChangeCategorySearch}
                                                    >
                                                        <MenuItem value={0}>Tất cả</MenuItem>
                                                        {categoryQuestions.map((category) => (
                                                            <MenuItem
                                                                value={category.id}>{category.name}</MenuItem>))}
                                                    </Select>
                                                </FormControl>

                                                <Box className={"flex"}>
                                                    <Search>
                                                        <StyledInputBase
                                                            placeholder="Nội dung tìm kiếm…"
                                                            inputProps={{'aria-label': 'search'}}
                                                            onChange={(event) => (searchTermRef.current = event.target.value)}
                                                        />
                                                    </Search>
                                                    <Button onClick={handleSearch}><SearchIcon/></Button>
                                                </Box>

                                            </Box>
                                            {filteredQuestions.map((question) => (<ListItem key={question.id}>
                                                <ListItemText>
                                                    <QuestionDetail question={question}
                                                                    buttonLabel={<Typography className={"flex "}>
                                                                        Câu : {question.id}
                                                                        <span
                                                                            dangerouslySetInnerHTML={{__html: question.content}}/>
                                                                    </Typography>}/>

                                                </ListItemText>
                                                <Button onClick={() => handleAddQuestion(question)}
                                                        onChange={(e) => formik.setFieldValue('questions', e.target.value)}>
                                                    <Add/>
                                                </Button>
                                            </ListItem>))}
                                        </List>
                                    </Box>
                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                    </div>
                </Grid>
            </div>
        </Box>
    );
}
export default EditQuiz;
