import React from "react";
import NavbarAdmin from "../component/NavbarAdmin";
import {Outlet} from "react-router-dom";
import ResponsiveAppBar from "../component/Navbar";

export default function Home() {
    return (
        <div className="row grid grid-cols-9 h-screen">
            <div className="col-span-1 h-full">
                <NavbarAdmin/>
            </div>
            <div className="col-span-8 bg-gray-300 h-full">
                <ResponsiveAppBar></ResponsiveAppBar>
                <Outlet></Outlet>
            </div>
        </div>
    )
}