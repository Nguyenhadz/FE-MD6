import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    findTeacherByMail,
    findTeacherByName,
    getTeacher
} from "../../service/UserService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {DataGrid} from "@mui/x-data-grid";
import Box from '@mui/material/Box';

export default function ShowListTeacher() {
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

    const columns = [
        {field: 'id', headerName: 'STT', width: 90},
        {
            field: 'name',
            headerName: 'Tên',
            width: 200,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: false,
        },
        {
            field: 'timeCreate',
            headerName: 'Ngày tạo tài khoản',
            width: 200,
            editable: false,
        },
        {
            field: 'lastTime',
            headerName: 'Lần truy cập cuối cùng',
            sortable: false,
            width: 200,
        },
        {
            field: 'details',
            headerName: '',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <Link to={`/home/teacherDetail/${params.row.hiddenColumn}`}>
                    <button>Chi tiết</button>
                </Link>
            ),
        },
    ];

    const rows = [];
    for (let i = 0; i < teachers.length; i++) {
        const timeCreate = new Date(teachers[i].timeCreate);
        const dayCreate = timeCreate.getDate();
        const monthCreate = timeCreate.getMonth() + 1;
        const yearCreate = timeCreate.getFullYear();
        const lastTimeVisit = new Date(teachers[i].lastTimeVisit);
        const dayLast = lastTimeVisit.getDate();
        const monthLast = lastTimeVisit.getMonth() + 1;
        const yearLast = lastTimeVisit.getFullYear();
        const hoursLast = lastTimeVisit.getHours();
        const minutesLast = lastTimeVisit.getMinutes()
        const millisecondsLast = lastTimeVisit.getMilliseconds()
        rows.push({
                id: i + 1,
                name: teachers[i].name,
                email: teachers[i].username,
                timeCreate: (dayCreate + '-' + ((monthCreate < 10) ? '0' + monthCreate : monthCreate) + '-' + yearCreate),
                lastTime: (dayLast + '-' + ((monthLast < 10) ? '0' + monthLast : monthLast) + '-' + yearLast + ' ' + ((hoursLast < 10) ? '0' + hoursLast : hoursLast) + ':' + ((minutesLast < 10) ? '0' + minutesLast : minutesLast) + ':' + millisecondsLast),
                hiddenColumn: teachers[i].id,
            }
        )
    }

    return (
        <div className="col-span-8 w-full h-full items-center" style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
            <div className={"w-full h-16 bg-white flex items-center relative"}>
                <input className={"w-8/12 h-10 ml-4 border border-gray-300 rounded-lg pl-12"} type="text"
                       placeholder="Search..."
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <FontAwesomeIcon icon={faSearch} className="absolute ml-10"/>
                <select className={"ml-5"} value={selectedField} onChange={handleFieldChange}>
                    <option value="1">Tìm kiếm Giáo viên</option>
                    <option value="2">Tìm kiếm theo email</option>
                </select>
                <button className={"w-20 h-10 rounded-lg ml-5 hover:bg-amber-50"} onClick={handleSearch}>Search</button>
            </div>
            <div className={"text-5xl font-extrabold font-sans text-orange-500 mt-5 mb-5 flex justify-center"}>Danh sách giáo
                viên
            </div>

            <Box sx={{
                height: '630px',
                width: '70%',
                textAlign: 'center',
                margin: 'auto',
                backgroundColor: 'white',
                borderRadius: '30px',
                "& .MuiDataGrid-root": {
                    border: 'none',
                    color: 'black',
                    fontSize: '16px',
                    padding: '20px',
                },
                boxShadow: '30px 30px 30px 30px rgba(0, 0, 0, 0.2)'
            }}>
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