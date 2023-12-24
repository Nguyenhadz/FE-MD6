import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {InfoTwoTone} from "@mui/icons-material";
import QuestionDetail from "./QuestionDetail";

const style = {
    position: 'absolute',
    top: '28%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '60%',
    bgcolor: 'background.paper',
};

export default function QuestionModal({question}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    return (
        <div className={"flex"}>
            <Button className={"justify-center"} onClick={handleOpen}> <InfoTwoTone/></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <QuestionDetail question={question} handleClose={handleClose}/>
                        <Button className={"justify-center"} onClick={handleOpen}> <InfoTwoTone/></Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
