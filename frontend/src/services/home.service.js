import { fetchWrapper } from "../utils/fetch.wrapper";


export function adminLogin(loginData) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMIN}${process.env.REACT_APP_API_AUTH}admin-login`,loginData);
}

export function addBook(bookData) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMIN}${process.env.REACT_APP_API_HOME}add-book`,bookData);
}

export function listingBooks(search,page,limit) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMIN}${process.env.REACT_APP_API_HOME}listing-books`,{"search":search,"page":page,"pageLimit" : limit});
}

export function deleteBook(id) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_ADMIN}${process.env.REACT_APP_API_HOME}delete-book`,{"id":id});
}

export function userSignup(signupData) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_AUTH}signup`,signupData);
}

export function userLogin(loginData) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_AUTH}login`,loginData);
}

export function getCountryCode() {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_AUTH}listing-country-code`,{});
}

export function addToCart(book_id,quantity) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_HOME}add-to-cart`,{"book_id":book_id,"quantity":quantity});
}

export function getCart(book_id) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_HOME}listing-cart`,{"book_id":book_id});
}

export function placeBookOrder() {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_HOME}place-order`,{});
}

export function getOrders(user) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_HOME}listing-orders`,{"user":user});
}

export function updateOrderStatus(order_id,status) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USER}${process.env.REACT_APP_API_HOME}status-update`,{"order_id":order_id,"status":status});
}

// export function userSignup(signupData) {
//     return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_AUTH}signup`,signupData);
// }

// export function listingUsers(search,page,limit) {
//     return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_AUTH}listing-users`,{"search":search,"page":page,"pageLimit" : limit});
// }

// export function deleteUser(id) {
//     return fetchWrapper.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_AUTH}delete-user`,{"id":id});
// }

// export function verifyToken(token) {
//     return fetchWrapper.post(`http://localhost:3048/api/v1/auth/verify-token`,{"token":token});
// }
