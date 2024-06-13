import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import FormWrapper from '../../ui/formWrapper/FormWrapper';

const initLoginForm = { email: "", password: "" };

const Login = () => {
     const navigate = useNavigate();
     const [loginData, setLoginData] = useState(initLoginForm);
     const [showPassword, setShowPassword] = useState(false);
     const [error, setError] = useState({});

     const handleClickShowPassword = () => setShowPassword((prev) => !prev);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setLoginData({ ...loginData, [name]: value });
          setError({ ...error, [name]: "" });
     };

     const validateForm = () => {
          const newErrors = {};
          if (!loginData.email) newErrors.email = "Email is required";
          if (!loginData.password) newErrors.password = "Password is required";
          return newErrors;
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const newErrors = validateForm();
          if (Object.keys(newErrors).length > 0) {
               setError(newErrors);
               return;
          }

          try {
               const response = await axios.get(`${process.env.REACT_APP_API}/users`);
               const user = response.data.find(user => user.email === loginData.email && user.password === loginData.password);
               if (user) {
                    localStorage.setItem('loggedUser', JSON.stringify(user));
                    toast.success("Logged in successfully")
                    navigate("/");
               } else {
                    setError({ general: "Invalid email or password" });
               }
          } catch (error) {
               console.error("There was an error logging in!", error);
               setError({ general: "An error occurred. Please try again later." });
          }
     };

     return (
          <>
               <FormWrapper title="Login">
                    <div>
                         <div className="d-flex flex-column">
                              <form onSubmit={ handleSubmit }>
                                   <div className="text-start">
                                        <div className={ `form-input-wrapper ${error.email ? "error-form-input" : ""}` }>
                                             <i className="bi bi-person-fill prefix-icon"></i>
                                             <input
                                                  type="text"
                                                  className="form-input"
                                                  id="email"
                                                  placeholder="Enter Your Email"
                                                  name="email"
                                                  value={ loginData.email }
                                                  onChange={ handleChange }
                                             />
                                        </div>
                                        <div className="input-error">{ error.email }</div>
                                   </div>
                                   <div className="text-start">
                                        <div className={ `form-input-wrapper ${error.password ? "error-form-input" : ""}` }>
                                             <i className="bi bi-lock-fill prefix-icon"></i>
                                             <input
                                                  type={ showPassword ? "text" : "password" }
                                                  className="form-input"
                                                  id="password"
                                                  placeholder="Enter Your Password"
                                                  name="password"
                                                  value={ loginData.password }
                                                  onChange={ handleChange }
                                             />
                                             { !showPassword ? (
                                                  <i onClick={ handleClickShowPassword } className="bi bi-eye-fill postfix-icon"></i>
                                             ) : (
                                                  <i onClick={ handleClickShowPassword } className="bi bi-eye-slash-fill postfix-icon"></i>
                                             ) }
                                        </div>
                                        <div className="input-error">{ error.password }</div>
                                   </div>

                                   { error.general && <div className="input-error">{ error.general }</div> }

                                   <div>
                                        <Link to="/forgetpassword" className="text-decoration-none">
                                             Forgot Password?
                                        </Link>
                                   </div>

                                   <div className="mt-4">
                                        <button type="submit" className="btn btn-primary px-4">
                                             Sign in
                                        </button>
                                        <Link to="/register" className="btn btn-light px-4 ms-3">
                                             Create Account
                                        </Link>
                                   </div>
                              </form>
                         </div>
                    </div>
               </FormWrapper>
          </>
     );
};

export default Login;
