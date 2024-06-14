import { useEffect, useState, React } from 'react'
import { addToCart, getCart, placeBookOrder } from '../../services/home.service';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

function Cart() {

    const [cartData, setCartData] = useState([])
    const router = useNavigate();

    useEffect(() => {
        getCart().then((r) => {
            setCartData(r.data)
        })
    }, []);

    const removeItem = (id) => {
        addToCart(id, 0).then((r) => {
            if (r.code === '1') {
                getCart().then((r) => {
                    setCartData(r.data)
                })
                toast.success(`Item successfully removed in your cart.`, {
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

    const placeOrder = () => {
        placeBookOrder().then((r) => {
            if (r.code === '1') {
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Your order has been placed successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    router('/my-order');
                }, 1500);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: r.message,
                    timer: 1500
                });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="row my-0 mx-0 p-0 d-flex justify-content-center">
                <div className="d-flex align-items-center justify-content-between mt-3 col-md-8 mx-auto">
                    <Link to={'/'} className='btn btn-outline-secondary'><IoMdArrowRoundBack className='me-1' size={20} />Back</Link>
                    <h4 className='h4 text-center mt-3'>My Cart</h4>
                </div>
                <div className='col-md-8 bg-white mt-3 p-3'>
                    {cartData.length > 0 ? (
                        cartData.map((v, i) => (
                            <div className="row m-0 w-100" key={v.id}>
                                <div className="col-2 p-3 d-flex align-items-center justify-content-center">
                                    <img src={v.thumbnail} alt={'book'} className='thumbnail-preview' />
                                </div>
                                <h5 className='h5 col-3 m-0 my-auto align-items-center text-center text-con'>{v.title}</h5>
                                <h5 className='h5 text-secondary m-0 col-2 d-flex align-items-center justify-content-center'>₹{v.price}</h5>
                                <h5 className='h5 text-secondary m-0 col-1 d-flex align-items-center justify-content-center'>{v.quantity}</h5>
                                <h5 className='h5 text-primary m-0 col-2 d-flex align-items-center justify-content-center'><b>₹{v.price * v.quantity}</b></h5>
                                <div className="col-2 p-0 d-flex align-items-center justify-content-center"><button className='btn btn-outline-danger' onClick={() => removeItem(v.book_id)}>Remove</button></div>
                            </div>
                        ))

                    ) : (
                        <div className="alert alert-warning">No Cart Item Found!</div>
                    )}
                    {cartData.length > 0 && (<>
                        <hr></hr>
                        <button className='btn btn-info float-end ms-5' onClick={() => placeOrder()}>Place Order</button>
                        <h5 className='h5 float-end text-con mb-0 mt-2'>Total : ₹{(cartData.reduce((a, v) => a = a + (v.quantity * v.price), 0))}</h5>
                    </>)}
                </div>

            </div>
        </>
    )
}

export default Cart
