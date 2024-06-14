import React, { useContext, useEffect, useState } from 'react'

// import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteBook, listingBooks } from '../../services/home.service';
import Swal from 'sweetalert2'
import { DarkModeContext } from '../../Context/DarkMode';
import Loader from "react-js-loader";
import ReactPaginate from "react-paginate";
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'


function AdminPanel() {

  var user = JSON.parse(localStorage.getItem('user') || '[]');
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(true);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const pageLimit = 5
  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user[0].role !== 'admin') {
      navigate('/login');
    }
  })

  useEffect(() => {
    listingBooks(search, page, pageLimit).then((r) => {
      setTimeout(() => {
        setLoader(false);
      }, 500);
      setUserData(r?.data[0])
      setPageCount(Math.ceil(r?.data[1][0].total_page / pageLimit));
    })
  }, [search, page])



  const deleteAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: darkMode ? '#222831' : '#fff',
      color: darkMode ? '#ffffff' : '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id).then((r) => {
          if (r?.code === '1') {

            const deletedUser = userData.filter((item) => {
              if (item?.id !== id) {
                return true
              }
              return false
            })

            setUserData(deletedUser);
            Swal.fire({
              // position: "top-end",
              icon: "success",
              title: "Book has been deleted!",
              showConfirmButton: false,
              background: darkMode ? '#222831' : '#fff',
              color: darkMode ? '#ffffff' : '#000000',
              timer: 1500
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              background: darkMode ? '#222831' : '#fff'
              // footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        })
      }
    });
  }

  return (
    <>
      <div className="col-md-10 px-5" style={{height: '90vh', overflowY: 'auto'}}>
        <div className="w-100 " style={{ backgroundColor: `${darkMode ? "#303841" : "rgb(234, 243, 251)"}`}}>
          <div className={`container py-4 px-3 my-5 ${darkMode ? "bg-dark" : "bg-white"}`} style={{ borderRadius: "10px" }}>
            <input type='search' placeholder='Search' className={`form-control py-2 px-3 mb-4 float-end w-auto ${darkMode ? "bg-dark text-white placeholder-search" : ""}`} onChange={(e) => {
              setLoader(true)
              setTimeout(() => {
                setPage(0)
                setSearch(e.target.value)
              }, 500)
            }
            }
            />
            {/* <Link className="btn btn-secondary float-end py-2" to="/add-book">Add  New Book</Link>
            <Link className="btn btn-primary float-end py-2 me-2" to="/all-orders">All Order's</Link> */}
            <table className={`table table-hover ${darkMode ? "table-dark" : ""} p-3 m-0 text-center`}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Thumbnail</th>
                  <th scope="col">Book PDF</th>
                  <th scope="col">No of Page</th>
                  <th scope="col">Price</th>
                  <th scope="col">Tags</th>
                  <th scope="col">Create Date</th>
                  <th scope="col">View</th>
                  <th scope="col">Delete</th>

                </tr>
              </thead>
              <tbody>
                {loader ?
                  <tr>
                    < td className='align-middle' colSpan={11}> <Loader type="bubble-scale" bgColor={"#eee"} size={35} /></td>
                  </tr>
                  :
                  userData?.length > 0 ? (
                    userData?.map((v, i) => (
                      <tr key={v?.id}>
                        <th scope="row" className='align-middle'>{v?.id}</th>
                        <td className='align-middle'>{v?.title}</td>
                        <td className='align-middle'>{v?.author}</td>
                        <td className='align-middle'><a href={v?.thumbnail} target='_blank' rel="noopener noreferrer"><img src={v?.thumbnail} alt="" className='thumbnail-preview' /></a></td>
                        <td className='align-middle'><a href={v?.pdf} target='_blank' rel="noopener noreferrer">View PDF</a></td>
                        <td className='align-middle'>{v?.no_of_page}</td>
                        <td className='align-middle'>{v?.price}</td>
                        <td className='align-middle'>{v?.tags}</td>
                        <td className='align-middle'>{moment(v?.created_at).format('DD/MM/YYYY')}</td>
                        <td className='align-middle'><button className='btn btn-info py-2 px-3' onClick={() => navigate('/book-detail', { state: v })}>View</button></td>
                        <td className='align-middle'><button className='btn btn-danger py-2 px-3' onClick={() => deleteAlert(v?.id)}>Delete</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='align-middle' colSpan={11}>Data not Found!</td>
                    </tr>
                  )
                }

              </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center w-100 flex-column mt-5">
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
            </div>
          </div >
        </div >
      </div>
      <Helmet>
        <title>Admin</title>
      </Helmet>
    </>
  )
}

export default AdminPanel

