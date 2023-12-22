import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListQuestion from "./ListQuestion";
import CreateQuestion from "./CreateQuestion";
import ShowListQuizByUser from "../quizz/ShowListQuizByUser";
import CreateNewQuiz from "../quizz/CreateNewQuiz";
import {Outlet} from "react-router";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%', height: 'full' }}>
            <AppBar position="static" className={"mb-4"}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs>
                        <Link to="/home/layoutManagerQuestion/showListQuestion" style={{ textDecoration: 'none' }}>
                            <Tab label="Danh sách câu hỏi" {...a11yProps(0)} />
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link to="/home/layoutManagerQuestion/createQuestion" style={{ textDecoration: 'none' }}>
                            <Tab label="Tạo mới câu hỏi" {...a11yProps(1)} />
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link to="/home/layoutManagerQuestion" style={{ textDecoration: 'none' }}>
                            <Tab label="Danh sách bài thi" {...a11yProps(2)} />
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link to="/home/layoutManagerQuestion/createNewQuiz" style={{ textDecoration: 'none' }}>
                            <Tab label="Tạo mới bài thi" {...a11yProps(3)} />
                        </Link>
                    </Grid>
                </Grid>
            </AppBar>
            <Outlet>
                {/* Các component của bạn */}
            </Outlet>
        </Box>
    );
}