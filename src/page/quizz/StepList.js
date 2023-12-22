import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";

const StepList = ({stepsMax, activeStep, handleStepChange, selectedAnswers}) => {
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,


    }));

    const [internalSelectedAnswers, setInternalSelectedAnswers] = useState(selectedAnswers);

    useEffect(() => {
        // Cập nhật state bên trong StepList khi selectedAnswers thay đổi
        setInternalSelectedAnswers(selectedAnswers);
    }, [selectedAnswers]);

    return (
        <ul>
            <Box sx={{
                width: '100%'

            }}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}

                >
                    {Array.from({length: stepsMax}, (_, i) => i).map((step) => (
                        <Grid item xs={4}
                        >
                            <Item
                                sx={{ backgroundColor: step === activeStep ? "#99FFFF" : selectedAnswers[step]?.selectedAnswers.length > 0 ? "#99FFFF" : "white" ,
                                    paddingLeft: '10px',
                                    transition: 'background-color 0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: '#FFCC33',
                                    },
                                    '&:active': {
                                        backgroundColor: 'lightblue',
                                    },
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <li
                                    key={step}
                                    style={{
                                        color: step === activeStep ? "red" : selectedAnswers[step]?.selectedAnswers.length > 0 ? "red" : "black",
                                        cursor: "pointer",
                                        fontWeight: 'bold'
                                    }}
                                    className={step === activeStep ? "active" : internalSelectedAnswers[step]?.selectedAnswers.length > 0 ? "selected" : ""}
                                    onClick={() => handleStepChange(step)}

                                >
                                    {step + 1}
                                </li>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ul>
    );
};
export default StepList;