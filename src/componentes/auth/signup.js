import React, { useState } from 'react';
import banner from "../../assets/images/01.jpg"
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImportedUrl from '../../utils/api';
import { passwordValidation } from '../../utils/common';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordValidError, setPasswordValidError] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
            if (value) {
                setNameError(false)
            } else {
                setNameError(true)
            }
        }
        if (name === 'username') {
            setUserName(value);
            if (value) {
                setUserNameError(false)
            } else {
                setUserNameError(true)
            }
        }
        if (name === 'password') {
            setPassword(value);
            if (value) {
                setPasswordError(false);
                if (passwordValidation(value)) {
                    setPasswordValidError(false)
                } else {
                    setPasswordValidError(true)
                    setPasswordError(false)
                }
            } else {
                setPasswordError(true)
                setPasswordValidError(false)
            }
        }
    }

    const handleClick = (e) => {
        if (!name) {
            setNameError(true)
        }
        if (!userName) {
            setUserNameError(true)
        }
        if (!password) {
            setPasswordError(true)
        }

        if (name && userName && password) {
            let formData = {
                name: name,
                username: userName,
                password: password
            }

            axios.post(ImportedUrl.API.signup, formData)
                .then(data => {
                    navigate('/');
                    setName('');
                    setUserName('');
                    setPassword('');
                    console.log('---------------sucesss');

                }).catch(err => {
                    console.log(err);
                })
        }
    }
    return (
        <div className='signup_sec '>
            <div className='row w-100'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                    <div className='img_size w-100 '>
                        <img src={banner} alt='Not found' className='w-100 h-100 ' />
                    </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-center justify-content-center'>
                    <div className='form_part'>
                        <h2 className='text-center mb-4'>Sign Up</h2>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputName">Name </label>
                                <input type="text" class="form-control" name='name' id="exampleInputName" placeholder="Enter Name" autoComplete='off' onChange={handleChange} value={name} />
                                <span><FaUser /></span>
                                <p style={{ display: nameError ? 'block' : 'none' }}>Name is required</p>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">User Name </label>
                                <input type="text" class="form-control" name='username' id="exampleInputEmail1" placeholder="Enter User Name" autoComplete='off' onChange={handleChange} value={userName} />
                                <span><MdOutlineAlternateEmail /></span>
                                <p style={{ display: userNameError ? 'block' : 'none' }}>User name is required</p>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" name='password' id="exampleInputPassword1" placeholder="Enter Password" autoComplete='off' onChange={handleChange} value={password} />
                                <span><RiLockPasswordFill /></span>
                                <p style={{ display: passwordError ? 'block' : 'none' }}>Password is required</p>
                                <p style={{ display: passwordValidError ? 'block' : 'none' }}>Password should be At least one uppercase letter, At least one lowercase letter, At least one special character, At least one number, A minimum of 7 characters</p>
                                </div>
                            <button type="button" class="btn btn-primary mt-4" onClick={handleClick}>Sign Up</button>
                            <p className='text-center'>Don't have an account? <Link to='/signin'>Sign In</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;