import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from 'react-redux';
import { Checkbox, FormControlLabel, Radio } from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {createResult} from "../../redux/service/ResultService";

export default function DoingQuiz() {
    const idQuiz = useParams().idQuiz;
    const quiz = useSelector((store) => {
        console.log(store.quizStore.quiz)
        return store.quizStore.quiz
    });
    const idUser = useSelector((store) => store.users.currentUser.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h1>BÀI KIỂM TRA</h1>
        </div>
    );
}
