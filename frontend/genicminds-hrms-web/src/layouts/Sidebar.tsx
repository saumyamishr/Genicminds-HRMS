import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-orange-500 hover:text-white";

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-bold text-orange-600 mb-6">
        Genic HRMS
      </h2>

      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" className={linkClass}>
          Employees
        </NavLink>
        <NavLink to="/departments" className={linkClass}>
          Departments
        </NavLink>
        <NavLink to="/leave" className={linkClass}>
          Leave
        </NavLink>
        <NavLink to="/attendance" className={linkClass}>
          Attendance
        </NavLink>
      </nav>
    </div>
  );
}
