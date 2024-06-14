import React, { useEffect, useState } from 'react';
import { MdErrorOutline } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { addBook } from '../../services/home.service';
import { useNavigate } from 'react-router-dom';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Helmet } from 'react-helmet'
// import { IoMdArrowRoundBack } from 'react-icons/io';


function Signup() {

    const { handleSubmit, register, formState: { errors } } = useForm({ mode: "onChange" });

    const [profileImage, setProfileImage] = useState("");

    const router = useNavigate();

    var user = JSON.parse(localStorage.getItem('user') || '[]');
    useEffect(() => {
        if (user[0].role !== 'admin') {
            router('/login');
        }
    })

    function handleFileChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const onSubmit = (value) => {
        let formData = new FormData();
        formData.append("title", value.title);
        formData.append("author", value.author);
        formData.append("thumbnail", value.thumbnail[0]);
        formData.append("pdf", value.bookPdf[0]);
        formData.append("no_of_page", value.no_of_page);
        formData.append("price", value.price);
        formData.append("tags", value.tags);
        addBook(formData).then((r) => {
            if (r.code === '1') {
                toast.success(r.message, {
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
                setTimeout(() => {
                    router('/admin-panel');
                }, 1400);
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
            <div className="col-md-10 px-5" style={{ height: '90vh', overflowY: 'auto' }}>
                {/* <div className="d-flex align-items-center justify-content-between mt-3 order-box mx-auto">
                    <Link to={'/admin-panel'} className='btn btn-outline-secondary'><IoMdArrowRoundBack className='me-1' size={20} />Back</Link>
                </div> */}
                <div className="row my-0 mx-0 mt-3 mb-3 pt-3 p-0 d-flex justify-content-center">
                    <ToastContainer />
                    <div className='col-md-6 bg-white p-5 form-con'>
                        <div className="row m-0 row-con">
                            <h3 className='h3 text-center w-100 mb-5'>Add Book</h3>
                            <form id="login-form" className="" onSubmit={handleSubmit(onSubmit)}>

                                <div className="col-md-12 mb-3">
                                    <input
                                        type="text"
                                        className="form-control py-2 px-4"
                                        id="title"
                                        placeholder="Title"
                                        {...register("title", {
                                            required: "Please enter title.",
                                            pattern: {
                                                value: /^(?=.{1,100}$)[a-zA-Z0-9\s,'-]*[a-zA-Z0-9']$/,
                                                message: "Please enter valid book title"
                                            }

                                        })}
                                        style={{ background: errors.title ? 'rgba(228, 26, 26, 0.196)' : 'white' }}
                                    />
                                    {errors.title && <p className="error"><MdErrorOutline size={16} className='icon' />{errors.title.message}</p>}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <input
                                        type="text"
                                        className="form-control py-2 px-4"
                                        id="author"
                                        placeholder="Author"
                                        {...register("author", {
                                            required: "Please enter author name.",
                                            pattern: {
                                                // value: /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,1}$/i,
                                                value: /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/,
                                                message: "Please enter valid book author name."
                                            }
                                        })}
                                        style={{ background: errors.author ? 'rgba(228, 26, 26, 0.196)' : 'white' }}
                                    />
                                    {errors.author && <p className="error"><MdErrorOutline size={16} className='icon' />{errors.author.message}</p>}
                                </div>


                                <div className="col-md-12 mb-3">
                                    <label className='mb-1'>Book Thumbnail</label>
                                    <div className="position-relative">
                                        <input
                                            className="form-control py-2 px-3"
                                            id="book_image"
                                            aria-describedby="emailHelp"
                                            placeholder="Profile Image"
                                            type="file"
                                            accept='.jpg,.png,.jpeg'
                                            {...register("thumbnail", {
                                                required: "Please select thumbnail.",
                                                validate: {
                                                    validImage: (value) => {
                                                        const fileTypes = [
                                                            "image/jpeg",
                                                            "image/png",
                                                            "image/jpg",
                                                        ];
                                                        const validFileType = fileTypes.includes(value[0]?.type);
                                                        return (
                                                            validFileType ||
                                                            "Only JPG, JPEG, or PNG images are allowed."
                                                        );
                                                    },
                                                },
                                            })}
                                            onChange={handleFileChange}
                                            style={{ background: errors.thumbnail ? 'rgba(228, 26, 26, 0.196)' : 'white' }}
                                        />
                                        <span className="position-absolute bi btn">
                                            <img src={profileImage} alt="" className='profile-preview' />
                                        </span>
                                    </div>
                                    {errors.thumbnail && <p className="error"><MdErrorOutline size={16} className='icon' />{errors.thumbnail.message}</p>}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className='mb-1'>Book PDF</label>
                                    <div className="position-relative">
                                        <input
                                            className="form-control py-2 px-3"
                                            id="Book_pdf"
                                            aria-describedby="emailHelp"
                                            placeholder="Profile Image"
                                            type="file"
                                            accept='.pdf'
                                            {...register("bookPdf", {
                                                required: "Please select book pdf.",
                                                validate: {
                                                    validImage: (value) => {
                                                        const fileTypes = [
                                                            "application/pdf",
                                                        ];
                                                        const validFileType = fileTypes.includes(value[0]?.type);
                                                        return (
                                                            validFileType ||
                                                            "Only PDF are allowed."
                                                        );
                                                    },
                                                },
                                            })}
                                            style={{ background: errors.bookPdf ? 'rgba(228, 26, 26, 0.196)' : 'white' }}
                                        />
                                    </div>
                                    {errors.bookPdf && <p className="error"><MdErrorOutline size={16} className='icon' />{errors.bookPdf.message}</p>}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <input
                                        type="text"
                                        className="form-control py-2 px-4"
                                        id="page"
                                        placeholder="No of Page"
                                        {...register("no_of_page", {
                                            required: "Please enter total page.",
                                            pattern: {
                                                value: /^[0-9]+$/i,
                                                message: "Please enter valid total page."
                                            }
                                        })}
                                        style={{ background: errors.no_of_page ? 'rgba(228, 26, 26, 0.196)' : 'white' }}
                                    />
                                    {errors.no_of_page && <p className="error"><MdErrorOutline size={16} className='icon' />{errors.no_of_page.message}</p>}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <input
                                        type="text"
                                        className="form-control py-2 px-4"
                                        id="price"
                                        placeholder="Book Price"
                                        {...register("price", {
                                            required: "Please enter price.",
                                            pattern: {
                                                value: /^\d+(.\d{1,2})?$/i,
                                                message: "Please enter valid price."
                                            }
                                        })}
                                        style={{ background: errors.price ? 'rgba(228, 26, 26, 0.196)' : 'white' }}
                                    />
                                    {errors.price && <p className="error"><MdErrorOutline size={16} className='icon' />{errors.price.message}</p>}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <input
                                        type="text"
                                        className="form-control py-2 px-4"
                                        id="tags"
                                        placeholder="Tags"
                                        {...register("tags", {
                                            required: "Please enter tags.",
                                            pattern: {
                                                value: /^(([a-zA-Z](,)?)*)+$/i,
                                                message: "Please enter tags with comma separated."
                                            }
                                        })}
                                        style={{ background: errors.tags ? 'rgba(228, 26, 26, 0.196)' : 'white' }}
                                    />
                                    {errors.tags && <p className="error"><MdErrorOutline size={16} className='icon' />{errors.tags.message}</p>}
                                </div>

                                <div className="col-md-12">
                                    <button type="submit" className="w-100 py-2 btn btn-dark" id="login-btn">Add new Book</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <Helmet>
                <title>Book | Admin</title>
            </Helmet>
        </>
    )
}

export default Signup
