import './NavbarAdmin.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../service/UserService";
import {toast} from "react-toastify";
export default function NavbarAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => {
        console.log(state.user.currentUser)
        return state.user.currentUser
    })
    const handleLogout = () => {
        // Dispatch action logout
        dispatch(logout());
        toast.success('\n' +
            'Logout successfully\n', {
        });
        navigate('/')
    };
    return (
        <div className={'navbar-vertical'}>
            <div className="logo-image" onClick={()=>{
                navigate('/');
            }}>
                <img src={'https://cf.quizizz.com/img/qfw/Logo.png'} alt={'...'} style={{width: '55%', height: '40px', margin: '20px 17px'}}/>
            </div>
            <div className="elementNav" style={{display: 'flex', textAlign: 'center', width: '100%', height: '40px', margin: '10px 0 0 0'}}>
                <img src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-home-24%20(1).png?alt=media&token=8528cb79-3169-4d62-b5be-570c5f16e124'} alt={'...'} style={{margin: '15px 7px 0 15px', width: '15px', height: '15px', textAlign: 'center'}}/>
                <p style={{margin: '10px 0 0 -35px', width: '150px', height: '15px', color: 'rgb(136 84 192 / var(--tw-text-opacity))', textAlign: 'center'}}>Trang chủ</p>
            </div>
            <div className="elementNav" style={{display: 'flex', textAlign: 'center', width: '100%', height: '40px'}}>
                <img src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-test-80.png?alt=media&token=d4488616-f14e-4df7-860e-30a2571628d3'} alt={'...'} style={{margin: '15px 7px 0 15px', width: '15px', height: '15px', textAlign: 'center'}}/>
                <p style={{margin: '10px -8px', width: '150px', height: '15px'}}>Danh sách bài thi</p>
            </div>
            <div className="elementNav" style={{display: 'flex', textAlign: 'center', width: '100%', height: '40px'}}>
                <img src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-list-view-80.png?alt=media&token=db66eda9-6f3a-49b2-bcb3-fe4bda7939ac'} alt={'...'} style={{margin: '15px 7px 0 15px', width: '15px', height: '15px', textAlign: 'center'}}/>
                <p style={{margin: '10px 5px', width: '150px', height: '15px'}}>Danh sách giáo viên</p>
            </div>

            <div className="elementNav" style={{display: 'flex', textAlign: 'center', width: '100%', height: '40px'}}>
                <img src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-list-view-80.png?alt=media&token=db66eda9-6f3a-49b2-bcb3-fe4bda7939ac'} alt={'...'} style={{margin: '15px 7px 0 15px', width: '15px', height: '15px', textAlign: 'center'}}/>

                <p style={{margin: '10px 0px', width: '150px', height: '15px'}}><Link to={"/home/showListStudent"}>Danh sách học viên</Link></p>

            </div>

            <div className="elementNav" style={{display: 'flex', textAlign: 'center', width: '100%', height: '40px'}}>
                <img src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-analytics-100.png?alt=media&token=5fd96729-bf20-4de0-a48d-0838dcd32bc9'} alt={'...'} style={{margin: '15px 6px 0 14px', width: '18px', height: '18px', textAlign: 'center'}}/>
                <p style={{margin: '10px -12px', width: '100px', height: '15px'}}>Thống kê</p>
            </div>
            <div className="elementNav" style={{display: 'flex', textAlign: 'center', width: '100%', height: '40px'}}>
                <img src={'https://firebasestorage.googleapis.com/v0/b/test1-80dfc.appspot.com/o/images%2Ficons8-logout-50.png?alt=media&token=1f6e0ff9-dbeb-4164-9db8-d2e4c27e04ac'} alt={'...'} style={{margin: '15px 8px 0 17px', width: '12px', height: '12px', textAlign: 'center'}}/>
                <p style={{margin: '10px -8px', width: '100px', height: '15px'}} onClick={handleLogout}>Đăng xuất</p>
            </div>
            <div className="info-login" style={{display: 'flex', alignItems: 'center'}}>
                <img src={'https://devo.vn/wp-content/uploads/2023/01/meo-buon-ba.jpg'} alt={'...'} style={{width: '40px', height: '40px', borderRadius: '50%', margin: '0 10px 0 10px'}}/>
                <p style={{textAlign: 'center', margin: '0 0 0 0'}}>{userLogin.username}</p>
            </div>
        </div>
    )
}