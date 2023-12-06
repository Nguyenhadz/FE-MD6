import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getStudent, getTeacherPending} from "../../service/UserService";
import './ShowListStudent.css';
export default function ShowListTeacherPending() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getTeacherPending())
    },[])
    const teacherPending = useSelector(state => {
        return Array.from(state.users.users)
    })

    return(
        <div className="showListStudent">
            <h1>Danh sách đăng ký giáo viên</h1>
            <hr></hr>
            <div className="container">
                <div className="row" style={{width: '1500px'}}>
                    {teacherPending.map((item, index)=>(
                        <div className="card col-2" >
                            <div className="image-student">
                                <img src={`${item.image}`} className="card-img-top" alt={'...'} style={{width: '100%', height: '100%'}}/>
                            </div>
                            <div className="card-body" style={{marginBottom: '20px'}}>
                                <h5 className="card-title">{item.name}</h5>
                                <div style={{position: 'absolute', bottom: '10px', marginTop: 'auto' }}><Link to={'/home/detailTeacherPending/' + item.id}>Xem chi tiết</Link></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}