import React from "react";
import NavbarAdmin from "../component/NavbarAdmin";
import {Outlet} from "react-router-dom";



export default function Home() {
    return (
        <div className="grid grid-cols-9 h-screen">
            <div className="col-span-1">
                    <NavbarAdmin/>
            </div>
            <div className="col-span-8 bg-gray-300">
                <Outlet></Outlet>
            </div>
        </div>
    )
}