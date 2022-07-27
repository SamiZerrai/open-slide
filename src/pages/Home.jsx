import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Home = () => {

  const { user } = UserAuth();

  return user ? 
      <Fragment>
        <Navigate to='/list-presentation' />
      </Fragment>
        :
        <div>Please login to see your presentations</div>
}

export default Home