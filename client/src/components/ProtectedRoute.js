// import { message } from 'antd';
// import React, { useEffect, useState } from 'react'
// import { GetCurrentUser } from '../apicalls/users';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { SetUser } from '../redux/usersSlice';
// import { HideLoading, ShowLoading } from '../redux/loadersSlice';

// function ProtectedRoute({children}) {  
//     const { user } = useSelector((state) => state.users);
//     const navigate = useNavigate();                      
//     const dispatch = useDispatch();
 
//     const getCurrentUser = async () => {
//         try {
//             dispatch(ShowLoading())
//             const response = await GetCurrentUser();
//             dispatch(HideLoading())
//             if(response.success){
//                 // setUser(response.user);
//                 dispatch(SetUser(response.data));
//             } else{
//                 dispatch(SetUser(null));
//                 message.error(response.message);
//             }
//         } catch (error) {
//             dispatch(HideLoading());
//             dispatch(SetUser(null));
//             message.error(error.message); 
//         }
//     };
 
//     useEffect(() => {
//         if(localStorage.getItem('token')) {
//             getCurrentUser();
//         }
//         else {
//             navigate('/login'); 
//         }
//        // getCurrentUser();
//     }, []);

//   return (
//     user && (
//     <div className="layout p-1">
//         <div className="header bg-primary flex justify-between p-2">
//             <div>
//                 <h1 className="text-2xl text-white cursor-pointer"
//                  onClick={() => navigate("/")}>
//                     MOVIE MANIA
//                 </h1>
//             </div>

//             <div className="bg-white p-1 flex gap-1">
//                 <i className="ri-shield-user-line text-primary"></i>
//                 <h1 className="text-sm underline" 
//                 onClick={() => {
//                     if(user.isAdmin) {
//                         navigate("/admin");
//                     } else {
//                         navigate("/profile");
//                     }
//                 }}
//                 >
//                     {user.name}
//                 </h1>

//                 <i className="ri-logout-box-r-line ml-2"
//                 onClick={() => {
//                     localStorage.removeItem("token");
//                     navigate("/login");
//                 }}></i>
//             </div>
//         </div>
//         <div className="content mt-1 p-1">  
//             {children}
//         </div>
//     </div>
//   )
//   );
// }

// export default ProtectedRoute;  
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {  
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();                      
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());

      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
        localStorage.removeItem("token");  // Clear invalid token
        navigate("/login");  // Redirect to login
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Session expired. Please log in again.");
      localStorage.removeItem("token");  // Clear token on error
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user ? (
      <div className="layout p-1">
        {/* Header */}
        <div className="header bg-primary flex justify-between p-2">
          <h1 
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            MOVIE MANIA
          </h1>

          <div className="bg-white p-1 flex gap-1">
            <i className="ri-shield-user-line text-primary"></i>
            <h1 
              className="text-sm underline" 
              onClick={() => navigate(user.isAdmin ? "/admin" : "/profile")}
            >
              {user.name}
            </h1>
            <i 
              className="ri-logout-box-r-line ml-2"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/* Main Content */}
        <div className="content mt-1 p-1">{children}</div>
      </div>
    ) : null  // Prevents rendering before user data is available
  );
}

export default ProtectedRoute;

