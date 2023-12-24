import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LayersIcon from '@mui/icons-material/Layers';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Home} from "@mui/icons-material";
import {PiExam} from "react-icons/pi";
import QuizIcon from '@mui/icons-material/Quiz';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
const MainListItems = ({sidebarOpen}) => {

    const user = useSelector(state => state.users.currentUser);

    const isAdmin = user.roles[0].authority === 'ADMIN' || user.roles[0].name === 'ADMIN';
    const isTeacher = user.roles[0].authority === 'TEACHER' || user.roles[0].name === 'TEACHER';
    const isStudent = user.roles[0].authority === 'STUDENT' || user.roles[0].name === 'STUDENT';
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
                <ListItemButton component={Link} to="/home/showAllQuiz">
                    <ListItemIcon>
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách bài thi"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/home/showListCateQuiz">
                    <ListItemIcon>
                        <CategoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh mục bài thi"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/home/totalQuestion">
                    <ListItemIcon>
                        <QuizIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách câu hỏi"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/home/showListStudent">
                    <ListItemIcon>
                        <PeopleAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Danh sách học sinh'}/>
                </ListItemButton>
                <ListItemButton component={Link} to="/home/showListTeacher">
                    <ListItemIcon>
                        <EscalatorWarningIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Danh sách giáo viên'}/>
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/home/showTeacherPending">
                    <ListItemIcon>
                        <PersonAddIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={primaryTypographyProps}
                        primary={'Danh sách giáo viên chờ duyệt'}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/layoutManagerQuestion">
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Thư viện của tôi"}/>
                </ListItemButton>
            </React.Fragment>)}
        {isTeacher && ( // nếu là teacher hoặc student thì hiển thị các ListItemButton sau
            <React.Fragment>
                <ListItemButton component={Link} to="/home/showAllQuiz">
                    <ListItemIcon>
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách bài thi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/createQuiz">
                    <ListItemIcon>
                        <PiExam/>
                    </ListItemIcon>
                    <ListItemText primary="Tạo mới bài thi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/totalQuestion">
                    <ListItemIcon>
                        <QuizIcon/>
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
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Thư viện của tôi"}
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
            </React.Fragment>)}
        {isStudent && ( // nếu là teacher hoặc student thì hiển thị các ListItemButton sau
            <React.Fragment>
                <ListItemButton
                    component={Link} to="/home/showAllQuiz">
                    <ListItemIcon>
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách bài thi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/totalQuestion">
                    <ListItemIcon>
                        <QuizIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Danh sách câu hỏi"
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/home/layoutManagerQuestion">
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Thư viện của tôi"}
                        // primaryTypographyProps={primaryTypographyProps}
                    />
                </ListItemButton>
            </React.Fragment>)}
    </React.Fragment>);
};


export default MainListItems;

