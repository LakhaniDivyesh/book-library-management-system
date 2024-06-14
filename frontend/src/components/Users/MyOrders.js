import React, { useEffect, useState } from 'react'
import { MdOutlinePendingActions } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { getOrders } from '../../services/home.service';

import Loader from "react-js-loader";

import moment from 'moment'
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

function MyOrders() {

    const [orderData, setOrderData] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getOrders(true).then((r) => {
            setOrderData(r.data)
            setLoader(false);
        })

    }, [])

    return (
        <div className="container-fluid pb-4" style={{height: '89.8vh', overflowY: 'auto'}}>
            <div className="d-flex align-items-center justify-content-between mt-3 order-box mx-auto">
                    <Link to={'/'} className='btn btn-outline-secondary'><IoMdArrowRoundBack className='me-1' size={20}/>Back</Link>
                    <h4 className='h4 text-center mt-3'>All Orders</h4>
            </div>
            <div className="row mx-auto my-0 order-box">

                {loader ?
                    <div className='w-100 d-flex align-items-center justify-content-center' style={{ height: '300px' }}>
                        <Loader type="box-rectangular" bgColor={"#eee"} size={80} />
                    </div>
                    :
                    orderData?.length > 0 ? (
                        orderData?.map((v, i) => (
                            <div className="col-12 bg-white order-con" key={i}>
                                <div className="d-flex align-items-center justify-content-start mb-2">
                                        <label className='items'>{moment(v.order_date).format('LL')}</label>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 className='h5 m-0'>{v.order_number}</h5>
                                    <label className={`status ${v.status}`}>{v.status === 'pending' ? <MdOutlinePendingActions className='me-1' size={15} /> : v.status === 'accept' ? <TiTick className='me-1' size={20} /> : <ImCross className='me-1' size={10} />}
                                    {v.status === 'pending' ? 'Pending' : v.status === 'accept' ? 'Accepted' : 'Rejected'}
                                    </label>
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
        </div>
    )
}

export default MyOrders
