import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getTeacher} from "../../service/UserService";
import NavBarQuestion from "./NavBarQuestion";
import {Outlet} from "react-router";

export default function LayoutManagerQuestion() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTeacher())
    }, [])

    return (
        <div className="flex flex-col justify-center h-full"
             style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}
        >
            <div className={"w-full flex flex-grow"}>
                <div className={"ml-0 mt-0 w-[200px] border border-yellow-300 bg-blue-400 h-full"}>
                    <NavBarQuestion></NavBarQuestion>
                </div>
                <div className={"w-full flex justify-center bg-amber-6000 h-full items-center"}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}