import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/employees/Employees";
import Departments from "./pages/Departments";
import Leave from "./pages/Leave";
import Attendance from "./pages/Attendance";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import {Toaster} from "react-hot-toast"

function App() {
  return (

    <>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "HR"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/departments" element={<Departments />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "HR", "EMPLOYEE"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/leave" element={<Leave />} />
            <Route path="/attendance" element={<Attendance />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
