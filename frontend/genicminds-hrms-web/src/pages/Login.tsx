import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "ADMIN" | "HR" | "EMPLOYEE") => {
    login(role);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login as</h2>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin("ADMIN")}
            className="w-full bg-orange-500 text-white py-2 rounded"
          >
            Admin
          </button>

          <button
            onClick={() => handleLogin("HR")}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            HR
          </button>

          <button
            onClick={() => handleLogin("EMPLOYEE")}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Employee
          </button>
        </div>
      </div>
    </div>
  );
}
