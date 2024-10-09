import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage, LoginPage, TaskDetailsPage, TasksPage, TrashPage, UsersPage } from "../pages";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AppLayout } from '../layout/AppLayout';

export const App = () => {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] dark:bg-slate-800'>
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
          <Route path="/task/:id" element={<TaskDetailsPage />} />
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
