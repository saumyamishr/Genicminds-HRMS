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
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <div className="bg-white p-8 shadow-lg rounded-xl w-80">
        <h2 className="text-xl font-bold mb-6 text-center text-[var(--color-secondary)]">
          Genic Minds HRMS
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin("ADMIN")}
            className="w-full bg-[var(--color-secondary)] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Login as Admin
          </button>

          <button
            onClick={() => handleLogin("HR")}
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
          >
            Login as HR
          </button>

          <button
            onClick={() => handleLogin("EMPLOYEE")}
            className="w-full border border-[var(--color-primary)] text-[var(--color-primary)] py-2 rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            Login as Employee
          </button>
        </div>
      </div>
    </div>
  );
}
