import { useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import bg_genicMinds from "../assets/genicMinds_bg.png";
import logo from "../assets/genicminds-logo.png";
import { CiUser } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg_img from "../assets/genicminds.png";
import axios from "axios"
import toast from "react-hot-toast"
// import bg from "../assets/bg.jpg";
import { AxiosError } from "axios";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    console.log("Username:", username);
    console.log("Password:", password);

     try {
        console.log(`${import.meta.env.VITE_API_URL}`);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,{
            username:username,
            password:password,
          
        })

        console.log("api response",response);

           toast.success("logged In  successfully")

         login(); 
         navigate("/");

    } catch (error) {
          const err = error as AxiosError;

  if (err.response?.status === 401) {
    toast.error("Invalid username or password ");
  } else {
    toast.error("Something went wrong");
  }

  console.log(err.response?.data);
    }

   
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-(--color-bg)">
      {/* Background */}
      <img
        src={bg_img}
        className="absolute inset-0 w-full h-full object-cover lg:hidden md:hidden"
      />
      <img
        src={bg_genicMinds}
        className="hidden absolute inset-0 w-full h-full object-cover md:block lg:block"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-sm p-2 md:max-w-md">
        {/* Logo */}
        <img src={logo} className="w-44 mx-auto mb-6" />

        <h2 className="text-3xl font-semibold text-center text-(--color-secondary) mb-6">
          Login
        </h2>

        <form className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="user"
              className="flex items-center gap-2 text-(--color-secondary) mb-1 text-xs"
            >
              <CiUser />
              Username
            </label>

            <input
              type="text"
              id="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border border-(--color-accent) rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="pass"
              className="flex items-center gap-2 text-(--color-secondary) mb-1 text-xs"
            >
              <IoMdKey />
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-(--color-accent) rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-secondary)"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white py-2 rounded-lg font-medium transition shadow-md"
          >
            Login
          </button>

          {/* Forgot password */}
          <Link to="/">
            <p className="text-(--color-primary) text-center hover:underline mt-4">
              Forgot your password?
            </p>
          </Link>

          {/* Register Link */}
          <Link to="/register">
            <p className="text-(--color-primary) text-center hover:underline mt-4">
              Don't have an account? Register
            </p>
          </Link>

          <p className="text-sm text-(--color-secondary) text-center pt-2">
            © 2024 - 2026 GenicMinds. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
}
