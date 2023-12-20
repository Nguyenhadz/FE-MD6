import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import {Tabs as BaseTabs} from '@mui/base/Tabs';
import {TabsList as BaseTabsList} from '@mui/base/TabsList';
import {TabPanel as BaseTabPanel} from '@mui/base/TabPanel';
import {buttonClasses} from '@mui/base/Button';
import {Tab as BaseTab, tabClasses} from '@mui/base/Tab';
import {useDispatch, useSelector} from "react-redux";
import {findAllQuiz} from "../../redux/service/QuizService";
import Box from "@mui/material/Box";
import {Pagination} from "@mui/material";
import {store} from "../../redux/store/Store";
import DetailQuizForUser from "./DetailQuizForUser";

export default function ShowAllQuiz() {
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    const dispatch = useDispatch();

    const [quizzes, setQuizzes] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(findAllQuiz());
            setQuizzes(store.getState().quizzes.quizzes);
        };
        fetchData();
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;
    const handleChangePage = (event, newValue) => {
        setCurrentPage(newValue);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleQuizzes = quizzes?.slice(startIndex, startIndex + itemsPerPage);
    return (
        <>
            <Tabs value={value} orientation="vertical" sx={{width: "100%", height: "full"}}>
                <Box sx={{width: '100%', display: 'flex'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        orientation="vertical"
                        sx={{borderRight: 1, borderColor: 'divider'}}
                    >
                        <TabsList>
                            {visibleQuizzes?.map((quiz, index) => (
                                <Tab value={index} sx={{display: 'block'}}>
                                    <div style={{wordWrap: 'break-word', textAlign: 'left'}}>Bài thi: {index + 1}</div>
                                    <div style={{wordWrap: 'break-word', textAlign: 'left'}}>{quiz.title}</div>
                                </Tab>
                            ))}
                        </TabsList>
                    </Tabs>

                    {visibleQuizzes?.map((quiz, index) => (
                        <TabPanel index={index} sx={{width: '100%'}}>
                            <DetailQuizForUser quizId={quiz.id}/>
                        </TabPanel>
                    ))}
                </Box>
            </Tabs>
            <Pagination
                count={Math.ceil(quizzes?.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                sx={{marginTop: '16px'}}
            />
        </>
    );
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Tab = styled(BaseTab)`
    font-family: 'IBM Plex Sans', sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    height: 100px;
    padding: 12px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: ${blue[400]};
    }

    &:focus {
        color: #fff;
        outline: 3px solid ${blue[200]};
    }

    &.${buttonClasses.focusVisible} {
        background-color: #fff;
        color: ${blue[600]};
    }

    &.${tabClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &.${tabClasses.selected} {
        background-color: #fff;
        color: ${blue[600]};
    }
`;

const TabPanel = styled(BaseTabPanel)`
    width: 95%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
`;

const Tabs = styled(BaseTabs)`
    display: flex;
    gap: 16px;
    width: 30%;
`;

const TabsList = styled(BaseTabsList)(
    ({theme}) => `
  min-width: 80px;
  width: 100%;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  padding: 6px;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);