import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./components/Navbar";

import Signup from "./components/Users/Signup";
import Login from "./components/Users/Login";
import Home from "./components/Users/Home";
import BookDetails from "./components/Users/BookDetails";

import Page404 from "./components/Page404";
import Protected from "./utils/protected.config";
import AdminLogin from "./components/Admin/AdminLogin";
import {  DarkModeContextProvider } from "./Context/DarkMode";
import AdminPanel from "./components/Admin/AdminPanel";
import AddBook from "./components/Admin/AddBook";
import AdminNavbar from "./components/Admin/AdminNavbar";
import ViewBook from "./components/Admin/ViewBook";
import Cart from "./components/Users/Cart";
import MyOrders from "./components/Users/MyOrders";
import AllOrders from "./components/Admin/AllOrders";
import AdminSideBar from "./components/Admin/AdminSideBar";

function App() {

  // var user = JSON.parse(localStorage.getItem('user') || '[]');
  // return (
  //   <BrowserRouter>
  //     {/* <Navbar/> */}
  //     <Routes>
  //       <Route path="/login" element={[<Login />]} />
  //       <Route path="/signup" element={[<Signup />]} />
  //       <Route path="/" element={
  //         <Protected>
  //           <Navbar /><Home />
  //         </Protected>
  //       } />

  //       <Route path="/add-post" element={
  //         <Protected>
  //           <Navbar /><AddPost />
  //         </Protected>
  //       } />

  //       <Route path="/post-details/:username/:post_id" element={[<ViewPost />]} />
  //       <Route path="*" element={[<Page404 />]} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  const Layout = () => {
    return (
      <DarkModeContextProvider>
      <div>
        <AdminNavbar />
        <div className="row m-0 p-0">
          <Outlet />
        </div>
      </div>
      </DarkModeContextProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Protected>
              <Layout />
          </Protected>
        </>
      ),
      children: [
        {
          path: "/",
          element: [<Home />],
        },
        {
          path: "/admin-panel",
          element: [<AdminSideBar/>,<AdminPanel />],
        },
        {
          path: "/add-book",
          element: [<AdminSideBar/>,<AddBook />],
        },
        {
          path: "/book-detail",
          element: [<AdminSideBar/>,<ViewBook />],
        },
        {
          path: "/all-orders",
          element: [<AdminSideBar/>,<AllOrders />],
        },
        {
          path: "/view-book-detail",
          element: [<BookDetails />],
        },
        {
          path: "/my-cart",
          element: [<Cart />],
        },
        {
          path: "/my-order",
          element: [<MyOrders />],
        }
      ],
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    { 
      path:"*",
      element:<Page404 /> 
    }
  ]);

  return <RouterProvider router={router} />;

}

export default App;
