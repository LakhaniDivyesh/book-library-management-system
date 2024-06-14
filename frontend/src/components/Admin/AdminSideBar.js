import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { BiBookAdd } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";

export default function AdminSideBar() {
    let location = useLocation();
    return (
        <>
            <div className="col-md-2 sidebar">

                <Link to={'/admin-panel'} className='side-link'>
                    <div className={`side-item ${location.pathname === '/admin-panel' && 'active-item'}`} >
                        <FaHome className='side-icon'/>
                        <p>Home</p>
                    </div>
                </Link>
                <Link to={'/add-book'} className='side-link'>
                    <div className={`side-item ${location.pathname === '/add-book' && 'active-item'}`}>
                        <BiBookAdd className='side-icon'/>
                        <p>Add Book</p>
                    </div>
                </Link>
                <Link to={'/all-orders'} className='side-link'>
                    <div className={`side-item ${location.pathname === '/all-orders' && 'active-item'}`}>
                        <FaShoppingCart className='side-icon'/>
                        <p>All Orders</p>
                    </div>
                </Link>
                {/* <Link to={'/add-book'}>add book</Link>
                <Link to={'/all-orders'}>All orders</Link> */}

            </div>
        </>
    )
}
