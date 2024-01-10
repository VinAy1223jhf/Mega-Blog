// import './index.css'
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import App from './App'; // your main application component
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// import AuthLayout from './components/AuthLayout';

// import Home from './components/Pages/Home';
// import LoginPage from './components/Pages/LoginPage';
// import SignupPage from './components/Pages/SignupPage'
// import AddPost from './components/Pages/AddPost';
// import AllPosts from './components/Pages/AllPosts';
// import EditPost from './components/Pages/EditPost';
// import Post from './components/Pages/Post';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [

//       {
//         path: '/',
//         element: <Home />
//       },

//       {
//         path: '/login',
//         element: (
//           <AuthLayout authentication={false}>
//             <LoginPage />
//           </AuthLayout>
//         )
//       },

//       {
//         path: "/signup",
//         element: (
//           <AuthLayout authentication={false}>
//             <SignupPage />
//           </AuthLayout>
//         ),
//       },

//       {
//         path: "/all-posts",
//         element: (
//           <AuthLayout authentication={true}>
//             {" "}
//             <AllPosts />
//           </AuthLayout>
//         ),
//       },

//       {
//         path: "/add-post",
//         element: (
//           <AuthLayout authentication={true}>
//             {" "}
//             <AddPost />
//           </AuthLayout>
//         ),
//       },

//       {
//         path: "/edit-post/:slug",
//         element: (
//           <AuthLayout authentication={true}>
//             {" "}
//             <EditPost />
//           </AuthLayout>
//         ),
//       },

//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//     ]
//   }
// ])

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>,
// )


import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App'; // your main application component
import AuthLayout from './components/AuthLayout';
import Home from './components/Pages/Home';
import LoginPage from './components/Pages/LoginPage';
import SignupPage from './components/Pages/SignupPage';
import AddPost from './components/Pages/AddPost';
import AllPosts from './components/Pages/AllPosts';
import EditPost from './components/Pages/EditPost';
import Post from './components/Pages/Post';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<AuthLayout authentication={false}><LoginPage /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout authentication={false}><SignupPage /></AuthLayout>} />
            <Route path="/all-posts" element={<AuthLayout authentication={true}><AllPosts /></AuthLayout>} />
            <Route path="/add-post" element={<AuthLayout authentication={true}><AddPost /></AuthLayout>} />
            <Route path="/edit-post/:slug" element={<AuthLayout authentication={true}><EditPost /></AuthLayout>} />
            <Route path="/post/:slug" element={<Post />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);