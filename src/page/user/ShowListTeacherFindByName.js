import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import './ShowListStudent.css';
import {useEffect, useState} from "react";
import {findStudentByMail, findStudentByName, findTeacherByMail, findTeacherByName} from "../../service/UserService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
export default function ShowListTeacherFindByName() {
    const teachers = useSelector(state => {
        return Array.from(state.users.users)
    })
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('1'); // Giá trị mặc định
    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearch = () => {
        if (selectedField === '1' ) {
            dispatch(findTeacherByName(searchTerm))
            navigate('/home/showListTeacherFindByName')
        } else {
            dispatch(findTeacherByMail(searchTerm))
            navigate('/home/showListTeacherFindByMail')
        }
    };

    useEffect(() => {
    }, [selectedField]);

    return(
        <div>
            <div className="horizontalNav" style={{margin: '0 0 0 0', width: '100%',height: '65px', display: 'flex', position: 'fixed', zIndex: '10', backgroundColor: 'white'}}>
                <div className="search-container">
                    <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)}/>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>
                <select className="search-select" value={selectedField} onChange={handleFieldChange}>
                    <option value="1">Tìm kiếm theo tên</option>
                    <option value="2">Tìm kiếm theo email</option>
                </select>
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            <div>
                {teachers.length > 0 ? (
                    <div className="showListStudent">
                        <h1>Danh sách giáo viên</h1>
                        <hr></hr>
                        <div className="container">
                            <div className="row" style={{width: '1500px'}}>
                                {teachers.map((item, index)=>(
                                    <div className="card col-2" >
                                        <div className="image-student">
                                            <img src={`${item.image}`} className="card-img-top" alt={'...'} style={{width: '100%', height: '100%'}}/>
                                        </div>
                                        <div className="card-body" style={{marginBottom: '20px'}}>
                                            <h5 className="card-title">{item.name}</h5>
                                            <div style={{position: 'absolute', bottom: '10px', marginTop: 'auto' }}><Link to={'/home/userDetail/' + item.id}>Xem chi tiết</Link></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="showListStudent">
                        <h1>Không có giáo viên nào có tên bạn muốn tìm</h1>
                    </div>
                )}
            </div>
        </div>



    )
}