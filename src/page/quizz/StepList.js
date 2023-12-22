import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";

const StepList = ({stepsMax, activeStep, handleStepChange}) => {
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <ul>
            <Box sx={{
                width: '100%'

            }}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {Array.from({length: stepsMax}, (_, i) => i).map((step) => (


                        <Grid item xs={4}>
                            <Item>
                                <li
                                    key={step}
                                    className={step === activeStep ? "active" : ""}
                                    onClick={() => handleStepChange(step)}
                                >
                                    Câu hỏi {step + 1}
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