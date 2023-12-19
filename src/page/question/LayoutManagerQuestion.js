import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from "react-swipeable-views";
import ListQuestion from "./ListQuestion";
import CreateQuestion from "./CreateQuestion";
import ShowListQuizByUser from "../quizz/ShowListQuizByUser";
import EditQuestion from "./EditQuestion";
import CreateNewQuiz from "../quizz/CreateNewQuiz";

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

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{bgcolor: 'background.paper', width: "screen", height: "full"}}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Danh sách câu hỏi" {...a11yProps(0)} />
                    <Tab label="Tạo mới câu hỏi" {...a11yProps(1)} />
                    <Tab label="Danh sách bài thi" {...a11yProps(2)} />
                    <Tab label="Tạo mới bài thi" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                sx={{width: "full", height: "full"}}
            >

                <TabPanel value={value} index={0} dir={theme.direction}
                          sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "full",
                              height: "full",
                          }}>
                    <ListQuestion
                        sx={{width: "full", height: "full"}}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}
                          sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "full",
                          }}>
                    <CreateQuestion
                        sx={{width: "100%", height: "full"}}
                    />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}
                          sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "fit",
                              height: "full",
                          }}>
                    <ShowListQuizByUser
                        sx={{width: "fit", height: "full"}}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}
                          sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "fit",
                              height: "full",
                          }}>
                    <CreateNewQuiz
                        sx={{width: "fit", height: "full"}}
                    />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}