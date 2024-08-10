import React from 'react';
import { IoMdLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                window.location.reload();
                navigate('/signin');
                swalWithBootstrapButtons.fire({
                    title: "Log out!",
                    text: "Log out your account.",
                    icon: "success"
                });
            } else if (
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
    return (
        <div id="navbar-wrapper">
            <nav class="navbar navbar-inverse">
                <div class="container-fluid" style={{ display: 'flex', justifyContent: 'end' }}>
                    <div class="navbar-header navhe_ico">
                        <Link to="#" class="navbar-brand" id="sidebar-toggle" onClick={handleLogout}><IoMdLogOut /></Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;