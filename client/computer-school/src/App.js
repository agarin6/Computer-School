import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { CssBaseline, Box } from '@mui/material';
import './App.css';

import LoginPage from './components/login';
import RegistrationPage from './components/register';
import Header from './components/header';
import Footer from './components/footer';
import UserProfile from './components/userProfile';
import CoursesList from './components/coursesList';
import CourseProfile from './components/CourseProfile';
import TeachersList from './components/TeacherList';
import LocationsList from './components/LocationsList';
import TeacherAdminka from './components/teacherAdminka';
import CoursesAdminka from './components/CoursesAdminks';
import GroupsManager from './components/gropuManager';
import ScheduleManager from './components/schedulesManager';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1} sx={{ width: '100%' }}>
          <Routes>
            {/* <Route path='/' element={<HomePage></HomePage>} /> */}
            <Route path='/profile' element={<UserProfile></UserProfile>} />
            <Route path='/courses' element={<CoursesList></CoursesList>} />
            <Route path='/courses/:courseId' element={<CourseProfile></CourseProfile>} />
            <Route path='/teachers' element={<TeachersList></TeachersList>} />
            <Route path='/locations' element={<LocationsList></LocationsList>} />
            <Route path='/adminka1' element={<TeacherAdminka></TeacherAdminka>} />
            <Route path='/adminka2' element={<CoursesAdminka></CoursesAdminka>} />
            <Route path='/adminka3' element={<GroupsManager></GroupsManager>} />
            <Route path='/adminka4' element={<ScheduleManager></ScheduleManager>} />
            {!isAuth && <Route path='/registration' element={<RegistrationPage />} />}
            {!isAuth && <Route path='/login' element={<LoginPage />} />}
            {isAuth && <Route path="*" element={<Navigate to="/" />} />}
            {!isAuth && <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </Box>
        <Footer></Footer>
      </Box>
    </div>
  );
}

export default App;
