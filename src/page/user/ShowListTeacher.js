import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {getTeacher} from "../../service/UserService";
import {DataGrid} from "@mui/x-data-grid";
import Box from '@mui/material/Box';

export default function ShowListTeacher() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTeacher())
    }, [])

    const teachers = useSelector(state => {
        return state.users.users
    })

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
        <div className="col-span-8 w-full h-full items-center"
             style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
            <div className={"text-5xl font-extrabold font-sans text-orange-500 mb-5 flex justify-center"}>
                Danh sách giáo viên
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