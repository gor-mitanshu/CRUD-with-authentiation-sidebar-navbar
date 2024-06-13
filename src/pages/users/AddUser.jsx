import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               await axios.post('http://localhost:2999/users', formData);
               navigate('/users');
          } catch (error) {
               console.error('Error adding user:', error);
          }
     };

     return (
          <div className="container mt-4">
               <h3>Add User</h3>
               <form onSubmit={ handleSubmit }>
                    <div className="mb-3">
                         <label htmlFor="firstName" className="form-label">First Name</label>
                         <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              value={ formData.firstName }
                              onChange={ handleChange }
                         />
                    </div>
                    <div className="mb-3">
                         <label htmlFor="lastName" className="form-label">Last Name</label>
                         <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              value={ formData.lastName }
                              onChange={ handleChange }
                         />
                    </div>
                    <div className="mb-3">
                         <label htmlFor="email" className="form-label">Email</label>
                         <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={ formData.email }
                              onChange={ handleChange }
                         />
                    </div>
                    <div className="mb-3">
                         <label htmlFor="phone" className="form-label">Phone</label>
                         <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={ formData.phone }
                              onChange={ handleChange }
                         />
                    </div>
                    <div className="d-flex gap-2">
                         <button type="button" className="btn btn-danger">Cancel</button>
                         <button type="submit" className="btn btn-primary">Add</button>
                    </div>
               </form>
          </div>
     );
};

export default AddUser;
