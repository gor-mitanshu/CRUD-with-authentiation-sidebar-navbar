import React, { useState } from 'react';
import './Profile.css';
import Modal from '../../ui/modal/Modal'
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
     const user = JSON.parse(localStorage.getItem('loggedUser'));
     const [updatedUser, setUpdatedUser] = useState({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
     });
     const [isModalOpen, setIsModalOpen] = useState(false);

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setUpdatedUser(prevUser => ({
               ...prevUser,
               [name]: value
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.put(`http://localhost:2999/users/${user.id}`, updatedUser);
               const newUser = response.data;
               const updatedUserData = { ...user, ...newUser };
               localStorage.setItem('loggedUser', JSON.stringify(updatedUserData));
               toast.success("Update Successful");
               closeModal();
          } catch (error) {
               console.error("There was an error updating the profile!", error);
          }
     };

     return (
          <div className="profile-container">
               { user && (
                    <div className="profile-card">
                         <div className="profile-header">
                              <h2>User Profile</h2>
                         </div>
                         <div className="profile-body">
                              <div className="profile-details">
                                   <p><strong>Name:</strong> { user.firstName } { user.lastName }</p>
                                   <p><strong>Email:</strong> { user.email }</p>
                                   <p><strong>Phone:</strong> { user.phone }</p>
                                   <button onClick={ openModal }>Update Profile</button>
                              </div>
                         </div>
                    </div>
               ) }
               { isModalOpen &&
                    (<Modal show={ isModalOpen } handleCloseModal={ closeModal } title="Update Profile">
                         <form onSubmit={ handleSubmit }>
                              <label>
                                   First Name:
                                   <input
                                        type="text"
                                        name="firstName"
                                        value={ updatedUser.firstName }
                                        onChange={ handleChange }
                                   />
                              </label>
                              <label>
                                   Last Name:
                                   <input
                                        type="text"
                                        name="lastName"
                                        value={ updatedUser.lastName }
                                        onChange={ handleChange }
                                   />
                              </label>
                              <label>
                                   Email:
                                   <input
                                        type="email"
                                        name="email"
                                        value={ updatedUser.email }
                                        onChange={ handleChange }
                                   />
                              </label>
                              <label>
                                   Phone:
                                   <input
                                        type="tel"
                                        name="phone"
                                        value={ updatedUser.phone }
                                        onChange={ handleChange }
                                   />
                              </label>
                              <button type="submit">Update</button>
                         </form>
                    </Modal>)
               }
          </div>
     );
};

export default Profile;
