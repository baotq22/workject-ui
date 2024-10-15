import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import { AppLayout } from '../layout/AppLayout';
import { 
  DashboardPage, 
  LoginPage, 
  ProfilePage, 
  TaskDetailsPage, 
  TasksPage, 
  TrashPage, 
  UsersPage,
  NotificationPage
} from "../pages";

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        {/* Private Routes */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/completed/:status" element={<TasksPage />} />
          <Route path="/in-progress/:status" element={<TasksPage />} />
          <Route path="/todo/:status" element={<TasksPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/deleted" element={<TrashPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/task/:id" element={<TaskDetailsPage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
};
