import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import {DataGrid, GridToolbarContainer} from "@mui/x-data-grid";
import {toast} from "react-toastify";
import {deleteCateQuestion, findCateQuestionById, showAllCateQuestion} from "../../redux/service/CateQuestionService";
import {Button} from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';

export default function ShowListCateQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parser = new DOMParser();
    useEffect(() => {
        dispatch(showAllCateQuestion())
    }, [])
    const categories = useSelector(state => {
        return state.cateQuestions.cateQuestions
    })

    function EditToolbar(props) {
        return (
            <GridToolbarContainer>
                <Link to={"/home/createCateQuestion"}>
                    <Button color="primary" startIcon={<AddIcon/>}>
                        Add record
                    </Button>
                </Link>
            </GridToolbarContainer>
        );
    }

    const handleDelete = (id) => {
        dispatch(deleteCateQuestion(id))
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
            field: 'useCreate',
            headerName: 'Người tạo',
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
                    <button onClick={() => {
                        dispatch(findCateQuestionById(params.row.hiddenColumn)).then((res) => {
                            navigate(`/home/updateCateQuestion/${params.row.hiddenColumn}`)
                        })
                    }}>Sửa
                    </button>
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
                                    <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit"
                                            style={{margin: '20px'}} onClick={() => {
                                        handleDelete(params.row.hiddenColumn);
                                        toast.dismiss();
                                    }}>Xác nhận
                                    </button>
                                    <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit"
                                            style={{margin: '20px'}} onClick={() => toast.dismiss()}>Hủy bỏ
                                    </button>
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
                useCreate: (parser.parseFromString(categories[i].user.name, 'text/html')).body.firstChild.textContent,
                hiddenColumn: categories[i].id,
            }
        )
    }

    return (
        <div className=" w-full h-full items-center"
             style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
            <div className={"flex items-center justify-center mb-5"}>
                <div className={"text-5xl font-extrabold font-sans text-orange-500 mt-2 ml-96 flex justify-center"}>
                    Danh sách danh mục câu hỏi
                </div>

            </div>

            <Box sx={{
                height: '630px',
                width: '80%',
                textAlign: 'center',
                margin: 'auto',
                backgroundColor: 'white',
                borderRadius: '30px',
                "& .MuiDataGrid-root": {
                    border: 'none',
                    color: 'black',
                    fontSize: '16px',
                    padding: '10px',
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
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    disableRowSelectionOnClick
                    className={"text-7xl"}
                />
            </Box>
        </div>
    )
}
