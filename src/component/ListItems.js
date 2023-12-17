import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LayersIcon from '@mui/icons-material/Layers';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Home} from "@mui/icons-material";
import {PiExam} from "react-icons/pi";

const MainListItems = ({sidebarOpen}) => {
    console.log(sidebarOpen)
    const user = useSelector(state => state.users.currentUser);

    const isAdmin = user.roles[0].authority === 'ADMIN';
    const isTeacher = user.roles[0].authority === 'TEACHER';
    const isStudent = user.roles[0].authority === 'STUDENT';
    const primaryTypographyProps = sidebarOpen ? {
        style: {
            whiteSpace: 'pre-line',
            maxWidth: '80%'
        }
    } : {style: {whiteSpace: "nowrap"}};

    return (<React.Fragment>
        <ListItemButton component={Link} to="/home">
            <ListItemIcon>
                <Home/>
            </ListItemIcon>
            <ListItemText primary="Trang chủ"/>
        </ListItemButton>
        {isAdmin && ( // nếu là admin thì hiển thị các ListItemButton sau
            <React.Fragment>
                <ListItemButton component={Link} to="Danh sách câu hỏi">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách bài thi"
                                  // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/totalQuestion">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách câu hỏi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/showListStudent">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Danh sách học sinh'}
                                  // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/showListTeacher">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Danh sách giáo viên'}
                                  // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/home/showTeacherPending">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
                        primary={'Danh sách giáo viên chờ duyệt'}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/layoutManagerQuestion">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Hồ sơ của tôi"}
                                  // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
            </React.Fragment>)}
        {isTeacher && ( // nếu là teacher hoặc student thì hiển thị các ListItemButton sau
            <React.Fragment>
                <ListItemButton component={Link} to="Danh sách câu hỏi">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách bài thi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/totalQuestion">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách câu hỏi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/showListStudent">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách học viên"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/home/layoutManagerQuestion">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Hồ sơ của tôi"}
                                  // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
            </React.Fragment>)}
        {isStudent && ( // nếu là teacher hoặc student thì hiển thị các ListItemButton sau
            <React.Fragment>
                <ListItemButton component={Link} to="Danh sách bài thi">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách bài thi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/totalQuestion">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách câu hỏi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/layoutManagerQuestion">
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Hồ sơ của tôi"}
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
            </React.Fragment>)}
    </React.Fragment>);
};


export default MainListItems;

// export const secondaryListItems = (
//     <React.Fragment>
//         <ListSubheader component="div" inset>
//             Saved reports
//         </ListSubheader>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon/>
//             </ListItemIcon>
//             <ListItemText primary="Current month"/>
//         </ListItemButton>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon/>
//             </ListItemIcon>
//             <ListItemText primary="Last quarter"/>
//         </ListItemButton>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon/>
//             </ListItemIcon>
//             <ListItemText primary="Year-end sale"/>
//         </ListItemButton>
//     </React.Fragment>
// );
