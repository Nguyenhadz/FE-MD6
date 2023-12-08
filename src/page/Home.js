import React from "react";
import NavbarAdmin from "../component/NavbarAdmin";
import AdminFindStudent from "./find/AdminFindStudent";
import {Outlet} from "react-router-dom";



export default function Home() {
    return (
        <div>
            <NavbarAdmin/>
            {/*<AdminFindStudent></AdminFindStudent>*/}
            <div style={{backgroundColor: 'whitesmoke', height: '200vh', margin: '0 0 0 170px'}}>
                <Outlet></Outlet>
                {/*<Outlet></Outlet>*/}
            </div>
        </div>

    )
}