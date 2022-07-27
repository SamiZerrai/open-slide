import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewPresentation from './pages/NewPresentation';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Protected from './components/Protected';
import EditPresentation from './pages/EditPresentation';
import ViewPresentation from './pages/ViewPresentation';
import PresentationList from './components/PresentationList';
import { OnlineStatusProvider } from "./context/useOnlineStatus";

function App() {
  return (
      <OnlineStatusProvider>
        <AuthContextProvider>
          <Navbar />
          <div className="container mx-auto m-5 relative">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new-presentation' element={<NewPresentation />} />
              <Route path='/list-presentation' element={<PresentationList />} />
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
