import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from '../layouts/defaultLayout'
import AuthLayout from '../layouts/AuthLayout'
import Home from '../pages/Home'
import Login from '../pages/auth/login'
import NotFound from '../pages/NotFound'
import Blog from '../pages/blog/Blog'
import NewPost from '../pages/blog/NewPost'
import Article from '../pages/blog/Article'
import SignUp from '../pages/auth/SignUp'
import { AuthContext } from '../context/AuthContext'

const MainRouter = () => {
    const { isAuth } = useContext( AuthContext );

    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          {!isAuth ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          )}
        </Route>
        <Route path="/blog" element={<DefaultLayout />}>
          <Route index element={<Blog />} />
          {isAuth ? (
            <Route path="new" element={<NewPost />} />
          ) : (
            <Route path="new" element={<Navigate to="/login" />} />
          )}
          <Route path=":slug" element={<Article />} />
        </Route>
      </Routes>
    );
}

export default MainRouter
