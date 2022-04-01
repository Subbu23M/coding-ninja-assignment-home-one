import { useState } from "react";
import axios from "axios";
import validator from 'validator';
import swal from "sweetalert";
import {FaEye,FaEyeSlash} from 'react-icons/fa';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typePassword, setTypePassword] = useState('password');
    const [icon, setIcon] = useState(FaEyeSlash);

    // Event Handler as callback function
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    // Event Handler as callback function
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    // Event Handler as callback function
    const handleTogglePasswordIcon = () => {
        if (typePassword === 'password') {
            setIcon(FaEye);
            setTypePassword('text');
        } else {
            setIcon(FaEyeSlash);
            setTypePassword('password');
        }
    }

    // To store form errors in object
    const [loginFormErrors, setLoginFormErrors] = useState({});

    // To track errors in component
    const findErrors = {};

    // Form validation
    const runFormValidation = () => {
        // For email
        if (email.trim().length === 0) {
            // Object operations - creating new property along with value
            findErrors['email'] = 'email cannot be blank';
        } else if (!validator.isEmail(email)) {
            findErrors['email'] = 'invalid email format';
        }

        // For password
        if (password.length === 0) {
            findErrors['password'] = 'password cannot be blank'
        }
    }

    // Event Handler as callback function
    const handleSubmit = (e) => {
        // Stop browser to reload
        e.preventDefault();

        // Invoke function
        runFormValidation();

        if (Object.keys(findErrors).length === 0) {
            setLoginFormErrors({});

            const userDetails = {
                email: email,
                password: password
            }
            // console.log(userDetails);

            const baseURL = 'https://reqres.in/api/login';

            // Asynchronous Operation
            axios
                .post(baseURL, userDetails)

                // success
                .then((response) => {
                    const result = response.data;
                    // console.log(result);

                    if (result.hasOwnProperty('errors')) {
                        swal(result.errors);
                    } else {
                        swal('you are logged in successfully');

                        // To reset input fields
                        // Invoke State functions
                        setEmail('');
                        setPassword('');

                        // Store JWT_TOKEN in memory
                        localStorage.setItem('JWT_TOKEN', result.token);

                        // Navigate user to Home Page
                        props.history.push('/');

                        // Invoke function
                        props.handleLoginCallBackFunc();
                    }
                })

                // failure
                .catch((error) => {
                    swal(error.message);
                })
        } else {
            // console.log(findErrors);
            setLoginFormErrors(findErrors);
        }
    }

    return(
        <>
            {/* row */}
            <div className="row parentRow">
                {/* col */}
                <div className="col-lg-4 mx-auto marginTop">
                    <div className="card p-3 rounded">
                        <div
                            className="d-flex justify-content-center align-items-center"
                        >
                            <button
                                className="btn btnLogo text-uppercase"
                            >
                                logo
                            </button>
                        </div>

                        <div className="sudoContent d-flex justify-content-center align-items-center">    
                            <p
                                className="paraGraph lead"
                            >
                                sign in using email
                            </p>
                        </div>

                        <form
                            autoComplete="off"
                            className="form"
                        >
                            {/* 1 */}
                            <div className="form-group">
                                <input 
                                    type="text"
                                    value={email}
                                    className=' form-control form-control-md'
                                    placeholder='eg,abc@salestable.com'
                                    onChange={handleEmail}
                                />
                                {
                                    loginFormErrors.email && <span className="text-danger mx-2 mt-1">{loginFormErrors.email} </span>
                                }
                            </div>
                            
                            {/* 2 */}
                            <div className="form-group formPassword">
                                <input 
                                    type={typePassword}
                                    value={password}
                                    className=' form-control form-control-md'
                                    placeholder='*******'
                                    onChange={handlePassword}
                                />
                                <span
                                    onClick={handleTogglePasswordIcon}
                                    className='icon'
                                >
                                    {icon}
                                </span>
                                {
                                    loginFormErrors.password && <span className="text-danger mx-2 mt-1">{loginFormErrors.password} </span>
                                }
                            </div>

                            <div
                                className="d-flex justify-content-center align-items-center"
                            >
                                    <button
                                        className='btn btn-primary text-light btn-block mx-2 my-2'
                                        onClick={handleSubmit}
                                    >
                                        Sign in 
                                    </button>    
                            </div>
                        </form>
                    </div>
                </div>
                {/* end of col */}
            </div>
            {/* end of row */}
        </>
    )
}

export default LoginPage