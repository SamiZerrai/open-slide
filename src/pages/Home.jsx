import React, { Fragment, useEffect } from 'react'
import PresentationList from '../components/PresentationList'
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Home = () => {

  const { user } = UserAuth();

  return user ? 
      <Fragment>
      <div className='m-8'>
        <Link className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded right-0" to="/new-presentation">✚ New Presentation</Link>
      </div>
      <PresentationList />
      </Fragment>
        :
        <div>Please login to see your presentations</div>
}

export default Home