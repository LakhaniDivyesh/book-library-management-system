import { Link, useNavigate } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../Context/DarkMode';

function AdminNavbar() {
    const router = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || "[]");

    const logout = () => {
        if (user[0].role === 'admin') {
            localStorage.removeItem('user');
            router('/admin-login')
        } else {
            localStorage.removeItem('user');
            router('/login')
        }

    }

    const theme = useContext(DarkModeContext)
    const [themeIcon, setThemeIcon] = useState();

    useEffect(() => {
        if (theme.darkMode) {
            setThemeIcon(<IoSunny size={20} color='#ffffff' />)
        } else {
            setThemeIcon(<FaMoon size={20} color='#000000' />)
        }
    }, [theme.darkMode])

    const changeIcon = () => {
        if (theme.darkMode) {
            setThemeIcon(<FaMoon size={20} color='#000000' />)
            theme.toggle();
        } else {
            setThemeIcon(<IoSunny size={20} color='#ffffff' />)
            theme.toggle();
        }
    }

    return (
        <nav className={`navbar navbar-expand-lg  ${theme.darkMode ? "bg-dark navbar-dark" : "bg-white navbar-light"} px-4 py-2`} >
            {user[0].role === 'admin' ? <Link className="navbar-brand" to="/admin-panel">Admin</Link> : <Link className="navbar-brand" to="/">Book</Link>}

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    {user[0].role === 'user' ?
                    <>
                        <li className="nav-item ">
                            <Link to={'/my-cart'} className='nav-link'>My Cart</Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={'/my-order'} className='nav-link'>My Order</Link>
                        </li>
                    </>
                        :
                        ''
                    }

                    <li className="nav-item ">
                        <label className='nav-link'>{user[0].name}</label>
                    </li>

                    <li className="d-flex align-items-center ms-2">
                        <button className="btn btn-outline-danger"
                            onClick={() => logout()}
                        >logout</button>
                    </li>
                    {/* <li className="d-flex align-items-center ms-3">
                        <button className='btn w-100 h-100 d-flex align-items-center justify-content-center them-icon' onClick={() => changeIcon()}>{themeIcon}</button>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}

export default AdminNavbar
