import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import SideBar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

const Layout = () => {
     const [open, setOpen] = useState(false);

     const handleDrawerOpen = () => {
          setOpen((prev) => !prev);
     };

     return (
          <>
               <div className={ `layout ${open ? "sidebar-open" : ""}` }>
                    <Navbar handleDrawerOpen={ handleDrawerOpen } />
                    <SideBar open={ open } handleDrawerOpen={ handleDrawerOpen } />
                    <div className="content-wrapper ">
                         <div className="content p-3 p-md-4">
                              <Outlet />
                         </div>
                    </div>
               </div>
          </>
     );
};

export default Layout;
