import * as React from 'react';
import {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Chip, Stack} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {findAllQuiz} from "../redux/service/QuizService";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";

export default function ListQuizCard() {
    const quizzes = useSelector((store) => store.quizzes.quizzes);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findAllQuiz());
    }, [dispatch]);
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    return (
        <div>
            <Box sx={{flexGrow: 2}}>
                <Grid container spacing={2}>
                    {quizzes.map((quiz, index) => (
                        <Grid xs={1} sm={2} md={3} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            height="40"
                                            image="https://cantho-school.fpt.edu.vn/wp-content/uploads/Screenshot-2023-07-19-at-10.35.03.png"
                                            alt="green iguana"
                                        />
                                    <Stack direction="row" spacing={1}>
                                        <Chip label={quiz.categoryQuiz.name} variant="outlined" onClick={handleClick} />
                                    </Stack>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {quiz.title}
                                            </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}