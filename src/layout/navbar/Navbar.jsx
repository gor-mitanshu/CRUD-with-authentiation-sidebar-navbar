const Navbar = ({ handleDrawerOpen }) => {
     const user = JSON.parse(localStorage.getItem('loggedUser'));
     return (
          <nav className="navbar navbar-expand-lg navbar-light p-3 px-md-4" style={ { backgroundColor: "rgba(0, 102, 102, 0.06)" } }>
               <div className="w-100 d-block">
                    <div className="row justify-content-between align-items-center">
                         <div className="col-2 d-flex align-items-center justify-content-start" style={ { cursor: "pointer" } } onClick={ () => handleDrawerOpen(true) }>
                              <i className="bi bi-list"></i>
                         </div>
                         <div className="col-8 d-flex align-items-center justify-content-center">
                              <span className="">Welcome, <b>{ user.firstName }</b></span>
                         </div>
                         <div className="col-2 d-flex align-items-center justify-content-end" style={ { cursor: "pointer" } }>
                              <i className="bi bi-person-circle fs-3"></i>
                         </div>
                    </div>
               </div>
          </nav>
     );
};

export default Navbar;
