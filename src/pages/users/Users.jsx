import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../ui/modal/Modal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Users = () => {
     const [users, setUsers] = useState([]);
     const [selectedUser, setSelectedUser] = useState(null);
     const [editUser, setEditUser] = useState(null);
     const [isUserModalOpen, setUserModalOpen] = useState(false);
     const [isEditModalOpen, setEditModalOpen] = useState(false);
     const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

     useEffect(() => {
          axios.get('http://localhost:2999/users')
               .then(response => {
                    const filteredUsers = response.data.filter(user => user.id !== loggedUser.id);
                    setUsers(filteredUsers);
               })
               .catch(error => {
                    console.error('Error fetching users:', error);
               });
     }, [loggedUser.id]);

     const handleView = (user) => {
          setSelectedUser(user);
          setUserModalOpen(true);
     };

     const handleEdit = (user) => {
          setEditUser(user);
          setEditModalOpen(true);
     };

     const handleCloseUserModal = () => {
          setSelectedUser(null);
          setUserModalOpen(false);
     };

     const handleCloseEditModal = () => {
          setEditUser(null);
          setEditModalOpen(false);
     };

     const handleDelete = (user) => {
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
                    axios.delete(`http://localhost:2999/users/${user.id}`)
                         .then(() => {
                              setUsers(users.filter(u => u.id !== user.id));
                              toast.success("Deleted Successfully")
                         })
                         .catch(error => {
                              console.error('Error deleting user:', error);
                              toast.error("Error deleting user");
                         });
               } else {
                    return;
               }
          })
     };

     const handleSaveEdit = (updatedUser) => {
          axios.put(`http://localhost:2999/users/${editUser.id}`, updatedUser)
               .then(() => {
                    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
                    setEditUser(null);
                    setEditModalOpen(false);
                    toast.success("Updated Successfully")
               })
               .catch(error => {
                    console.error('Error updating user:', error);
                    toast.error("Error updating user");
               });
     };

     const handleEditFormSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const updatedUser = {
               id: editUser.id,
               firstName: formData.get('firstName'),
               lastName: formData.get('lastName'),
               email: formData.get('email'),
               phone: formData.get('phone')
          };
          handleSaveEdit(updatedUser);
     };

     const columns = [
          { headerName: 'ID', field: 'id', sortable: true, filter: true, flex: 1 },
          { headerName: 'Firstname', field: 'firstName', sortable: true, filter: true, flex: 1 },
          { headerName: 'Lastname', field: 'lastName', sortable: true, filter: true, flex: 1 },
          { headerName: 'Email', field: 'email', sortable: true, filter: true, flex: 1 },
          { headerName: 'Phone', field: 'phone', sortable: true, filter: true, flex: 1 },
          {
               headerName: 'Actions',
               field: 'actions',
               flex: 1,
               cellRenderer: (params) => (
                    <>
                         <button className="btn btn-secondary btn-sm me-2" onClick={ () => handleView(params.data) }>
                              <i className="bi bi-eye-fill"></i> View
                         </button>
                         <button className="btn btn-primary btn-sm me-2" onClick={ () => handleEdit(params.data) }>
                              <i className="bi bi-pencil-fill"></i> Edit
                         </button>
                         <button className="btn btn-danger btn-sm" onClick={ () => handleDelete(params.data) }>
                              <i className="bi bi-trash-fill"></i> Delete
                         </button>
                    </>
               ),
               width: 120,
               suppressSizeToFit: true,
          },
     ];

     return (
          <div>
               <div className="ag-theme-alpine" style={ { height: '400px', width: '100%' } }>
                    <div className='d-flex justify-content-between'>
                         <h3>Users</h3>
                         <Link to={ '/users/addUser' } className='btn btn-primary'>Add User</Link>
                    </div>
                    <div style={ { width: '100%', height: '100%' } } className='p-4'>
                         <div
                              style={ { width: '100%', height: '100%' } }
                              className="ag-theme-quartz"
                         >
                              <AgGridReact
                                   rowData={ users }
                                   columnDefs={ columns }
                                   pagination={ true }
                                   paginationPageSize={ 5 }
                              />
                         </div>
                    </div>
               </div>

               { selectedUser && (
                    <Modal
                         show={ isUserModalOpen }
                         handleCloseModal={ handleCloseUserModal }
                         title="User Details"
                    >
                         <p><strong>Name:</strong> { selectedUser.firstName + " " + selectedUser.lastName }</p>
                         <p><strong>Email:</strong> { selectedUser.email }</p>
                         <p><strong>Phone:</strong> { selectedUser.phone }</p>
                    </Modal>
               ) }

               { editUser && (
                    <Modal
                         show={ isEditModalOpen }
                         handleCloseModal={ handleCloseEditModal }
                         title="Edit User"
                    >
                         <form onSubmit={ handleEditFormSubmit }>
                              <label>
                                   First Name:
                                   <input type="text" name="firstName" defaultValue={ editUser.firstName } />
                              </label>
                              <label>
                                   Last Name:
                                   <input type="text" name="lastName" defaultValue={ editUser.lastName } />
                              </label>
                              <label>
                                   Email:
                                   <input type="email" name="email" defaultValue={ editUser.email } />
                              </label>
                              <label>
                                   Phone:
                                   <input type="text" name="phone" defaultValue={ editUser.phone } />
                              </label>
                              <button type="submit">Save</button>
                         </form>
                    </Modal>
               ) }
          </div>
     );
};

export default Users;
