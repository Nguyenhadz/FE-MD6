import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {findStudentByMail, findStudentByName} from "../../service/UserService"; // File CSS cho component
export default function AdminFindStudent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('1'); // Giá trị mặc định
    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearch = () => {
        if (selectedField === '1' ) {
            console.log('1' + searchTerm)
            dispatch(findStudentByName(searchTerm))
            navigate('/home/showListStudentFindByName')
        } else {
            console.log('2' + searchTerm)
            dispatch(findStudentByMail(searchTerm))
            navigate('/home/showListStudentFindByMail')
        }
    };

    useEffect(() => {
    }, [selectedField]);

    return (
        <div className="col-span-8 w-full items-center">
            <div className={"w-full h-16 bg-white flex items-center relative"}>
                <input className={"w-8/12 h-10 ml-4 border border-gray-300 rounded-lg pl-12"} type="text"
                       placeholder="Search..."
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <FontAwesomeIcon icon={faSearch} className="absolute ml-10"/>
                <select className={"ml-5"} value={selectedField} onChange={handleFieldChange}>
                    <option value="1">Tìm kiếm theo tên</option>
                    <option value="2">Tìm kiếm theo email</option>
                </select>
                <button className={"w-20 h-10 rounded-lg ml-5 hover:bg-amber-50"}
                        onClick={handleSearch}>Search
                </button>
            </div>
        </div>
    )
}