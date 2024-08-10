import React, { useEffect, useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSort, FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import ImportedUrl from '../../../utils/api';
const Listlead = () => {
    const navigate = useNavigate();
    const [listRes, setListRes] = useState(null);
    const [seachVa, setSeachVal] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        listDataFun();
    }, []);

    async function listDataFun(query) {
        console.log('------------params', query);

        axios.get(ImportedUrl.API.listLead, { params: { query } })
            .then(res => {
                setListRes(res.data);
            })
            .catch(err => {
                return err;
            })
    }

    const handleView = (ID) => {
        navigate(`/viewlead/${ID}`);

    }
    const handleUpdate = (ID) => {
        navigate(`/addlead/${ID}`);

    }
    const handleDelete = (ID) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(ImportedUrl.API.deleteLead + '/' + ID)
                    .then(data => {
                        listDataFun();
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }).catch(res => {
                        return res.status;
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });

    }
    const handleSearch = (e) => {
        const value = e.target.value;
        setSeachVal(value);
        listDataFun(value);
    }
    const sortingTrigger = () => {
        const sortedData = [...listRes].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setListRes(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }


    return (
        <section id="content-wrapper">
            <div class="lead_sec">
                <div class="table-controls">
                    <h3>List Lead</h3>
                    <div className='in_so'>
                        <button class="sort-btn" onClick={sortingTrigger}><span><FaSort /></span>Sort</button>
                        <div style={{ position: 'relative' }}>
                            <input type="text" id="search" placeholder="Search..." onChange={handleSearch} value={seachVa} />
                            <span className='search_icon'><CiSearch /></span>
                        </div>
                    </div>
                    <Link to={`/addlead/add`}><button class="sort-btn" ><span><FaPlus /></span>Add Lead</button></Link>
                </div>
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Emai id</th>
                            <th>Product</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRes && listRes.length > 0 && listRes.map(item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.number}</td>
                                    <td>{item.email}</td>
                                    <td>{item.product}</td>
                                    <td>
                                        <p>
                                            <span onClick={() => handleView(item._id)}><IoMdEye /></span>
                                            <span onClick={() => handleUpdate(item._id)}><FaEdit /></span>
                                            <span onClick={() => handleDelete(item._id)}><MdDelete /></span>
                                        </p>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Listlead;