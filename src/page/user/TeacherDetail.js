import "./UserDetail.css";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getStudentById} from "../../service/UserService";
import {useEffect} from "react";
import ConfirmDeleteComponent from "../../component/ConfirmDeleteComponent";
export default function TeacherDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getStudentById(id))
    }, [])
    const user = useSelector(state => {
        return state.users.user;
    })
    const handleDelete = () => {
        // Dispatch action logout
        dispatch(deleteUser(id))
        navigate('/home/showListTeacher')
    };
    const timeCreate = new Date(user.timeCreate);
    const dayCreate = timeCreate.getDate();
    const monthCreate = timeCreate.getMonth() + 1;
    const yearCreate = timeCreate.getFullYear();
    const lastTimeVisit = new Date(user.lastTimeVisit);
    const dayLast = lastTimeVisit.getDate();
    const monthLast = lastTimeVisit.getMonth() + 1;
    const yearLast = lastTimeVisit.getFullYear();
    return (
        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center" style={{margin: '200px 0 0 270px'}}>
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img src={`${user.image}`}
                                                 className="img-radius" alt={'...'} style={{width: '140px', height: '140px', borderRadius: '50%', margin: '0 0 0 -5px'}}/>
                                        </div>
                                        <h6 className="f-w-600">{user.name}</h6>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{user.username}</h6>
                                            </div>
                                            <div className="col-sm-12">
                                                <p className="m-b-10 f-w-600">Tên</p>
                                                <h6 className="text-muted f-w-400">{user.name}</h6>
                                            </div>
                                            <div className="col-sm-12">
                                                <p className="m-b-10 f-w-600">Ngày tạo tài khoản</p>
                                                <h6 className="text-muted f-w-400">{dayCreate}-{monthCreate < 10 ? '0' + monthCreate : monthCreate}-{yearCreate}</h6>
                                            </div>
                                            <div className="col-sm-12">
                                                <p className="m-b-10 f-w-600">Lần truy cập cuối cùng</p>
                                                <h6 className="text-muted f-w-400">{dayLast}-{monthLast < 10 ? '0' + monthLast : monthLast}-{yearLast}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <div onClick={()=>{
                                                    navigate('/home/showListTeacher')
                                                }}><button type="button" className="btn btn-primary">Trở Lại</button></div>
                                            </div>
                                            <div className="col-sm-6">
                                                <ConfirmDeleteComponent
                                                    onDelete={handleDelete}
                                                    id={id}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}