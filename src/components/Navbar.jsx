import React, { Fragment, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';

const Navbar = () => {
  const { logOut } = UserAuth();
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  return (
    <Fragment>
      <Online>
      <nav className="bg-white shadow-md border-gray-200 px-2 sm:px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Open-slide</span>
          </a>
          <div className="flex md:order-2">
            {user?.displayName ? (
              <Fragment>
                <button onClick={handleSignOut} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
              </Fragment>
            ) : (
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleSignIn}>Login with Google</button>
            )}
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                {user?.displayName ? (
                  <Fragment>
                    <span className='flex items-center'> {user.displayName} </span>
                  </Fragment>
                ) : (
                  <span className='flex items-center'> </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </Online>
        <Offline>
        <nav className="bg-gray-200 shadow-md border-gray-200 px-2 sm:px-4 py-2.5 ">
          <div className="flex flex-wrap items-center justify-between mx-auto">
            <a href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Open-slide</span>
            </a>
            <div className="flex md:order-2">
              {user?.displayName ? (
                <Fragment>
                  <button onClick={handleSignOut} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </Fragment>
              ) : (
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleSignIn}>Login with Google</button>
              )}
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  {user?.displayName ? (
                    <Fragment>
                      <span className='flex items-center'> {user.displayName} </span>
                    </Fragment>
                  ) : (
                    <span className='flex items-center'> </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Offline>
    </Fragment>
  );
};

export default Navbar;
