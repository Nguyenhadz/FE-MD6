import React, {useEffect, useState} from "react";
import {editQuestions, findAllQuestionByUser} from "../../redux/service/QuestionService";
import {showAllCateQuestion} from "../../redux/service/CateQuestionService";
import {findAllTypeQuestion} from "../../redux/service/TypeQuestionService";
import {findAllLevelQuestion} from "../../redux/service/LevelQuestionService";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, FormControl, FormControlLabel, Radio} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
    CheckBoxOutlineBlankSharp, CheckBoxSharp, CheckCircleOutline, RadioButtonUncheckedOutlined
} from "@mui/icons-material";


export default function QuestionDetail({question, handleClose}) {
    const currentUser = useSelector((store) => {
        return store.users.currentUser
    })
    const categoryQuestions = useSelector((store) => {
        return store.cateQuestions.cateQuestions
    })
    const levelQuestions = useSelector((store) => {
        return store.levelQuestionStore.levelQuestions
    })
    const typeQuestions = useSelector((store) => {
        return store.typeQuestionStore.typeQuestions;
    })
    const dispatch = useDispatch();
    const [backgroundColor, setBackgroundColor] = useState("#461A42");
    useEffect(() => {
        dispatch(showAllCateQuestion());
        dispatch(findAllTypeQuestion());
        dispatch(findAllLevelQuestion());
        dispatch(findAllTypeQuestion())
    }, [dispatch]);
    const [selectedValue, setSelectedValue] = React.useState();
    React.useEffect(() => {
        const defaultAnswer = question.answers.find((answer) => answer.status === 1);
        if (defaultAnswer) {
            setSelectedValue(defaultAnswer.id);
        }
    }, [question]);

    const handleFocus = () => {
        setBackgroundColor("#281226");
    };

    const handleBlur = () => {
        setBackgroundColor("#461A42");
    };


    const colors = ["rgb(45 112 174)", "rgb(45 157 166)", "rgb(239 169 41)", "rgb(213 84 109)"]; // Mảng chứa các màu


    return (<>
        <div className={"w-full h-full mt-14 bg-none"}>
            <div className={"rounded-[1rem] w-full bg-fuchsia-700 p-2 justify-center font-bold text-1xl h-max"}
                 style={{boxShadow: '30px 30px 30px 30px rgba(0, 0, 0, 0.2)'}}>
                <form>
                    <Box
                        sx={{
                            overflow: "auto"
                        }}
                        className={"content-question w-full h-48 mr-6 rounded-[0.5rem] p-2  focus: border-purple-400 border-opacity-50 border-2"}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={{backgroundColor: backgroundColor}}>
                        <Typography className={'text-amber-50'}
                                    dangerouslySetInnerHTML={{__html: question.content}}></Typography>
                    </Box>

                    <div className={"answer-question flex justify-around w-full"}>
                        {question.answers.map((answer, index) => (
                            <div key={answer.id} className={"w-1/4"}>
                                <FormControl className={"w-full"}>
                                    <div
                                        className={"w-full h-72 m-2 rounded-[1rem] bg-amber-50 flex flex-column"}
                                        style={{backgroundColor: colors[index % colors.length]}}
                                    >
                                        {question.typeQuestion.id === 1 || question.typeQuestion.id === 2 ? (
                                            <div className="custom-quill-container flex flex-column">
                                                <Radio
                                                    key={answer.id}
                                                    checked={selectedValue === answer.id}
                                                    value={question.answers[index].id}
                                                    name="radio-buttons"
                                                    icon={<RadioButtonUncheckedOutlined
                                                        sx={{
                                                            width: 28, height: 28, marginTop: 2, marginLeft: 1
                                                        }}
                                                    />}
                                                    checkedIcon={<CheckCircleOutline
                                                        sx={{
                                                            width: 28, height: 28, marginTop: 2, marginLeft: 1
                                                        }}
                                                    />}
                                                />
                                            </div>) : (<div className="custom-quill-container flex flex-column">
                                            <FormControlLabel
                                                value={`answer${index}`}
                                                sx={{
                                                    width: 28, height: 28, borderRadius: "50%", display: "flex",
                                                }}
                                                control={
                                                    <Checkbox
                                                        disabled={true}
                                                        defaultChecked={answer.status === 1}
                                                        icon={<CheckBoxOutlineBlankSharp
                                                            sx={{
                                                                width: 28, height: 28, marginTop: 2, marginLeft: 1
                                                            }}
                                                        />}
                                                        checkedIcon={<CheckBoxSharp
                                                            sx={{
                                                                width: 28, height: 28, marginTop: 2, marginLeft: 1
                                                            }}
                                                        />}
                                                    />}
                                                label={""}
                                            />
                                        </div>)}
                                        <Box sx={{
                                            width: 500, maxWidth: "100%", height: "100%", overflow: "auto"
                                        }}
                                             className={'ml-6'}
                                        >
                                            <Typography sx={{fontSize: '16px'}}
                                                        dangerouslySetInnerHTML={{__html: answer.content}}></Typography>

                                        </Box>
                                    </div>
                                </FormControl>
                            </div>))}
                    </div>
                    <div className={"flex h-10 justify-around items-center mt-2 rounded-[1rem] bg-amber-200"}>
                        <select
                            name="question.categoryQuestion.id"
                            value={question.categoryQuestion.id}
                            className={"rounded-[1rem] h-6 w-1/5 text-center"}
                            disabled={true}

                        >
                            {categoryQuestions && categoryQuestions.length > 0 && categoryQuestions.map((category) => (
                                <option key={category.id} value={category.id}>
                                    <Typography dangerouslySetInnerHTML={{__html: category.name}}/>
                                </option>))}
                        </select>
                        <select
                            name="question.typeQuestion.id"
                            value={question.typeQuestion.id}
                            className={"rounded-[1rem] h-6 w-1/5 text-center"}
                            disabled={true}
                        >
                            {typeQuestions.map((type) => (<option key={type.id} value={type.id}>
                                <Typography dangerouslySetInnerHTML={{__html: type.name}}/>
                            </option>))}
                        </select>
                        <select
                            name="question.levelQuestion.id"
                            value={question.levelQuestion.id}
                            className={"rounded-[1rem] h-6 w-1/5 text-center"}
                            disabled={true}

                        >
                            {levelQuestions.map((level) => (
                                <option key={level.id} value={level.id}>{level.name}</option>))}
                        </select>
                    </div>
                    <div className={"flex justify-center"}>
                        <button type="button" onClick={() => handleClose()}
                                className={"h-10 w-40 bg-gray-50 mt-2 border-2 rounded-full hover:text-white hover:bg-slate-900"}>
                            Quay lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>);
}