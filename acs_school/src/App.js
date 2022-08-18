import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import {
  Apply,
  BodySlider,
  About,
  Contact,
  StudentLife,
  Login,
  ForgetPassword,
  HomeAdmin,
  StudentRegistered,
  DetailsStudentRegister,
  ACSAccounts,
  AddAccount,
  EditAccount,
  DetailsAccount,
  ContactSender,
  DetailsContact,
  PersonalProfile,
  AddCCC,
  Notifications,
  CreateAgenda,
  CheckAgendaCreated,
  ShowUsers,
  AddUser,
  ShowUserAgenda
}
  from './Views/index.views'

import { AuthContext } from './Context/UserContext'

function App() {

  const authContext = React.useContext(AuthContext)

  const ProtectedRoute = props => {
    const role = JSON.parse(authContext.user)
    return authContext.isAuthenticated && role.user_role === 'Supervisor' ? <Outlet /> : <Navigate to='/login' />
  }
  const AuthRoute = props => {
    const role = JSON.parse(authContext.user)
    return authContext.isAuthenticated && role.user_role === 'Admin' ? <Outlet /> : <Navigate to='/login' />
  }

  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/forget-password' element={<ForgetPassword />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/' element={<BodySlider />} />
          <Route exact path='/apply-now' element={<Apply />} />
          <Route exact path='/student-life' element={<StudentLife />} />
          <Route exact path='/agenda' element={<ShowUserAgenda />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path='/supervisor/show-agenda' element={<CheckAgendaCreated />} />
            <Route exact path='/supervisor/create-agenda' element={<CreateAgenda />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route exact path='/admin/notifications' element={<Notifications />} />
            <Route exact path='/admin/class-course-cycle' element={<AddCCC />} />
            <Route exact path='/admin/personal-profile' element={<PersonalProfile />} />
            <Route exact path='/admin/sender-contact/:id' element={<DetailsContact />} />
            <Route exact path='/admin/sender-contact' element={<ContactSender />} />
            <Route exact path='/admin/accounts/:user_id' element={<DetailsAccount />} />
            <Route exact path='/admin/accounts/:user_id/edit' element={<EditAccount />} />
            <Route exact path='/admin/accounts/create' element={<AddAccount />} />
            <Route exact path='/admin/accounts' element={<ACSAccounts />} />
            <Route exact path='/admin/student-registered/:registration_id' element={<DetailsStudentRegister />} />
            <Route exact path='/admin/student-registered' element={<StudentRegistered />} />
            <Route exact path='/admin' element={<HomeAdmin />} />
            <Route exact path='/admin/users' element={<ShowUsers />} />
            <Route exact path='/admin/users/create' element={<AddUser />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
