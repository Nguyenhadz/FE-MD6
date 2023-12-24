import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findResultByQuiz } from "../../redux/service/ResultService";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";
import { GridCellParams } from "@mui/x-data-grid";
import "./showAll.css";

export default function DataTable() {
    const { idQuiz } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const results = useSelector((state) => state.resultStore.results);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        dispatch(findResultByQuiz(idQuiz));
    }, []);

    useEffect(() => {
        const formattedResults = results.map((result, index) => {
            return {
                id: index + 1,
                user: result.user.name,
                date: result.startTime,
                numberTrue: result.numberTrue,
                totalScore: result.totalScore,
            };
        });
        setRows(formattedResults);
    }, [results]);

    const handleButtonClick = (id) => {
        // Xử lý sự kiện khi nút được nhấn, ví dụ: chuyển hướng đến trang chi tiết
        navigate(`/resultDetails/${id}`);
    };

    const columns = [
        { field: "id", headerName: "STT", width: 70, headerClassName: "bold-header" },
        { field: "user", headerName: "Người Thi", width: 160, flex: 1, headerClassName: "bold-header" },
        { field: "date", headerName: "Ngày Thi", width: 160, flex: 1, headerClassName: "bold-header" },
        {
            field: "numberTrue",
            headerName: "Số Câu Đúng",
            type: "number",
            width: 160,
            flex: 1,
            align: "center",
            headerAlign: "center",
            headerClassName: "bold-header",
        },
        {
            field: "totalScore",
            headerName: "Tổng Điểm",
            type: "number",
            width: 160,
            flex: 1,
            align: "center",
            headerAlign: "center",
            headerClassName: "bold-header",
        },
        {
            field: "actions",
            headerName: "Thao tác",
            width: 120,
            headerClassName: "bold-header",
            sortable: false,
            renderCell: (params: GridCellParams) => (
                <Button variant="contained" color="primary" onClick={() => handleButtonClick(params.row.id)}>
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div style={{ height: 630, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
