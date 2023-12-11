import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {findTeacherByMail, findTeacherByName, getTeacher} from "../../service/UserService";
import NavBarQuestion from "./NavBarQuestion";
import {Outlet} from "react-router";

export default function LayoutManagerQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getTeacher())
    }, [])
    const teachers = useSelector(state => {
        return Array.from(state.users.users)
    })
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('1'); // Giá trị mặc định
    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };
    const handleSearch = () => {
        if (selectedField === '1') {
            dispatch(findTeacherByName(searchTerm))
            navigate('/home/showListTeacherFindByName')
        } else {
            dispatch(findTeacherByMail(searchTerm))
            navigate('/home/showListTeacherFindByMail')
        }
    };
    useEffect(() => {
    }, [selectedField]);
    return (
        <div className="flex flex-col justify-center h-full">
            <div className={"w-full h-16 bg-white flex items-center relative"}>
                <input className={"w-8/12 h-10 ml-4 border border-gray-300 rounded-lg pl-12"} type="text"
                       placeholder="Search..."
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <FontAwesomeIcon icon={faSearch} className="absolute ml-10"/>
                <select className={"ml-5"} value={selectedField} onChange={handleFieldChange}>
                    <option value="1">Tìm kiếm câu hỏi</option>
                    <option value="2">Tìm kiếm theo a</option>
                    <option value="3">Tìm kiếm theo b</option>
                    <option value="4">Tìm kiếm theo c</option>
                </select>
                <button className={"w-20 h-10 rounded-lg ml-5 hover:bg-amber-50"} onClick={handleSearch}>Search</button>
            </div>
            <div className={"w-full flex flex-grow"}>
                <div className={"ml-0 mt-0 w-2/12 border border-yellow-300 bg-blue-400 h-full"}>
                    <NavBarQuestion></NavBarQuestion>
                </div>
                <div className={"w-10/12 flex justify-center bg-amber-6000 h-full items-center"}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}