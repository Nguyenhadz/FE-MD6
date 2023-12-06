import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getStudent} from "../../service/UserService";
import './ShowListStudent.css';
export default function ShowListStudent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getStudent())
    },[])
    const students = useSelector(state => {
        console.log(state.users.users)
        return Array.from(state.users.users)
    })

    return(
        <div className="showListStudent">
            <h1>Danh sách học viên</h1>
            <hr></hr>
            <div className="container">
                <div className="row" style={{width: '1500px'}}>
                    {students.map((item, index)=>(
                        <div className="card col-2" >
                            <div className="image-student">
                                <img src={`${item.image}`} className="card-img-top" alt={'...'} style={{width: '100%', height: '100%'}}/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <Link to={'/home/userDetail/' + item.id}>Xem chi tiết</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}