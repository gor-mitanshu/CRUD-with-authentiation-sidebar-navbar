import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import FormWrapper from "../../ui/formWrapper/FormWrapper";

const initialData = {
     firstName: "",
     lastName: "",
     email: "",
     phone: "",
     password: "",
};

const Register = () => {
     const navigate = useNavigate()
     const [registerData, setRegisterData] = useState(initialData);
     const [errors, setErrors] = useState({});
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [showPassword, setShowPassword] = useState(false);

     const handleClickShowPassword = () => setShowPassword((prev) => !prev);
     const handleChange = (e) => {
          const { name, value } = e.target;
          setRegisterData({ ...registerData, [name]: value });
          setErrors({ ...errors, [name]: "" });
     };

     const validateForm = () => {
          const newErrors = {};
          if (!registerData.firstName) newErrors.firstName = "First name is required";
          if (!registerData.lastName) newErrors.lastName = "Last name is required";
          if (!registerData.email) newErrors.email = "Email is required";
          if (!registerData.phone) newErrors.phone = "Phone number is required";
          if (!registerData.password) newErrors.password = "Password is required";
          return newErrors;
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const newErrors = validateForm();
          if (Object.keys(newErrors).length > 0) {
               setErrors(newErrors);
               return;
          }
          setIsSubmitting(true);
          try {
               await axios.post(`${process.env.REACT_APP_API}/users`, registerData);
               setIsSubmitting(false);
               setRegisterData(initialData);
               toast.success("Registration successful!");
               navigate('/login')
          } catch (error) {
               console.error("There was an error submitting the form!", error);
               setIsSubmitting(false);
          }
     };

     return (
          <>
               <FormWrapper title="Create an Account">
                    <form className="row" onSubmit={ handleSubmit }>
                         <div className="col-6">
                              <div className={ `form-input-wrapper ${errors.firstName ? "error-form-input" : ""}` }>
                                   <i className="bi bi-person-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        name="firstName"
                                        value={ registerData.firstName }
                                        onChange={ handleChange }
                                        placeholder="Firstname"
                                   />
                              </div>
                              <div className="input-error">{ errors.firstName }</div>
                         </div>

                         <div className="col-6">
                              <div className={ `form-input-wrapper ${errors.lastName ? "error-form-input" : ""}` }>
                                   <i className="bi bi-person-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        name="lastName"
                                        value={ registerData.lastName }
                                        onChange={ handleChange }
                                        placeholder="Lastname"
                                   />
                              </div>
                              <div className="input-error">{ errors.lastName }</div>
                         </div>

                         <div>
                              <div className={ `form-input-wrapper ${errors.email ? "error-form-input" : ""}` }>
                                   <i className="bi bi-envelope-fill prefix-icon"></i>
                                   <input
                                        type="email"
                                        className="form-input"
                                        name="email"
                                        value={ registerData.email }
                                        onChange={ handleChange }
                                        placeholder="Enter Your Email"
                                   />
                              </div>
                              <div className="input-error">{ errors.email }</div>
                         </div>

                         <div>
                              <div className={ `form-input-wrapper ${errors.phone ? "error-form-input" : ""}` }>
                                   <i className="bi bi-telephone-fill prefix-icon"></i>
                                   <input
                                        type="number"
                                        className="form-input"
                                        name="phone"
                                        value={ registerData.phone }
                                        onChange={ handleChange }
                                        placeholder="Enter Your Phone Number"
                                   />
                              </div>
                              <div className="input-error">{ errors.phone }</div>
                         </div>

                         <div>
                              <div className={ `form-input-wrapper ${errors.password ? "error-form-input" : ""}` }>
                                   <i className="bi bi-lock-fill prefix-icon"></i>
                                   <input
                                        type={ showPassword ? "text" : "password" }
                                        className="form-input"
                                        name="password"
                                        value={ registerData.password }
                                        onChange={ handleChange }
                                        placeholder="Enter a Strong Password"
                                   />
                                   { !showPassword ? (
                                        <i onClick={ handleClickShowPassword } className="bi bi-eye-fill postfix-icon"></i>
                                   ) : (
                                        <i onClick={ handleClickShowPassword } className="bi bi-eye-slash-fill postfix-icon"></i>
                                   ) }
                              </div>
                              <div className="input-error">{ errors.password }</div>
                         </div>

                         <div>
                              Already have an account?{ " " }
                              <Link to="/login" className="text-decoration-none">
                                   Sign in
                              </Link>
                         </div>

                         <div className="mt-4">
                              <button type="submit" className="btn btn-primary px-5" disabled={ isSubmitting }>
                                   { isSubmitting ? "Submitting..." : "Submit" }
                              </button>
                         </div>
                    </form>
               </FormWrapper>
          </>
     );
};

export default Register;
