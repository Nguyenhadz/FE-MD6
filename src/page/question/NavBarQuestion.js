// import './NavbarAdmin.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {logout} from "../../service/UserService";

export default function NavbarAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const user = useSelector(state => {
    //     return state.users.currentUser;
    // })
    // const handleLogout = () => {
    //     // Dispatch action logout
    //     dispatch(logout());
    //     toast.success('\n' +
    //         'Logout successfully\n', {});
    //     navigate('/')
    // };
    return (
        <div className={"w-full"}>
            <div className={"w-fit h-5"}>
            </div>

            <div className={"w-fit h-16"} onClick={() => {
                navigate('/home');
            }}>
                <img className={"w-28 h-10 ml-3"} src={'https://cf.quizizz.com/img/qfw/Logo.png'} alt={'...'}/>
            </div>

            <div className={"w-full h-10 flex items-center hover:bg-blue-100"}
                 onClick={() => {
                     navigate('/home');
                 }}>
                <img className={"ml-3 w-4 h-4"}
                     src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-home-24%20(1).png?alt=media&token=8528cb79-3169-4d62-b5be-570c5f16e124'}
                     alt={'...'}
                />
                <p className={"ml-2 justify-center"}>Trang chủ</p>
            </div>


            <Link to={"/home/LayoutManagerQuestion/listQuestion"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"} >
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/category-icon.png'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Danh sách câu hỏi</p>
                </div>
            </Link>

            <Link to={"/home/LayoutManagerQuestion/CreateQuestion"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"} >
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/category-icon.png'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Tạo câu hỏi mới</p>
                </div>
            </Link>


        </div>
    )
}