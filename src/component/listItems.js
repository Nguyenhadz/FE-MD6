import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Home} from "@mui/icons-material";
import {PiExam} from "react-icons/pi";

const MainListItems = () => {
    const user = useSelector(state => state.users.currentUser);

    const isAdmin = user.roles[0].authority === 'ADMIN';
    const isTeacherOrStudent = user.roles[0].authority === 'TEACHER' || user.roles[0].authority === 'STUDENT';

    return (
        <React.Fragment>
            <ListItemButton component={Link} to="/home">
                <ListItemIcon>
                    <Home/>
                </ListItemIcon>
                <ListItemText primary="Trang chủ"/>
            </ListItemButton>
            {isAdmin && (
                <ListItemButton component={Link} to="Danh sách bài thi">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách bài thi"/>
                </ListItemButton>
            )}

            {isTeacherOrStudent && (
                <ListItemButton component={Link} to="/home/showListCateQuiz">
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh mục bài thi"/>
                </ListItemButton>
            )}

            {isAdmin && (
                <ListItemButton component={Link} to="/home/showListCateQuestion">
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh mục câu hỏi"/>
                </ListItemButton>
            )}
            {isAdmin &&
                <ListItemButton component={Link} to="/home/showListStudent">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách học viên"/>
                </ListItemButton>
            }
            {isAdmin &&
                <ListItemButton component={Link} to="/home/showListTeacher">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách giáo viên"/>
                </ListItemButton>
            }
            {isAdmin &&
                <ListItemButton component={Link} to="/home/showTeacherPending">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách đăng ký giáo viên"/>
                </ListItemButton>
            }
        </React.Fragment>
    )
        ;
};

export default MainListItems;

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItemButton>
    </React.Fragment>
);
