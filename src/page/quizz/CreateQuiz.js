import * as React from 'react';
import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {useDispatch, useSelector} from "react-redux";
import {findAll} from "../../redux/service/QuestionService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import {Search} from "@mui/icons-material";
import {FormControl, InputBase, InputLabel, Select, styled} from "@mui/material";
import {
    findStudentByMail,
    findStudentByName,
    findTeacherByMail,
    findTeacherByName
} from "../../redux/service/UserService";

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function CreateQuiz() {
    const questions = useSelector((store) => {
        return store.questionStore.questions
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findAll());

    }, [dispatch]);
    console.log(questions)
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const searchTermRef = React.useState('');
    const [selectedField, setSelectedField] = React.useState('0');

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    useEffect(() => {
        if (questions && questions.length > 0) {
            const updatedLeft = questions.map((question) => ({
                id: question.id,
                content: question.content,
                answerId: question.answers.map((answer) => answer.id),
                answerContent: question.answers.map((answer) => answer.content),
                answerStatus: question.answers.map((answer) => answer.status),
            }));
            setLeft(updatedLeft);
        }
    }, [questions]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '30ch'
            },
        },
    }));
    const handleChange = (event) => {
        setSelectedField(event.target.value);
    };
    const handleSearch = () => {
        if (selectedField === 3) {
            dispatch(findTeacherByName(searchTermRef.current))
        } else if (selectedField === 4) {
            dispatch(findTeacherByMail(searchTermRef.current))
        } else if (selectedField === 1) {
            dispatch(findStudentByName(searchTermRef.current))
        } else if (selectedField === 2) {
            dispatch(findStudentByMail(searchTermRef.current))
        }
    };
    const customList = (title, items) => (
        <Card className={"w-fit h-full"}>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Nội dung…"
                        onChange={(event) => (searchTermRef.current = event.target.value)}
                    />
                </Search>
                <Button onClick={handleSearch}>Tìm kiếm</Button>
            </Box>

            <CardHeader
                sx={{px: 4, py: 1}}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title.id}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider/>
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    value={value.id}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={
                                    <Typography dangerouslySetInnerHTML={{__html: value.content}}>

                                    </Typography>}
                            />
                            <ListItemText
                                id={labelId}
                                primary={
                                    <Typography>
                                        A. {value.answerContent}
                                    </Typography>}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item>{customList('Choices', left)}</Grid>

            <Grid item>
                <Grid container direction="column" alignItems="center">

                    <Button
                        sx={{my: 0.5}}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{my: 0.5}}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('Chosen', right)}</Grid>
        </Grid>
    );
}