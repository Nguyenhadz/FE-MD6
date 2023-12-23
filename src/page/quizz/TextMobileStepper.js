import * as React from 'react';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Radio} from "@mui/material";
import {memo, useEffect, useState} from "react";
import {createResult} from "../../redux/service/ResultService";
import {findQuizById} from "../../redux/service/QuizService";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import StepList from "./StepList";
import {toast} from "react-toastify";


export default function TextMobileStepper() {
    const steps = useSelector((store) => store.quizzes.quiz)
    console.log(steps)
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.questions.length;
    const idQuiz = useParams().idQuiz;
    const idUser = useSelector((store) => store.users.currentUser.id);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const [answers, setAnswers] = useState(
        steps.questions.reduce((acc, question) => {
            acc[question.id] = [];
            return acc;
        }, {})
    );


    const StyledContent = styled("span")({
        fontFamily: 'Open Sans', // Chọn font chữ mong muốn
        fontSize: '20px', // Chọn kích thước chữ mong muốn
        textAlign: 'left',
        fontWeight: 'bold',

    });

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const [countdown, setCountdown] = useState(steps.time);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 60000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const CountdownDisplay = memo(({ countdown }) => {
        const remainingMinutes = Math.ceil(countdown / 60);

        useEffect(() => {
            if (countdown === 0) {
                handleSubmit().then(() => {});
            }
        }, [countdown]);
        return <div className="text-1xl text-red-600 font-bold mb-2">{`Thời gian còn lại: ${remainingMinutes} phút`}</div>;
    });

    const updateSelectedAnswers = () => {
        const newSelectedAnswers = [];
        steps.questions.forEach((question) => {
            newSelectedAnswers.push({
                questionId: question.id,
                selectedAnswers: answers[question.id] || [],
            });
        });
        setSelectedAnswers(newSelectedAnswers);
    };

    useEffect(() => {
        updateSelectedAnswers();
    }, [answers]);
    const handleCheckboxChange = (questionId, answerId) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = {...prevAnswers};
            const index = updatedAnswers[questionId].indexOf(answerId);
            if (index === -1) {
                updatedAnswers[questionId].push(answerId);
            } else {
                updatedAnswers[questionId].splice(index, 1);
            }
            return updatedAnswers;
        });

    };
    const handleRadioChange = (questionId, answerId) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: [answerId],
        }));

    };

    const handleSubmit = async () => {
        const values = {
            user: {
                id: idUser,
            },
            quiz: {
                id: parseInt(idQuiz),
            },
            answers: Object.values(answers).flat().map((id) => ({id})),
        };

        await dispatch(createResult(values))
        await dispatch(findQuizById(idQuiz))
        toast.success("Nộp bài thành công", {})
        await navigate("/home/result")

    };

    return (
        <div className={'flex justify-between mt-10 '}>

            <div className={'w-9/12 flex flex-column'}>
                <div className={'ml-40'}>

                    <span className={'text-2xl font-bold text-purple-600'}>Câu {activeStep + 1}:</span>
                    <Typography
                        sx={{
                          marginTop: '10px'
                        }}
                    ><StyledContent
                        dangerouslySetInnerHTML={{__html: steps.questions[activeStep].content}}></StyledContent></Typography>
                    <div>
                        {(steps.questions[activeStep].typeQuestion.id === 1 || steps.questions[activeStep].typeQuestion.id === 2) ? (<span></span>):(<span>(Có thể chọn nhiều đáp án)</span>)}

                    </div>

                </div>

                <Box sx={{
                    width: '100%',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                     }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            // height: 50,
                            pl: 2,
                            // marginLeft: '-40%',
                            bgcolor: 'background.default',


                        }}
                    >

                    </Paper>
                        <Box sx={{width: '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                {steps.questions[activeStep].answers.map((item, index) => (
                                    (steps.questions[activeStep].typeQuestion.id === 1 || steps.questions[activeStep].typeQuestion.id === 2) ?
                                        (
                                            <Grid item xs={3} onClick={() => handleRadioChange(steps.questions[activeStep].id, item.id)}>
                                                <Item
                                                    sx={{
                                                        position: 'relative',
                                                        backgroundColor: answers[steps.questions[activeStep].id].includes(item.id) ? '#99FFFF' : 'linear-gradient(45deg, #66FF33, #FFCC33)',
                                                        transition: 'background-color 0.3s ease-in-out',
                                                        overflow: 'hidden',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#FFCC33',
                                                        },
                                                        '&:active': {
                                                            backgroundColor: 'lightblue',
                                                        },
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        height: '100%'
                                                    }}
                                                    >
                                                    <div key={index}>
                                                        <Radio
                                                            name={`question_${steps.questions[activeStep].id}`}
                                                            // value={item.id}
                                                            checked={answers[steps.questions[activeStep].id].includes(item.id)}
                                                            onChange={() => handleRadioChange(steps.questions[activeStep].id, item.id)}
                                                            sx={{
                                                                display: 'none',
                                                            }}
                                                        />

                                                        <StyledContent dangerouslySetInnerHTML={{__html: item.content}}></StyledContent>
                                                    </div>
                                                </Item>
                                            </Grid>

                                        )
                                        :
                                        (
                                            <Grid item xs={3} onClick={()=> handleCheckboxChange(steps.questions[activeStep].id, item.id)}>
                                                <Item
                                                    sx={{
                                                        position: 'relative',
                                                        backgroundColor: answers[steps.questions[activeStep].id].includes(item.id) ? '#99FFFF' : 'linear-gradient(45deg, #66FF33, #FFCC33)',
                                                        transition: 'background-color 0.3s ease-in-out',
                                                        overflow: 'hidden',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#FFCC33',
                                                        },
                                                        '&:active': {
                                                            backgroundColor: 'lightblue',
                                                        },
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        height: '100%'
                                                    }}
                                                >
                                                    <div key={index}>
                                                        <Checkbox
                                                            checked={answers[steps.questions[activeStep].id].includes(item.id)}
                                                            onChange={() => handleCheckboxChange(steps.questions[activeStep].id, item.id)}
                                                            sx={{
                                                                display: 'none'
                                                            }}
                                                        />

                                                        <StyledContent dangerouslySetInnerHTML={{__html: item.content}}></StyledContent>
                                                    </div>
                                                </Item>
                                            </Grid>
                                        )
                                ))}
                            </Grid>
                        </Box>
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        sx={{
                            marginTop: 10,
                            position: 'fixed',
                            bottom: 150,
                            left: 480,
                            right: 600
                        }}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                                sx={{ paddingLeft: 10,
                                }}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft/>
                                ) : (
                                    <KeyboardArrowRight/>
                                )}
                            </Button>
                        }
                        backButton={
                            <Button

                                size="small" onClick={handleBack} disabled={activeStep === 0}
                                sx={{ paddingRight: 10,

                            }}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight/>
                                ) : (
                                    <KeyboardArrowLeft/>
                                )}
                                Back
                            </Button>
                        }
                    />
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 fixed bottom-24"}
                            type="button" onClick={handleSubmit}>
                        Nộp bài
                    </button>
                </Box>

            </div>
            <div className={'w-2/12 mr-4'}>
                <CountdownDisplay countdown={countdown} />
                <StepList stepsMax={maxSteps} activeStep={activeStep} handleStepChange={setActiveStep}
                          selectedAnswers={selectedAnswers}
                />
            </div>
        </div>
    );
}
