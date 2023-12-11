import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findStudentByMail, findStudentByName, getStudent} from "../../service/UserService";
import './ShowListStudent.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {showAllCategoryQuiz} from "../../service/CateQuizService";
export default function ShowListCategoryQuiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(showAllCategoryQuiz())
    },[])
    const categories = useSelector(state => {
        return Array.from(state.categories.categories)
    })
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('1'); // Giá trị mặc định
    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const handleSearch = () => {
        if (selectedField === '1' ) {
            dispatch(findStudentByName(searchTerm))
            navigate('/home/showListStudentFindByName')
        } else {
            dispatch(findStudentByMail(searchTerm))
            navigate('/home/showListStudentFindByMail')
        }
    };

    useEffect(() => {
    }, [selectedField]);

    const columns = [
        {field: 'id', headerName: 'STT', width: 90},
        {
            field: 'name',
            headerName: 'Tên',
            width: 200,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Mô tả',
            width: 200,
            editable: false,
        },
        {
            field: 'details',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <Link to={`/home/userDetail/${params.row.hiddenColumn}`}>
                    <button>Sửa</button>
                </Link>
            ),
        },
    ];

    const rows = [];
    for (let i = 0; i < categories.length; i++) {
        rows.push({
                id: i + 1,
                name: categories[i].name,
                description: categories[i].description,
                hiddenColumn: categories[i].id,
            }
        )
    }

    return(
        <div className="col-span-8 w-full items-center">
            <div className={"w-full h-16 bg-white flex items-center relative"}>
                <input className={"w-8/12 h-10 ml-4 border border-gray-300 rounded-lg pl-12"} type="text"
                       placeholder="Search..."
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <FontAwesomeIcon icon={faSearch} className="absolute ml-10"/>
                <select className={"ml-5"} value={selectedField} onChange={handleFieldChange}>
                    <option value="1">Tìm kiếm học sinh theo tên</option>
                    <option value="2">Tìm kiếm theo email</option>
                </select>
                <button className={"w-20 h-10 rounded-lg ml-5 hover:bg-amber-50"} onClick={handleSearch}>Search</button>
            </div>
            <div className={"flex items-center justify-center mt-5 mb-5"}><h1 className={"text-5xl"}>Danh sách danh mục bài thi</h1></div>

            <Box sx={{height: '630px', width: '40%', textAlign: 'center', margin: 'auto'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}