import './updateUser.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getStudentById} from "../../service/UserService";

export default function UpdateUser() {
    const dispatch = useDispatch;
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        dispatch(getStudentById(id))
    }, [])
    const user = useSelector(state => {
        console.log(state)
        return state.user.currentUser
    })

    return (
        <>
            <div className={"updateUser"}>
                <p className={"title"}>Settings</p>
                <div className={"body"}>
                    <div className={"profile"}><img
                        src={"https://firebasestorage.googleapis.com/v0/b/casemd6-54b3e.appspot.com/o/Iconmoon-Web-Application-Profile.48.png?alt=media&token=9c80eb15-3ff1-48f6-9a0f-c6d97374eee6"}/>
                        <span>Profile</span>
                    </div>
                    <div className="avatar">
                        <span className={"lineAvatar"}>Avatar</span>
                        <div className={"line1"}>
                            <span className={"rotini"}> Rotini</span>
                            <span className={"nut1"}> > </span>
                        </div>
                    </div>
                    <div className="avatar">
                        <span className={"lineAvatar"}>Name</span>
                        <div className={"line1"}>
                            <span className={"rotini"}> </span>
                            <span className={"nut1"}> > </span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
