import { useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../public/Genicminds-logo.png";
import hr_image from "../../public/hr_online_1.jpg";
import card_img from "../../public/card_img.jpg"
import { CiUser } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { username, password }
      );

      toast.success("Logged in successfully");
      login(response.data);
      navigate("/");
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    ">

      {/* 🔥 Parent Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl 
                      shadow-2xl flex overflow-hidden">

        {/* LEFT IMAGE SECTION */}
        <div className="hidden lg:block lg:w-1/2 relative p-8 ">
          <img
            src={card_img}
            alt="HR Management"
            className="w-full h-full object-scale-down p-4"
          />
          {/* <div className="absolute inset-0 bg-[var(--color-secondary)]/40"></div> */}

          <div className="absolute bottom-12 left-10 text-white max-w-sm ">
            <h2 className="text-3xl font-bold mb-3">
              Welcome Back
            </h2>
            <p className="text-sm opacity-90">
              Access your HR dashboard, manage employees,
              attendance and departments easily.
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 border-l border-gray-300">

          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Company Logo"
                className="w-40 object-contain drop-shadow-md"
              />
            </div>

            <h2 className="text-2xl font-semibold text-center text-[var(--color-secondary)] mb-8">
              Login to Your Account
            </h2>

            <form className="space-y-6">

              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-[var(--color-secondary)] text-sm mb-2">
                  <CiUser /> Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full border border-[var(--color-accent)] 
                             rounded-xl px-4 py-3
                             focus:outline-none 
                             focus:ring-2 
                             focus:ring-[var(--color-primary)]
                             transition-all duration-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-[var(--color-secondary)] text-sm mb-2">
                       Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-[var(--color-accent)] 
                               rounded-xl px-4 py-3 pr-12
                               focus:outline-none 
                               focus:ring-2 
                               focus:ring-[var(--color-primary)]
                               transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 
                               text-[var(--color-secondary)]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-[var(--color-secondary)] 
                           hover:bg-[var(--color-primary-dark)]
                           text-white py-3 rounded-xl 
                           font-semibold transition-all duration-300
                           shadow-lg hover:shadow-xl"
              >
                Login
              </button>

              <Link to="/">
                <p className="text-[var(--color-primary)] 
                              text-center hover:underline mt-4 text-sm">
                  Forgot your password?
                </p>
              </Link>

              <Link to="/register">
                <p className="text-[var(--color-primary)] 
                              text-center hover:underline mt-2 text-sm">
                  Don't have an account? Register
                </p>
              </Link>

              <p className="text-xs text-[var(--color-secondary)] 
                            text-center pt-4">
                © 2024 - 2026 GenicMinds HRMS. All rights reserved.
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}