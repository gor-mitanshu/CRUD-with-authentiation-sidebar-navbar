import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Sidebar = ({ open, handleDrawerOpen }) => {
     const navigate = useNavigate()
     const handleLogout = () => {
          Swal.fire({
               title: 'Confirm logout',
               text: "Are you sure you want to log out?",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, logout!'
          }).then((result) => {
               if (result.isConfirmed) {
                    localStorage.clear()
                    navigate("/login");
                    toast.success("Logout Successfully");
               } else {
                    return;
               }
          })
     };
     return (
          <div className={ `sidebar ${open ? "" : "close"}` }>
               { open ? (
                    <div
                         className="d-flex align-items-center justify-content-end p-3"
                         style={ { height: "72px" } }
                    >
                         <div onClick={ handleDrawerOpen } role="button">
                              <i className="bi bi-x-lg"></i>
                         </div>
                    </div>
               ) : (
                    <div
                         className="d-flex align-items-center justify-content-center"
                         style={ { height: "72px" } }
                    >
                         <div
                              className="text-end d-flex"
                              onClick={ handleDrawerOpen }
                              role="button"
                         >
                              <i className="bi bi-list fs-4" style={ { paddingLeft: "0" } }></i>
                         </div>
                    </div>
               ) }

               <ul className="navbar-nav">
                    <li className="nav-item">
                         <NavLink to="/dashboard" className="nav-link">
                              <i className="bi bi-speedometer2 me-2"></i> Dashboard
                         </NavLink>
                    </li>
                    <li className="nav-item">
                         <NavLink to="/profile" className="nav-link">
                              <i className="bi bi-person me-2"></i> Profile
                         </NavLink>
                    </li>
                    <li className="nav-item">
                         <NavLink to="/users" className="nav-link">
                              <i className="bi bi-person-rolodex me-2"></i> Users
                         </NavLink>
                    </li>
                    <li className="nav-item" onClick={ handleLogout }>
                         <div className="nav-link">
                              <i className="bi bi-box-arrow-right me-2"></i> Logout
                         </div>
                    </li>
               </ul>
          </div>
     );
};

export default Sidebar;