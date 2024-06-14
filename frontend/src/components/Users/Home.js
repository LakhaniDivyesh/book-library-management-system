import React, { useContext, useEffect, useState } from 'react'

// import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listingBooks } from '../../services/home.service';
import { DarkModeContext } from '../../Context/DarkMode';
import Loader from "react-js-loader";
// import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'


function Home() {

    // var user = JSON.parse(localStorage.getItem('user') || '[]');
    const [userData, setUserData] = useState([]);
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(true);

    // const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const pageLimit = null
    const { darkMode } = useContext(DarkModeContext);

    const navigate = useNavigate();

    useEffect(() => {
        listingBooks(search, page, pageLimit).then((r) => {
            setTimeout(() => {
                setLoader(false);
            }, 500);
            setUserData(r?.data[0])
            // setPageCount(Math.ceil(r?.data[1][0].total_page / pageLimit));
        })
    }, [search, page])

    return (
        <>
            <div className="w-100" style={{ backgroundColor: `${darkMode ? "#303841" : "transparent"}`, height: '89.8vh', overflowY: 'auto' }}>
                <input type='search' placeholder='Search book' className={`form-control py-2 px-3  mx-auto mt-4 w-50 search-input ${darkMode ? "bg-dark text-white placeholder-search" : ""}`} onChange={(e) => {
                    setLoader(true)
                    setTimeout(() => {
                        setPage(0)
                        setSearch(e.target.value)
                    }, 500)
                }
                }
                />
                <div className={`container py-2 px-3 mt-2 `}>
                    <div className="flex-container">
                        {loader ?
                            <div className='w-100 d-flex align-items-center justify-content-center' style={{ height: '300px' }}>
                                <Loader type="box-rectangular" bgColor={"#999999"} size={80} />
                            </div>
                            :
                            userData?.length > 0 ? (
                                userData?.map((v, i) => (
                                    <div className="book-card" onClick={() => navigate('/view-book-detail', { state: v })} style={{ cursor: 'pointer' }}
                                    key={v.id}>
                                        <img src={v.thumbnail} alt="Avatar" />
                                        <div className="card-container">
                                            <h5 className='mb-1 mt-1'><b>{v.title}</b></h5>
                                            <p className='mb-1 text-primary'>{v.author}</p>
                                            <h6><b className='text-dark'>₹{v.price}</b></h6>
                                        </div>
                                        
                                    </div>
                                ))
                            )
                                :
                                (
                                    <div className='w-100 d-flex align-items-center justify-content-center'>
                                        <h3 className='h3 text-secondary'>Book not found!</h3>
                                    </div>
                                )

                        }

                    </div>

                    {/* <div className="d-flex align-items-center justify-content-center w-100 flex-column mt-5">
                        <ReactPaginate
                            containerClassName={"pagination"}
                            pageClassName={`${darkMode ? 'page-item-dark' : 'page-item'}`}
                            activeClassName={"active"}
                            onPageChange={(e) => setPage(e.selected)}
                            pageCount={pageCount}
                            breakLabel="..."
                            forcePage={page}
                            previousLabel={

                                <button className={`btn btn-outline-secondary py-1 ${page === 0 ? 'disabled' : ''}`} >Previous</button>
                            }
                            nextLabel={

                                <button className={`btn btn-outline-secondary py-1 ${pageCount === page + 1 ? 'disabled' : ''}`}>Next</button>
                            }
                        />
                    </div> */}
                </div >
            </div >
            <Helmet>
                <title>Book | Home</title>
            </Helmet>
        </>
    )
}

export default Home

