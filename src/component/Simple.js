import Carousel from "react-multi-carousel";
import {Image} from "semantic-ui-react";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findAllQuiz} from "../redux/service/QuizService";
import Box from "@mui/material/Box";
import {Star} from "@mui/icons-material";

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 4.5,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
        paritialVisibilityGutter: 30
    }
};
const Simple = ({deviceType}) => {
    const quizzes = useSelector(store => {
        return store.quizzes.quizzes;
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findAllQuiz());
    }, [dispatch]);

    const categories = [...new Set(quizzes.map((quiz) => quiz.categoryQuiz.id))];
    const filterByCategory = (quizzes, category) => {
        return quizzes.filter((quiz) => quiz.categoryQuiz.id === category);
    };
    return (
        <Box>
            <Box>
                <Button>
                    <img
                        src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Ficons8-math-50.png?alt=media&token=82b3d950-36e8-4f58-8f00-dee46e5765b0'}
                        alt={'icon'}
                        height={'38'}
                        width={'38'}
                    >

                    </img>

                </Button>
                <Typography>Môn toán</Typography>
            </Box>
            {categories.map((category, index) => (
                <Box className={'mt-14'}>
                    <Typography variant="h4" component="div" className={'flex'}>
                        <img
                            src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Ficons8-yellow-star-48.png?alt=media&token=fa65e768-f3b0-4354-8a43-aaa9fa917200'}
                            alt={'icon'}
                            height={'38'}
                            width={'38'}
                        >

                        </img>
                        {filterByCategory(quizzes, category)[0].categoryQuiz.name}
                    </Typography>
                    <Carousel
                        key={category}
                        ssr
                        partialVisbile
                        deviceType={deviceType}
                        itemClass="image-item"
                        responsive={responsive}
                    >
                        {filterByCategory(quizzes, category).map((quiz) => (
                            <Card sx={{width: 220, height: 280}}>
                                <CardMedia
                                    component="img"
                                    alt="image"
                                    height="0"
                                    image={quiz.image}
                                    style={{objectFit: 'fill', aspectRatio: 4 / 3, height: 180}}

                                />
                                <CardContent className={'h-1/2'}>
                                    <Typography variant="body2" color="text.secondary">
                                        {quiz.categoryQuiz.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {quiz.title}
                                    </Typography>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                </Box>
            ))}
        </Box>
    );
}

export default Simple;
