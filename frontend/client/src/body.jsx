import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Home from './components/home';
import Login from './components/login';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/appStore';
import ProtectiveCheck from '../../pages/protectiveCkeck';
import Profile from './components/profile';
import EditProfile from './components/editProfile';
import AdminLogin from './components/adinLogin';
import Dashboard from './components/admindashboard'
import AdminProtectiveCheck from '../../pages/adminProtectiveChech';
import AdminEditProfile from './components/adminEditprofile';
import AddUser from './components/adminAddUser';
import ReverseProtectiveCheck from '../../pages/reverseProtectiveCheck';
import AdminReverseProtectiveCheck from '../../pages/adminreverseprotectivecheck';


const Body = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Toaster position="top-center" />
          <Routes>
            <Route path='/' element={<ReverseProtectiveCheck><Login /></ReverseProtectiveCheck> } />
            <Route path='/register' element={<ReverseProtectiveCheck><Register /></ReverseProtectiveCheck>} />
            <Route path='/home' element={<ProtectiveCheck><Home /></ProtectiveCheck>} />
            <Route path='/profile' element={<ProtectiveCheck><Profile /></ProtectiveCheck>} />
            <Route path='/edituser' element={<ProtectiveCheck><EditProfile/> </ProtectiveCheck>} />
            <Route path='/admin/login' element={<AdminReverseProtectiveCheck><AdminLogin/></AdminReverseProtectiveCheck> } />
            <Route path='/admindashboard' element={<AdminProtectiveCheck><Dashboard/></AdminProtectiveCheck>} />
            <Route path='/admineditprofile' element={<AdminProtectiveCheck><AdminEditProfile/></AdminProtectiveCheck>} />
            <Route path='/adduser' element={<AdminProtectiveCheck><AddUser/></AdminProtectiveCheck>} />

          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default Body;
