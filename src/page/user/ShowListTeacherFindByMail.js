import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {findStudentByMail, findStudentByName, findTeacherByMail, findTeacherByName} from "../../service/UserService";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";

export default function ShowListTeacherFindByMail() {
    const teachers = useSelector(state => {
        return Array.from(state.users.users)
    })
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('1'); // Giá trị mặc định
    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        <div>
            {teachers.length > 0 ? (
                <div className="col-span-8 w-full items-center">
                    <div className={"w-full h-16 bg-white flex items-center relative"}>
                        <input className={"w-8/12 h-10 ml-4 border border-gray-300 rounded-lg pl-12"} type="text"
                               placeholder="Search..."
                               onChange={(e) => setSearchTerm(e.target.value)}/>
                        <FontAwesomeIcon icon={faSearch} className="absolute ml-10"/>
                        <select className={"ml-5"} value={selectedField} onChange={handleFieldChange}>
                            <option value="1">Tìm kiếm Giáo viên</option>
                            <option value="2">Tìm kiếm theo email</option>
                        </select>
                        <button className={"w-20 h-10 rounded-lg ml-5 hover:bg-amber-50"}
                                onClick={handleSearch}>Search
                        </button>
                    </div>
                    <div className={"flex items-center justify-center mt-5 mb-5"}><h1 className={"text-5xl"}>Danh sách
                        giáo
                        viên</h1></div>

                    <Box sx={{height: '630px', width: '70%', textAlign: 'center', margin: 'auto'}}>
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
            ) : (
                <div className="col-span-8 w-full items-center">
                    <div className={"w-full h-16 bg-white flex items-center relative"}>
                        <input className={"w-8/12 h-10 ml-4 border border-gray-300 rounded-lg pl-12"} type="text"
                               placeholder="Search..."
                               onChange={(e) => setSearchTerm(e.target.value)}/>
                        <FontAwesomeIcon icon={faSearch} className="absolute ml-10"/>
                        <select className={"ml-5"} value={selectedField} onChange={handleFieldChange}>
                            <option value="1">Tìm kiếm Giáo viên</option>
                            <option value="2">Tìm kiếm theo email</option>
                        </select>
                        <button className={"w-20 h-10 rounded-lg ml-5 hover:bg-amber-50"}
                                onClick={handleSearch}>Search
                        </button>
                    </div>
                    <div className={"flex items-center justify-center mt-5 mb-5"}><h1 className={"text-5xl"}>Không có
                        giáo viên nào có email bạn muốn tìm</h1></div>

                </div>
            )}
        </div>
    )
}