import React, { useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import ImportedUrl from '../../../utils/api';
import axios from 'axios';

const Viewleads = () => {
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
    return (
        <section id="content-wrapper">
            <div class="lead_sec">
                <div class="table-controls">
                    <h3>View Lead</h3>
                    <Link to={'/listlead'}><button class="sort-btn" ><span><IoChevronBack /></span>Back</button></Link>
                </div>
            </div>
            <div>
                <p><strong>Name : </strong> <span>{data.name}</span>{data.name}</p>
                <p><strong>Number : </strong> <span>{data.number}</span>{data.name}</p>
                <p><strong>Email : </strong> <span>{data.email}</span>{data.name}</p>
                <p><strong>Product : </strong> <span>{data.product}</span>{data.name}</p>
            </div>
        </section>
    );
};

export default Viewleads;