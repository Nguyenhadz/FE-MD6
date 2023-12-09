import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmDeleteComponent = ({ onDelete, id }) => {
    const handleDelete = () => {
        toast.warning(
            <>
                <div>
                    <p>Bạn có chắc chắn muốn xóa?</p>
                    <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit" style={{margin: '20px'}} onClick={() => {onDelete(id); toast.dismiss();}}>Xác nhận</button>
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
    };

    return (
        <button
            type="button" className={"w-20 h-10 bg-amber-600 rounded text-white"}
            onClick={handleDelete}
        >
            Xoá
        </button>
    );
};

export default ConfirmDeleteComponent;