import React, { useEffect, useState } from 'react'
// import { MdOutlinePendingActions } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { getOrders, updateOrderStatus } from '../../services/home.service';
// import { IoMdArrowRoundBack } from "react-icons/io";

import Loader from "react-js-loader";
import { useNavigate } from 'react-router-dom';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'

function AllOrders() {

    const [orderData, setOrderData] = useState([]);
    const [loader, setLoader] = useState(true);

    const router = useNavigate();

    var user = JSON.parse(localStorage.getItem('user') || '[]');
    useEffect(() => {
        if (user[0].role !== 'admin') {
            router('/login');
        }
    })

    useEffect(() => {
        getOrders(false).then((r) => {
            setOrderData(r.data)
            setLoader(false);
        })

    }, [])

    const updateStatus = (order_id, status) => {
        updateOrderStatus(order_id, status).then((r) => {
            if (r.code === '1') {
                getOrders(false).then((r) => {
                    setOrderData(r.data)
                })
                var msg = status === 'accept' ? `Order accepted!` : `Order rejected!`
                toast.success(msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                toast.error(r.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        })
    }

    return (
        <>
            <div className="col-md-10 px-5 pb-4" style={{ height: '90vh', overflowY: 'auto' }}>
            <ToastContainer />
                {/* <div className="container-fluid pb-4"> */}
                    {/* <div className="d-flex align-items-center justify-content-between mt-3 order-box mx-auto">
                        <Link to={'/admin-panel'} className='btn btn-outline-secondary'><IoMdArrowRoundBack className='me-1' size={20} />Back</Link>
                        <h4 className='h4 text-center mt-3'>All Orders</h4>
                    </div> */}

                    {/* <h5 className='h5 text-center mt-3 me-1'>Pending Orders<MdOutlinePendingActions /></h5> */}
                    <div className="row mx-auto my-0 order-box">

                        {loader ?
                            <div className='w-100 d-flex align-items-center justify-content-center' style={{ height: '300px' }}>
                                <Loader type="box-rectangular" bgColor={"#eee"} size={80} />
                            </div>
                            :
                            orderData?.length > 0 ? (
                                orderData?.map((v, i) => (
                                    <div className="col-12 order-con" style={{ backgroundColor: v.status === 'pending' ? 'white' : '#f1f1f1' }}
                                    key={i}>
                                        <div className="d-flex align-items-center justify-content-start mb-2">
                                            <label className='items '>{moment(v.order_date).format('LL')}</label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <label className='items text-primary'>{v.name}</label>
                                            <label className='items text-primary'>{v.email}</label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5 className='h5 m-0'>{v.order_number}</h5>
                                            {
                                                v.status === 'pending' ?
                                                    <div className='d-flex align-items-center'>
                                                        <button className='btn btn-outline-success status me-2' onClick={() => updateStatus(v.order_id, 'accept')}><TiTick className='me-1' size={20} />Accept</button>
                                                        <button className='btn btn-outline-danger status' onClick={() => updateStatus(v.order_id, 'reject')}><ImCross className='me-1' size={10} />Reject</button>
                                                    </div>
                                                    :
                                                    <label className={`status ${v.status}`}>{v.status === 'accept' ? <TiTick className='me-1' size={20} /> : <ImCross className='me-1' size={10} />}
                                                        {v.status === 'pending' ? 'Pending' : v.status === 'accept' ? 'Accepted' : 'Rejected'}
                                                    </label>
                                            }

                                        </div>
                                        <div className="row mt-2 mx-0 d-flex align-items-center justify-content-between">
                                            <div className="col-6">
                                                {v?.books?.map((b, i) => (
                                                    <div className="d-flex align-items-center justify-content-between w-100 mb-2" key={i}>
                                                        <img src={b.thumbnail} alt="order-book" className='order-image' />

                                                        <label className='items'>{b.title}</label>
                                                        <label className='items'>{b.qnt}X</label>
                                                        <label className='items'>{b.order_price}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="col-3 d-flex flex-column">
                                                <div className="mt-1">
                                                    <label className='items sub w-auto float-end'>₹{v.sub_total}</label>
                                                </div>
                                                <div className="mt-1">
                                                    <label className='items charge w-auto float-end'>+ ₹{v.charge}</label>
                                                </div>
                                                <div className="mt-1 d-flex align-items-center justify-content-between">
                                                    <label className='items px-3'>Pay:</label>
                                                    <label className='items grand w-auto float-end'>₹{v.grand_total}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                                :
                                (
                                    <div className='w-100 d-flex align-items-center justify-content-center'>
                                        <h3 className='h3 text-secondary'>Order not found!</h3>
                                    </div>
                                )

                        }
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default AllOrders
