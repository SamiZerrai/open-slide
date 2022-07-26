import React, { Fragment, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Home = () => {

  const { user } = UserAuth();

  console.log(user);

  return user == null ?
    <div>
      <span>Please login to see your presentations</span>
    </div>
    :
    <Fragment>
      <Navigate to="/list-presentations" />
    </Fragment>
}

export default Home