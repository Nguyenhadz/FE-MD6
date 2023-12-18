import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditQuestion from "./EditQuestion";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MyQuestionDetail({question, handleAddQuestion }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = (question) => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const answersContent = question.answers.map((answer, index) => {
        const answerLetter = String.fromCharCode(65 + index);
        return (
            <Typography key={index} id={`modal-modal-description-${index}`} sx={{mt: 2, display: "flex"}}>
                <span>{answerLetter}. </span>&nbsp;
                <span dangerouslySetInnerHTML={{__html: answer.content}}/>
            </Typography>
        );
    });
    return (
        <div>
            <Button onClick={handleOpen}>
             Câu {question.id}: &nbsp;   <span dangerouslySetInnerHTML={{__html: question.content}} />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <EditQuestion question={question} handleAddQuestion={handleAddQuestion}/>
                    </Typography>
                    {/*<Button onClick={() => handleAddQuestion()}>thêm</Button>*/}
                </Box>

            </Modal>
        </div>
    );
}
