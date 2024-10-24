// // components/AdminRoute.js
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext'; // or however you manage auth

// const AdminRoute = ({ component: Component, ...rest }) => {
//     const { user } = useAuth(); // Assuming useAuth returns the logged-in user

//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 user && user.role === 'admin' ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect to="/login" />
//                 )
//             }
//         />
//     );
// };

// export default AdminRoute;
