import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findStudentByMail, findStudentByName} from "../../service/UserService";
import '../user/ShowListStudent.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {deleteCateQuiz, findCateQuizById, showAllCategoryQuiz} from "../../service/CateQuizService";
import {toast} from "react-toastify";
import {deleteCateQuestion, showAllCateQuestion} from "../../service/CateQuestionService";

export default function ShowListCateQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parser = new DOMParser();
    useEffect(() => {
        dispatch(showAllCateQuestion())
    }, [])
    const categories = useSelector(state => {
        return Array.from(state.cateQuestions.cateQuestions)
    })
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('1'); // Giá trị mặc định
    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };
    const handleSearch = () => {
        if (selectedField === '1') {
            dispatch(findStudentByName(searchTerm))
            navigate('/home/showListStudentFindByName')
        } else {
            dispatch(findStudentByMail(searchTerm))
            navigate('/home/showListStudentFindByMail')
        }
    };

    useEffect(() => {
    }, [selectedField]);

    const handleDelete = (id) => {
        dispatch(deleteCateQuestion(id)).then(()=>{
                toast.success('Xoá danh mục thành công!')
            }
        )
    };

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
            field: 'update',
            headerName: '',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <button onClick={()=>{
                        dispatch(findCateQuizById(params.row.hiddenColumn)).then((res)=> {
                            navigate(`/home/updateCateQuiz/${params.row.hiddenColumn}`)
                        })
                    }}>Sửa</button>
                </div>
            ),
        },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <button
                    onClick={() => {
                        toast.warning(
                            <>
                                <div>
                                    <p>Bạn có chắc chắn muốn xóa?</p>
                                    <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit" style={{margin: '20px'}} onClick={() => {handleDelete(params.row.hiddenColumn); toast.dismiss();}}>Xác nhận</button>
                                    <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit" style={{margin: '20px'}} onClick={() => toast.dismiss()}>Hủy bỏ</button>
                                </div>
                            </>,
                            {
                                position: 'top-center',
                                autoClose: false,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                closeButton: false,
                            }
                        );
                    }}
                >
                    Xoá
                </button>

            ),
        },
    ];

    const rows = [];
    for (let i = 0; i < categories.length; i++) {
        rows.push({
                id: i + 1,
                name: (parser.parseFromString(categories[i].name, 'text/html')).body.firstChild.textContent,
                description: (parser.parseFromString(categories[i].description, 'text/html')).body.firstChild.textContent,
                hiddenColumn: categories[i].id,
            }
        )
    }

    return (
        <div className="col-span-8 w-full h-full items-center"
             style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
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
            <div className={"flex items-center justify-center mt-5 mb-5"}>
                <div className={"text-5xl font-extrabold font-sans text-orange-500 mt-2 ml-96 flex justify-center"}>Danh sách danh mục câu hỏi
                </div>
                <Link to={"/home/createCateQuiz"}>
                    <button className={"w-44 h-10 rounded-lg ml-56 bg-orange-400 hover:bg-red-500 text-white"}>Thêm mới danh mục
                    </button>
                </Link>
            </div>

            <Box sx={{
                height: '630px',
                width: '50%',
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
                    className={"text-7xl"}
                />
            </Box>
        </div>
    )
}