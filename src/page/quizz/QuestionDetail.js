import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function QuestionDetail({question, handleAddQuestion }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = (question) => {
        setOpen(true);
        if (question) {
            // Truyền giá trị của câu hỏi về component cha tại đây
            // Ví dụ: truyền giá trị question về component cha
            console.log("Thông tin câu hỏi:", question);
        }
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
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <div>
            <Button onClick={handleOpen}>
             Câu {question.id}: &nbsp;   <span dangerouslySetInnerHTML={{__html: question.content}} />
            </Button>
            <Modal
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: "fit",
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ width: "100%" }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <Item dangerouslySetInnerHTML={{__html: question.content}}></Item>
                        </Grid>
                        {question.answers.map((answer, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={6}>
                                    <Item style={{ backgroundColor: answer.status === 1 ? 'green' : 'white' }}>{`Đáp án ${index + 1}`}</Item>
                                </Grid>
                                {/* Kiểm tra nếu index là số chẵn (2n) thì tạo một hàng mới */}
                                {(index + 1) % 2 === 0 && (
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
