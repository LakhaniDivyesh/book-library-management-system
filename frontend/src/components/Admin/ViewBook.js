import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import { IoMdArrowRoundBack } from 'react-icons/io'


function ViewBook() {
    const location = useLocation()
    const v = location.state


    var user = JSON.parse(localStorage.getItem('user') || '[]');
    const navigate = useNavigate();
    useEffect(() => {
        if (user[0].role !== 'admin') {
            navigate('/login');
        }
        if(v === null){
            navigate('/admin-panel');
        }
    })

    return (
        <>
            <div className="col-md-10 px-5" style={{ height: '90vh', overflowY: 'auto' }}>
                {/* <div className="d-flex align-items-center justify-content-between mt-3 col-md-8 mx-auto">
                    <Link to={'/admin-panel'} className='btn btn-outline-secondary'><IoMdArrowRoundBack className='me-1' size={20} />Back</Link>
                    <h4 className='h4 text-center mt-3'>Book Details</h4>
                </div> */}
                <div className="row my-0 mx-0 p-0 d-flex justify-content-center">
                    <div className='col-md-8 d-flex flex-row  align-items-center bg-white my-4 p-3'>
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
                        </div>
                    </div>
                </div >
            </div>
            {/* <div className='text-center'>
            <Link to={'/admin-panel'} className='btn btn-secondary '>Back to home</Link>
        </div> */}

            <Helmet>
                <title>Book | Admin</title>
            </Helmet>

        </>
    )
}

export default ViewBook
