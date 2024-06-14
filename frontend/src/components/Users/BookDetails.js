// import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

import { addToCart, getCart } from '../../services/home.service';
import { IoMdArrowRoundBack } from 'react-icons/io';

function BookDetails() {
    const location = useLocation()
    const v = location.state

    const router = useNavigate();


    let [qnt, setQnt] = useState(0);

    useEffect(()=>{
        if(v === null){
            router('/');
        }
        getCart(v?.id).then((r)=>{
            if(r.data.length > 0 ){
                setQnt(r?.data[0].quantity)
            } 
        })
    },[router,v])

    const addQnt = () => {
        setQnt(++qnt)

        addToCart(v.id, qnt).then((r) => {
            if (r.code === '0') {
                toast.error(r.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
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

    const removeQnt = () => {
        setQnt(--qnt)

        addToCart(v.id, qnt).then((r) => {
            if (r.code === '0') {
                toast.error(r.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
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

    const addCart = () => {
        setQnt(1)

        addToCart(v.id, 1).then((r) => {
            if (r.code === '1') {
                toast.success(`Item successfully added in your cart.`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
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
                    hideProgressBar: false,
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
            <ToastContainer />
            <div className="d-flex align-items-center justify-content-between mt-3 col-md-6 mx-auto">
                    <Link to={'/'} className='btn btn-outline-secondary'><IoMdArrowRoundBack className='me-1' size={20} />Back</Link>
                    <h4 className='h4 text-center mt-3'>Book Details</h4>
            </div>
            <div className="row my-0 mx-0 p-0 d-flex justify-content-center">
                <div className='col-md-6 d-flex flex-row  align-items-center bg-white my-4 p-3'>
                    <div className="row m-0 w-100">
                        <div className="col-md-6 p-3 text-center">
                            <img src={v?.thumbnail} alt='book' className='product-img' style={{ width: "190px", height: "250px" }} />
                        </div>
                        <div className="col-md-6 p-3">
                            <h2 className='h2 title mb-3'>{v?.title}</h2>
                            <h4 className='h4 mb-0 text-primary'>{v?.author}</h4>
                            <h4 className='h4 text-success w-100 price mt-2 mb-0 '>₹{v?.price}</h4>
                            <label className='text-secondary w-100 price mt-1 mb-0 '>{v?.no_of_page} Page</label>
                            <label className='text-secondary w-100 price mt-1 mb-0 '>{v?.tags}</label>
                            <a href={v?.pdf} target='_blank' rel="noopener noreferrer"><button className='btn btn-primary mt-4 mb-0'>View Book</button></a>
                        </div>
                        <div className='col-md-12'>
                            {qnt === 0 ? (
                                <div className="row m-0 w-100 mt-3 d-flex justify-content-center align-items-center">
                                    <div className="col-5 p-0"><button className='btn btn-warning w-100' onClick={() => addCart()}>Add To Cart</button></div>
                                </div>
                            ) : (
                                <div className="row m-0 w-100 mt-3 d-flex justify-content-center align-items-center">
                                    <div className="col-2 p-0"><button className='btn btn-light w-100' onClick={() => removeQnt()}>-</button></div>
                                    <div className="col-2 p-0"><input className='form-control w-100 text-center' value={qnt} /></div>
                                    <div className="col-2 p-0"><button className='btn btn-light w-100' onClick={() => addQnt()}>+</button></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
            {/* <div className='text-center'>
                <Link to={'/'} className='btn btn-secondary '>Back to home</Link>
            </div> */}

            <Helmet>
                <title>Book | Home</title>
            </Helmet>

        </>
    )
}

export default BookDetails
