import React, { useEffect, useState } from 'react';
import banner from "../../assets/images/01.jpg"
import { IoMailOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import ImportedUrl from '../../utils/api';
import axios from 'axios';
import { passwordValidation } from '../../utils/common';

const Signin = ({ setAuthToken }) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordValidError, setPasswordValidError] = useState(false);

    const [captcha, setCaptcha] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
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

    const handleClick = async (e) => {
        if (!userName) {
            setUserNameError(true)
        }
        if (!password) {
            setPasswordError(true)
        }

        if (inputValue === captcha) {
            setCaptcha(generateCaptcha());
            setInputValue('');
            setErrorMessage('');
        } else {
            setErrorMessage('Incorrect CAPTCHA, please try again.');
            setInputValue('');
            setCaptcha(generateCaptcha());
        }

        if (userName && password) {
            let formData = {
                username: userName,
                password: password
            }

            await axios.post(ImportedUrl.API.signin, formData)
                .then(res => {
                    setErrorMessage('');
                    setUserName('');
                    setPassword('');
                    localStorage.setItem('token', res.data.token);
                    setAuthToken(res.data.token);
                    navigate('/');
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    const generateCaptcha = (length = 6) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            captcha += characters[randomIndex];
        }
        return captcha;
    };

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);



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
                        <h2 className='text-center mb-4'>Sign In</h2>
                        <form>
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
                            <div className='form-group'>
                                <label htmlFor="captchaInput">Enter the CAPTCHA:</label>
                                <div className="captcha-box">{captcha}</div>
                                <input
                                    type="text"
                                    id="captchaInput"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    required
                                    className='mt-3'
                                />
                                {errorMessage && <p className="error">{errorMessage}</p>}
                            </div>
                            <Link to='/' >Forgot password?</Link>
                            <button type="button" class="btn btn-primary mt-3" onClick={handleClick}>Sign In</button>
                            <p className='text-center'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;