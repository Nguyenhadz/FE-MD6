// import './NavbarAdmin.css';
import './style/tailwindNavbar.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../service/UserService";
import {toast} from "react-toastify";

export default function NavbarAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => {
        return state.users.currentUser;
    })
    const handleLogout = () => {
        // Dispatch action logout
        dispatch(logout());
        toast.success('\n' +
            'Logout successfully\n', {});
        navigate('/')
    };
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

            <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                <img className={"ml-3 w-4 h-4"}
                     src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-test-80.png?alt=media&token=d4488616-f14e-4df7-860e-30a2571628d3'}
                     alt={'...'}
                />
                <p className={"ml-2 justify-center"}>Danh sách bài thi</p>
            </div>

            <Link to={"/home/showListCateQuiz"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"} >
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/category-icon.png'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Danh mục bài thi</p>
                </div>
            </Link>

            <Link to={"/home/showListCateQuestion"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"} >
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/category-icon.png'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Danh mục câu hỏi</p>
                </div>
            </Link>

            {((user.roles[0].authority === 'TEACHER') || (user.roles[0].authority === 'STUDENT')) &&
                <Link to={"123"} style={{color: 'inherit', textDecoration: 'none'}}>
                    <div className={"w-full h-10 flex items-center hover:bg-blue-100"} >
                        <img className={"ml-3 w-4 h-4"}
                             src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-list-view-80.png?alt=media&token=db66eda9-6f3a-49b2-bcb3-fe4bda7939ac'}
                             alt={'...'}
                        />
                        <p className={"ml-2 justify-center"}>Thư viện của tôi</p>
                    </div>
                </Link>}

            {(user.roles[0].authority === 'ADMIN') &&
                <Link to={"/home/showListStudent"} style={{color: 'inherit', textDecoration: 'none'}}>
                    <div className={"w-full h-10 flex items-center hover:bg-blue-100"} >
                        <img className={"ml-3 w-4 h-4"}
                             src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-list-view-80.png?alt=media&token=db66eda9-6f3a-49b2-bcb3-fe4bda7939ac'}
                             alt={'...'}
                        />
                        <p className={"ml-2 justify-center"}>Danh sách học viên</p>
                    </div>
                </Link>}


            {(user.roles[0].authority === 'ADMIN') &&
                <Link to={"/home/showListTeacher"} style={{color: 'inherit', textDecoration: 'none'}}>
                    <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                        <img className={"ml-3 w-4 h-4"}
                             src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-list-view-80.png?alt=media&token=db66eda9-6f3a-49b2-bcb3-fe4bda7939ac'}
                             alt={'...'}
                        />
                        <p className={"ml-2 justify-center"}>Danh sách giáo viên</p>
                    </div>
                </Link>}

            {(user.roles[0].authority === 'ADMIN') &&
                <Link to={"/home/showTeacherPending"} style={{color: 'inherit', textDecoration: 'none'}}>
                    <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                        <img className={"ml-3 w-4 h-4"}
                             src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-list-view-80.png?alt=media&token=db66eda9-6f3a-49b2-bcb3-fe4bda7939ac'}
                             alt={'...'}
                        />
                        <p className={"ml-2 justify-center"}>Đăng ký giáo viên</p>
                    </div>
                </Link>}

            <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                <img className={"ml-3 w-4 h-4"}
                     src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-analytics-100.png?alt=media&token=5fd96729-bf20-4de0-a48d-0838dcd32bc9'}
                     alt={'...'}
                />
                <p className={"ml-2 justify-center"}>Thống kê</p>
            </div>

            <Link to={"/home/findUserById/" + user.id} style={{color: 'inherit', textDecoration: 'none'}}>
            <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                <img className={"ml-3 w-4 h-4"}
                     src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-user-account-25.png?alt=media&token=9e5cf6ec-764d-4d5d-860d-e0b96845474d'}
                     alt={'...'}
                />
                <p className={"ml-2 justify-center"}>Hồ sơ</p>
            </div>
            </Link>

            <div className={"w-full h-10 flex items-center hover:bg-blue-100"} onClick={handleLogout}>
                <img className={"ml-3 w-4 h-4"}
                     src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-logout-50.png?alt=media&token=1f6e0ff9-dbeb-4164-9db8-d2e4c27e04ac'}
                     alt={'...'}
                />
                <p className={"ml-2 justify-center"}>Đăng xuất</p>
            </div>

            <div className={"w-full h-10 flex items-center hover:bg-blue-100 mt-[180%]"}>
                <img className={"ml-3 w-8 h-8 rounded-full"}
                     src={`${user.image}`}
                     alt={'...'}
                />
                <p className={"ml-2 justify-center"}>{user.name}</p>
            </div>

        </div>
    )
}