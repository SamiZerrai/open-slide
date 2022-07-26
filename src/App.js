import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewPresentation from './pages/NewPresentation';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Protected from './components/Protected';
import { initDB } from 'react-indexed-db';
import EditPresentation from './pages/EditPresentation';
import ViewPresentation from './pages/ViewPresentation';
import { OnlineStatusProvider } from "./services/useOnlineStatus";

function App() {
  return (
      <OnlineStatusProvider>
        <AuthContextProvider>
          <Navbar />
          <div className="container mx-auto m-5 relative">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/new-presentation' element={<NewPresentation />} />
              <Route path='/edit-presentation/:id' element={<EditPresentation />} />
              <Route path='/view-presentation/:id' element={<ViewPresentation />} />
              <Route
                path='/'
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              />
            </Routes>
          </div>
        </AuthContextProvider>
      </OnlineStatusProvider>
  );
}

export default App;
