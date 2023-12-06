import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchInput.css';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {findStudentByMail, findStudentByName} from "../../service/UserService"; // File CSS cho component
export default function AdminFindTeacher() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('1'); // Giá trị mặc định
    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearch = () => {
        if (selectedField === '1' ) {
            console.log('1' + searchTerm)
        } else {
            console.log('2' + searchTerm)
        }
    };

    useEffect(() => {
    }, [selectedField]);

    return (
        <div className="horizontalNav" style={{margin: '0 0 0 10%', width: '100%',height: '65px', display: 'flex', position: 'fixed', zIndex: '10', backgroundColor: 'white'}}>
            <div className="search-container">
                <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)}/>
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <select className="search-select" value={selectedField} onChange={handleFieldChange}>
                <option value="1">Tìm kiếm Giáo viên</option>
                <option value="2">Tìm kiếm theo email</option>
            </select>
            <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
    )
}