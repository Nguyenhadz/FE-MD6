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
import {useState} from "react";
import {createResult} from "../../redux/service/ResultService";
import {findQuizById} from "../../redux/service/QuizService";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import StepList from "./StepList";


export default function TextMobileStepper() {
    const steps = useSelector((store) => store.quizzes.quiz.questions)
    console.log(steps)
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;
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
        steps.reduce((acc, question) => {
            acc[question.id] = [];
            return acc;
        }, {})
    );
    console.log(answers)


    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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
        console.log(values);
        console.log("Nộp bài em ei")
        await dispatch(createResult(values))
        await dispatch(findQuizById(idQuiz))
        await navigate("/home/result")
    };
    return (
        <div className={'flex justify-between mt-10'}>
            <div className={'w-10/12 flex flex-column'}>
                <div className={'ml-40'}>
                    <span className={'text-2xl'}>Câu {activeStep + 1}:</span>
                    <Typography
                        sx={{
                            // whiteSpace: 'pre-wrap',
                            // overflow: 'auto',
                        }}
                    ><span
                        dangerouslySetInnerHTML={{__html: steps[activeStep].content}}></span></Typography>
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
                        <Box sx={{width: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                {steps[activeStep].answers.map((item, index) => (
                                    (steps[activeStep].typeQuestion.id === 1 || steps[activeStep].typeQuestion.id === 2) ?
                                        (
                                            <Grid item xs={12} onClick={() => handleRadioChange(steps[activeStep].id, item.id)}>
                                                <Item
                                                    sx={{
                                                        backgroundColor: answers[steps[activeStep].id].includes(item.id) ? '#66FF33' : 'white',
                                                        '&:hover': {
                                                            backgroundColor: '#FFCC33',
                                                        },
                                                        '&:active': {
                                                            backgroundColor: 'lightblue',
                                                        },
                                                    }}
                                                >
                                                    <div key={index}>
                                                        <Radio
                                                            name={`question_${steps[activeStep].id}`}
                                                            value={item.id}
                                                            checked={answers[steps[activeStep].id].includes(item.id)}
                                                            onChange={() => handleRadioChange(steps[activeStep].id, item.id)}
                                                            sx={{
                                                                display: 'none',
                                                            }}
                                                        />

                                                        <span dangerouslySetInnerHTML={{__html: item.content}}></span>
                                                    </div>
                                                </Item>
                                            </Grid>

                                        )
                                        :
                                        (
                                            <Grid item xs={12} onClick={()=> handleCheckboxChange(steps[activeStep].id, item.id)}>
                                                <Item
                                                    sx={{
                                                        backgroundColor: answers[steps[activeStep].id].includes(item.id) ? '#66FF33' : 'white',
                                                        '&:hover': {
                                                            backgroundColor: '#FFCC33',
                                                        },
                                                        '&:active': {
                                                            backgroundColor: 'lightblue',
                                                        },
                                                    }}
                                                >
                                                    <div key={index}>
                                                        <Checkbox
                                                            checked={answers[steps[activeStep].id].includes(item.id)}
                                                            onChange={() => handleCheckboxChange(steps[activeStep].id, item.id)}
                                                            sx={{
                                                                display: 'none'
                                                            }}
                                                        />

                                                        <span dangerouslySetInnerHTML={{__html: item.content}}></span>
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
                            marginTop: 10
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
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"}
                            type="button" onClick={handleSubmit}>
                        Nộp bài
                    </button>
                </Box>

            </div>
            <div className={'w-2/12'}>
                <StepList stepsMax={maxSteps} activeStep={activeStep} handleStepChange={setActiveStep}/>
            </div>

        </div>


    );
}
