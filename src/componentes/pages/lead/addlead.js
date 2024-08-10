import React, { useEffect, useState } from 'react';
import { IoMdSave } from 'react-icons/io';
import { IoChevronBack } from 'react-icons/io5';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ImportedUrl from '../../../utils/api';
import axios from 'axios';
import { emailValidate } from '../../../utils/common';
import Swal from 'sweetalert2';

const Addlead = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [data, setData] = useState({});
    useEffect(() => {
        const
            fetchData = async () => {
                try {
                    const response = await axios.get(ImportedUrl.API.viewLead + '/' + id);
                    setData(response.data);
                } catch (err) {
                    return (err);
                }
            };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (data) {
            setName(data.name || '')
            setNumber(data.number || '')
            setEmail(data.email || '')
            setProduct(data.product || '')
        }
    }, [data])

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [product, setProduct] = useState('');


    const [nameError, setNameError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [numberLengthError, setNumberLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailLengthError, setEmailLengthError] = useState(false);
    const [productError, setProductError] = useState(false);
    const handleKeyDown = (e) => {
        // Allow navigation keys, backspace, delete, etc.
        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Escape', 'Enter'
        ];

        if (
            allowedKeys.includes(e.key) ||
            /^[0-9]$/.test(e.key)
        ) {
            return; // Allow the key press
        }

        e.preventDefault(); // Prevent the key press
    };
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
        if (name === 'number') {
            setNumber(value);
            if (value) {
                setNumberError(false);
                if ((value.length < 10)) {
                    setNumberLengthError(true);
                    setNumberError(false);
                } else {
                    setNumberLengthError(false)
                }
            } else {
                setNumberError(true);
                setNumberLengthError(false)
            }
        }
        if (name === 'email') {
            setEmail(value);
            if (value) {
                setEmailError(false);
                if (emailValidate(value)) {
                    setEmailLengthError(true)
                    setEmailError(false);
                } else {
                    setEmailLengthError(false)
                }
            } else {
                setEmailError(true)
                setEmailLengthError(false)
            }
        }
        if (name === 'product') {
            setProduct(value);
            if (value) {
                setProductError(false)
            } else {
                setProductError(true)
            }
        }
    }
    const handleClick = async (e) => {
        if (!name) {
            setNameError(true)
        }
        if (!number) {
            setNumberError(true)
        }
        if (!email) {
            setEmailError(true)
        }
        if (!product) {
            setProductError(true)
        }

        if (name && number && email && product) {
            let formData = {
                name: name,
                number: number,
                email: email,
                product: product
            }

            if (id !== 'add') {
                await axios.put(ImportedUrl.API.updateLead + '/' + id, formData)
                    .then(data => {
                        navigate('/listlead');
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been updated",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        setName('');
                        setNumber('');
                        setEmail('');
                        setProduct('');
                    }).catch(err => {
                        console.log(err);
                    })
            } else {
                await axios.post(ImportedUrl.API.addLead, formData)
                    .then(data => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        setName('');
                        setNumber('');
                        setEmail('');
                        setProduct('');
                    }).catch(err => {
                        console.log(err);
                    })
            }

        }
    }
    return (
        <div>
            <section id="content-wrapper">
                <div class="lead_sec">
                    <div class="table-controls">
                        <h3>{id === 'add' ? 'Add' : 'Update'} Lead</h3>

                        <Link to={'/listlead'}><button class="sort-btn" ><span><IoChevronBack /></span>Back</button></Link>
                    </div>
                    <form>
                        <div className='row'>
                            <div className='col-6'>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="name" name='name' placeholder='Enter Name' onChange={handleChange} value={name} />
                                    <p style={{ display: nameError ? 'block' : 'none' }}>Name is required</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div class="mb-3">
                                    <label for="number" class="form-label">Number</label>
                                    <input type="text" class="form-control" maxlength="10" id="number" name='number' placeholder='Enter Number' onChange={handleChange} onKeyDown={handleKeyDown} value={number} />
                                    <p style={{ display: numberError ? 'block' : 'none' }}>Number is required</p>
                                    <p style={{ display: numberLengthError ? 'block' : 'none' }}>Enter valid number</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div class="mb-3">
                                    <label for="emai" class="form-label">Email</label>
                                    <input type="text" class="form-control" id="email" name='email' placeholder='Enter Name' onChange={handleChange} value={email} />
                                    <p style={{ display: emailError ? 'block' : 'none' }}>Email is required</p>
                                    <p style={{ display: emailLengthError ? 'block' : 'none' }}>Enter valid email</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div class="mb-3">
                                    <label for="number" class="form-label">Product</label>
                                    <select class="form-select" aria-label="Default select example" name='product' onChange={handleChange} value={product}>
                                        <option value="" selected>Open this select menu</option>
                                        <option value="ETL Hive product-1">ETL Hive product-1</option>
                                        <option value="ETL Hive product-2">ETL Hive product-2</option>
                                        <option value="ETL Hive product-3">ETL Hive product-3</option>
                                    </select>
                                    <p style={{ display: productError ? 'block' : 'none' }}>Product is required</p>
                                </div>
                            </div>
                        </div>

                        <button type="button" class="btn btn-primary float-end sort-btn mt-4" onClick={handleClick}><span><IoMdSave /></span>{id === 'add' ? 'Submit' : 'Update'}</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Addlead;