import {Link, useNavigate} from "react-router-dom";
import React from "react";


export default function NavBarQuestion() {
    const navigate = useNavigate();
    return (
        <div className={"w-screen h-screen bg-gray-200"}>
            <div className={"w-fit h-5"}>
            </div>

            <div className={"w-fit h-16"} onClick={() => {
                navigate('/home');
            }}>
                <img className={"w-28 h-10 ml-3"} src={'https://cf.quizizz.com/img/qfw/Logo.png'} alt={'...'}/>
            </div>

            <Link to={"/login/layoutManagerQuestion/listQuestion"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fchecklist_5063946.png?alt=media&token=c9a73284-de36-4317-9c67-5f18a063d5f1'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>
                        Danh sách câu hỏi</p>
                </div>
            </Link>

            <Link to={"/login/LayoutManagerQuestion/CreateQuestionOneAnswer"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fpencil_800844.png?alt=media&token=b246d5ec-c628-4d3a-ab86-0e76fb45e8c1'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Tạo câu hỏi mới</p>
                </div>
            </Link>
            <Link to={"/login/LayoutManagerQuestion/CreateQuestionOneAnswer"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fchecklist_5063946.png?alt=media&token=c9a73284-de36-4317-9c67-5f18a063d5f1'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Danh sách bài thi</p>
                </div>
            </Link>
            <Link to={"/login/LayoutManagerQuestion/CreateQuestionOneAnswer"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fchecklist_5063946.png?alt=media&token=c9a73284-de36-4317-9c67-5f18a063d5f1'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Danh sách danh mục</p>
                </div>
            </Link>
            <Link to={"/login/LayoutManagerQuestion/CreateQuestionOneAnswer"} style={{color: 'inherit', textDecoration: 'none'}}>
                <div className={"w-full h-10 flex items-center hover:bg-blue-100"}>
                    <img className={"ml-3 w-3 h-3 mr-1"}
                         src={'https://firebasestorage.googleapis.com/v0/b/kien-b06e6.appspot.com/o/icon%2Fchecklist_5063946.png?alt=media&token=c9a73284-de36-4317-9c67-5f18a063d5f1'}
                         alt={'...'}
                    />
                    <p className={"ml-2 justify-center"}>Danh sách học viên</p>
                </div>
            </Link>
        </div>
    )
}