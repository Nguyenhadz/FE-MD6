import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {useEffect, useState} from "react";
import {findAllQuiz} from "../redux/service/QuizService";
import {store} from "../redux/store/Store";
import {useDispatch, useSelector} from "react-redux";

export default function ListQuizCard() {
    const dispatch = useDispatch();
    const quizzes = useSelector(state => {
        return state.quizzes.quizzes;
    })
    useEffect(() => {
            dispatch(findAllQuiz());
        }, [])
    return (
        <ImageList
            sx={{
                gridAutoFlow: "column",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
                gridAutoColumns: "minmax(160px, 1fr)",
                scrollbarWidth:100
            }}
        >
            {quizzes.map((quiz) => (
                <ImageListItem
                    key={quiz.id}
                >
                    <img
                        srcSet={quiz.image}
                        src={quiz.image}
                        alt={quiz.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={quiz.title}
                        subtitle={<span>by: {quiz.description}</span>}
                        position="below"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: '',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
    },
];