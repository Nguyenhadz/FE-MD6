import Carousel from "react-multi-carousel";
import {Avatar, Card, CardContent, CardMedia, Chip, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findAllQuiz} from "../redux/service/QuizService";
import Box from "@mui/material/Box";
import * as React from "react";
import Modal from "@mui/material/Modal";
import DetailQuizByCategory from "./DetailQuizByCategory";

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
    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "...";
        }
        return content;
    };
    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const [open, setOpen] = React.useState(false);
    const [selectedQuiz, setSelectedQuiz] = React.useState(null); // State for selected quiz

    const handleOpen = (quiz) => { // Pass the selected quiz to handleOpen
        setSelectedQuiz(quiz); // Set the selected quiz in state
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedQuiz(null); // Clear the selected quiz when closing the modal
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '60%',
        bgcolor: 'white',
        borderRadius: '5%'
    };
    const ModalContent = () => (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <DetailQuizByCategory quiz={selectedQuiz} handleClose={handleClose}/>
                </Typography>
            </Box>
        </Modal>
    );
    return (
        <Box>
            <Box>
                <Stack direction="row" spacing={2} className={'flex justify-center'}>
                    <Button className={'flex flex-col'}>
                        <Avatar alt="Toán"
                                src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fmathematics.png?alt=media&token=c3ad10c3-96f0-4658-81d3-58f2b69b5506'}
                        />
                        <Typography>Toán</Typography>
                    </Button>
                    <Button className={'flex flex-col'}>
                        <Avatar alt="Sinh"
                                src="https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fcell.png?alt=media&token=5546c6d2-0fdf-4687-962e-d7df50e92377"
                        />
                        <Typography>Sinh</Typography>
                    </Button>
                    <Button className={'flex flex-col'}>
                        <Avatar alt="Lý"
                                src="https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Felectronic-circuit.png?alt=media&token=7536f347-755a-4ab0-8227-dd8f7e7134e8"
                        />
                        <Typography>Lý</Typography>
                    </Button>
                    <Button className={'flex flex-col'}>
                        <Avatar alt="Hóa"
                                src="https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fmedical-laboratory.png?alt=media&token=a67c245f-4c5e-4e4f-9f66-966e5b214391"
                        />
                        <Typography>Hóa</Typography>
                    </Button>
                    <Button className={'flex flex-col'}>
                        <Avatar alt="Văn"
                                src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fpoetry.png?alt=media&token=f89943dc-2458-436e-9508-8e751cce6c01'}
                        />
                        <Typography>Văn</Typography>
                    </Button>
                    <Button className={'flex flex-col'}>
                        <Avatar alt="Sử"
                                src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fpoetry.png?alt=media&token=f89943dc-2458-436e-9508-8e751cce6c01'}
                        />
                        <Typography>Sử</Typography>
                    </Button>
                    <Button className={'flex flex-col'}>
                        <Avatar alt="Địa"
                                src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fworld.png?alt=media&token=e3c32597-35ee-4a6d-85ae-538d0f0b1337'}
                        />
                        <Typography>Địa</Typography>
                    </Button>
                </Stack>
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
                                <Button onClick={() => handleOpen(quiz)}>
                                    <CardMedia
                                      component="img"
                                      alt="image"
                                      height="0"
                                      image={quiz.image}
                                      style={{objectFit: 'fill', aspectRatio: 4 / 3, height: 180}}
                                  />
                              </Button>
                                <CardContent className={'h-1/2'}>
                                    <Stack direction="row" className={'mt-0'}>
                                        <Chip label={quiz.categoryQuiz.name} variant="outlined"/>
                                    </Stack>
                                    <Typography gutterBottom variant="h7" component="div">
                                        {truncateContent(stripHtmlTags(quiz.title), 20)}                                    </Typography>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                </Box>
            ))}
            <ModalContent />
        </Box>
    );
}

export default Simple;
