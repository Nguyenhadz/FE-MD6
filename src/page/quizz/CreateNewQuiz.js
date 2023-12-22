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
import {
    alpha,
    Card,
    CardActionArea,
    CardMedia,
    FormControl,
    InputBase,
    InputLabel,
    Select,
    TextField
} from "@mui/material";
import {createQuiz} from "../../redux/service/QuizService";
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
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/FireBase";
import {v4} from "uuid";

const drawerWidth = 320;

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
    const categoryQuizzes = useSelector((store) => {
        return store.cateQuiz.cateQuizzes
    })
    const levelQuizzes = useSelector((store) => {
        return store.levelQuizStore.levelQuiz
    })
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const searchTermRef = React.useRef('');
    const [selectedField, setSelectedField] = React.useState(1);
    const [selectedQuestionContent, setSelectedQuestionContent] = React.useState([]);
    const dispatch = useDispatch();
    const [filteredQuestions, setFilteredQuestions] = React.useState([]);
    const [value, setValue] = React.useState(dayjs('2022-04-17T00:30'));
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
        const questionIds = selectedQuestionContent.map((q) => ({id: q.id}));
        formik.setFieldValue('questions', questionIds);
        if (selectedField === 0) {
            setFilteredQuestions(questions);
        } else {
            dispatch(findQuestionsByCategory({id: selectedField}))
            const filtered = questions.filter(question => question.categoryQuestion.id === selectedField); // Lọc câu hỏi theo selectedField
            setFilteredQuestions(filtered);
        }
    }, []);
    const handleAddQuestion = (question) => {
        const index = selectedQuestionContent.findIndex(q => q.id === question.id);
        if (index === -1) {
            setSelectedQuestionContent((prevContent) => [...prevContent, question]);
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
    const handleSearch = async () => {
        await dispatch(findByContent(searchTermRef.current, filteredQuestions));

    };
    const handleChange = (event) => {
        setSelectedField(event.target.value);
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
            title: "",
            time: "",
            timeCreate: new Date(),
            description: "",
            passScore: "",
            status: 1,
            image: '',
            categoryQuiz: {
                id: ""
            }, levelQuiz: {
                id: ""
            }, user: {
                id: currentUser.id
            }, questions: [selectedQuestionContent],
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const url = await uploadFile();

            await dispatch(createQuiz({...values, image: url})).then(
                toast.success("Tạo quiz thành công", {})
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
    return (<Box

        sx={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'left',
            flexDirection: 'column',
            overflow: 'scroll',
            padding: '0 16px',
            maxWidth: '100vw',
        }}>
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
                            height: "100%", // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
                                <Grid xs={4}>

                                    <Card sx={{width: 320, height: 240}}>
                                    <CardActionArea className={'flex flex-col justify-center'}
                                                    style={{
                                                        height: "100%",
                                                        width: "100%" ,
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
                                                label="Thời gian thi(Giờ)"
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
                                    <FormControl required sx={{m: 1, minWidth: 160, justifyItems: 'center'}}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Thể loại</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            onChange={handleSelectCateQuiz}
                                            autoWidth
                                            label="Thể loại  *"
                                        >
                                            {categoryQuizzes.map((cateQuiz, index) => (
                                                <MenuItem value={cateQuiz.id}><span
                                                    dangerouslySetInnerHTML={{__html: cateQuiz.name}}></span></MenuItem>))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl required sx={{m: 1, minWidth: 160}}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Mức độ</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            onChange={handleChangeLevelQuiz}
                                            autoWidth
                                            label="Mức độ  *"
                                        >
                                            {levelQuizzes.map((levelQuiz, index) => (
                                                <MenuItem value={levelQuiz.id}>{levelQuiz.name}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                </Grid>
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

            <Toolbar/>
            {selectedQuestionContent.map((question, index) => (<Box
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
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={10}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: "none",
                    width: '15%',
                    height: '60%'
                }}>
                    <Button
                        type="submit"
                        sx={{background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"}}
                        className={"h-10 w-40 mt-2 border- border-none rounded-full hover:text-white hover:bg- justify-center"}>
                        Tạo bài thi
                    </Button>
                </Box>
            </Grid>
        </Box>
    </form>
</Grid>
    <Grid xs={3}>
        <Drawer
            sx={{
                width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
                    width: drawerWidth, boxSizing: 'border-box',
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
                                <MenuItem key={index} value={category.id}>{category.name}</MenuItem>))}
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
                {questions.map((question) => (<ListItem key={question.id}>
                    <ListItemText>
                        <QuestionDetail question={question}
                                        buttonLabel={<Typography className={"flex "}>
                                            Câu : {question.id}
                                            <span dangerouslySetInnerHTML={{__html: question.content}}/>
                                        </Typography>}/>

                    </ListItemText>
                    <Button onClick={() => handleAddQuestion(question)}
                            onChange={(e) => formik.setFieldValue('questions', e.target.value)}>
                        <Add/>
                    </Button>
                </ListItem>))}
            </List>
        </Drawer>
    </Grid>
</Box>
</Box>)
    ;
}
